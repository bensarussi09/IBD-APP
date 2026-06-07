import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

const fallbackFoodImage = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#fff5ea"/>
      <stop offset="100%" stop-color="#f1cfaa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <circle cx="600" cy="405" r="215" fill="#fffdfa" stroke="#cb8a57" stroke-width="18"/>
  <ellipse cx="600" cy="445" rx="150" ry="80" fill="#eb8b45"/>
  <circle cx="525" cy="410" r="20" fill="#82c473"/>
  <circle cx="610" cy="387" r="18" fill="#f4d46e"/>
  <circle cx="680" cy="455" r="22" fill="#dc6250"/>
  <text x="600" y="170" text-anchor="middle" font-size="58" font-family="Arial" font-weight="700" fill="#7e4b26">תמונת אוכל</text>
  <text x="600" y="715" text-anchor="middle" font-size="34" font-family="Arial" fill="#8d5b36">תמונה חלופית אוטומטית</text>
</svg>
`)}`;

const foodBank = [
  "אורז",
  "אורז לבן",
  "עוף",
  "עוף טחון",
  "בננה",
  "תפוח אדמה",
  "תפוחי אדמה",
  "ביצה",
  "ביצים",
  "גזר",
  "דלעת",
  "קישוא",
  "טוסט",
  "לחם לבן",
  "פסטה",
  "אטריות",
  "דג",
  "דג לבן",
  "הודו",
  "יוגורט",
  "גבינה",
  "גבינות",
  "חלב",
  "מוצרי חלב",
  "תפוח",
  "אגס",
  "אבוקדו",
  "קרקר",
  "קרקרים",
  "לחם",
  "מרק",
  "שיבולת שועל",
  "טחינה",
  "מלפפון",
  "עגבניה",
  "עגבניות",
  "קטניות",
  "שעועית",
  "חומוס",
  "עדשים",
  "מטוגן",
  "מטוגנים",
  "חריף",
  "חריפים",
  "סיבים",
  "ירקות חיים",
  "סלט",
  "לחם מלא",
  "ברוקולי",
  "כרובית",
  "תירס",
  "שמן",
  "קפה",
  "תה",
  "שוקולד",
  "ממתקים",
  "פירות",
  "ירקות",
  "טונה",
  "סלמון",
  "פירה",
  "דייסה",
  "בשר",
  "בקר",
  "מרק עוף",
  "לחמית",
  "צנים",
  "מלח",
  "כורכום",
  "שמן זית",
  "מים",
];

const recipeLibrary = [
  {
    name: "טוסט חם עם אבוקדו וביצה",
    ingredients: ["טוסט", "אבוקדו", "ביצה"],
    fullIngredients: ["טוסט", "אבוקדו בשל", "ביצה קשה", "מעט מלח"],
    description: "טוסט חם עם מרקם קרמי ושובע נעים לפתיחת יום טובה.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "עשיר בחלבון",
    prepTime: "10 דק'",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "דייסת שיבולת שועל חמה עם בננה",
    ingredients: ["דייסה", "שיבולת שועל", "בננה"],
    fullIngredients: ["דייסת שיבולת שועל", "בננה", "מים"],
    description: "קערה חמימה, רכה ומנחמת עם מתיקות טבעית ועדינה.",
    mealType: "בוקר",
    safeLevel: 3,
    isSoup: false,
    tag: "חם ונעים",
    prepTime: "8 דק'",
    image:
      "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "קערת יוגורט עם בננה ושיבולת שועל",
    ingredients: ["יוגורט", "בננה", "שיבולת שועל"],
    fullIngredients: ["יוגורט טבעי", "בננה", "מעט שיבולת שועל"],
    description: "קערה קרירה, רעננה ומהירה עם מרקם נעים ושובע קל.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "מהיר להכנה",
    prepTime: "5 דק'",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "טוסט גבינה חם ועדין",
    ingredients: ["טוסט", "גבינה"],
    fullIngredients: ["טוסט", "גבינה עדינה"],
    description: "קלאסיקה פשוטה, חמימה ומדויקת כשבא משהו מוכר וטוב.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "קלאסי",
    prepTime: "6 דק'",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "לחמית עם טחינה וביצה רכה",
    ingredients: ["לחמית", "טחינה", "ביצה"],
    fullIngredients: ["לחמית", "טחינה", "ביצה קשה", "מעט מלח"],
    description: "בוקר רך ומאוזן עם שילוב נעים של קרמיות ושובע.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "בוקר קל",
    prepTime: "7 דק'",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "יוגורט עם תפוח ואגס",
    ingredients: ["יוגורט", "תפוח", "אגס"],
    fullIngredients: ["יוגורט טבעי", "תפוח", "אגס"],
    description: "קערת בוקר קלילה, רעננה ומעודנת עם פירות עדינים.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "קריר",
    prepTime: "5 דק'",
    image: "",
  },
  {
    name: "שיבולת שועל עם תפוח מבושל",
    ingredients: ["שיבולת שועל", "תפוח", "דייסה"],
    fullIngredients: ["שיבולת שועל", "תפוח מבושל", "מים"],
    description: "קערה ביתית, חמה ורכה עם טעם עדין ומרגיע.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "ביתי",
    prepTime: "9 דק'",
    image: "",
  },
  {
    name: "ביצה קשה עם צנים ואבוקדו",
    ingredients: ["ביצה", "צנים", "אבוקדו"],
    fullIngredients: ["ביצה קשה", "צנים", "אבוקדו", "מעט מלח"],
    description: "בוקר מסודר עם שילוב טוב של פריכות קלה וקרמיות.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "מאוזן",
    prepTime: "8 דק'",
    image: "",
  },
  {
    name: "טוסט עם טחינה ובננה",
    ingredients: ["טוסט", "טחינה", "בננה"],
    fullIngredients: ["טוסט", "טחינה", "בננה"],
    description: "שילוב מפתיע אבל טעים, רך ונעים עם מתיקות קלה.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "עדין",
    prepTime: "6 דק'",
    image: "",
  },
  {
    name: "לחם לבן עם גבינה וביצה",
    ingredients: ["לחם לבן", "גבינה", "ביצה"],
    fullIngredients: ["לחם לבן", "גבינה עדינה", "ביצה קשה"],
    description: "בוקר קלאסי ומשביע בלי להכביד יותר מדי.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "משביע",
    prepTime: "7 דק'",
    image: "",
  },
  {
    name: "יוגורט עם בננה ואגס",
    ingredients: ["יוגורט", "בננה", "אגס"],
    fullIngredients: ["יוגורט טבעי", "בננה", "אגס"],
    description: "קערה קרירה ומתוקה בעדינות, מעולה לבוקר קליל.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "קליל",
    prepTime: "4 דק'",
    image: "",
  },
  {
    name: "דייסה חמימה עם אגס ותפוח",
    ingredients: ["דייסה", "אגס", "תפוח"],
    fullIngredients: ["דייסה", "אגס", "תפוח מבושל", "מים"],
    description: "מנה רכה וחמימה עם מתיקות טבעית עדינה.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "חם ונעים",
    prepTime: "9 דק'",
    image: "",
  },
  {
    name: "צנים עם גבינה ובננה",
    ingredients: ["צנים", "גבינה", "בננה"],
    fullIngredients: ["צנים", "גבינה עדינה", "בננה"],
    description: "שילוב פשוט, טעים ומהיר עם איזון בין מלוח למתוק.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "מהיר להכנה",
    prepTime: "5 דק'",
    image: "",
  },
  {
    name: "לחמית עם אבוקדו וביצה",
    ingredients: ["לחמית", "אבוקדו", "ביצה"],
    fullIngredients: ["לחמית", "אבוקדו", "ביצה קשה"],
    description: "לחמית רכה עם מילוי קרמי ומשביע לפתיחת יום טובה.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "מאוזן",
    prepTime: "7 דק'",
    image: "",
  },
  {
    name: "יוגורט עם שיבולת שועל ואגס",
    ingredients: ["יוגורט", "שיבולת שועל", "אגס"],
    fullIngredients: ["יוגורט טבעי", "שיבולת שועל", "אגס"],
    description: "בוקר מרענן עם מרקם נעים ותחושת קלילות.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "קריר",
    prepTime: "4 דק'",
    image: "",
  },
  {
    name: "טוסט עם גבינה ואבוקדו",
    ingredients: ["טוסט", "גבינה", "אבוקדו"],
    fullIngredients: ["טוסט", "גבינה עדינה", "אבוקדו"],
    description: "טוסט קרמי ומפנק יותר, אבל עדיין עדין ונוח.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "נעים",
    prepTime: "6 דק'",
    image: "",
  },

  {
    name: "קערת אורז עם עוף וגזר",
    ingredients: ["אורז", "עוף", "גזר"],
    fullIngredients: ["אורז לבן", "חזה עוף", "גזר מבושל", "שמן זית"],
    description: "אחת המנות הכי טובות לצהריים: מסודרת, טעימה ומאוזנת.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: false,
    tag: "מאוזן",
    prepTime: "25 דק'",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "פסטה רכה עם עוף וגזר",
    ingredients: ["פסטה", "עוף", "גזר"],
    fullIngredients: ["פסטה", "חזה עוף", "גזר מבושל", "מעט מלח"],
    description: "פסטה נעימה ורכה עם חלבון וירק בטעם ביתי ומדויק.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "מגוון",
    prepTime: "22 דק'",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "אורז עם דג לבן וגזר",
    ingredients: ["אורז", "דג", "גזר"],
    fullIngredients: ["אורז לבן", "דג לבן", "גזר מבושל", "שמן זית"],
    description: "צלחת עדינה, נקייה וטעימה עם טעמים פשוטים שעובדים טוב יחד.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "עדין",
    prepTime: "24 דק'",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "קערת אורז עם הודו וגזר",
    ingredients: ["אורז", "הודו", "גזר"],
    fullIngredients: ["אורז לבן", "הודו", "גזר מבושל", "מעט מלח"],
    description: "קערה טובה ומשביעה עם חלבון רזה וטעם עדין.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: false,
    tag: "חלבון רזה",
    prepTime: "24 דק'",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "סלט טונה עם תפוח אדמה",
    ingredients: ["טונה", "תפוח אדמה", "מלפפון"],
    fullIngredients: ["טונה", "תפוח אדמה מבושל", "מלפפון קלוף", "שמן זית"],
    description: "מנה קלילה, רעננה ומסודרת עם שובע בלי כבדות.",
    mealType: "צהריים",
    safeLevel: 1,
    isSoup: false,
    tag: "קליל",
    prepTime: "14 דק'",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "אטריות חמימות עם עוף וגזר",
    ingredients: ["אטריות", "עוף", "גזר"],
    fullIngredients: ["אטריות", "עוף מבושל", "גזר רך", "שמן זית"],
    description: "מנה ביתית, חמימה ומנחמת עם מרקם רך ונעים.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "ביתי",
    prepTime: "20 דק'",
    image:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "אורז עם סלמון אפוי וקישוא",
    ingredients: ["אורז", "סלמון", "קישוא"],
    fullIngredients: ["אורז לבן", "סלמון אפוי", "קישוא רך"],
    description: "מנה יפה יותר, עשירה יותר, ועדיין נוחה ומדויקת.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "מיוחד",
    prepTime: "24 דק'",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "דג לבן עם תפוח אדמה אפוי",
    ingredients: ["דג לבן", "תפוח אדמה", "שמן זית"],
    fullIngredients: ["דג לבן", "תפוח אדמה אפוי", "שמן זית", "מעט מלח"],
    description: "צלחת פשוטה, אלגנטית וטעימה עם מרקם רך ונעים.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "אלגנטי",
    prepTime: "23 דק'",
    image: "",
  },
  {
    name: "אורז עם ביצה, גזר וקישוא",
    ingredients: ["אורז", "ביצה", "גזר", "קישוא"],
    fullIngredients: ["אורז לבן", "ביצה קשה", "גזר מבושל", "קישוא רך"],
    description: "קערה צבעונית, קלה ונעימה עם שובע עדין.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "קליל",
    prepTime: "16 דק'",
    image: "",
  },
  {
    name: "פסטה עם טונה וקישוא",
    ingredients: ["פסטה", "טונה", "קישוא"],
    fullIngredients: ["פסטה", "טונה", "קישוא רך", "מעט מלח"],
    description: "פסטה זריזה ומפתיעה לטובה עם טעם עדין ונעים.",
    mealType: "צהריים",
    safeLevel: 1,
    isSoup: false,
    tag: "מהיר להכנה",
    prepTime: "15 דק'",
    image: "",
  },
  {
    name: "פירה עם עוף וגזר",
    ingredients: ["פירה", "עוף", "גזר"],
    fullIngredients: ["פירה", "חזה עוף", "גזר מבושל", "שמן זית"],
    description: "צלחת רכה ומשביעה עם תחושה ביתית מאוד.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: false,
    tag: "רך",
    prepTime: "22 דק'",
    image: "",
  },
  {
    name: "אורז עם טונה ותפוח אדמה",
    ingredients: ["אורז", "טונה", "תפוח אדמה"],
    fullIngredients: ["אורז לבן", "טונה", "תפוח אדמה מבושל"],
    description: "מנה פשוטה אבל טובה, ממלאת ונעימה.",
    mealType: "צהריים",
    safeLevel: 1,
    isSoup: false,
    tag: "משביע",
    prepTime: "14 דק'",
    image: "",
  },
  {
    name: "אטריות עם הודו וקישוא",
    ingredients: ["אטריות", "הודו", "קישוא"],
    fullIngredients: ["אטריות", "הודו", "קישוא רך", "מעט מלח"],
    description: "מנה חמימה ונוחה עם טעם נקי ומרקם רך.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "ביתי",
    prepTime: "19 דק'",
    image: "",
  },
  {
    name: "אורז עם ביצה ותפוח אדמה",
    ingredients: ["אורז", "ביצה", "תפוח אדמה"],
    fullIngredients: ["אורז לבן", "ביצה קשה", "תפוח אדמה מבושל"],
    description: "קערה קלאסית, פשוטה ומשביעה בלי להכביד.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "קלאסי",
    prepTime: "15 דק'",
    image: "",
  },
  {
    name: "פסטה עם גבינה וקישוא",
    ingredients: ["פסטה", "גבינה", "קישוא"],
    fullIngredients: ["פסטה", "גבינה עדינה", "קישוא רך"],
    description: "פסטה עדינה יותר עם מרקם רך וטעם נעים.",
    mealType: "צהריים",
    safeLevel: 1,
    isSoup: false,
    tag: "עדין",
    prepTime: "16 דק'",
    image: "",
  },
  {
    name: "אורז עם דג לבן ותפוח אדמה",
    ingredients: ["אורז", "דג לבן", "תפוח אדמה"],
    fullIngredients: ["אורז לבן", "דג לבן", "תפוח אדמה מבושל"],
    description: "צלחת רכה, מסודרת ומאוד נעימה לצהריים רגועים.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "נעים",
    prepTime: "20 דק'",
    image: "",
  },
  {
    name: "הודו עם תפוח אדמה וגזר",
    ingredients: ["הודו", "תפוח אדמה", "גזר"],
    fullIngredients: ["הודו", "תפוח אדמה מבושל", "גזר מבושל"],
    description: "מנה נקייה ומסודרת עם שובע יציב וטעם טוב.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "מאוזן",
    prepTime: "21 דק'",
    image: "",
  },

  {
    name: "פירה קרמי עם דג לבן וקישוא",
    ingredients: ["פירה", "דג", "קישוא"],
    fullIngredients: ["פירה", "דג לבן", "קישוא מבושל", "שמן זית"],
    description: "ערב רך, נעים ומדויק עם שילוב שמרגיש מפנק.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: false,
    tag: "רך",
    prepTime: "18 דק'",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "פירה עם עוף טחון ועדין",
    ingredients: ["פירה", "עוף טחון"],
    fullIngredients: ["פירה תפוח אדמה", "עוף טחון", "מעט מלח"],
    description: "שילוב משביע מאוד עם מרקם רך ונוח לערב.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: false,
    tag: "משביע",
    prepTime: "18 דק'",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "אורז עם ביצה וגזר",
    ingredients: ["אורז", "ביצה", "גזר"],
    fullIngredients: ["אורז לבן", "ביצה קשה", "גזר מבושל"],
    description: "ערב פשוט, מהיר וטעים יותר ממה שהוא נשמע.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "מהיר",
    prepTime: "12 דק'",
    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "קערת אורז עם ביצה ואבוקדו",
    ingredients: ["אורז", "ביצה", "אבוקדו"],
    fullIngredients: ["אורז לבן", "ביצה רכה", "אבוקדו", "מעט מלח"],
    description: "קערה קרמית, אסתטית ומשביעה לערב נעים.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "נעים",
    prepTime: "14 דק'",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "פירה עם הודו רך",
    ingredients: ["פירה", "הודו"],
    fullIngredients: ["פירה תפוח אדמה", "הודו רך", "שמן זית"],
    description: "צלחת רכה במיוחד עם תחושה ביתית ומנחמת.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: false,
    tag: "רך במיוחד",
    prepTime: "18 דק'",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "פסטה עדינה עם גבינה",
    ingredients: ["פסטה", "גבינה"],
    fullIngredients: ["פסטה", "גבינה עדינה", "מעט מלח"],
    description: "פסטה רכה, פשוטה ונעימה לערב קל ומהיר.",
    mealType: "ערב",
    safeLevel: 1,
    isSoup: false,
    tag: "מהיר להכנה",
    prepTime: "12 דק'",
    image: "",
  },
  {
    name: "אורז עם טונה ומלפפון קלוף",
    ingredients: ["אורז", "טונה", "מלפפון"],
    fullIngredients: ["אורז לבן", "טונה", "מלפפון קלוף"],
    description: "קערה קלילה עם חלבון זמין וטעם רענן.",
    mealType: "ערב",
    safeLevel: 1,
    isSoup: false,
    tag: "קליל",
    prepTime: "10 דק'",
    image: "",
  },
  {
    name: "תפוח אדמה אפוי עם גבינה",
    ingredients: ["תפוח אדמה", "גבינה"],
    fullIngredients: ["תפוח אדמה אפוי", "גבינה עדינה"],
    description: "מנה חמימה, פשוטה ומאוד מנחמת לערב.",
    mealType: "ערב",
    safeLevel: 1,
    isSoup: false,
    tag: "חם ונעים",
    prepTime: "16 דק'",
    image: "",
  },
  {
    name: "אורז עם הודו וקישוא",
    ingredients: ["אורז", "הודו", "קישוא"],
    fullIngredients: ["אורז לבן", "הודו", "קישוא רך", "מעט מלח"],
    description: "קערה מסודרת עם שובע טוב ומרקם נעים.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "מאוזן",
    prepTime: "17 דק'",
    image: "",
  },
  {
    name: "פירה עם ביצה וגזר",
    ingredients: ["פירה", "ביצה", "גזר"],
    fullIngredients: ["פירה", "ביצה קשה", "גזר מבושל"],
    description: "מנה רכה במיוחד עם שובע עדין וטעם ביתי.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: false,
    tag: "רך",
    prepTime: "13 דק'",
    image: "",
  },
  {
    name: "אטריות עם ביצה וקישוא",
    ingredients: ["אטריות", "ביצה", "קישוא"],
    fullIngredients: ["אטריות", "ביצה קשה", "קישוא רך"],
    description: "ערב מהיר עם תחושה חמימה של אוכל ביתי.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "ביתי",
    prepTime: "13 דק'",
    image: "",
  },
  {
    name: "טוסט עם גבינה ואבוקדו",
    ingredients: ["טוסט", "גבינה", "אבוקדו"],
    fullIngredients: ["טוסט", "גבינה עדינה", "אבוקדו"],
    description: "ערב קל, קרמי ומהיר בלי יותר מדי מאמץ.",
    mealType: "ערב",
    safeLevel: 1,
    isSoup: false,
    tag: "קליל",
    prepTime: "6 דק'",
    image: "",
  },
  {
    name: "פסטה עם טונה",
    ingredients: ["פסטה", "טונה"],
    fullIngredients: ["פסטה", "טונה", "מעט מלח"],
    description: "פסטה קצרה ומהירה עם חלבון זמין וטעם נעים.",
    mealType: "ערב",
    safeLevel: 1,
    isSoup: false,
    tag: "מהיר",
    prepTime: "11 דק'",
    image: "",
  },
  {
    name: "לחם לבן עם ביצה וגבינה",
    ingredients: ["לחם לבן", "ביצה", "גבינה"],
    fullIngredients: ["לחם לבן", "ביצה קשה", "גבינה עדינה"],
    description: "מנה קטנה וקלאסית לערב רגוע.",
    mealType: "ערב",
    safeLevel: 1,
    isSoup: false,
    tag: "קלאסי",
    prepTime: "7 דק'",
    image: "",
  },
  {
    name: "אורז עם גבינה וקישוא",
    ingredients: ["אורז", "גבינה", "קישוא"],
    fullIngredients: ["אורז לבן", "גבינה עדינה", "קישוא רך"],
    description: "שילוב רך, עדין ומעט קרמי לערב פשוט.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "עדין",
    prepTime: "14 דק'",
    image: "",
  },
  {
    name: "פירה עם טונה",
    ingredients: ["פירה", "טונה"],
    fullIngredients: ["פירה", "טונה", "מעט מלח"],
    description: "שילוב מפתיע אבל טעים, רך ומשביע.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "משביע",
    prepTime: "10 דק'",
    image: "",
  },

  {
    name: "קרקרים עם גבינה וביצה קשה",
    ingredients: ["קרקרים", "גבינה", "ביצה"],
    fullIngredients: ["קרקרים", "גבינה עדינה", "ביצה קשה"],
    description: "נשנוש קטן, טעים ומשביע באמצע היום.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "נשנוש",
    prepTime: "5 דק'",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "צנים עם אבוקדו וביצה",
    ingredients: ["צנים", "אבוקדו", "ביצה"],
    fullIngredients: ["צנים", "אבוקדו בשל", "ביצה קשה"],
    description: "נשנוש טוב עם שובע נעים וטעם מאוזן.",
    mealType: "נשנוש",
    safeLevel: 2,
    isSoup: false,
    tag: "ביניים",
    prepTime: "6 דק'",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "טוסט טונה עדין",
    ingredients: ["טוסט", "טונה", "מלפפון"],
    fullIngredients: ["טוסט", "טונה", "מלפפון קלוף"],
    description: "טוסט זריז עם חלבון זמין וטעם קליל.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "חלבון מהיר",
    prepTime: "7 דק'",
    image:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "לחמית עם אבוקדו וגבינה",
    ingredients: ["לחמית", "אבוקדו", "גבינה"],
    fullIngredients: ["לחמית", "אבוקדו", "גבינה עדינה"],
    description: "נשנוש קליל עם מרקם קרמי ומפנק.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "קליל",
    prepTime: "6 דק'",
    image: "",
  },
  {
    name: "יוגורט עם אגס",
    ingredients: ["יוגורט", "אגס"],
    fullIngredients: ["יוגורט טבעי", "אגס"],
    description: "משהו קטן, קריר ומרענן בין הארוחות.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "קריר",
    prepTime: "3 דק'",
    image: "",
  },
  {
    name: "בננה עם טחינה",
    ingredients: ["בננה", "טחינה"],
    fullIngredients: ["בננה", "טחינה"],
    description: "נשנוש קטן עם מתיקות עדינה ומרקם רך.",
    mealType: "נשנוש",
    safeLevel: 2,
    isSoup: false,
    tag: "מהיר",
    prepTime: "2 דק'",
    image: "",
  },
  {
    name: "תפוח עם יוגורט",
    ingredients: ["תפוח", "יוגורט"],
    fullIngredients: ["תפוח", "יוגורט טבעי"],
    description: "שילוב פשוט ורענן שעובד מצוין כנשנוש קל.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "קליל",
    prepTime: "3 דק'",
    image: "",
  },
  {
    name: "קרקרים עם אבוקדו",
    ingredients: ["קרקרים", "אבוקדו"],
    fullIngredients: ["קרקרים", "אבוקדו בשל", "מעט מלח"],
    description: "נשנוש קרמי וקליל בלי הרבה הכנה.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "מהיר להכנה",
    prepTime: "4 דק'",
    image: "",
  },
  {
    name: "יוגורט עם בננה",
    ingredients: ["יוגורט", "בננה"],
    fullIngredients: ["יוגורט טבעי", "בננה"],
    description: "נשנוש קלאסי, נעים ומהיר מאוד.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "קלאסי",
    prepTime: "2 דק'",
    image: "",
  },
  {
    name: "צנים עם גבינה עדינה",
    ingredients: ["צנים", "גבינה"],
    fullIngredients: ["צנים", "גבינה עדינה"],
    description: "משהו קטן ומסודר כשבא ביס נעים ולא כבד.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "ביניים",
    prepTime: "4 דק'",
    image: "",
  },
  {
    name: "לחמית עם טחינה",
    ingredients: ["לחמית", "טחינה"],
    fullIngredients: ["לחמית", "טחינה"],
    description: "נשנוש פשוט, רך וזמין שתמיד עובד.",
    mealType: "נשנוש",
    safeLevel: 2,
    isSoup: false,
    tag: "עדין",
    prepTime: "3 דק'",
    image: "",
  },
  {
    name: "טוסט עם גבינה",
    ingredients: ["טוסט", "גבינה"],
    fullIngredients: ["טוסט", "גבינה עדינה"],
    description: "טוסט קצר וקלאסי כשצריך משהו מהיר וטוב.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "קלאסי",
    prepTime: "4 דק'",
    image: "",
  },
  {
    name: "אגס עם יוגורט ובננה",
    ingredients: ["אגס", "יוגורט", "בננה"],
    fullIngredients: ["אגס", "יוגורט טבעי", "בננה"],
    description: "קערה קטנה ומתוקה בעדינות עם תחושת רעננות.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "קריר",
    prepTime: "3 דק'",
    image: "",
  },
  {
    name: "קרקרים עם טונה",
    ingredients: ["קרקרים", "טונה"],
    fullIngredients: ["קרקרים", "טונה"],
    description: "נשנוש מהיר עם קצת יותר חלבון ושובע.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "חלבון מהיר",
    prepTime: "3 דק'",
    image: "",
  },

  {
    name: "מרק עוף עם תפוח אדמה וקישוא",
    ingredients: ["עוף", "תפוח אדמה", "קישוא", "מרק"],
    fullIngredients: ["חזה עוף", "תפוח אדמה", "קישוא", "מים", "מעט מלח"],
    description: "מרק קלאסי, חם ומרגיע עם טעם ביתי מדויק.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "מחמם",
    prepTime: "35 דק'",
    image:
      "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "מרק גזר וקישוא קטיפתי",
    ingredients: ["גזר", "קישוא", "מרק"],
    fullIngredients: ["גזר", "קישוא", "מים", "כורכום"],
    description: "מרק חלק, עדין ונעים עם מרקם קטיפתי.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "עדין מאוד",
    prepTime: "28 דק'",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "מרק תפוח אדמה וגזר",
    ingredients: ["תפוח אדמה", "גזר", "מרק"],
    fullIngredients: ["תפוח אדמה", "גזר", "מים", "מעט מלח"],
    description: "מרק משביע, רך ונוח עם טעם ביתי מוכר.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "משביע",
    prepTime: "30 דק'",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "מרק דלעת חלק",
    ingredients: ["דלעת", "מרק"],
    fullIngredients: ["דלעת", "מים", "מעט מלח", "כורכום"],
    description: "מרק דלעת חלק, מתקתק בעדינות וממש מנחם.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "מנחם",
    prepTime: "26 דק'",
    image:
      "https://images.unsplash.com/photo-1608500218808-2a7dc6f2b7f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "מרק עוף עם אורז",
    ingredients: ["עוף", "אורז", "מרק"],
    fullIngredients: ["חזה עוף", "אורז לבן", "מים", "מעט מלח"],
    description: "מרק מחזק עם גוף נעים וטעם ביתי קלאסי.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "מרק מחזק",
    prepTime: "32 דק'",
    image: "",
  },
  {
    name: "מרק קישוא ותפוח אדמה",
    ingredients: ["קישוא", "תפוח אדמה", "מרק"],
    fullIngredients: ["קישוא", "תפוח אדמה", "מים", "מעט מלח"],
    description: "מרק רך ועדין עם מרקם נעים וטעם פשוט וטוב.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "רך",
    prepTime: "27 דק'",
    image: "",
  },
  {
    name: "מרק גזר עם אורז",
    ingredients: ["גזר", "אורז", "מרק"],
    fullIngredients: ["גזר", "אורז לבן", "מים", "מעט מלח"],
    description: "מרק קליל עם בסיס מוכר ושובע עדין.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "קליל",
    prepTime: "29 דק'",
    image: "",
  },
  {
    name: "מרק דלעת ותפוח אדמה",
    ingredients: ["דלעת", "תפוח אדמה", "מרק"],
    fullIngredients: ["דלעת", "תפוח אדמה", "מים", "מעט מלח"],
    description: "מרק עשיר יותר, חלק ומנחם במיוחד.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "חם ומנחם",
    prepTime: "30 דק'",
    image: "",
  },
  {
    name: "מרק עוף עם גזר",
    ingredients: ["עוף", "גזר", "מרק"],
    fullIngredients: ["חזה עוף", "גזר", "מים", "מעט מלח"],
    description: "מרק פשוט ומדויק עם טעם נקי ונעים.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "עדין",
    prepTime: "28 דק'",
    image: "",
  },
  {
    name: "מרק אורז וקישוא",
    ingredients: ["אורז", "קישוא", "מרק"],
    fullIngredients: ["אורז לבן", "קישוא", "מים", "מעט מלח"],
    description: "מרק ביתי, קל ונעים עם בסיס רך ומוכר.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "ביתי",
    prepTime: "26 דק'",
    image: "",
  },
  {
    name: "מרק תפוח אדמה וקישוא",
    ingredients: ["תפוח אדמה", "קישוא", "מרק"],
    fullIngredients: ["תפוח אדמה", "קישוא", "מים", "מעט מלח"],
    description: "מרק רגוע עם גוף מעט יותר מלא ומרקם רך.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "משביע",
    prepTime: "28 דק'",
    image: "",
  },
  {
    name: "מרק גזר ודלעת",
    ingredients: ["גזר", "דלעת", "מרק"],
    fullIngredients: ["גזר", "דלעת", "מים", "כורכום"],
    description: "מרק מתקתק-עדין עם מרקם חלק ומראה יפה.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "מנחם",
    prepTime: "27 דק'",
    image: "",
  },
  {
    name: "מרק עוף עם קישוא",
    ingredients: ["עוף", "קישוא", "מרק"],
    fullIngredients: ["חזה עוף", "קישוא", "מים", "מעט מלח"],
    description: "מרק בהיר, רך ופשוט עם טעם מאוד עדין.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "רך",
    prepTime: "27 דק'",
    image: "",
  },
  {
    name: "מרק אורז וגזר",
    ingredients: ["אורז", "גזר", "מרק"],
    fullIngredients: ["אורז לבן", "גזר", "מים", "מעט מלח"],
    description: "מרק קלאסי, עדין ומוכר שמרגיש בטוח ונעים.",
    mealType: "מרקים",
    safeLevel: 3,
    isSoup: true,
    tag: "קלאסי",
    prepTime: "25 דק'",
    image: "",
  },
];

const menuItems = [
  { key: "home", label: "דף הבית", icon: "🏠" },
  { key: "menus", label: "תפריטים", icon: "🧾" },
  { key: "recipes", label: "כל המנות", icon: "🍲" },
  { key: "favorites", label: "מועדפים", icon: "⭐" },
  { key: "week", label: "שבועי", icon: "📅" },
  { key: "shopping", label: "קניות", icon: "🛒" },
  { key: "addMeal", label: "מה אכלתי", icon: "🗓️" },
  { key: "profile", label: "פרופיל", icon: "👤" },
];

const mealTabs = ["הכל", "בוקר", "צהריים", "ערב", "נשנוש", "מרקים"];
const moodOptions = [
  "מאוזן",
  "רגיש לי",
  "בא לי משהו קל",
  "רעב מאוד",
  "אין לי כוח לבשל",
  "חם ומנחם",
];
const weeklyDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const botQuestions = [
  {
    id: "favoriteBase",
    question: "איזה סוג אוכל אתה בדרך כלל הכי אוהב?",
    options: ["אורז", "פסטה", "טוסט", "מרק"],
  },
  {
    id: "mealMoment",
    question: "לאיזו ארוחה אתה רוצה שאכוון עכשיו?",
    options: ["בוקר", "צהריים", "ערב", "נשנוש"],
  },
  {
    id: "style",
    question: "מה הכי מתאים לך כרגע?",
    options: ["רך ועדין", "משביע", "מהיר", "חם ומנחם"],
  },
  {
    id: "effort",
    question: "כמה זמן מתאים לך להשקיע?",
    options: ["עד 10 דקות", "עד 20 דקות", "לא משנה לי"],
  },
];

const editorialHighlights = [
  { kicker: "בוקר מדויק", title: "מנות עדינות לפתיחה רגועה יותר של היום." },
  { kicker: "צהריים חכם", title: "יותר מגוון בלי לאבד שליטה על מה מתאים לך." },
  { kicker: "ערב רך", title: "אפשרויות מסודרות לסיום יום בלי עומס מיותר." },
];

const emptyRegisterState = {
  username: "",
  password: "",
  fullName: "",
  age: "",
  diseaseType: "קרוהן",
  currentStatus: "רמיסיה",
  safeFoods: "",
  triggerFoods: "",
  nutritionText: "",
  allowedFoods: [],
  forbiddenFoods: [],
};

const emptyInsights = {
  likedTags: {},
  likedMealTypes: {},
  dislikedTags: {},
};

export default function App() {
  const [screen, setScreen] = useState("auth");
  const [authMode, setAuthMode] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [activeMealFilter, setActiveMealFilter] = useState("הכל");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [tasteInsights, setTasteInsights] = useState(emptyInsights);
  const [dailyMood, setDailyMood] = useState("מאוזן");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState(emptyRegisterState);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [mealInput, setMealInput] = useState("");
  const [mealFeeling, setMealFeeling] = useState("");
  const [meals, setMeals] = useState([]);
  const [dailyMenu, setDailyMenu] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [shoppingCopied, setShoppingCopied] = useState(false);

  const [botOpen, setBotOpen] = useState(false);
  const [botStep, setBotStep] = useState(0);
  const [botAnswers, setBotAnswers] = useState({});
  const [botRecommendations, setBotRecommendations] = useState([]);
  const [botFreeText, setBotFreeText] = useState("");
  const [botMessages, setBotMessages] = useState([]);

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

   const loadUserMeals = async () => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    setMeals([]);
    return;
  }

  const { data, error } = await supabase
    .from("study_sessions")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Load meals error:", error);
    setMeals([]);
    return;
  }

  const loadedMeals = data.map((item) => ({
  id: item.id,
  name: item.subject,
  feeling: item.notes,
  date: item.created_at,
}));
  setMeals(loadedMeals);
};

  const loadUserFavorites = (username) => {
    const savedFavorites = localStorage.getItem(`favorites_${username}`);
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
  };

  const loadUserRatings = (username) => {
    const savedRatings = localStorage.getItem(`ratings_${username}`);
    setRatings(savedRatings ? JSON.parse(savedRatings) : {});
  };

  const loadUserInsights = (username) => {
    const savedInsights = localStorage.getItem(`insights_${username}`);
    setTasteInsights(savedInsights ? JSON.parse(savedInsights) : emptyInsights);
  };

  const loadWeeklyPlan = (username) => {
    const savedPlan = localStorage.getItem(`weeklyPlan_${username}`);
    setWeeklyPlan(savedPlan ? JSON.parse(savedPlan) : []);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("currentUser");
    if (!savedUsername) return;

    const users = getUsers();
    const foundUser = users.find((user) => user.username === savedUsername);
    if (!foundUser) return;

    setCurrentUser(foundUser);
    setScreen("home");
    setActiveTab("home");
    loadUserMeals();
    loadUserFavorites(foundUser.username);
    loadUserRatings(foundUser.username);
    loadUserInsights(foundUser.username);
    loadWeeklyPlan(foundUser.username);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(`meals_${currentUser.username}`, JSON.stringify(meals));
  }, [meals, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(`favorites_${currentUser.username}`, JSON.stringify(favorites));
  }, [favorites, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(`ratings_${currentUser.username}`, JSON.stringify(ratings));
  }, [ratings, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(`insights_${currentUser.username}`, JSON.stringify(tasteInsights));
  }, [tasteInsights, currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(`weeklyPlan_${currentUser.username}`, JSON.stringify(weeklyPlan));
  }, [weeklyPlan, currentUser]);

  const normalizeFood = (food) =>
    food
      .trim()
      .replace(/\./g, "")
      .replace(/:/g, "")
      .replace(/;/g, "")
      .replace(/\s+/g, " ")
      .replace(/\u200f/g, "")
      .replace(/\u200e/g, "")
      .trim();

  const splitFoods = (text) =>
    text
      .split(/,|،|\n|\/|-|•/)
      .map((item) => normalizeFood(item))
      .filter(Boolean)
      .filter((item) => item.length > 1);

  const uniqueArray = (arr) => [...new Set(arr.filter(Boolean))];

  const parseNutritionText = (text) => {
    const allowed = [];
    const forbidden = [];

    const prepared = text
      .replace(/\r/g, "\n")
      .replace(/[•●▪◦]/g, "\n")
      .replace(/;/g, "\n");

    const lines = prepared
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let currentMode = null;

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      const allowedKeywords = [
        "מומלץ",
        "מומלצים",
        "מותר",
        "מותרים",
        "אפשר",
        "אפשר לאכול",
        "מזונות מותרים",
      ];
      const forbiddenKeywords = [
        "אסור",
        "אסורים",
        "להימנע",
        "לא מומלץ",
        "מזונות אסורים",
      ];

      if (allowedKeywords.some((keyword) => lower.includes(keyword))) {
        currentMode = "allowed";
      }
      if (forbiddenKeywords.some((keyword) => lower.includes(keyword))) {
        currentMode = "forbidden";
      }
      if (!currentMode) return;

      foodBank.forEach((food) => {
        if (line.includes(food)) {
          if (currentMode === "allowed") allowed.push(food);
          if (currentMode === "forbidden") forbidden.push(food);
        }
      });

      const cleaned = line.replace(
        /מומלץ|מומלצים|מותר|מותרים|אפשר לאכול|אפשר|מזונות מותרים|אסור|אסורים|להימנע|לא מומלץ|מזונות אסורים|:/g,
        ""
      );

      const detectedParts = splitFoods(cleaned).filter((item) =>
        foodBank.some((food) => normalizeFood(food) === normalizeFood(item))
      );

      if (currentMode === "allowed") allowed.push(...detectedParts);
      if (currentMode === "forbidden") forbidden.push(...detectedParts);
    });

    return {
      allowed: uniqueArray(allowed),
      forbidden: uniqueArray(forbidden),
    };
  };

  const registerUser = async () => {
  setAuthError("");

  if (
    !registerData.username.trim() ||
    !registerData.password.trim() ||
    !registerData.fullName.trim()
  ) {
    setAuthError("יש למלא לפחות שם מלא, שם משתמש וסיסמה");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: `${registerData.username.trim()}@gmail.com`,
    password: registerData.password.trim(),
  });

  if (error) {
    setAuthError(error.message);
    return;
  }
  const profileData = {
  username: registerData.username.trim(),
  password: registerData.password.trim(),
  full_name: registerData.fullName.trim(),
  safe_foods: registerData.safeFoods,
  trigger_foods: registerData.triggerFoods,
  nutrition_text: registerData.nutritionText,
};

const { error: profileError } = await supabase
  .from("profiles")
  .insert([profileData]);

if (profileError) {
  setAuthError(profileError.message);
  return;
}

  alert("המשתמש נוצר בהצלחה!");
};

const loginUser = async () => {
  setAuthError("");

  if (!loginData.username.trim() || !loginData.password.trim()) {
    setAuthError("יש למלא שם משתמש וסיסמה");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: `${loginData.username.trim()}@gmail.com`,
    password: loginData.password.trim(),
  });

  if (error) {
    setAuthError("שם משתמש או סיסמה לא נכונים");
    return;
  }

  setCurrentUser({
    username: loginData.username.trim(),
    fullName: loginData.username.trim(),
    age: "",
    diseaseType: "קרוהן",
    currentStatus: "רמיסיה",
    allowedFoods: [],
    forbiddenFoods: [],
  });
  await loadUserMeals();

  setScreen("home");
  setActiveTab("home");
  setLoginData({ username: "", password: "" });
};

  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMeals([]);
    setFavorites([]);
    setRatings({});
    setTasteInsights(emptyInsights);
    setMealInput("");
    setMealFeeling("");
    setDailyMenu([]);
    setWeeklyPlan([]);
    setSearchTerm("");
    setSelectedRecipe(null);
    setBotOpen(false);
    setBotStep(0);
    setBotAnswers({});
    setBotRecommendations([]);
    setBotFreeText("");
    setBotMessages([]);
    setScreen("auth");
    setActiveTab("home");
    setActiveMealFilter("הכל");
    setDailyMood("מאוזן");
  };

  const updateCurrentUserField = (field, value) => {
    setCurrentUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfileChanges = () => {
    if (!currentUser) return;

    const parsed = parseNutritionText(currentUser.nutritionText || "");

    const updatedUser = {
      ...currentUser,
      allowedFoods: uniqueArray([
        ...parsed.allowed,
        ...splitFoods(currentUser.safeFoods || "").filter((item) =>
          foodBank.some((food) => normalizeFood(food) === normalizeFood(item))
        ),
      ]),
      forbiddenFoods: uniqueArray([
        ...parsed.forbidden,
        ...splitFoods(currentUser.triggerFoods || "").filter((item) =>
          foodBank.some((food) => normalizeFood(food) === normalizeFood(item))
        ),
      ]),
    };

    const users = getUsers();
    const updatedUsers = users.map((user) =>
      user.username === updatedUser.username ? updatedUser : user
    );

    saveUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", updatedUser.username);
    setActiveTab("home");
  };

  const getPrepMinutes = (recipe) => {
    const match = recipe.prepTime.match(/\d+/);
    return match ? Number(match[0]) : 999;
  };

  const getCurrentMomentLabel = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "בוקר";
    if (hour < 16) return "צהריים";
    if (hour < 21) return "ערב";
    return "נשנוש";
  };

  const getPreferenceScore = (recipe) => {
    let score = 0;
    const rating = ratings[recipe.name] || 0;
    const currentMoment = getCurrentMomentLabel();

    score += rating * 6;
    if (favorites.includes(recipe.name)) score += 3;
    if (recipe.mealType === currentMoment) score += 2;

    if (tasteInsights.likedTags[recipe.tag]) {
      score += tasteInsights.likedTags[recipe.tag] * 1.5;
    }

    if (tasteInsights.likedMealTypes[recipe.mealType]) {
      score += tasteInsights.likedMealTypes[recipe.mealType] * 1.5;
    }

    if (tasteInsights.dislikedTags[recipe.tag]) {
      score -= tasteInsights.dislikedTags[recipe.tag] * 2;
    }

    if (dailyMood === "רגיש לי") {
      if (recipe.isSoup || recipe.tag.includes("רך") || recipe.tag.includes("עדין")) {
        score += 4;
      }
    }

    if (dailyMood === "בא לי משהו קל") {
      if (
        recipe.tag.includes("קליל") ||
        recipe.tag.includes("מהיר") ||
        recipe.tag.includes("עדין")
      ) {
        score += 4;
      }
    }

    if (dailyMood === "רעב מאוד") {
      if (
        recipe.tag.includes("משביע") ||
        recipe.tag.includes("מאוזן") ||
        recipe.ingredients.includes("אורז") ||
        recipe.ingredients.includes("פירה")
      ) {
        score += 4;
      }
    }

    if (dailyMood === "אין לי כוח לבשל") {
      if (getPrepMinutes(recipe) <= 10) score += 5;
      else if (getPrepMinutes(recipe) <= 15) score += 3;
    }

    if (dailyMood === "חם ומנחם") {
      if (recipe.isSoup || recipe.tag.includes("מנחם") || recipe.tag.includes("חם")) {
        score += 5;
      }
    }

    return score;
  };

  const filteredRecipes = useMemo(() => {
    if (!currentUser) return [];

    const allowed = (currentUser.allowedFoods || []).map((food) => normalizeFood(food));
    const forbidden = (currentUser.forbiddenFoods || []).map((food) => normalizeFood(food));

    let minSafeLevel = 1;
    if (currentUser.currentStatus === "רגיש") minSafeLevel = 2;
    if (currentUser.currentStatus === "התלקחות") minSafeLevel = 3;
    if (dailyMood === "רגיש לי") minSafeLevel = Math.max(minSafeLevel, 2);

    let base = recipeLibrary.filter((recipe) => {
      const normalizedIngredients = recipe.ingredients.map((item) => normalizeFood(item));

      const allowedMatches = normalizedIngredients.filter((ingredient) =>
        allowed.includes(ingredient)
      ).length;

      const matchesAllowed =
        allowed.length === 0 ||
        normalizedIngredients.every((ingredient) => allowed.includes(ingredient)) ||
        allowedMatches >= Math.min(2, normalizedIngredients.length);

      const hasForbidden = normalizedIngredients.some((ingredient) =>
        forbidden.includes(ingredient)
      );

      const matchesMood =
        dailyMood !== "רגיש לי" ||
        recipe.isSoup ||
        recipe.tag.includes("רך") ||
        recipe.tag.includes("עדין") ||
        recipe.safeLevel >= 2;

      return matchesAllowed && !hasForbidden && recipe.safeLevel >= minSafeLevel && matchesMood;
    });

    if (currentUser.currentStatus === "התלקחות") {
      base = base.filter((recipe) => recipe.isSoup || recipe.safeLevel === 3);
    }

    return [...base].sort((a, b) => getPreferenceScore(b) - getPreferenceScore(a));
  }, [currentUser, dailyMood, ratings, favorites, tasteInsights]);

  const searchedRecipes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return filteredRecipes;

    return filteredRecipes.filter((recipe) => {
      const haystack = [
        recipe.name,
        recipe.description,
        recipe.tag,
        recipe.mealType,
        ...(recipe.fullIngredients || []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [filteredRecipes, searchTerm]);

  const recipesByMealFilter = useMemo(() => {
    const base = searchedRecipes;
    if (activeMealFilter === "הכל") return base;
    if (activeMealFilter === "מרקים") return base.filter((recipe) => recipe.isSoup);
    return base.filter((recipe) => recipe.mealType === activeMealFilter);
  }, [searchedRecipes, activeMealFilter]);

  const favoriteRecipes = useMemo(
    () => filteredRecipes.filter((recipe) => favorites.includes(recipe.name)),
    [filteredRecipes, favorites]
  );

  const featuredRecipes = useMemo(() => filteredRecipes.slice(0, 3), [filteredRecipes]);

  const menuCollections = useMemo(() => {
    const sections = [
      {
        key: "בוקר",
        title: "תפריט בוקר",
        subtitle: "מנות בוקר עדינות, מהירות ומסודרות",
        recipes: filteredRecipes.filter((recipe) => recipe.mealType === "בוקר"),
      },
      {
        key: "צהריים",
        title: "תפריט צהריים",
        subtitle: "מנות מרכזיות עם יותר גיוון",
        recipes: filteredRecipes.filter((recipe) => recipe.mealType === "צהריים"),
      },
      {
        key: "ערב",
        title: "תפריט ערב",
        subtitle: "מנות רכות ורגועות יותר",
        recipes: filteredRecipes.filter((recipe) => recipe.mealType === "ערב"),
      },
      {
        key: "נשנוש",
        title: "תפריט נשנושים",
        subtitle: "פתרונות קטנים ומהירים בין הארוחות",
        recipes: filteredRecipes.filter((recipe) => recipe.mealType === "נשנוש"),
      },
      {
        key: "מרקים",
        title: "תפריט מרקים",
        subtitle: "מנות חמות לימים רגישים יותר",
        recipes: filteredRecipes.filter((recipe) => recipe.isSoup),
      },
    ];

    return sections.filter((section) => section.recipes.length > 0);
  }, [filteredRecipes]);

  const shoppingList = useMemo(() => {
    const sourceRecipes = weeklyPlan.length
      ? weeklyPlan.flatMap((day) => day.meals.map((meal) => meal.recipe))
      : botRecommendations.length
      ? botRecommendations
      : dailyMenu.map((item) => item.recipe);

    const counts = {};

    sourceRecipes.forEach((recipe) => {
      if (!recipe) return;
      recipe.fullIngredients.forEach((ingredient) => {
        counts[ingredient] = (counts[ingredient] || 0) + 1;
      });
    });

    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [weeklyPlan, botRecommendations, dailyMenu]);

  const shuffleArray = (array) => {
    const copied = [...array];
    for (let i = copied.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  };

  const buildRandomMenu = (source) => {
    const breakfastOptions = shuffleArray(source.filter((recipe) => recipe.mealType === "בוקר"));
    const lunchOptions = shuffleArray(source.filter((recipe) => recipe.mealType === "צהריים"));
    const dinnerOptions = shuffleArray(source.filter((recipe) => recipe.mealType === "ערב"));
    const snackOptions = shuffleArray(source.filter((recipe) => recipe.mealType === "נשנוש"));
    const soupOptions = shuffleArray(source.filter((recipe) => recipe.isSoup));
    const fallback = shuffleArray(source);

    return [
      { title: "בוקר", recipe: breakfastOptions[0] || fallback[0] || null },
      { title: "נשנוש", recipe: snackOptions[0] || fallback[1] || null },
      { title: "צהריים", recipe: lunchOptions[0] || fallback[2] || null },
      { title: "ערב", recipe: dinnerOptions[0] || fallback[3] || null },
      { title: "מרק / חם", recipe: soupOptions[0] || fallback[4] || null },
    ].filter((item) => item.recipe);
  };

  const generateDailyMenu = () => {
    if (!filteredRecipes.length) {
      setDailyMenu([]);
      return;
    }
    setDailyMenu(buildRandomMenu(filteredRecipes));
  };

  const generateWeeklyPlan = () => {
    if (!filteredRecipes.length) {
      setWeeklyPlan([]);
      return;
    }

    const plan = weeklyDays.map((day) => ({
      day,
      meals: buildRandomMenu(shuffleArray(filteredRecipes)).slice(0, 4),
    }));

    setWeeklyPlan(plan);
    setActiveTab("week");
  };

  useEffect(() => {
    if (filteredRecipes.length > 0) {
      generateDailyMenu();
    } else {
      setDailyMenu([]);
    }
  }, [filteredRecipes.length, currentUser?.currentStatus, dailyMood]);

  const updateTasteInsights = (recipe, rating) => {
    setTasteInsights((prev) => {
      const next = JSON.parse(JSON.stringify(prev));

      if (rating > 0) {
        next.likedTags[recipe.tag] = (next.likedTags[recipe.tag] || 0) + 1;
        next.likedMealTypes[recipe.mealType] =
          (next.likedMealTypes[recipe.mealType] || 0) + 1;
      }

      if (rating < 0) {
        next.dislikedTags[recipe.tag] = (next.dislikedTags[recipe.tag] || 0) + 1;
      }

      return next;
    });
  };

  const rateRecipe = (recipe, rating) => {
    setRatings((prev) => ({ ...prev, [recipe.name]: rating }));
    updateTasteInsights(recipe, rating);
  };

  const saveMeal = async () => {
  if (!mealInput.trim() || !mealFeeling) return;

  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("study_sessions")
    .insert([
      {
        user_id: userData.user.id,
        subject: mealInput.trim(),
        duration_minutes: 30,
        notes: mealFeeling,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log("Save meal error:", error);
    return;
  }

  const newMeal = {
    id: data.id,
    name: data.subject,
    feeling: data.notes,
    date: data.created_at,
  };

  setMeals((prev) => [newMeal, ...prev]);
  setMealInput("");
  setMealFeeling("");
};
  const addSuggestedMealToToday = async (recipe) => {
    const alreadyExists = meals.some((meal) => meal.name === recipe.name);
    if (alreadyExists) return;

    const newMeal = {
      name: recipe.name,
      feeling: "עוד לא סימנתי",
      date: new Date().toISOString(),
    };
    const { data: userData } = await supabase.auth.getUser();

await supabase
  .from("study_sessions")
  .insert([
    {
      user_id: userData.user.id,
      subject: recipe.name,
      duration_minutes: 30,
      notes: "עוד לא סימנתי",
    },
  ]);

    setMeals((prev) => [newMeal, ...prev]);
  };

  const updateMealFeeling = async (indexToUpdate, newFeeling) => {
  const mealToUpdate = meals[indexToUpdate];

  if (mealToUpdate?.id) {
    await supabase
      .from("study_sessions")
      .update({ notes: newFeeling })
      .eq("id", mealToUpdate.id);
  }

  setMeals((prev) =>
    prev.map((meal, index) =>
      index === indexToUpdate
        ? { ...meal, feeling: newFeeling }
        : meal
    )
  );
};

 const deleteMeal = async (indexToDelete) => {
  const mealToDelete = meals[indexToDelete];

  if (mealToDelete?.id) {
    await supabase
      .from("study_sessions")
      .delete()
      .eq("id", mealToDelete.id);
  }

  setMeals((prev) => prev.filter((_, index) => index !== indexToDelete));
};

  const toggleFavorite = (recipeName) => {
    setFavorites((prev) =>
      prev.includes(recipeName)
        ? prev.filter((item) => item !== recipeName)
        : [...prev, recipeName]
    );
  };

  const buildBotRecommendations = (answers, freeText = "") => {
    const scored = filteredRecipes.map((recipe) => {
      let score = getPreferenceScore(recipe);
      const text = [
        recipe.name,
        recipe.description,
        recipe.tag,
        recipe.mealType,
        ...(recipe.fullIngredients || []),
      ].join(" ");

      if (answers.favoriteBase && text.includes(answers.favoriteBase)) score += 5;
      if (answers.mealMoment && recipe.mealType === answers.mealMoment) score += 6;

      if (
        answers.style === "רך ועדין" &&
        (recipe.isSoup || recipe.tag.includes("רך") || recipe.tag.includes("עדין"))
      ) {
        score += 5;
      }
      if (
        answers.style === "משביע" &&
        (recipe.tag.includes("משביע") || recipe.tag.includes("מאוזן"))
      ) {
        score += 5;
      }
      if (answers.style === "מהיר" && getPrepMinutes(recipe) <= 10) {
        score += 5;
      }
      if (
        answers.style === "חם ומנחם" &&
        (recipe.isSoup || recipe.tag.includes("מנחם"))
      ) {
        score += 5;
      }

      if (answers.effort === "עד 10 דקות" && getPrepMinutes(recipe) <= 10) score += 4;
      if (answers.effort === "עד 20 דקות" && getPrepMinutes(recipe) <= 20) score += 3;

      const lower = freeText.toLowerCase();
      if (lower.includes("חם") && (recipe.isSoup || recipe.tag.includes("מנחם"))) score += 4;
      if (lower.includes("קל") && (recipe.tag.includes("קליל") || recipe.tag.includes("מהיר"))) score += 4;
      if (lower.includes("מהיר") && getPrepMinutes(recipe) <= 10) score += 4;
      if (lower.includes("משביע") && recipe.tag.includes("משביע")) score += 4;
      if (lower.includes("אורז") && text.includes("אורז")) score += 4;
      if (lower.includes("פסטה") && text.includes("פסטה")) score += 4;
      if (lower.includes("מרק") && recipe.isSoup) score += 4;
      if (lower.includes("בוקר") && recipe.mealType === "בוקר") score += 4;
      if (lower.includes("ערב") && recipe.mealType === "ערב") score += 4;
      if (lower.includes("נשנוש") && recipe.mealType === "נשנוש") score += 4;

      return { recipe, score };
    });

    const result = scored
      .sort((a, b) => b.score - a.score)
      .map((item) => item.recipe)
      .slice(0, 4);

    setBotRecommendations(result);
    if (answers.mealMoment && mealTabs.includes(answers.mealMoment)) {
      setActiveMealFilter(answers.mealMoment);
    }
    if (result.length) {
      setDailyMenu(
        result.map((recipe, index) => ({
          title: ["בחירה ראשונה", "בחירה שנייה", "בחירה שלישית", "בחירה נוספת"][index],
          recipe,
        }))
      );
    }
    setActiveTab("home");
  };

  const startBot = () => {
    setBotOpen(true);
    setBotStep(0);
    setBotAnswers({});
    setBotFreeText("");
    setBotMessages([{ role: "assistant", text: botQuestions[0].question }]);
  };

  const answerBotQuestion = (option) => {
    const currentQuestion = botQuestions[botStep];
    const nextAnswers = { ...botAnswers, [currentQuestion.id]: option };

    setBotAnswers(nextAnswers);
    setBotMessages((prev) => [...prev, { role: "user", text: option }]);

    if (botStep === botQuestions.length - 1) {
      setBotStep(botQuestions.length);
      setBotMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "מעולה. אם בא לך, תכתוב גם במילים שלך מה אתה מחפש, למשל: בא לי משהו חם ומהיר.",
        },
      ]);
      return;
    }

    const nextQuestion = botQuestions[botStep + 1];
    setBotStep((prev) => prev + 1);
    setBotMessages((prev) => [...prev, { role: "assistant", text: nextQuestion.question }]);
  };

  const submitBotFreeText = () => {
    const text = botFreeText.trim();
    setBotMessages((prev) => [
      ...prev,
      ...(text ? [{ role: "user", text }] : []),
      {
        role: "assistant",
        text: "בנינו לך תפריט ראשוני לפי מה שסיפרת. אפשר לראות אותו עכשיו בדף הבית.",
      },
    ]);
    buildBotRecommendations(botAnswers, text);
    setBotFreeText("");
  };

  const copyShoppingList = async () => {
    const text = shoppingList.map((item) => `${item.name} x${item.count}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setShoppingCopied(true);
      setTimeout(() => setShoppingCopied(false), 1500);
    } catch (error) {
      setShoppingCopied(false);
    }
  };

  const getFeelingColor = (value) => {
    if (value === "טוב") return "#227447";
    if (value === "סביר") return "#b87417";
    if (value === "לא טוב") return "#c84343";
    return "#67707a";
  };

  const recipeImageProps = (recipe) => ({
    src: recipe.image || fallbackFoodImage,
    alt: recipe.name,
    className: "recipe-image",
    onError: (e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackFoodImage;
    },
  });

  const renderFilters = () => (
    <div className="recipe-filters">
      {mealTabs.map((tab) => (
        <button
          key={tab}
          className={`pill ${activeMealFilter === tab ? "active" : ""}`}
          onClick={() => setActiveMealFilter(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const renderMoodSelector = () => (
    <div className="mood-wrap">
      {moodOptions.map((mood) => (
        <button
          key={mood}
          className={`mood-chip ${dailyMood === mood ? "active" : ""}`}
          onClick={() => setDailyMood(mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  );

  const renderRecipeCard = (recipe, index, compact = false) => (
    <article
      className={`recipe-card ${compact ? "recipe-card-compact" : ""}`}
      key={`${recipe.name}-${index}`}
    >
      <div className="recipe-image-wrap">
        <img alt=""{...recipeImageProps(recipe)} />
        <button
          className={`favorite-button ${favorites.includes(recipe.name) ? "active" : ""}`}
          onClick={() => toggleFavorite(recipe.name)}
        >
          {favorites.includes(recipe.name) ? "★" : "☆"}
        </button>
        <div className="recipe-overlay-chip">{recipe.isSoup ? "מרק" : recipe.mealType}</div>
      </div>

      <div className="recipe-content">
        <div className="recipe-content-head">
          <h3>{recipe.name}</h3>
          <span className="recipe-time">{recipe.prepTime}</span>
        </div>

        <p>{recipe.description}</p>

        <div className="recipe-meta-row">
          <span className="meta-chip green">{recipe.tag}</span>
          <span className="meta-chip sand">התאמה {recipe.safeLevel}/3</span>
        </div>

        <div className="recipe-ingredients">{recipe.fullIngredients.join(", ")}</div>

        <div className="rating-row">
          <button
            className={`rating-btn ${ratings[recipe.name] === 1 ? "active" : ""}`}
            onClick={() => rateRecipe(recipe, 1)}
          >
            👍 אהבתי
          </button>
          <button
            className={`rating-btn ${ratings[recipe.name] === -1 ? "active dislike" : ""}`}
            onClick={() => rateRecipe(recipe, -1)}
          >
            👎 פחות
          </button>
        </div>

        <div className="recipe-card-actions">
          <button className="ghost-button" onClick={() => addSuggestedMealToToday(recipe)}>
            הוסף לארוחות
          </button>
          <button className="outline-action-button" onClick={() => setSelectedRecipe(recipe)}>
            פרטים מלאים
          </button>
        </div>
      </div>
    </article>
  );

  const renderHomeDashboard = () => (
    <>
      <section className="lux-hero">
        <div className="lux-hero-copy">
          <div className="hero-badge">תזונה מותאמת אישית</div>
          <div className="lux-kicker">Food Care Editorial</div>
          <h1>האתר שלך עכשיו יודע לחשוב, ללמוד ולהכין תפריטים חכמים יותר.</h1>
          <p>
            יש כאן מצב רוח יומי, בוט היכרות, תפריט שבועי, רשימת קניות אוטומטית,
            דירוגים ולמידת העדפות מהבחירות שלך.
          </p>

          <div className="hero-actions">
            <button className="primary-hero-button" onClick={generateDailyMenu}>
              צור תפריט חדש
            </button>
            <button className="secondary-hero-button" onClick={startBot}>
              פתח את הבוט
            </button>
          </div>
        </div>

        <div className="lux-hero-board">
          <div className="lux-board-top">היום שלך בקצרה</div>
          <div className="lux-board-grid">
            <div>
              <strong>{filteredRecipes.length}</strong>
              <span>מנות זמינות</span>
            </div>
            <div>
              <strong>{favorites.length}</strong>
              <span>מועדפים</span>
            </div>
            <div>
              <strong>{meals.length}</strong>
              <span>ארוחות שנשמרו</span>
            </div>
            <div>
              <strong>{shoppingList.length}</strong>
              <span>פריטי קניות</span>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-strip">
        {editorialHighlights.map((item) => (
          <div className="editorial-card" key={item.kicker}>
            <div className="editorial-kicker">{item.kicker}</div>
            <div className="editorial-title">{item.title}</div>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-header editorial-header">
          <div>
            <div className="section-eyebrow">מצב יומי</div>
            <h2>איך אתה מרגיש היום?</h2>
            <p>זה משנה את סדר ההמלצות, את הדירוג ואת הכיוון של הבוט.</p>
          </div>
        </div>
        {renderMoodSelector()}
      </section>

      {botRecommendations.length > 0 && (
        <section className="section-block">
          <div className="section-header editorial-header">
            <div>
              <div className="section-eyebrow">תוצאה מהבוט</div>
              <h2>התפריט שהבוט בנה לך</h2>
              <p>מבוסס על השאלות שענית ועל הטקסט החופשי שלך.</p>
            </div>
          </div>
          <div className="featured-grid">
            {botRecommendations.map((recipe, index) => renderRecipeCard(recipe, index, true))}
          </div>
        </section>
      )}

      <section className="section-block feature-section">
        <div className="section-header editorial-header">
          <div>
            <div className="section-eyebrow">בחירה מודגשת</div>
            <h2>מנות מובילות</h2>
            <p>המערכת לומדת מהדירוגים והעדפות העבר שלך.</p>
          </div>
        </div>
        <div className="featured-grid">
          {featuredRecipes.map((recipe, index) => renderRecipeCard(recipe, index, true))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header editorial-header">
          <div>
            <div className="section-eyebrow">היום שלך</div>
            <h2>תפריט יומי מומלץ</h2>
            <p>המלצות משתנות לפי שעה, מצב רוח, בוט ודירוגים.</p>
          </div>
          <button className="refresh-button" onClick={generateDailyMenu}>
            רענן תפריט
          </button>
        </div>

        {dailyMenu.length > 0 ? (
          <div className="daily-menu-grid">
            {dailyMenu.map((item, index) => (
              <div className="daily-menu-card" key={`${item.title}-${index}`}>
                <div className="daily-menu-topline">{item.title}</div>
                <div className="daily-menu-title">{item.recipe.name}</div>
                <div className="daily-menu-desc">{item.recipe.description}</div>
                <div className="daily-menu-tag">{item.recipe.tag}</div>
                <button
                  className="outline-action-button"
                  onClick={() => addSuggestedMealToToday(item.recipe)}
                >
                  הוספתי ליומן
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">עדיין אין מספיק מאכלים מותרים כדי לייצר תפריט איכותי.</div>
        )}
      </section>

      <section className="home-dual-grid">
        <section className="section-block">
          <div className="section-header editorial-header">
            <div>
              <div className="section-eyebrow">ניווט מהיר</div>
              <h2>סוגי ארוחות</h2>
              <p>לחץ על בוקר, ערב או נשנוש כדי לראות רק מה שרלוונטי כרגע.</p>
            </div>
          </div>

          <div className="search-row">
            <input
              className="text-input search-input"
              placeholder="חפש מנה, מרכיב או תגית"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {renderFilters()}

          {recipesByMealFilter.length > 0 ? (
            <div className="recipe-grid recipe-grid-home">
              {recipesByMealFilter.slice(0, 4).map((recipe, index) =>
                renderRecipeCard(recipe, index, true)
              )}
            </div>
          ) : (
            <div className="empty-state">לא נמצאו כרגע מנות בקטגוריה הזאת.</div>
          )}
        </section>

        <section className="section-block spotlight-panel">
          <div className="section-header editorial-header">
            <div>
              <div className="section-eyebrow">שבוע וקניות</div>
              <h2>פעולות חכמות</h2>
              <p>תכנון שבועי ורשימת קניות בלחיצה אחת.</p>
            </div>
          </div>

          <div className="spotlight-actions">
            <button className="primary-full-button" onClick={generateWeeklyPlan}>
              בנה לי שבוע שלם
            </button>
            <button className="secondary-full-button" onClick={() => setActiveTab("shopping")}>
              פתח רשימת קניות
            </button>
          </div>

          <div className="spotlight-metrics">
            <div className="spotlight-item">
              <span>סטטוס נוכחי</span>
              <strong>{currentUser?.currentStatus}</strong>
            </div>
            <div className="spotlight-item">
              <span>דירוגים</span>
              <strong>{Object.keys(ratings).length}</strong>
            </div>
            <div className="spotlight-item">
              <span>תפריט שבועי</span>
              <strong>{weeklyPlan.length}</strong>
            </div>
            <div className="spotlight-item">
              <span>המלצות בוט</span>
              <strong>{botRecommendations.length}</strong>
            </div>
          </div>
        </section>
      </section>

      {currentUser.currentStatus === "התלקחות" && (
        <section className="warning-box">
          <h3>מצב רגיש יותר זוהה בפרופיל</h3>
          <p>לכן ההמלצות כרגע נוטות למנות רכות יותר, מרקים ואפשרויות פשוטות לעיכול.</p>
          <div className="warning-chips">
            <span>מרק עוף</span>
            <span>מרק דלעת</span>
            <span>פירה</span>
            <span>אורז לבן</span>
            <span>מנות רכות</span>
          </div>
        </section>
      )}
    </>
  );

  const renderMenus = () => (
    <section className="section-block">
      <div className="section-header editorial-header">
        <div>
          <div className="section-eyebrow">מגוון</div>
          <h2>תפריטים מגוונים</h2>
          <p>כל כרטיס כאן הוא שער מהיר לסוג ארוחה אחר.</p>
        </div>
      </div>

      {menuCollections.length > 0 ? (
        <div className="menu-collections-grid">
          {menuCollections.map((section) => (
            <div className="menu-collection-card" key={section.key}>
              <div className="menu-collection-top">
                <h3>{section.title}</h3>
                <p>{section.subtitle}</p>
              </div>

              <div className="menu-collection-list">
                {section.recipes.slice(0, 5).map((recipe) => (
                  <span key={recipe.name}>{recipe.name}</span>
                ))}
              </div>

              <button
                className="primary-full-button"
                onClick={() => {
                  setActiveMealFilter(section.key);
                  setActiveTab("recipes");
                }}
              >
                הצג את המנות
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">עדיין אין מספיק מנות כדי לבנות תפריטים.</div>
      )}
    </section>
  );

  const renderAllRecipes = () => (
    <section className="section-block">
      <div className="section-header editorial-header">
        <div>
          <div className="section-eyebrow">ספריית מנות</div>
          <h2>כל המנות</h2>
          <p>סינון אמיתי לפי סוג הארוחה, בתוספת חיפוש, דירוג ומועדפים.</p>
        </div>
      </div>

      <div className="search-row">
        <input
          className="text-input search-input"
          placeholder="חפש מנה, מרכיב או תגית"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {renderFilters()}
      {renderMoodSelector()}

      {recipesByMealFilter.length > 0 ? (
        <div className="recipe-grid">
          {recipesByMealFilter.map((recipe, index) => renderRecipeCard(recipe, index))}
        </div>
      ) : (
        <div className="empty-state">לא נמצאו כרגע מנות בקטגוריה הזאת.</div>
      )}
    </section>
  );

  const renderFavorites = () => {
    const grouped = {
      בוקר: favoriteRecipes.filter((recipe) => recipe.mealType === "בוקר"),
      צהריים: favoriteRecipes.filter((recipe) => recipe.mealType === "צהריים"),
      ערב: favoriteRecipes.filter((recipe) => recipe.mealType === "ערב"),
      נשנוש: favoriteRecipes.filter((recipe) => recipe.mealType === "נשנוש"),
      מרקים: favoriteRecipes.filter((recipe) => recipe.isSoup),
    };

    return (
      <section className="section-block">
        <div className="section-header editorial-header">
          <div>
            <div className="section-eyebrow">שמור בצד</div>
            <h2>מנות מועדפות</h2>
            <p>ממוינות אוטומטית לפי סוג ארוחה.</p>
          </div>
        </div>

        {favoriteRecipes.length > 0 ? (
          <div className="favorites-groups">
            {Object.entries(grouped).map(([title, items]) =>
              items.length ? (
                <section key={title}>
                  <h3 className="group-title">{title}</h3>
                  <div className="recipe-grid">
                    {items.map((recipe, index) => renderRecipeCard(recipe, index))}
                  </div>
                </section>
              ) : null
            )}
          </div>
        ) : (
          <div className="empty-state">עוד לא סימנת מנות מועדפות.</div>
        )}
      </section>
    );
  };

  const renderWeekPlan = () => (
    <section className="section-block">
      <div className="section-header editorial-header">
        <div>
          <div className="section-eyebrow">תכנון</div>
          <h2>לוח שבועי</h2>
          <p>בנה תפריט שבועי מלא לפי מה שמתאים לך כרגע.</p>
        </div>
        <button className="refresh-button" onClick={generateWeeklyPlan}>
          בנה שבוע מחדש
        </button>
      </div>

      {weeklyPlan.length > 0 ? (
        <div className="week-grid">
          {weeklyPlan.map((day) => (
            <div className="week-card" key={day.day}>
              <div className="week-card-title">{day.day}</div>
              <div className="week-card-list">
                {day.meals.map((meal, index) => (
                  <div className="week-item" key={`${day.day}-${index}`}>
                    <span>{meal.title}</span>
                    <strong>{meal.recipe.name}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">עדיין לא נבנה תפריט שבועי.</div>
      )}
    </section>
  );

  const renderShopping = () => (
    <section className="section-block">
      <div className="section-header editorial-header">
        <div>
          <div className="section-eyebrow">קניות</div>
          <h2>רשימת קניות אוטומטית</h2>
          <p>נבנית מהתפריט השבועי, או מההמלצות האחרונות אם עוד לא בנית שבוע.</p>
        </div>
        <button className="refresh-button" onClick={copyShoppingList}>
          {shoppingCopied ? "הועתק" : "העתק רשימה"}
        </button>
      </div>

      {shoppingList.length > 0 ? (
        <div className="shopping-grid">
          {shoppingList.map((item) => (
            <div className="shopping-item" key={item.name}>
              <span>{item.name}</span>
              <strong>x{item.count}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">אין כרגע רשימת קניות. בנה תפריט יומי או שבועי.</div>
      )}
    </section>
  );

  const renderMeals = () => (
    <section className="section-block">
      <div className="section-header editorial-header">
        <div>
          <div className="section-eyebrow">מעקב</div>
          <h2>יומן ארוחות</h2>
          <p>כתוב מה אכלת ועדכן איך הרגשת אחר כך.</p>
        </div>
      </div>

      <div className="add-meal-box">
        <input
          placeholder="מה אכלת?"
          value={mealInput}
          onChange={(e) => setMealInput(e.target.value)}
          className="text-input"
        />

        <div className="feelings-row">
          <button
            className={`feeling-btn ${mealFeeling === "טוב" ? "active good" : ""}`}
            onClick={() => setMealFeeling("טוב")}
          >
            טוב
          </button>
          <button
            className={`feeling-btn ${mealFeeling === "סביר" ? "active regular" : ""}`}
            onClick={() => setMealFeeling("סביר")}
          >
            סביר
          </button>
          <button
            className={`feeling-btn ${mealFeeling === "לא טוב" ? "active bad" : ""}`}
            onClick={() => setMealFeeling("לא טוב")}
          >
            לא טוב
          </button>
        </div>

        <button className="primary-full-button" onClick={saveMeal}>
          שמור ארוחה
        </button>
      </div>

      {meals.length > 0 ? (
        <div className="meal-history-list">
          {meals.map((meal, index) => (
            <div className="meal-history-card" key={`${meal.name}-${index}`}>
              <div>
                <div className="meal-history-title">{meal.name}</div>
                <div className="meal-history-date">
                  {meal.date ? new Date(meal.date).toLocaleDateString("he-IL") : "היום"}
                </div>
                <div
                  className="meal-history-feeling"
                  style={{ color: getFeelingColor(meal.feeling) }}
                >
                  הרגשתי אחרי זה: {meal.feeling}
                </div>
              </div>

              <div className="meal-history-actions">
                <button onClick={() => updateMealFeeling(index, "טוב")}>טוב</button>
                <button onClick={() => updateMealFeeling(index, "סביר")}>סביר</button>
                <button onClick={() => updateMealFeeling(index, "לא טוב")}>לא טוב</button>
                <button className="delete-btn" onClick={() => deleteMeal(index)}>
                  מחק
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">עדיין לא הוספת ארוחות להיסטוריה שלך.</div>
      )}
    </section>
  );

  const renderProfile = () => (
    <section className="section-block">
      <div className="section-header editorial-header">
        <div>
          <div className="section-eyebrow">התאמה אישית</div>
          <h2>פרופיל אישי</h2>
          <p>עדכן פרטים כדי לחדד את ההמלצות, התפריטים והסינון.</p>
        </div>
      </div>

      <div className="profile-form-grid">
        <input
          placeholder="שם מלא"
          value={currentUser.fullName}
          onChange={(e) => updateCurrentUserField("fullName", e.target.value)}
          className="text-input"
        />

        <input
          placeholder="גיל"
          value={currentUser.age}
          onChange={(e) => updateCurrentUserField("age", e.target.value)}
          className="text-input"
        />

        <select
          value={currentUser.currentStatus}
          onChange={(e) => updateCurrentUserField("currentStatus", e.target.value)}
          className="text-input"
        >
          <option>רמיסיה</option>
          <option>רגיש</option>
          <option>התלקחות</option>
        </select>

        <textarea
          placeholder="מאכלים שבטוחים לי"
          value={currentUser.safeFoods}
          onChange={(e) => updateCurrentUserField("safeFoods", e.target.value)}
          className="text-input text-area"
        />

        <textarea
          placeholder="מאכלים שעושים לי לא טוב"
          value={currentUser.triggerFoods}
          onChange={(e) => updateCurrentUserField("triggerFoods", e.target.value)}
          className="text-input text-area"
        />

        <textarea
          placeholder="הדבק כאן את תקציר התזונאית"
          value={currentUser.nutritionText || ""}
          onChange={(e) => updateCurrentUserField("nutritionText", e.target.value)}
          className="text-input text-area large"
        />

        <button className="secondary-full-button" onClick={saveProfileChanges}>
          נתח מחדש את התקציר
        </button>

        <button className="primary-full-button" onClick={saveProfileChanges}>
          שמור שינויים
        </button>
      </div>
    </section>
  );

  const renderRecipeModal = () => {
    if (!selectedRecipe) return null;

    return (
      <div className="recipe-modal-backdrop" onClick={() => setSelectedRecipe(null)}>
        <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
          <button className="recipe-modal-close" onClick={() => setSelectedRecipe(null)}>
            ✕
          </button>

          <div className="recipe-modal-image-wrap">
            <img alt=""{...recipeImageProps(selectedRecipe)} />
          </div>

          <div className="recipe-modal-content">
            <div className="section-eyebrow">פרטי מנה</div>
            <h3>{selectedRecipe.name}</h3>
            <p>{selectedRecipe.description}</p>

            <div className="recipe-meta-row">
              <span className="meta-chip blue">
                {selectedRecipe.isSoup ? "מרק" : selectedRecipe.mealType}
              </span>
              <span className="meta-chip green">{selectedRecipe.tag}</span>
              <span className="meta-chip sand">{selectedRecipe.prepTime}</span>
            </div>

            <div className="modal-section">
              <strong>מרכיבים</strong>
              <div className="modal-ingredients">
                {selectedRecipe.fullIngredients.map((ingredient) => (
                  <span key={ingredient}>{ingredient}</span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <strong>רמת התאמה</strong>
              <p>בטיחות תזונתית: {selectedRecipe.safeLevel} מתוך 3</p>
            </div>

            <div className="recipe-card-actions">
              <button
                className="ghost-button"
                onClick={() => addSuggestedMealToToday(selectedRecipe)}
              >
                הוסף ליומן
              </button>
              <button
                className="outline-action-button"
                onClick={() => toggleFavorite(selectedRecipe.name)}
              >
                {favorites.includes(selectedRecipe.name) ? "הסר ממועדפים" : "שמור במועדפים"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBotWidget = () => {
    if (!currentUser) return null;

    const showFreeText = botStep >= botQuestions.length;

    return (
      <>
        <button className="bot-launcher" onClick={() => (botOpen ? setBotOpen(false) : startBot())}>
          {botOpen ? "סגור בוט" : "בוט תפריט אישי"}
        </button>

        {botOpen && (
          <div className="bot-panel">
            <div className="bot-panel-header">
              <div>
                <strong>בוט התאמה אישית</strong>
                <span>שיחה קצרה ובניית תפריט אישי.</span>
              </div>
              <button className="bot-reset" onClick={startBot}>
                התחל מחדש
              </button>
            </div>

            <div className="bot-messages">
              {botMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`bot-bubble ${message.role}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            {!showFreeText ? (
              <div className="bot-options">
                {botQuestions[botStep].options.map((option) => (
                  <button
                    key={option}
                    className="bot-option"
                    onClick={() => answerBotQuestion(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <textarea
                  className="text-input text-area"
                  placeholder="כתוב חופשי: בא לי משהו חם ומהיר, או משהו קל לערב..."
                  value={botFreeText}
                  onChange={(e) => setBotFreeText(e.target.value)}
                />
                <button className="primary-full-button" onClick={submitBotFreeText}>
                  בנה לי תפריט מהשיחה
                </button>

                {botRecommendations.length > 0 && (
                  <div className="bot-result-list">
                    {botRecommendations.map((recipe) => (
                      <button
                        key={recipe.name}
                        className="bot-result-chip"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        {recipe.name}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </>
    );
  };

  if (screen === "auth") {
    return (
      <div className="auth-page" dir="rtl">
        <div className="auth-card">
          <div className="brand-mini">Food Care</div>

          {authMode === "login" ? (
            <>
              <h1 className="auth-title">התחברות</h1>
              <p className="auth-subtitle">
                היכנס עם שם המשתמש והסיסמה שלך כדי לראות תפריט מותאם אישית.
              </p>

              <input
                placeholder="שם משתמש"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="text-input"
              />

              <input
                type="password"
                placeholder="סיסמה"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="text-input"
              />

              {authError && <div className="auth-error">{authError}</div>}

              <button className="primary-full-button" onClick={loginUser}>
                התחבר
              </button>

              <button
                className="secondary-full-button"
                onClick={() => {
                  setAuthError("");
                  setAuthMode("register");
                }}
              >
                אין לי משתמש עדיין
              </button>
            </>
          ) : (
            <>
              <h1 className="auth-title">הרשמה</h1>
              <p className="auth-subtitle">
                צור פרופיל אישי והמערכת תתאים לך תפריטים ומנות לפי סוג ארוחה.
              </p>

              <input
                placeholder="שם מלא"
                value={registerData.fullName}
                onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                className="text-input"
              />

              <input
                placeholder="גיל"
                value={registerData.age}
                onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                className="text-input"
              />

              <input
                placeholder="שם משתמש"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                className="text-input"
              />

              <input
                type="password"
                placeholder="סיסמה"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="text-input"
              />

              <select
                value={registerData.diseaseType}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    diseaseType: e.target.value,
                  })
                }
                className="text-input"
              >
                <option>קרוהן</option>
                <option>קוליטיס</option>
              </select>

              <select
                value={registerData.currentStatus}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    currentStatus: e.target.value,
                  })
                }
                className="text-input"
              >
                <option>רמיסיה</option>
                <option>רגיש</option>
                <option>התלקחות</option>
              </select>

              <textarea
                placeholder="מאכלים שבטוחים לי (אופציונלי)"
                value={registerData.safeFoods}
                onChange={(e) => setRegisterData({ ...registerData, safeFoods: e.target.value })}
                className="text-input text-area"
              />

              <textarea
                placeholder="מאכלים שעושים לי לא טוב (אופציונלי)"
                value={registerData.triggerFoods}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    triggerFoods: e.target.value,
                  })
                }
                className="text-input text-area"
              />

              <textarea
                placeholder="הדבק כאן את תקציר התזונאית"
                value={registerData.nutritionText}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    nutritionText: e.target.value,
                  })
                }
                className="text-input text-area large"
              />

              {registerData.nutritionText && (
                <button
                  className="secondary-full-button"
                  onClick={() => {
                    const parsed = parseNutritionText(registerData.nutritionText);
                    setRegisterData((prev) => ({
                      ...prev,
                      allowedFoods: parsed.allowed,
                      forbiddenFoods: parsed.forbidden,
                    }));
                  }}
                >
                  נתח את התקציר
                </button>
              )}

              {registerData.allowedFoods.length > 0 && (
                <div className="chips-wrap">
                  {registerData.allowedFoods.map((food, index) => (
                    <span className="chip allowed" key={`allowed-${index}`}>
                      {food}
                    </span>
                  ))}
                </div>
              )}

              {registerData.forbiddenFoods.length > 0 && (
                <div className="chips-wrap">
                  {registerData.forbiddenFoods.map((food, index) => (
                    <span className="chip forbidden" key={`forbidden-${index}`}>
                      {food}
                    </span>
                  ))}
                </div>
              )}

              {authError && <div className="auth-error">{authError}</div>}

              <button className="primary-full-button" onClick={registerUser}>
                צור משתמש
              </button>

              <button
                className="secondary-full-button"
                onClick={() => {
                  setAuthError("");
                  setAuthMode("login");
                }}
              >
                כבר יש לי משתמש
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="app-shell" dir="rtl">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">🍽</div>
            <div>
              <div className="sidebar-brand-title">Food Care</div>
              <div className="sidebar-brand-subtitle">תפריט מותאם אישית עבורך</div>
            </div>
          </div>

          <div className="profile-card">
            <div className="avatar-circle">👤</div>
            <div className="profile-label">שלום!</div>
            <div className="profile-name">{currentUser?.fullName}</div>
            <div className="profile-meta">גיל: {currentUser?.age || "-"}</div>
            <div className="profile-status">
              סטטוס: <span>{currentUser?.currentStatus}</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`sidebar-nav-item ${activeTab === item.key ? "active" : ""}`}
                onClick={() => setActiveTab(item.key)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="side-info-card">
            <div className="side-info-title">סטטוס תזונתי</div>
            <div className="side-info-row">
              <strong>מחלה:</strong> {currentUser?.diseaseType}
            </div>
            <div className="side-info-row">
              <strong>מאכלים מותרים:</strong> {currentUser?.allowedFoods?.length || 0}
            </div>
            <div className="side-info-note">
              הסינון של המנות מתבצע לפי הפרופיל, הסטטוס, ההעדפות והבוט האישי.
            </div>
          </div>

          <div className="side-count-card allowed-card">
            <span>מתכונים זמינים</span>
            <strong>{filteredRecipes.length}</strong>
          </div>

          <div className="side-count-card forbidden-card">
            <span>מועדפים</span>
            <strong>{favorites.length}</strong>
          </div>

          <div className="side-tip-card">
            <div className="side-tip-title">טיפ יומי</div>
            <p>פתח את הבוט, ענה על כמה שאלות, ותן לו לבנות לך כיוון לארוחות.</p>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div className="topbar-left">
              <button className="topbar-btn" onClick={logoutUser}>
                התנתק
              </button>
            </div>

            <div className="topbar-right">
              <div className="topbar-brand">
                <div className="topbar-title">חוויית אוכל חכמה ומותאמת אישית</div>
                <div className="topbar-subtitle">
                  שבועי, קניות, דירוגים, בוט אישי ומצב רוח יומי
                </div>
              </div>
              <div className="topbar-plus">✦</div>
            </div>
          </header>

          {activeTab === "home" && renderHomeDashboard()}
          {activeTab === "menus" && renderMenus()}
          {activeTab === "recipes" && renderAllRecipes()}
          {activeTab === "favorites" && renderFavorites()}
          {activeTab === "week" && renderWeekPlan()}
          {activeTab === "shopping" && renderShopping()}
          {activeTab === "addMeal" && renderMeals()}
          {activeTab === "profile" && renderProfile()}
        </main>
      </div>

      {renderRecipeModal()}
      {renderBotWidget()}
    </>
  );
}
