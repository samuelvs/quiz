import { environment } from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';

export const QUESTIONS = BASE_URL + '/api/questions';
export const ANSWERQUESTION = QUESTIONS + '/answer';
