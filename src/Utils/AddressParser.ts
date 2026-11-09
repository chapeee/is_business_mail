export type ParsedEmail = {
  input: string;
  valid: boolean;
  local: string;
  domain: string;
};

// A DNS label: letters/digits (incl. Unicode for IDNs), hyphens allowed inside but not at the ends.
const LABEL = /^[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?$/u;
// TLD: at least two letters, or a punycode TLD (xn--...).
const TLD = /^(?:\p{L}{2,63}|xn--[a-z0-9-]{1,59})$/u;

/** Lowercase, trim and strip a single trailing dot from a domain. */
export function normalizeDomain(domain: string): string {
  return domain.trim().toLowerCase().replace(/\.$/, "");
}

function isValidLocal(local: string): boolean {
  return local.length > 0 && local.length <= 64 && !/[\s@]/.test(local);
}

function isValidDomain(domain: string): boolean {
  if (domain.length === 0 || domain.length > 253) return false;
  const labels = domain.split(".");
  if (labels.length < 2) return false;
  if (!labels.every((l) => LABEL.test(l))) return false;
  return TLD.test(labels[labels.length - 1]);
}

/**
 * Parse an email address into its parts. Never throws: non-string input,
 * empty strings and malformed addresses return `valid: false`.
 */
export function parseEmail(email: unknown): ParsedEmail {
  const input = typeof email === "string" ? email.trim() : email == null ? "" : String(email).trim();
  const atIdx = input.lastIndexOf("@");
  if (atIdx <= 0 || atIdx === input.length - 1) {
    return { input, valid: false, local: "", domain: "" };
  }
  const local = input.slice(0, atIdx);
  const domain = normalizeDomain(input.slice(atIdx + 1));
  const valid = isValidLocal(local) && isValidDomain(domain);
  return { input, valid, local: valid ? local : "", domain: valid ? domain : "" };
}

/** @deprecated Use parseEmail(). Kept for backwards compatibility. */
function extractDomain(email: string): string {
  return normalizeDomain(String(email ?? "").replace(/.*@/, ""));
}

export default extractDomain;
