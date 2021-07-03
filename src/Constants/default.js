// export const API_ENDPOINT_URL = 'http://localhost:8000'
let API_ENDPOINT_URL;
if (window.location.origin == "https://amplifyart.netlify.app") {
    API_ENDPOINT_URL = "https://amplify-api.herokuapp.com";
} else {
    // API_ENDPOINT_URL = 'https://0e63faf5cb5b.ngrok.io'
    API_ENDPOINT_URL = 'https://amplify-api.herokuapp.com';
}
export { API_ENDPOINT_URL };
