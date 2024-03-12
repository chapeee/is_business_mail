## Is Business E-mail?

Checks if an email is a business email from a list of 15,000 emails.

Our package is quite simple: it has a list of more than 15,000 email addresses that are used by the public. When you give us an email, we just look if it's in our list. If it is in the list, that means it's a regular public email, not a business one. For example, if you give us "xyz@gmail.com", it's not a business email. It's just normal check. It's not email Auth or SMTP verification tool

## Setup

``` bash
npm i @myselfraj/is-business-mail
```

## Usage

``` bash
const {isBusinessMail } = require('@myselfraj/is-business-mail')
console.log(isBusinessMail('test@grapdevs.com')) //returns boolean (true)

 ----------------------or -----------------------

 import {isBusinessMail } from '@myselfraj/is-business-mail'
 console.log(isBusinessMail('test@myselfraj.com')) //returns boolean (true)
```



## Authors

- [@chapeee](https://github.com/chapeee/)


## Connect with me
[LinkedIn](https://www.linkedin.com/in/myselfraj/)