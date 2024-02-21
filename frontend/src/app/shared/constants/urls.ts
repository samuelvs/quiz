import { environment } from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';

export const QUESTIONS = BASE_URL + '/api/questions';
export const ANSWERQUESTION = QUESTIONS + '/answer';
export const FINALIZE_QUIZ = QUESTIONS + '/finish';
export const DOWNLOADPDF = BASE_URL + '/api/download/pdf';

export const USER_LOGIN = BASE_URL + '/api/users/login';
export const USER_REGISTER = BASE_URL + '/api/users/signup';
export const USER_LIST = BASE_URL + '/api/users';
export const USER_CHANGE_PASSWORD = BASE_URL + '/api/change-password';
export const USER_RESET_PASSWORD = BASE_URL + '/api/reset-password';
export const USER_DELETE = BASE_URL + '/api/delete';

export const DASHBOARD = QUESTIONS + '/results';
