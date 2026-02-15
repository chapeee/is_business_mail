## Is Business E-mail?

Checks if an email is a business email from a list of 15,000 emails.

Our package is quite simple: it has a list of more than 15,000 email providers list that are used by the public. When you give us an email, we just look if it's in our list. If it is in the list, that means it's a regular public email(eg. gmail.com, yahoo.com, outlook.com, and etc 15k+) not a business one. For example, if you give us "xyz@gmail.com", it's not a business email. It's just normal check. It's not email Auth or SMTP verification tool. 

## What is Public Email? 

> Public email are mail account that are not connected or acociated with company for example any email account that is end with gmail. com or yahoo Or with public email providers (gmail.com, outlook, orkut, and etc...15k+). 

#### Example Of Public Email

1. xyz@gmail.com
2. xyz@yahoo.com
3. abc@outlook.com

## What is Business Email? 

> Email account accociated with business domains eg. grapdevs.com ,somecompany.com,xyzcompany.in and etc...

#### Example Of business Email


1. name@grapdevs.com
2. abc@somecompany.com
3. sales@xyzcompany.in

## Setup

```bash
npm i @myselfraj/is-business-mail
```

## Usage

### Quick Start (boolean)

```ts
import { isBusinessMail } from '@myselfraj/is-business-mail';

console.log(isBusinessMail('test@myselfraj.com'));   // true  (business mail)
console.log(isBusinessMail('test@somebusines.com')); // true  (business mail)
console.log(isBusinessMail('test@gmail.com'));       // false (public provider)
console.log(isBusinessMail('test@orkut.com'));       // false (public provider)
console.log(isBusinessMail('abc@orkut.com'));        // false (public provider)
```

### Rich Analysis (detailed)

```ts
import { analyzeEmail, type EmailAnalysis } from '@myselfraj/is-business-mail';

const res: EmailAnalysis = analyzeEmail('updates@gmail.com');
console.log(res);
/*
{
  input: 'updates@gmail.com',
  valid: true,
  local: 'updates',
  domain: 'gmail.com',
  rootDomain: 'gmail.com',
  tld: 'com',
  isBusiness: false,
  isDisposable: false,
  isRoleAccount: true,
  isFreeProvider: true
}
*/
```

Fields returned by analyzeEmail:
- input: normalized input string
- valid: basic format check for local@domain
- local: local part of the address
- domain: extracted domain
- rootDomain: second‑level + TLD (e.g., example.com)
- tld: top‑level domain (e.g., com)
- isBusiness: true if not in our public email provider list
- isDisposable: true if domain looks disposable/temporary
- isRoleAccount: true if local looks like a role (e.g., support, updates, ceo)
- isFreeProvider: true if domain is a common free provider (e.g., gmail.com)

### Custom Role Accounts (optional)

You can extend the built‑in role list per call:

```ts
import { analyzeEmail } from '@myselfraj/is-business-mail';

const res = analyzeEmail('devops@yourco.com', {
  additionalRoleLocalParts: ['devops', 'noreply']
});
console.log(res.isRoleAccount); // true
```

Role matching normalization:
- strips anything after “+” in the local part
- removes dots, hyphens, and underscores
- lowercases before comparison

So “Dev-Ops+alerts@yourco.com” matches “devops”.

### Node CommonJS

```js
const { isBusinessMail, analyzeEmail } = require('@myselfraj/is-business-mail');
console.log(isBusinessMail('name@company.com'));
```

## Method

isBusinessMail() =>  Accept email of string type and return boolean

analyzeEmail(email, options?) =>  Returns a rich object with detailed flags  
- options.additionalRoleLocalParts?: string[]

## Authors

- [@chapeee](https://github.com/chapeee/)

## Connect with me

[LinkedIn](https://www.linkedin.com/in/myselfraj/)
