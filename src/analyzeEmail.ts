import extractDomain from "./Utils/AddressParser";
import { listofEmails } from "./Utils/Email";
import { roleLocalParts } from "./Utils/RoleAccounts";
import { freeProviderDomains } from "./Utils/CommonFreeProviders";
import { disposableDomains } from "./Utils/DisposableCore";
import type { EmailAnalysis, AnalyzeOptions } from "./types";

function normalizeLocal(local: string): string {
  const base = local.split("+", 1)[0];
  return base.replace(/[.\-_]/g, "");
}

function getTld(domain: string): string {
  const parts = domain.split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

function getRootDomain(domain: string): string {
  const parts = domain.split(".");
  if (parts.length <= 2) return domain;
  const last = parts[parts.length - 1];
  const secondLast = parts[parts.length - 2];
  return `${secondLast}.${last}`;
}

function isRole(local: string, extras?: string[]): boolean {
  const norm = normalizeLocal(local).toLowerCase();
  const extraSet = new Set<string>(
    (extras || []).map((s) => normalizeLocal(s).toLowerCase())
  );
  if (extraSet.has(norm)) return true;
  return roleLocalParts.includes(norm);
}

function isFreeProvider(domain: string): boolean {
  return freeProviderDomains.includes(domain);
}

function isDisposableDomain(domain: string): boolean {
  if (disposableDomains.includes(domain)) return true;
  if (listofEmails.includes(domain) && !isFreeProvider(domain)) return true;
  return false;
}

export function analyzeEmail(email: string, options?: AnalyzeOptions): EmailAnalysis {
  const input = String(email || "").trim();
  const atIdx = input.lastIndexOf("@");
  const valid = atIdx > 0 && atIdx < input.length - 1;
  const local = valid ? input.slice(0, atIdx) : "";
  const domain = valid ? extractDomain(input).toLowerCase() : "";
  const tld = domain ? getTld(domain) : "";
  const rootDomain = domain ? getRootDomain(domain) : "";
  const isCommonProvider = domain ? listofEmails.includes(domain) : false;
  const role = valid ? isRole(local, options?.additionalRoleLocalParts) : false;
  const free = domain ? isFreeProvider(domain) : false;
  const disposable = domain ? isDisposableDomain(domain) : false;
  const isBusiness = Boolean(valid && domain && !isCommonProvider);
  return {
    input,
    valid,
    local,
    domain,
    rootDomain,
    tld,
    isBusiness,
    isDisposable: disposable,
    isRoleAccount: role,
    isFreeProvider: free
  };
}
