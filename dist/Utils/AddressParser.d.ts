export type ParsedEmail = {
    input: string;
    valid: boolean;
    local: string;
    domain: string;
};
/** Lowercase, trim and strip a single trailing dot from a domain. */
export declare function normalizeDomain(domain: string): string;
/**
 * Parse an email address into its parts. Never throws: non-string input,
 * empty strings and malformed addresses return `valid: false`.
 */
export declare function parseEmail(email: unknown): ParsedEmail;
/** @deprecated Use parseEmail(). Kept for backwards compatibility. */
declare function extractDomain(email: string): string;
export default extractDomain;
