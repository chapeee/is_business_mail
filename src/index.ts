import { listofEmails } from "./Utils/Email";
import extractDomain from "./Utils/AddressParser";
export { analyzeEmail } from "./analyzeEmail";
export type { EmailAnalysis, AnalyzeOptions } from "./types";

export function isBusinessMail(email: string) {
  const domain = extractDomain(email);
  return !listofEmails.includes(domain);
}
