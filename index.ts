// Import stylesheets
import './style.css';
import {EmailsInput, Options} from './EmailsInput';

const el: HTMLElement = document.querySelector('#emails-input-default');
var defaultsEmailsInput = new EmailsInput(el);

const el1: HTMLElement = document.querySelector('#emails-input-1');
const options: Options ={
  delimiter:";",
  headerLabel:"Try entering ; as delimiter",
  placeHolderText:"custom placeholder..",
  addEmailsLabel: "+ email",
  countEmailsLabel: "total emails?",
}
var emailsInput1 = new EmailsInput(el1, options);


