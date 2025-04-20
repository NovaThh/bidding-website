import { writable } from 'svelte/store';

// Initialize a writable store for the token
// Retrieve the token from localStorage if it exists, or set it to null otherwise
const tokenStore = writable(localStorage.getItem('token') || null);

// Subscribe to the token store to listen for changes
tokenStore.subscribe(token => {
    if (token) {
        // If a token is present, save it to localStorage
        localStorage.setItem('token', token);
    } else {
        // If the token is null or removed, delete it from localStorage
        localStorage.removeItem('token');
    }
});

export function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

// Export the token store for use in other parts of the application
export default tokenStore;
