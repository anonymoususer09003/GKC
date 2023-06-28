
export function isAuthenticated() {
  let token;
  if (typeof window !== 'undefined' && window.localStorage) {
     token = window.localStorage.getItem('gkcAuth');
     // Return true if token exists, false otherwise
  }
  console.log(token, "whaaat")

  return !!token;
  
 // return false; // Fallback if localStorage is not available
}