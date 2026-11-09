import { parseEmail } from "./Utils/AddressParser";
import {
  getRootDomain,
  getTld,
  isDisposableDomain,
  isFreeProvider,
  isPublicProvider,
  isRole
} from "./Utils/Lookup";
import type { EmailAnalysis, AnalyzeOptions } from "./types";

export function analyzeEmail(email: string, options?: AnalyzeOptions): EmailAnalysis {
  const { input, valid, local, domain } = parseEmail(email);
  if (!valid) {
    return {
      input,
      valid: false,
      local: "",
      domain: "",
      rootDomain: "",
      tld: "",
      isBusiness: false,
      isDisposable: false,
      isRoleAccount: false,
      isFreeProvider: false
    };
  }
  const free = isFreeProvider(domain);
  const disposable = isDisposableDomain(domain);
  return {
    input,
    valid: true,
    local,
    domain,
    rootDomain: getRootDomain(domain),
    tld: getTld(domain),
    isBusiness: !isPublicProvider(domain) && !free && !disposable,
    isDisposable: disposable,
    isRoleAccount: isRole(local, options?.additionalRoleLocalParts),
    isFreeProvider: free
  };
}
