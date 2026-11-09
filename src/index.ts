import { analyzeEmail } from "./analyzeEmail";
export { analyzeEmail };
export type { EmailAnalysis, AnalyzeOptions } from "./types";

/**
 * Returns true when the address is syntactically valid and its domain is not a
 * known public, free or disposable email provider. Case-insensitive; never throws.
 */
export function isBusinessMail(email: string): boolean {
  return analyzeEmail(email).isBusiness;
}
