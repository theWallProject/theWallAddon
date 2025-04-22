export type TransDB = {
  [key: string]: {
    en: string
    ar: string
    fr: String
    zh_CN: string
    zh_TW: string
  }
}

/*
 * some of the Chinese translation did not use direct translation
 * but chose the method of meaning translation for translation
 * so I posted the English translation after the Chinese translation
 *
 * author: @passby6someone
 */

export const TRANSLATIONS = {
  extensionName: {
    en: "The wall - Boycott assistant",
    ar: "الجدار - مساعد المقاطعة",
    fr: "The wall - Assistant de boycott",
    zh_CN: "赛博锡安之壁 - 极端复国主义抵制助手", // The Wall of Cyber Zion - Assistant to the Resistance Against Extreme Zionism
    zh_TW: "賽博錫安之墻 - 極端復國主義抵製助手" // The Wall of Cyber Zion - Assistant to the Resistance Against Extreme Zionism`
  },
  extensionDescription: {
    en: `Put more than 19,000 Boycott-worthy companies behind a wall 🧱`,
    ar: `ضع اكثر من 19 الف شركة للكيان الصهيوني خلف جدار عازل 🧱`,
    fr: "Mettre derrière un mur plus de 19 000 entreprises méritant d'être boycottées 🧱",
    zh_CN: `协助你在赛博空间中通过 拒绝访问 的方式抵制超 19，000 家支持极端复国主义实体企业 🧱`, // Assist you in resisting over 19000 entities that support extreme Zionism in cyberspace by refusing access
    zh_TW: `協助你在賽博空間中通過 拒絕訪問 的方式抵制超 19,000 家支持極端復國主義實體企業 🧱` // Assist you in resisting over 19000 entities that support extreme Zion
  },
  reasonUrlIL: {
    en: "This Url ends with .il, This means it's an Israeli website!",
    ar: "هذا الموقع من الكيان الصهيوني لأنه ينتهي بـ .il",
    fr: "Cette URL se termine par .il, ce qui signifie qu'il s'agit d'un site web israélien !",
    zh_CN: "这个网址以.il结尾，这意味着这是一个以色列网站！",
    zh_TW: "這個網址以.il結尾，這意味著這是一個以色列網站！"
  },
  reasonFounder: {
    en: "One or more founders/investors of $1 are connected to Israel!",
    ar: "تنبيه: أحد المستثمرين أو المؤسسين لـ $1 من الكيان الصهيوني",
    fr: "Un ou plusieurs fondateurs/investisseurs de $1 sont liés à Israël !",
    zh_CN: "一个或多个$1的创始人/投资者与以色列有关！",
    zh_TW: "一個或多個$1的創始人/投資者與以色列有關！"
  },
  reasonHeadquarter: {
    en: "$1 headquarters is in Israel.",
    ar: "المقر الرئيسي لـ $1 يقع في الكيان الصهيوني.",
    fr: "Le siège de $1 se trouve en Israël.",
    zh_CN: "$1总部位于以色列！",
    zh_TW: "$1總部位於以色列！"
  },
  reasonBDS: {
    en: "$1 is listed on the BDS Boycott list",
    ar: "تنبيه: $1 مدرج في قائمة المقاطعة الخاصة بحركة BDS",
    fr: "$1 figure sur la liste du boycott BDS",
    zh_CN: "$1被列入BDS抵制名单",
    zh_TW: "$1被列入BDS抵制名單"
  },
  modalShareMobileImage: {
    en: "Share image",
    ar: "أنشر صورة",
    fr: "Partager l'image",
    zh_CN: "分享图片",
    zh_TW: "分享圖片"
  },
  modalShareButton: {
    en: "Share",
    ar: "انشر",
    fr: "Partager",
    zh_CN: "分享",
    zh_TW: "分享"
  },
  buttomBarButtonReport: {
    en: "Report mistake",
    ar: "أبلغ عن مشكلة",
    fr: "Signaler une erreur",
    zh_CN: "报告错误",
    zh_TW: "報告錯誤"
  },
  modalDismissSession: {
    en: "Allow for a month",
    ar: "السماح لمدة شهر",
    fr: "Prévoir un mois",
    zh_CN: "允许一个月",
    zh_TW: "允许一个月"
  },
  modalSupportPalestine: {
    en: "Support Palestine",
    ar: "إدعم فلسطين",
    fr: "Soutenir la Palestine",
    zh_CN: "支持巴勒斯坦",
    zh_TW: "支持巴勒斯坦"
  },
  sharingMessageText: {
    en: 'I avoided an Israeli website by using "The Wall - Boycott assistant" browser addon. Try it!',
    ar: 'لقد تجنبت موقعًا تابعًا للكيان الصهيوني باستخدام إضافة "الجدار". جرّبه الآن!',
    fr: "J'ai évité un site web israélien en utilisant le module complémentaire de navigateur « The Wall - Boycott assistant ». Essayez-le!",
    zh_CN:
      "我通过使用“赛博锡安之壁 - 极端复国主义抵制助手”浏览器插件避免了一个以色列网站。试试看！",
    zh_TW:
      "我通過使用“賽博錫安之墻 - 極端復國主義抵製助手”瀏覽器插件避免了一個以色列網站。試試看！"
  }
} satisfies TransDB
