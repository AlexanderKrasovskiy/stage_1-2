import Controller from './components/controller';
import './scss/global.scss';
import { logScore } from './components/selfAssessment';

const app = new Controller();
app.start();

logScore();
