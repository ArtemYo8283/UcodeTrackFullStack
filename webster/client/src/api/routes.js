//User module
const currentUser = JSON.parse(localStorage.getItem('autorized'));

// Client ID for Google Sign In/Up

const clientId = "396282640648-nhgp1dh6eivlu5df4ip60j8ni00jke2e.apps.googleusercontent.com"

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';
const ACTIVE_EMAIL_URL = '/api/auth/active-email/';
const RESET_PASSWORD_URL = '/api/auth/reset-password';
const RESET_PASSWORD_WT_URL = '/api/auth/reset-password/';
const UPDATE_PROFILE_DATA_URL = '/api/users/'
const GET_USER_BY_ID_URL = `/api/users/`
//Project module
const GET_FORMATS_URL = '/api/formats/'
const GET_CATEGORIES_URL = '/api/categories/'
const GET_PROJECT_URL = '/api/projects/content'
const GET_BY_USER_ID = '/api/projects/user/'
const CREATE_PROJECT_URL = '/api/projects/'
const PROJECT_JSON_FOLDER = 'http://localhost:8080/projects/'
const UPDATE_PROJECT_URL = '/api/projects/save'
export {
    //User module
    REGISTER_URL,
    LOGIN_URL,
    ACTIVE_EMAIL_URL,
    RESET_PASSWORD_URL,
    RESET_PASSWORD_WT_URL,
    UPDATE_PROFILE_DATA_URL,
    GET_USER_BY_ID_URL,

    // Client ID
    clientId,
    
    //Project module
    GET_FORMATS_URL,
    GET_CATEGORIES_URL,
    GET_PROJECT_URL,
    CREATE_PROJECT_URL,
    PROJECT_JSON_FOLDER,
    UPDATE_PROJECT_URL,
    GET_BY_USER_ID
}
