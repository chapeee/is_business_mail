import { listofEmails } from "./Utils/Email";
import extractDomain from "./Utils/AddressParser";

export function isBusinessMail(email: string) {
  const domain = extractDomain(email);
  return !listofEmails.includes(domain);
}
