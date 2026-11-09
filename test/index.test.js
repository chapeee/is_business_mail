// Run: npm run build && npm test
const test = require("node:test");
const assert = require("node:assert/strict");
const { isBusinessMail, analyzeEmail } = require("../dist/is-business-mail.js");

test("isBusinessMail: basic public vs business", () => {
  assert.equal(isBusinessMail("test@gmail.com"), false);
  assert.equal(isBusinessMail("test@orkut.com"), false);
  assert.equal(isBusinessMail("name@grapdevs.com"), true);
});

test("isBusinessMail: is case-insensitive", () => {
  assert.equal(isBusinessMail("Test@GMAIL.COM"), false);
  assert.equal(isBusinessMail("test@Yahoo.com"), false);
});

test("isBusinessMail: trims surrounding whitespace", () => {
  assert.equal(isBusinessMail("  test@gmail.com  "), false);
});

test("isBusinessMail: trailing dot in domain does not bypass the list", () => {
  assert.equal(isBusinessMail("test@gmail.com."), false);
});

test("isBusinessMail: invalid input is not a business email", () => {
  assert.equal(isBusinessMail("notanemail"), false);
  assert.equal(isBusinessMail(""), false);
  assert.equal(isBusinessMail("user@"), false);
  assert.equal(isBusinessMail("@company.com"), false);
});

test("isBusinessMail: non-string input does not throw", () => {
  assert.doesNotThrow(() => isBusinessMail(null));
  assert.doesNotThrow(() => isBusinessMail(undefined));
  assert.equal(isBusinessMail(null), false);
});

test("analyzeEmail: README example", () => {
  assert.deepEqual(analyzeEmail("updates@gmail.com"), {
    input: "updates@gmail.com", valid: true, local: "updates",
    domain: "gmail.com", rootDomain: "gmail.com", tld: "com",
    isBusiness: false, isDisposable: false, isRoleAccount: true, isFreeProvider: true,
  });
});

test("analyzeEmail: well-known free providers are not flagged disposable", () => {
  for (const d of ["yahoo.fr", "hotmail.co.uk", "gmx.de", "rediffmail.com", "googlemail.com", "yahoo.co.in", "web.de", "mail.ru"]) {
    const r = analyzeEmail(`john@${d}`);
    assert.equal(r.isDisposable, false, `${d} isDisposable`);
    assert.equal(r.isFreeProvider, true, `${d} isFreeProvider`);
  }
});

test("analyzeEmail: known disposable domains are flagged", () => {
  assert.equal(analyzeEmail("x@mailinator.com").isDisposable, true);
  assert.equal(analyzeEmail("x@yopmail.com").isDisposable, true);
});

test("analyzeEmail: rootDomain handles multi-part public suffixes", () => {
  assert.equal(analyzeEmail("a@mail.example.co.uk").rootDomain, "example.co.uk");
  assert.equal(analyzeEmail("a@shop.example.com.au").rootDomain, "example.com.au");
  assert.equal(analyzeEmail("a@hotmail.co.uk").rootDomain, "hotmail.co.uk");
  assert.equal(analyzeEmail("a@sub.example.com").rootDomain, "example.com");
});

test("analyzeEmail: rejects obviously malformed addresses", () => {
  for (const e of ["a@b", "a b@c.com", "a@exa mple.com", "a@.com", "a@com.", "a@@b.com", "a@-x.com"]) {
    assert.equal(analyzeEmail(e).valid, false, e);
    assert.equal(analyzeEmail(e).isBusiness, false, e);
  }
});

test("analyzeEmail: role matching normalizes built-in list entries too", () => {
  assert.equal(analyzeEmail("Dev-Ops+alerts@yourco.com", { additionalRoleLocalParts: ["devops"] }).isRoleAccount, true);
  assert.equal(analyzeEmail("co-founder@yourco.com").isRoleAccount, true);
  assert.equal(analyzeEmail("john.smith@yourco.com").isRoleAccount, false);
});

test("analyzeEmail: non-string input does not throw", () => {
  assert.doesNotThrow(() => analyzeEmail(undefined));
  assert.equal(analyzeEmail(undefined).valid, false);
});

test("performance: 100k lookups under 1s", () => {
  const t = Date.now();
  for (let i = 0; i < 100000; i++) isBusinessMail(`u${i}@company${i}.com`);
  assert.ok(Date.now() - t < 1000, `took ${Date.now() - t}ms`);
});

test("disposable domains are never business, even if missing from the main list", () => {
  assert.equal(analyzeEmail("x@tempmail.com").isBusiness, false);
  assert.equal(isBusinessMail("x@tempmail.com"), false);
});

test("legitimate business domains stay business", () => {
  for (const e of ["ceo@stripe.com", "a@mail.example.co.uk", "x@müller.de", "jane@my-company.io"]) {
    assert.equal(isBusinessMail(e), true, e);
  }
});

test("common role mailboxes are detected (README examples)", () => {
  for (const l of ["support", "Info", "sales", "admin", "contact", "no-reply", "noreply", "billing", "hr", "updates", "ceo"]) {
    assert.equal(analyzeEmail(`${l}@yourco.com`).isRoleAccount, true, l);
  }
});
