export const freeProviderDomains: string[] = [
  // Google
  "gmail.com",
  "googlemail.com",
  // Yahoo
  "yahoo.com",
  "yahoo.co.uk",
  "ymail.com",
  "rocketmail.com",
  // Microsoft
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  // Apple
  "icloud.com",
  "me.com",
  "mac.com",
  // AOL / Verizon
  "aol.com",
  "aim.com",
  "verizon.net",
  // Privacy-focused
  "protonmail.com",
  "protonmail.ch",
  "proton.me",
  "pm.me",
  "tutanota.com",
  "tuta.io",
  "hushmail.com",
  "mailfence.com",
  "posteo.de",
  "duck.com",
  // GMX / United Internet
  "gmx.com",
  "gmx.net",
  "gmx.de",
  "web.de",
  "mail.com",
  "email.com",
  "usa.com",
  // Yandex / Mail.ru
  "yandex.com",
  "yandex.ru",
  "ya.ru",
  "mail.ru",
  "inbox.ru",
  "list.ru",
  "bk.ru",
  // Zoho / Fastmail / others
  "zoho.com",
  "zohomail.com",
  "fastmail.com",
  "hey.com",
  "orkut.com",
  // Asia
  "qq.com",
  "163.com",
  "126.com",
  "sina.com",
  "rediffmail.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
  "yahoo.co.jp",
  // Europe
  "libero.it",
  "virgilio.it",
  "laposte.net",
  "orange.fr",
  "free.fr",
  "sfr.fr",
  "wanadoo.fr",
  "t-online.de",
  "freenet.de",
  "seznam.cz",
  "wp.pl",
  "o2.pl",
  "interia.pl",
  "onet.pl",
  "btinternet.com",
  "sky.com",
  // Americas / Oceania ISPs
  "att.net",
  "comcast.net",
  "sbcglobal.net",
  "bellsouth.net",
  "cox.net",
  "charter.net",
  "earthlink.net",
  "shaw.ca",
  "rogers.com",
  "sympatico.ca",
  "bigpond.com",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br"
];

/**
 * Country-specific variants of major providers (e.g. yahoo.fr, hotmail.co.uk,
 * outlook.in, gmx.at). Only applied to domains that are also in the main
 * public-provider list, so arbitrary look-alike domains are not matched.
 */
export const freeProviderPattern =
  /^(yahoo|ymail|hotmail|outlook|live|msn|gmx|yandex|aol|icloud|protonmail|zoho|rediffmail)\.(?:(?:co|com|net|org)\.)?[a-z]{2,3}$/;
