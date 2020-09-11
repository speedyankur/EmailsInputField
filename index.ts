// Import stylesheets
import './style.css';
import {EmailsInput, Options} from './EmailsInput';

const el: HTMLElement = document.querySelector('#emails-input');
const el1: HTMLElement = document.querySelector('#emails-input1');

const options: Options ={
  delimiter:",",
  headerLabel:"Share Board name with others",
  placeHolderText:"add emails.."
}

var emailsInput = new EmailsInput(el, options);

var emailsInput = new EmailsInput(el1, options);
