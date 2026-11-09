## Is Business E-mail?

[![npm](https://img.shields.io/npm/v/@myselfraj/is-business-mail.svg)](https://www.npmjs.com/package/@myselfraj/is-business-mail)

Checks if an email is a business email against a list of 16,000+ public, free and disposable email providers.

The idea is simple: we keep a list of more than 16,000 email domains used by the public (gmail.com, yahoo.com, outlook.com, orkut.com, temp-mail services and so on). Give us an email and we check its domain against that list. If it's on the list, it's a public email (e.g. `xyz@gmail.com`), not a business one.

It's a fast, offline check. It is **not** an SMTP or mailbox verification tool and makes no network requests.

### Features

- **Zero runtime dependencies**, works offline, fully typed (TypeScript)
- **Fast**: constant-time lookups (well over 100,000 checks per second)
- **Forgiving input**: case-insensitive, ignores surrounding spaces and a trailing dot (`Test@GMAIL.com.`), never throws (`null`/`undefined` just return `false`)
- **Address validation**: rejects malformed input such as `a@b`, `a b@c.com` or `a@@b.com`
- **Rich analysis** with `analyzeEmail()`:
  - **Free provider** detection, including country domains (`yahoo.fr`, `hotmail.co.uk`, `gmx.de`, `outlook.in`, …)
  - **Disposable / temporary** domain detection (`mailinator.com`, `yopmail.com`, `tempmail.com`, …)
  - **Role account** detection (`support@`, `info@`, `sales@`, `noreply@`, `ceo@`, …), extendable per call
  - **Root domain** that understands country endings: `mail.example.co.uk` gives `example.co.uk`

## What is Public Email?

> A public email is an account not connected with a company: any address ending in gmail.com, yahoo.com or another public provider (gmail.com, outlook, orkut, etc. 16k+).

#### Example of public email

1. xyz@gmail.com
2. xyz@yahoo.com
3. abc@outlook.com

## What is Business Email?

> An email account on a business's own domain, e.g. grapdevs.com, somecompany.com, xyzcompany.in.

#### Example of business email

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
console.log(isBusinessMail('Test@GMAIL.com'));       // false (case-insensitive)
console.log(isBusinessMail('abc@orkut.com'));        // false (public provider)
console.log(isBusinessMail('x@mailinator.com'));     // false (disposable)
console.log(isBusinessMail('not-an-email'));         // false (invalid)
```

`isBusinessMail` returns `true` only when the address is valid **and** its domain is not a public, free or disposable provider.

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

More examples:

```ts
analyzeEmail('Support@Hotmail.co.uk');
// { domain: 'hotmail.co.uk', rootDomain: 'hotmail.co.uk', isFreeProvider: true,
//   isRoleAccount: true, isBusiness: false, isDisposable: false, ... }

analyzeEmail('jane@mail.acme.co.uk');
// { domain: 'mail.acme.co.uk', rootDomain: 'acme.co.uk', tld: 'uk',
//   isBusiness: true, isRoleAccount: false, ... }

analyzeEmail('x@mailinator.com');
// { isDisposable: true, isBusiness: false, isFreeProvider: false, ... }

analyzeEmail('a@b');
// { valid: false, isBusiness: false, local: '', domain: '', ... }
```

Fields returned by `analyzeEmail`:

| Field | Description |
|---|---|
| `input` | The input string, trimmed |
| `valid` | `true` if it looks like `local@domain.tld` (no spaces, a single `@`, valid domain labels and TLD) |
| `local` | Part before the `@` (empty if invalid) |
| `domain` | Domain, lowercased, trailing dot removed (empty if invalid) |
| `rootDomain` | Registrable domain, e.g. `example.com`, `example.co.uk` |
| `tld` | Top-level domain, e.g. `com`, `uk` |
| `isBusiness` | `true` if valid and not a public, free or disposable provider |
| `isDisposable` | `true` if the domain is a disposable / temporary mail service |
| `isRoleAccount` | `true` if the local part is a shared/role mailbox (e.g. `support`, `info`, `sales`, `noreply`, `ceo`) |
| `isFreeProvider` | `true` if the domain is a well-known free provider (e.g. `gmail.com`, `yahoo.fr`) |

Invalid input never throws; you get `valid: false` with every flag set to `false`.

### Custom Role Accounts (optional)

You can extend the built-in role list per call:

```ts
import { analyzeEmail } from '@myselfraj/is-business-mail';

const res = analyzeEmail('devops@yourco.com', {
  additionalRoleLocalParts: ['devops']
});
console.log(res.isRoleAccount); // true
```

Role matching normalization:
- strips anything after "+" in the local part
- removes dots, hyphens, and underscores
- lowercases before comparison

So "Dev-Ops+alerts@yourco.com" matches "devops", and "No-Reply@…" matches "noreply".

### Node CommonJS

```js
const { isBusinessMail, analyzeEmail } = require('@myselfraj/is-business-mail');
console.log(isBusinessMail('name@company.com')); // true
```

## API

**`isBusinessMail(email: string): boolean`**
Returns `true` for a valid address on a non-public, non-free, non-disposable domain. Case-insensitive, ignores surrounding whitespace, never throws.

**`analyzeEmail(email: string, options?: AnalyzeOptions): EmailAnalysis`**
Returns the detailed object described above.
- `options.additionalRoleLocalParts?: string[]` adds extra role names for this call

Types `EmailAnalysis` and `AnalyzeOptions` are exported.

## Development

```bash
npm install
npm test   # builds and runs the test suite
```

## Authors

- [@chapeee](https://github.com/chapeee/)

## Connect with me

[LinkedIn](https://www.linkedin.com/in/myselfraj/)
