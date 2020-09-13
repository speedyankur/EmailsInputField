# Emails input field
This is emails input field, for validating and inputing email addresses in bulk. Try CTRL+C and CTRL+V, it will automatically format and valid the emails from your clipboard

## Usage
`import {EmailsInput, Options} from './EmailsInput';`

`const el: HTMLElement = document.querySelector('#emails-input-default');`

`let defaultsEmailsInput = new EmailsInput(el, ...);`

## Options
1. delimiter:string [default = ","]
1. headerLabel:string [default = "Share Board name with others"]
1. placeHolderText: string [default = "add emails.."]
1. addEmailsLabel: string [default = "Add email"]
1. countEmailsLabel: string [default = "Get emails count"]

## DEMO
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/emails-input-field)