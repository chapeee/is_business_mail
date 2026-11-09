/**
 * Common multi-label public suffixes. Used so that rootDomain for
 * "mail.example.co.uk" is "example.co.uk" (not "co.uk").
 * This is intentionally a small, dependency-free subset of the Public Suffix List.
 */
export const multiPartSuffixes: string[] = [
  "co.uk", "org.uk", "me.uk", "ltd.uk", "plc.uk", "net.uk", "ac.uk", "gov.uk", "sch.uk", "nhs.uk",
  "com.au", "net.au", "org.au", "edu.au", "gov.au", "id.au",
  "co.nz", "net.nz", "org.nz", "ac.nz", "govt.nz",
  "co.in", "net.in", "org.in", "firm.in", "gen.in", "ind.in", "ac.in", "edu.in", "gov.in", "res.in",
  "co.jp", "ne.jp", "or.jp", "ac.jp", "go.jp",
  "co.kr", "or.kr", "ac.kr", "go.kr",
  "com.br", "net.br", "org.br", "gov.br",
  "com.cn", "net.cn", "org.cn", "edu.cn", "gov.cn",
  "com.hk", "org.hk", "edu.hk",
  "com.tw", "org.tw", "edu.tw",
  "com.sg", "edu.sg", "gov.sg",
  "com.my", "edu.my",
  "com.mx", "org.mx", "gob.mx",
  "com.ar", "com.co", "com.pe", "com.ve", "com.ec",
  "com.tr", "org.tr", "edu.tr",
  "com.sa", "com.eg", "com.pk", "com.bd", "com.ng", "com.ph", "com.vn", "com.ua",
  "co.za", "org.za", "ac.za", "gov.za",
  "co.id", "or.id", "ac.id",
  "co.il", "org.il", "ac.il",
  "co.th", "ac.th", "in.th"
];
