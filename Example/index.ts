
// Use the locally built library with import syntax so the latest features are available.
// Run from project root:
//   npm run build
//   npx ts-node Example/index.ts
import { isBusinessMail, analyzeEmail, type EmailAnalysis } from "@myselfraj/is-business-mail";

// Legacy boolean API
console.log("isBusinessMail(grapdevs.com):", isBusinessMail("test@grapdevs.com"));

// New rich analysis API
const samples = ["updates@gmail.com", "falak@grapdevs.com"];

for (const email of samples) {
  const res: EmailAnalysis = analyzeEmail(email, {
    additionalRoleLocalParts: ["devops", "noreply"]
  });
  console.log(email, {
    isBusiness: res.isBusiness,
    isDisposable: res.isDisposable,
    isRoleAccount: res.isRoleAccount,
    isFreeProvider: res.isFreeProvider,
    domain: res.domain,
    tld: res.tld,
  });
}
