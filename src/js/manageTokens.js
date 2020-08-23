const tokenKey = "auth-tokens";
export function saveTokens(key) {
  localStorage.setItem(tokenKey, JSON.stringify(key));
}
export function getTokens() {
  return JSON.parse(localStorage.getItem(tokenKey));
}

export function removeTokens() {
  localStorage.removeItem(tokenKey);
}
