import { listofEmails } from "./Email";
import { freeProviderDomains, freeProviderPattern } from "./CommonFreeProviders";
import { disposableDomains } from "./DisposableCore";
import { roleLocalParts } from "./RoleAccounts";
import { multiPartSuffixes } from "./PublicSuffixes";
import { normalizeDomain } from "./AddressParser";

// Sets give O(1) lookups instead of scanning a 16k-entry array on every call.
const publicSet = new Set(listofEmails.map(normalizeDomain));
const freeSet = new Set(freeProviderDomains.map(normalizeDomain));
const disposableSet = new Set(disposableDomains.map(normalizeDomain));
const suffixSet = new Set(multiPartSuffixes);

export function normalizeLocal(local: string): string {
  const base = local.split("+", 1)[0];
  return base.replace(/[.\-_]/g, "").toLowerCase();
}

const roleSet = new Set(roleLocalParts.map(normalizeLocal));

export function isPublicProvider(domain: string): boolean {
  return publicSet.has(domain);
}

export function isFreeProvider(domain: string): boolean {
  if (freeSet.has(domain)) return true;
  return publicSet.has(domain) && freeProviderPattern.test(domain);
}

export function isDisposableDomain(domain: string): boolean {
  if (disposableSet.has(domain)) return true;
  // The main list mixes free providers and throwaway domains; anything in it
  // that is not a recognised free provider is treated as disposable.
  return publicSet.has(domain) && !isFreeProvider(domain);
}

export function isRole(local: string, extras?: string[]): boolean {
  const norm = normalizeLocal(local);
  if (roleSet.has(norm)) return true;
  return (extras || []).some((s) => normalizeLocal(String(s)) === norm);
}

export function getTld(domain: string): string {
  const parts = domain.split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

export function getRootDomain(domain: string): string {
  const parts = domain.split(".");
  if (parts.length <= 2) return domain;
  const lastTwo = parts.slice(-2).join(".");
  const take = suffixSet.has(lastTwo) ? 3 : 2;
  return parts.slice(-take).join(".");
}
