export type TransDB = { [key: string]: { en: string; ar: string } }

export const TRANSLATIONS = {
  extensionName: {
    en: "The wall - Boycott assistant",
    ar: "الجدار - مساعد المقاطعة"
  },
  extensionDescription: {
    en: `Put more than 17,000 Boycott-worthy companies behind a wall 🚫`,
    ar: `ضع اكثر من 17 الف شركة للكيان الصهيوني خلف جدار عازل 🚫`
  },
  headerTitle: {
    en: "The wall 🇵🇸",
    ar: "الجدار 🇵🇸"
  },
  reasonUrlIL: {
    en: "This Url ends with .il, This means it's an Israeli website!",
    ar: "هذا الموقع من الكيان الصهيوني لأنه ينتهي ب .il"
  },
  reasonFounder: {
    en: "One or more founders/investors of $1 are connected to Israel",
    ar: "تنبيه: أحد المستثمرين او المؤسسين ل $1 من الكيان الصهيوني"
  },
  reasonHeadquarter: {
    en: "$1 headquarters is in Israel",
    ar: "المقر الرئيسي ل$1 يقع في الكيان الصهيوني"
  },
  reasonBDS: {
    en: "$1 is listed on the BDS Boycott list",
    ar: "$1 BDS مدرج في قائمة المقاطعة "
  },
  modalShareMobileImage: {
    en: "Share image",
    ar: "أنشر صورة"
  },
  modalShareButton: {
    en: "Share",
    ar: "أنشر"
  },
  buttomBarButtonReport: {
    en: "Report mistake!",
    ar: "أبلغ عن مشكلة"
  },
  modalDismissSession: {
    en: "Allow this time",
    ar: "سماح مرة"
  },
  sharingMessageText: {
    en: 'I detected an Israeli website using "the wall" browser addon. Try it!',
    ar: 'لقد تجنبت موقع للكيان الصهيوني بإستخدام أضافة "الجدار". جربه الأن!'
  }
} satisfies TransDB
