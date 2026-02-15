export type EmailAnalysis = {
    input: string;
    valid: boolean;
    local: string;
    domain: string;
    rootDomain: string;
    tld: string;
    isBusiness: boolean;
    isDisposable: boolean;
    isRoleAccount: boolean;
    isFreeProvider: boolean;
};
export type AnalyzeOptions = {
    additionalRoleLocalParts?: string[];
};
