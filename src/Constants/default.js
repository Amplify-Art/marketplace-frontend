// export const API_ENDPOINT_URL = 'http://localhost:8000'
let API_ENDPOINT_URL;
if (window.location.origin == "https://amplifyart.netlify.app") {
    API_ENDPOINT_URL = "https://amplify-api.herokuapp.com";
} else if (window.location.origin == "https://staging-amplify.netlify.app") {
    API_ENDPOINT_URL = "https://staging-amplify-api.herokuapp.com";
} else if (window.location.origin == "https://prod-amplifyart.netlify.app") {
    API_ENDPOINT_URL = "http://amplifyapi-production.eba-bchixipm.us-east-1.elasticbeanstalk.com";
} else if (window.location.origin == "https://amplify.art") {
    API_ENDPOINT_URL = "https://api.amplify.art";
} else {
    API_ENDPOINT_URL = 'http://localhost:8000'
    API_ENDPOINT_URL = 'https://amplify-api.herokuapp.com';
}
export { API_ENDPOINT_URL };
