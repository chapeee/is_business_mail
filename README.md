## Is Business E-mail?

Checks if an email is a business email from a list of 15,000 emails.

Our package is quite simple: it has a list of more than 15,000 email providers list that are used by the public. When you give us an email, we just look if it's in our list. If it is in the list, that means it's a regular public email(eg. gmail.com, yahoo.com, outlook.com, and etc) not a business one. For example, if you give us "xyz@gmail.com", it's not a business email. It's just normal check. It's not email Auth or SMTP verification tool. 

## What is Public Email? 

> Public email are mail account that are not connected or acociated with company for example any email email account that is end with gmail. com or yahoo Or with public email providers

### Example Of Public Email

1. xyz@gmail.com
2. xyz@yahoo.com
3. abc@outlook.com

## What is Business Email? 

Email account accociated with business domains

1. name@grapdevs.com
2. abc@somecompany.com

## Setup

```bash
npm i @myselfraj/is-business-mail
```

## Usage

```bash
import {isBusinessMail } from '@myselfraj/is-business-mail'
console.log(isBusinessMail('test@myselfraj.com')) //returns => true  (it is business mail)
console.log(isBusinessMail('test@gmail.com')) //returns => false  (not business mail)
```

## Method

isBusinessMail() =>  Accept email of string type and return boolean

## Authors

- [@chapeee](https://github.com/chapeee/)

## Connect with me

[LinkedIn](https://www.linkedin.com/in/myselfraj/)
