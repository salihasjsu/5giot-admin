import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Chart from "chart.js";
import "../../styles/realtime.css";
import { chartConfig } from "../sharedComponents/chartConfig";
const maxLength = 10;
let device_id = "";
/**** END Chart Configurations ******* */

export default function RealTimePage() {
  const [isStop, setStop] = useState(true);
  const [devices, setDevices] = useState([]);
  const [listDevices, setListDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  let ws = useRef(null);
  const chartContainer = useRef(null);
  const [chartInst, setCharInst] = useState(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:9001");
    ws.current.onopen = () => {
      console.log("Websocket open");
    };
    ws.current.onclose = () => {
      console.log("Websocket closed");
    };
    return () => {
      ws.current.close();
    };
  }, []);
  useEffect(() => {
    console.log("list of devices", listDevices);
  }, [listDevices]);
  useEffect(() => {
    if (!chartInst) {
      if (chartContainer && chartContainer.current) {
        const newChartInst = new Chart(chartContainer.current, chartConfig);
        setCharInst(newChartInst);
      }
    }
    console.log("chart instance", chartInst);
  }, [chartContainer, chartInst]);

  useEffect(() => {
    // Find a device based on its Id
    const findDevice = (deviceId) => {
      for (let i = 0; i < devices.length; ++i) {
        if (devices[i].deviceId === deviceId) {
          return i;
        }
      }

      return null;
    };

    const addDeviceData = (id, time, temperature, humidity) => {
      const existingDeviceIndex = findDevice(id);
      if (existingDeviceIndex == null) {
        console.log("new device so going to add data of device");
        var dataCopy = devices;
        var obj = initDevice();
        obj.deviceId = id;
        obj.timeData.push(time);
        obj.temperatureData.push(temperature);
        obj.humidityData.push(humidity);
        dataCopy.push(obj);
        setDevices(dataCopy);
        //setDevices((devices) => [...devices, obj]);
      } else {
        devices[existingDeviceIndex].timeData.push(time);
        devices[existingDeviceIndex].temperatureData.push(temperature);
        devices[existingDeviceIndex].humidityData.push(humidity);
        if (devices[existingDeviceIndex].timeData.length > maxLength) {
          devices[existingDeviceIndex].timeData.shift();
          devices[existingDeviceIndex].temperatureData.shift();
          devices[existingDeviceIndex].humidityData.shift();
        }
      }
    };
    if (!ws.current) return;
    ws.current.onmessage = (e) => {
      if (isStop) return;
      const messageData = JSON.parse(e.data);
      console.log(messageData);
      // time and either temperature or humidity are required
      if (
        !messageData.MessageDate ||
        (!messageData.IotData.temperature && !messageData.IotData.humidity)
      ) {
        return;
      } else {
        //Check if it is a new device or exisiting one
        const existingDeviceIndex = findDevice(messageData.DeviceId);

        if (existingDeviceIndex == null) {
          if (devices.length === 0) {
            console.log("selecting the first encountered device"); //selecting the first device if nothing is selected
            setSelectedDevice(messageData.DeviceId);
            device_id = messageData.DeviceId;
          }
          // device is new so add to list of devices
          console.log("new device entered into the list");
          setListDevices((listDevices) => [
            ...listDevices,
            { deviceId: messageData.DeviceId },
          ]);
        }

        addDeviceData(
          messageData.DeviceId,
          messageData.MessageDate,
          messageData.IotData.temperature,
          messageData.IotData.humidity
        );
        const index = devices.findIndex((x) => x.deviceId === device_id);

        if (device_id == messageData.DeviceId) {
          console.log(devices);
          console.log("update chart for device:", device_id);
          chartInst.data.labels = devices[index].timeData;
          chartInst.data.datasets[0].data = devices[index].temperatureData;
          chartInst.data.datasets[1].data = devices[index].humidityData;
          chartInst.update();
        }
      }
    };
  }, [isStop, chartInst]);

  /****************** FUNCTIONS**************** */
  function initDevice() {
    return {
      deviceId: "",
      maxLen: maxLength,
      timeData: [],
      temperatureData: [],
      humidityData: [],
    };
  }
  function onDeviceSelect(e) {
    console.log("change device select", e.target.value);
    setSelectedDevice(e.target.value);
    device_id = e.target.value;
  }

  return (
    <div>
      <div className="row realtime-header">
        <div className="col-sm-1">
          <p>Device(s):</p>
        </div>
        <div className="col-sm-6">
          <select
            name="Devices"
            onChange={onDeviceSelect}
            value={selectedDevice}
            style={{ width: "200px" }}
          >
            {listDevices.map((e, i) => {
              return (
                <option key={i} value={e.deviceId}>
                  {e.deviceId}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-sm-4">
          {" "}
          <Button
            onClick={() => setStop(!isStop)}
            className="btn-success "
            style={{ width: "100px" }}
          >
            {isStop ? "Start" : "Stop"}
          </Button>
        </div>
      </div>
      <div className="row">
        <canvas
          ref={chartContainer}
          style={{ width: "500px !important", height: "400px !important" }}
        />
      </div>
    </div>
  );
}
