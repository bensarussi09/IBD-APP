import React, { useEffect, useMemo, useState } from "react";

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
    name: "קערת אורז לבן עם חזה עוף וגזר מבושל",
    ingredients: ["אורז", "עוף", "גזר"],
    fullIngredients: ["אורז לבן", "חזה עוף", "גזר מבושל", "מעט מלח", "מעט שמן זית"],
    description: "ארוחה עדינה, מסודרת ומאוזנת שמתאימה להרבה ימים רגישים.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "מרק עוף עדין עם תפוח אדמה וקישוא",
    ingredients: ["עוף", "תפוח אדמה", "קישוא", "מרק"],
    fullIngredients: ["חזה עוף", "תפוח אדמה", "קישוא", "מים", "מעט מלח", "כורכום"],
    description: "מרק חם, בסיסי ומנחם לימים רגישים יותר.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "פירה עם דג לבן אפוי וגזר",
    ingredients: ["תפוח אדמה", "דג", "גזר"],
    fullIngredients: ["פירה מתפוח אדמה", "דג לבן אפוי", "גזר מבושל", "מעט שמן זית", "מלח"],
    description: "ארוחה רכה ונוחה לעיכול עם חלבון ופחמימה פשוטה.",
    mealType: "ערב",
    safeLevel: 3,
  },
  {
    name: "חביתה עם לחם לבן ואבוקדו עדין",
    ingredients: ["ביצה", "לחם לבן", "אבוקדו"],
    fullIngredients: ["2 ביצים", "לחם לבן", "מעט אבוקדו בשל", "מעט מלח"],
    description: "בוקר מסודר ומשביע עם מרקם עדין יחסית.",
    mealType: "בוקר",
    safeLevel: 2,
  },
  {
    name: "דייסת שיבולת שועל עם בננה מבושלת קלות",
    ingredients: ["שיבולת שועל", "בננה", "מים"],
    fullIngredients: ["שיבולת שועל", "בננה", "מים", "מעט קינמון אם מתאים"],
    description: "בוקר רך ונעים כשצריך משהו פשוט יותר.",
    mealType: "בוקר",
    safeLevel: 2,
  },
  {
    name: "אטריות עם עוף טחון וקישוא רך",
    ingredients: ["אטריות", "עוף טחון", "קישוא"],
    fullIngredients: ["אטריות", "עוף טחון", "קישוא מבושל", "מעט שמן זית", "מלח"],
    description: "מנה קלה יחסית עם מרקם רך יותר.",
    mealType: "צהריים",
    safeLevel: 2,
  },
  {
    name: "אורז עם דג לבן ותפוח אדמה מבושל",
    ingredients: ["אורז", "דג", "תפוח אדמה"],
    fullIngredients: ["אורז לבן", "דג לבן", "תפוח אדמה מבושל", "מעט מלח", "שמן זית"],
    description: "שילוב עדין ויציב שמתאים לארוחת צהריים או ערב מוקדם.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "קערת אורז עם הודו וגזר",
    ingredients: ["אורז", "הודו", "גזר"],
    fullIngredients: ["אורז לבן", "הודו", "גזר מבושל", "מעט שמן זית", "מלח"],
    description: "חלופה טובה לעוף למי שמחפש קצת גיוון.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "מרק קישוא, גזר ותפוח אדמה",
    ingredients: ["קישוא", "גזר", "תפוח אדמה", "מרק"],
    fullIngredients: ["קישוא", "גזר", "תפוח אדמה", "מים", "מעט מלח", "כורכום"],
    description: "מרק ירקות עדין וחם שמתאים במיוחד לערב.",
    mealType: "ערב",
    safeLevel: 3,
  },
  {
    name: "טוסט עדין עם ביצה קשה",
    ingredients: ["טוסט", "ביצה"],
    fullIngredients: ["טוסט", "ביצה קשה", "מעט מלח"],
    description: "ערב קליל יחסית כשצריך משהו מהיר ומוכר.",
    mealType: "ערב",
    safeLevel: 2,
  },
  {
    name: "פסטה פשוטה עם עוף וגזר",
    ingredients: ["פסטה", "עוף", "גזר"],
    fullIngredients: ["פסטה", "חזה עוף", "גזר מבושל", "מעט שמן זית", "מלח"],
    description: "מנה מעט יותר משביעה אך עדיין די פשוטה.",
    mealType: "צהריים",
    safeLevel: 1,
  },
  {
    name: "דג לבן עם פירה וקישוא",
    ingredients: ["דג", "פירה", "קישוא"],
    fullIngredients: ["דג לבן", "פירה", "קישוא מבושל", "מעט מלח", "שמן זית"],
    description: "שילוב ערב מסודר עם מרקמים רכים ונוחים.",
    mealType: "ערב",
    safeLevel: 3,
  },
  {
    name: "יוגורט עם בננה ושיבולת שועל עדינה",
    ingredients: ["יוגורט", "בננה", "שיבולת שועל"],
    fullIngredients: ["יוגורט טבעי", "בננה", "מעט שיבולת שועל"],
    description: "בוקר או ביניים למי שמוצרי חלב מתאימים לו.",
    mealType: "בוקר",
    safeLevel: 1,
  },
  {
    name: "צנים עם אבוקדו וביצה",
    ingredients: ["צנים", "אבוקדו", "ביצה"],
    fullIngredients: ["צנים", "אבוקדו בשל", "ביצה קשה", "מעט מלח"],
    description: "נשנוש משביע או ארוחת ערב קטנה.",
    mealType: "נשנוש",
    safeLevel: 2,
  },
  {
    name: "קרקרים עם גבינה עדינה וביצה קשה",
    ingredients: ["קרקרים", "גבינה", "ביצה"],
    fullIngredients: ["קרקרים פשוטים", "גבינה עדינה", "ביצה קשה"],
    description: "ביניים מסודר למי שמוצרי חלב מתאימים לו.",
    mealType: "נשנוש",
    safeLevel: 1,
  },
  {
    name: "בננה עם יוגורט",
    ingredients: ["בננה", "יוגורט"],
    fullIngredients: ["בננה", "יוגורט טבעי"],
    description: "פתרון ביניים פשוט, לא ארוחה מרכזית.",
    mealType: "נשנוש",
    safeLevel: 1,
  },
  {
    name: "פירה עם עוף טחון",
    ingredients: ["פירה", "עוף טחון"],
    fullIngredients: ["פירה מתפוח אדמה", "עוף טחון", "מעט מלח", "שמן זית"],
    description: "שילוב רך יחסית לימים רגישים יותר.",
    mealType: "ערב",
    safeLevel: 3,
  },
  {
    name: "אורז עם ביצה קשה וגזר",
    ingredients: ["אורז", "ביצה", "גזר"],
    fullIngredients: ["אורז לבן", "ביצה קשה", "גזר מבושל", "מעט מלח"],
    description: "שילוב בסיסי ופשוט כשצריך משהו מוכר.",
    mealType: "ערב",
    safeLevel: 2,
  },
];

export default function App() {
  const [screen, setScreen] = useState("auth");
  const [authMode, setAuthMode] = useState("login");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
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
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [, setDailyFeeling] = useState("");
  const [mealInput, setMealInput] = useState("");
  const [mealFeeling, setMealFeeling] = useState("");
  const [meals, setMeals] = useState([]);
  const [dailyMenu, setDailyMenu] = useState([]);

  useEffect(() => {
    const savedUsername = localStorage.getItem("currentUser");
    if (savedUsername) {
      const users = getUsers();
      const foundUser = users.find((u) => u.username === savedUsername);
      if (foundUser) {
        setCurrentUser(foundUser);
        setScreen("home");
        loadUserMeals(foundUser.username);
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`meals_${currentUser.username}`, JSON.stringify(meals));
    }
  }, [meals, currentUser]);

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const loadUserMeals = (username) => {
    const savedMeals = localStorage.getItem(`meals_${username}`);
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    } else {
      setMeals([]);
    }
  };

  const normalizeFood = (food) => {
    return food
      .trim()
      .replace(/\./g, "")
      .replace(/:/g, "")
      .replace(/;/g, "")
      .replace(/\s+/g, " ")
      .replace(/\u200f/g, "")
      .replace(/\u200e/g, "")
      .trim();
  };

  const splitFoods = (text) => {
    return text
      .split(/,|،|\n|\/|-|•/)
      .map((item) => normalizeFood(item))
      .filter(Boolean)
      .filter((item) => item.length > 1);
  };

  const uniqueArray = (arr) => {
    return [...new Set(arr.filter(Boolean))];
  };

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

      const hasAllowedKeyword = allowedKeywords.some((keyword) =>
        lower.includes(keyword)
      );

      const hasForbiddenKeyword = forbiddenKeywords.some((keyword) =>
        lower.includes(keyword)
      );

      if (hasAllowedKeyword) currentMode = "allowed";
      if (hasForbiddenKeyword) currentMode = "forbidden";

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

      if (currentMode === "allowed") {
        allowed.push(...detectedParts);
      }

      if (currentMode === "forbidden") {
        forbidden.push(...detectedParts);
      }
    });

    return {
      allowed: uniqueArray(allowed),
      forbidden: uniqueArray(forbidden),
    };
  };

  const registerUser = () => {
    setAuthError("");

    if (
      !registerData.username.trim() ||
      !registerData.password.trim() ||
      !registerData.fullName.trim()
    ) {
      setAuthError("יש למלא לפחות שם מלא, שם משתמש וסיסמה");
      return;
    }

    const users = getUsers();
    const exists = users.find(
      (user) => user.username === registerData.username.trim()
    );

    if (exists) {
      setAuthError("שם המשתמש כבר קיים");
      return;
    }

    const parsed = parseNutritionText(registerData.nutritionText || "");

    const newUser = {
      ...registerData,
      username: registerData.username.trim(),
      password: registerData.password.trim(),
      fullName: registerData.fullName.trim(),
      allowedFoods: uniqueArray([
        ...parsed.allowed,
        ...splitFoods(registerData.safeFoods).filter((item) =>
          foodBank.some((food) => normalizeFood(food) === normalizeFood(item))
        ),
      ]),
      forbiddenFoods: uniqueArray([
        ...parsed.forbidden,
        ...splitFoods(registerData.triggerFoods).filter((item) =>
          foodBank.some((food) => normalizeFood(food) === normalizeFood(item))
        ),
      ]),
    };

    saveUsers([...users, newUser]);
    localStorage.setItem("currentUser", newUser.username);
    setCurrentUser(newUser);
    setMeals([]);
    setScreen("home");

    setRegisterData({
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
    });
  };

  const loginUser = () => {
    setAuthError("");

    if (!loginData.username.trim() || !loginData.password.trim()) {
      setAuthError("יש למלא שם משתמש וסיסמה");
      return;
    }

    const users = getUsers();
    const foundUser = users.find(
      (user) =>
        user.username === loginData.username.trim() &&
        user.password === loginData.password.trim()
    );

    if (!foundUser) {
      setAuthError("שם משתמש או סיסמה לא נכונים");
      return;
    }

    localStorage.setItem("currentUser", foundUser.username);
    setCurrentUser(foundUser);
    loadUserMeals(foundUser.username);
    setScreen("home");
    setLoginData({ username: "", password: "" });
  };

  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMeals([]);
    setDailyFeeling("");
    setMealInput("");
    setMealFeeling("");
    setDailyMenu([]);
    setScreen("auth");
  };

  const saveMeal = () => {
    if (mealInput.trim() === "" || mealFeeling === "") return;

    const newMeal = {
      name: mealInput,
      feeling: mealFeeling,
    };

    setMeals([...meals, newMeal]);
    setMealInput("");
    setMealFeeling("");
    setScreen("home");
  };

  const addSuggestedMealToToday = (recipe) => {
    const alreadyExists = meals.some((meal) => meal.name === recipe.name);
    if (alreadyExists) return;

    const newMeal = {
      name: recipe.name,
      feeling: "עוד לא סימנתי",
    };

    setMeals((prev) => [...prev, newMeal]);
  };

  const updateMealFeeling = (indexToUpdate, newFeeling) => {
    const updatedMeals = meals.map((meal, index) =>
      index === indexToUpdate ? { ...meal, feeling: newFeeling } : meal
    );
    setMeals(updatedMeals);
  };

  const deleteMeal = (indexToDelete) => {
    setMeals(meals.filter((_, index) => index !== indexToDelete));
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
    setScreen("home");
  };

  const filteredRecipes = useMemo(() => {
    if (!currentUser) return [];

    const allowed = (currentUser.allowedFoods || []).map((f) => normalizeFood(f));
    const forbidden = (currentUser.forbiddenFoods || []).map((f) =>
      normalizeFood(f)
    );

    let minSafeLevel = 1;
    if (currentUser.currentStatus === "רגיש") minSafeLevel = 2;
    if (currentUser.currentStatus === "התלקחות") minSafeLevel = 3;

    return recipeLibrary.filter((recipe) => {
      const normalizedIngredients = recipe.ingredients.map((i) =>
        normalizeFood(i)
      );

      const allAllowed = normalizedIngredients.every((ingredient) =>
        allowed.includes(ingredient)
      );

      const hasForbidden = normalizedIngredients.some((ingredient) =>
        forbidden.includes(ingredient)
      );

      const matchesSafety = recipe.safeLevel >= minSafeLevel;

      return allAllowed && !hasForbidden && matchesSafety;
    });
  }, [currentUser]);

  const shuffleArray = (array) => {
    const copied = [...array];
    for (let i = copied.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  };

  const generateDailyMenu = () => {
    if (!filteredRecipes.length) {
      setDailyMenu([]);
      return;
    }

    const breakfastOptions = filteredRecipes.filter(
      (recipe) => recipe.mealType === "בוקר"
    );
    const lunchOptions = filteredRecipes.filter(
      (recipe) => recipe.mealType === "צהריים"
    );
    const dinnerOptions = filteredRecipes.filter(
      (recipe) => recipe.mealType === "ערב"
    );
    const snackOptions = filteredRecipes.filter(
      (recipe) => recipe.mealType === "נשנוש"
    );

    const fallback = shuffleArray(filteredRecipes);

    const pickOne = (arr, fallbackIndex) =>
      arr.length ? shuffleArray(arr)[0] : fallback[fallbackIndex] || null;

    const breakfast = pickOne(breakfastOptions, 0);
    const lunch = pickOne(lunchOptions, 1);
    const dinner = pickOne(dinnerOptions, 2);
    const snack = pickOne(snackOptions, 3);

    const menu = [
      { title: "ארוחת בוקר", recipe: breakfast },
      { title: "ארוחת צהריים", recipe: lunch },
      { title: "ארוחת ערב", recipe: dinner },
      { title: "נשנוש / ביניים", recipe: snack },
    ].filter((item) => item.recipe);

    setDailyMenu(menu);
  };

  useEffect(() => {
    if (filteredRecipes.length > 0) {
      generateDailyMenu();
    } else {
      setDailyMenu([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, filteredRecipes.length]);

  const getFeelingColor = (value) => {
    if (value === "טוב") return "#15803d";
    if (value === "סביר") return "#b45309";
    if (value === "לא טוב") return "#dc2626";
    if (value === "עוד לא סימנתי") return "#64748b";
    return "#64748b";
  };

  const pageBackground = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f4fbff 0%, #eefaf8 45%, #f8fafc 100%)",
    fontFamily: "Arial, sans-serif",
  };

  const pageContainer = {
    maxWidth: "470px",
    margin: "0 auto",
  };

  const authWrapper = {
    ...pageBackground,
    padding: "22px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const appWrapper = {
    ...pageBackground,
    padding: "20px 16px 30px",
  };

  const authCard = {
    background: "rgba(255,255,255,0.96)",
    borderRadius: "30px",
    padding: "26px",
    boxShadow: "0 20px 45px rgba(15,23,42,0.08)",
    border: "1px solid #dbeafe",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.96)",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 14px 34px rgba(15,23,42,0.07)",
    marginBottom: "16px",
    border: "1px solid #e2e8f0",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "16px",
    border: "1px solid #dbe4ea",
    fontSize: "16px",
    boxSizing: "border-box",
    marginBottom: "12px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fcfeff",
    color: "#0f172a",
    outline: "none",
  };

  const mainButton = {
    padding: "14px 18px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
    color: "white",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    width: "100%",
    marginTop: "14px",
    boxShadow: "0 12px 24px rgba(14,165,233,0.18)",
  };

  const secondaryButton = {
    padding: "12px 18px",
    borderRadius: "16px",
    border: "1px solid #dbe4ea",
    backgroundColor: "white",
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  };

  const feelingButtonStyle = (value, selectedValue) => ({
    padding: "11px 16px",
    borderRadius: "14px",
    border:
      selectedValue === value ? "2px solid #0ea5e9" : "1px solid #d1d5db",
    backgroundColor: selectedValue === value ? "#eff6ff" : "white",
    color: "#0f172a",
    fontSize: "15px",
    cursor: "pointer",
    minWidth: "88px",
    fontWeight: "700",
  });

  const smallFeelingButtonStyle = (value, selectedValue) => ({
    padding: "8px 10px",
    borderRadius: "12px",
    border:
      selectedValue === value ? "2px solid #0ea5e9" : "1px solid #d1d5db",
    backgroundColor: selectedValue === value ? "#eff6ff" : "white",
    color: "#0f172a",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "700",
  });

  const chipAllowed = {
    backgroundColor: "#ecfeff",
    color: "#0f766e",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    border: "1px solid #a5f3fc",
    fontWeight: "700",
  };

  const chipForbidden = {
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "14px",
    border: "1px solid #fecaca",
    fontWeight: "700",
  };

  if (screen === "auth") {
    return (
      <div dir="rtl" style={authWrapper}>
        <div style={{ maxWidth: "470px", width: "100%" }}>
          {authMode === "login" ? (
            <div style={authCard}>
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "14px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "#ecfeff",
                  color: "#0f766e",
                  fontSize: "13px",
                  fontWeight: "700",
                  border: "1px solid #a5f3fc",
                }}
              >
                IBD Nutrition Assistant
              </div>

              <h1
                style={{
                  marginTop: 0,
                  marginBottom: "8px",
                  fontSize: "34px",
                  color: "#0f172a",
                }}
              >
                התחברות
              </h1>

              <p
                style={{
                  marginTop: 0,
                  marginBottom: "20px",
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                היכנס עם שם המשתמש והסיסמה שלך כדי לקבל תפריט יומי, מתכונים
                ומעקב אישי.
              </p>

              <input
                placeholder="שם משתמש"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                style={inputStyle}
              />

              <input
                type="password"
                placeholder="סיסמה"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                style={inputStyle}
              />

              {authError && (
                <div
                  style={{
                    marginTop: "12px",
                    color: "#dc2626",
                    fontSize: "14px",
                    backgroundColor: "#fef2f2",
                    padding: "12px",
                    borderRadius: "14px",
                    border: "1px solid #fecaca",
                    fontWeight: "600",
                  }}
                >
                  {authError}
                </div>
              )}

              <button style={mainButton} onClick={loginUser}>
                התחבר
              </button>

              <button
                style={secondaryButton}
                onClick={() => {
                  setAuthError("");
                  setAuthMode("register");
                }}
              >
                אין לי משתמש עדיין
              </button>
            </div>
          ) : (
            <div style={authCard}>
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "14px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "#ecfeff",
                  color: "#0f766e",
                  fontSize: "13px",
                  fontWeight: "700",
                  border: "1px solid #a5f3fc",
                }}
              >
                פתיחת משתמש חדש
              </div>

              <h1
                style={{
                  marginTop: 0,
                  marginBottom: "8px",
                  fontSize: "34px",
                  color: "#0f172a",
                }}
              >
                הרשמה
              </h1>

              <p
                style={{
                  marginTop: 0,
                  marginBottom: "20px",
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.6",
                }}
              >
                צור פרופיל אישי, הזן הנחיות תזונה, והמערכת תבנה לך המלצות
                מתאימות יותר.
              </p>

              <input
                placeholder="שם מלא"
                value={registerData.fullName}
                onChange={(e) =>
                  setRegisterData({ ...registerData, fullName: e.target.value })
                }
                style={inputStyle}
              />

              <input
                placeholder="גיל"
                value={registerData.age}
                onChange={(e) =>
                  setRegisterData({ ...registerData, age: e.target.value })
                }
                style={inputStyle}
              />

              <input
                placeholder="שם משתמש"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                style={inputStyle}
              />

              <input
                type="password"
                placeholder="סיסמה"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                style={inputStyle}
              />

              <select
                value={registerData.diseaseType}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    diseaseType: e.target.value,
                  })
                }
                style={inputStyle}
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
                style={inputStyle}
              >
                <option>רמיסיה</option>
                <option>רגיש</option>
                <option>התלקחות</option>
              </select>

              <textarea
                placeholder="מאכלים שבטוחים לי (אופציונלי)"
                value={registerData.safeFoods}
                onChange={(e) =>
                  setRegisterData({ ...registerData, safeFoods: e.target.value })
                }
                style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
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
                style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
              />

              <textarea
                placeholder="הדבק כאן את תקציר התזונאית. לדוגמה: מומלץ לאכול אורז, עוף, בננה ותפוח אדמה. אסור לאכול מטוגן, חריף ומוצרי חלב."
                value={registerData.nutritionText}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    nutritionText: e.target.value,
                  })
                }
                style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
              />

              {registerData.nutritionText && (
                <div style={{ marginBottom: "12px" }}>
                  <button
                    style={secondaryButton}
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
                </div>
              )}

              {registerData.allowedFoods.length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      fontWeight: "800",
                      marginBottom: "8px",
                      color: "#0f172a",
                    }}
                  >
                    מאכלים מותרים:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {registerData.allowedFoods.map((food, index) => (
                      <span key={index} style={chipAllowed}>
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {registerData.forbiddenFoods.length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      fontWeight: "800",
                      marginBottom: "8px",
                      color: "#0f172a",
                    }}
                  >
                    מאכלים אסורים:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {registerData.forbiddenFoods.map((food, index) => (
                      <span key={index} style={chipForbidden}>
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {authError && (
                <div
                  style={{
                    marginTop: "12px",
                    color: "#dc2626",
                    fontSize: "14px",
                    backgroundColor: "#fef2f2",
                    padding: "12px",
                    borderRadius: "14px",
                    border: "1px solid #fecaca",
                    fontWeight: "600",
                  }}
                >
                  {authError}
                </div>
              )}

              <button style={mainButton} onClick={registerUser}>
                צור משתמש
              </button>

              <button
                style={secondaryButton}
                onClick={() => {
                  setAuthError("");
                  setAuthMode("login");
                }}
              >
                כבר יש לי משתמש
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={appWrapper}>
      <div style={pageContainer}>
        {screen === "home" && currentUser && (
          <>
            <div
              style={{
                background: "linear-gradient(135deg, #0284c7, #14b8a6)",
                color: "white",
                borderRadius: "28px",
                padding: "24px",
                boxShadow: "0 18px 38px rgba(2,132,199,0.18)",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "10px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.18)",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                תזונה מותאמת אישית
              </div>

              <div style={{ fontSize: "14px", opacity: 0.95, marginBottom: "8px" }}>
                שלום {currentUser.fullName}
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                  lineHeight: "1.15",
                  fontWeight: "800",
                }}
              >
                מה בטוח לי לאכול היום?
              </h1>

              <div style={{ marginTop: "14px", fontSize: "15px" }}>
                מצב נוכחי: <strong>{currentUser.currentStatus}</strong>
              </div>

              <div style={{ marginTop: "6px", fontSize: "15px" }}>
                אבחנה: <strong>{currentUser.diseaseType}</strong>
              </div>
            </div>

            <div style={cardStyle}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "8px",
                  fontSize: "23px",
                  color: "#0f172a",
                }}
              >
                תפריט יומי מומלץ
              </h3>

              <p
                style={{
                  marginTop: 0,
                  marginBottom: "16px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                בנוי רק מתוך המאכלים שהמערכת זיהתה כמתאימים לך ובהתאם למצב
                הנוכחי שלך.
              </p>

              {dailyMenu.length > 0 ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  {dailyMenu.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: "linear-gradient(180deg, #f8fdff, #f0fdfa)",
                        border: "1px solid #bae6fd",
                        borderRadius: "18px",
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "800",
                          color: "#0369a1",
                          marginBottom: "6px",
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          fontSize: "19px",
                          fontWeight: "800",
                          color: "#0f172a",
                          marginBottom: "8px",
                        }}
                      >
                        {item.recipe.name}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "#475569",
                          marginBottom: "8px",
                          lineHeight: "1.6",
                        }}
                      >
                        {item.recipe.description}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "#0f766e",
                          fontWeight: "700",
                          marginBottom: "12px",
                          lineHeight: "1.6",
                        }}
                      >
                        רכיבים: {(item.recipe.fullIngredients || item.recipe.ingredients).join(", ")}
                      </div>

                      <button
                        onClick={() => addSuggestedMealToToday(item.recipe)}
                        style={{
                          background: "linear-gradient(135deg, #0284c7, #14b8a6)",
                          color: "white",
                          border: "none",
                          padding: "11px 15px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "800",
                        }}
                      >
                        אכלתי את זה
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#64748b", margin: 0, lineHeight: "1.6" }}>
                  עדיין אין מספיק מאכלים מותרים כדי לייצר תפריט איכותי.
                </p>
              )}

              <button style={mainButton} onClick={generateDailyMenu}>
                תן לי תפריט חדש
              </button>
            </div>

            <div style={cardStyle}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "8px",
                  fontSize: "23px",
                  color: "#0f172a",
                }}
              >
                מנות שמתאימות לך
              </h3>

              <p
                style={{
                  marginTop: 0,
                  marginBottom: "16px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                כאן תראה מנות יותר מלאות ורלוונטיות, לא רק שילובים קטנים.
              </p>

              {filteredRecipes.length > 0 ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  {filteredRecipes.map((recipe, index) => (
                    <div
                      key={index}
                      style={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "18px",
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "800",
                          color: "#0f172a",
                          marginBottom: "8px",
                        }}
                      >
                        {recipe.name}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "#475569",
                          marginBottom: "8px",
                          lineHeight: "1.6",
                        }}
                      >
                        {recipe.description}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "#0f766e",
                          fontWeight: "700",
                          lineHeight: "1.6",
                        }}
                      >
                        רכיבים מלאים: {(recipe.fullIngredients || recipe.ingredients).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#64748b", margin: 0 }}>
                  עדיין אין מספיק מאכלים מותרים כדי להציע מנות.
                </p>
              )}
            </div>

            <div style={cardStyle}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "22px",
                  color: "#0f172a",
                }}
              >
                מאכלים מותרים שזוהו
              </h3>

              {currentUser.allowedFoods && currentUser.allowedFoods.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {currentUser.allowedFoods.map((food, index) => (
                    <span key={index} style={chipAllowed}>
                      {food}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#64748b", margin: 0 }}>
                  עדיין לא זוהו מאכלים מותרים.
                </p>
              )}
            </div>

            <div style={cardStyle}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "22px",
                  color: "#0f172a",
                }}
              >
                מה אכלתי היום
              </h3>

              {meals.length === 0 ? (
                <p style={{ color: "#64748b", margin: 0 }}>
                  עדיין לא הוספת ארוחות.
                </p>
              ) : (
                <div style={{ display: "grid", gap: "10px" }}>
                  {meals.map((meal, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "14px",
                        background: "#ffffff",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: "800",
                          color: "#0f172a",
                        }}
                      >
                        {meal.name}
                      </div>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: getFeelingColor(meal.feeling),
                          marginBottom: "10px",
                        }}
                      >
                        הרגשתי אחרי זה: {meal.feeling}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                          marginBottom: "10px",
                        }}
                      >
                        <button
                          style={smallFeelingButtonStyle("טוב", meal.feeling)}
                          onClick={() => updateMealFeeling(index, "טוב")}
                        >
                          טוב
                        </button>
                        <button
                          style={smallFeelingButtonStyle("סביר", meal.feeling)}
                          onClick={() => updateMealFeeling(index, "סביר")}
                        >
                          סביר
                        </button>
                        <button
                          style={smallFeelingButtonStyle("לא טוב", meal.feeling)}
                          onClick={() => updateMealFeeling(index, "לא טוב")}
                        >
                          לא טוב
                        </button>
                      </div>

                      <button
                        onClick={() => deleteMeal(index)}
                        style={{
                          backgroundColor: "#fee2e2",
                          color: "#dc2626",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        מחק
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button style={mainButton} onClick={() => setScreen("addMeal")}>
                הוספת ארוחה
              </button>
            </div>

            <button style={secondaryButton} onClick={() => setScreen("profile")}>
              עריכת פרופיל
            </button>

            <button style={secondaryButton} onClick={logoutUser}>
              התנתק
            </button>
          </>
        )}

        {screen === "addMeal" && (
          <div style={cardStyle}>
            <h1
              style={{
                marginTop: 0,
                fontSize: "30px",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              הוספת ארוחה
            </h1>

            <p
              style={{
                color: "#64748b",
                marginBottom: "14px",
                lineHeight: "1.6",
              }}
            >
              כתוב מה אכלת ואיך הרגשת אחריה.
            </p>

            <input
              placeholder="מה אכלת?"
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              style={inputStyle}
            />

            <h3
              style={{
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "20px",
                color: "#0f172a",
              }}
            >
              איך הרגשת אחרי האוכל?
            </h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "8px",
              }}
            >
              <button
                style={feelingButtonStyle("טוב", mealFeeling)}
                onClick={() => setMealFeeling("טוב")}
              >
                טוב
              </button>
              <button
                style={feelingButtonStyle("סביר", mealFeeling)}
                onClick={() => setMealFeeling("סביר")}
              >
                סביר
              </button>
              <button
                style={feelingButtonStyle("לא טוב", mealFeeling)}
                onClick={() => setMealFeeling("לא טוב")}
              >
                לא טוב
              </button>
            </div>

            <button style={mainButton} onClick={saveMeal}>
              שמור ארוחה
            </button>

            <button style={secondaryButton} onClick={() => setScreen("home")}>
              חזור
            </button>
          </div>
        )}

        {screen === "profile" && currentUser && (
          <div style={cardStyle}>
            <h1
              style={{
                marginTop: 0,
                fontSize: "30px",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              עריכת פרופיל
            </h1>

            <input
              placeholder="שם מלא"
              value={currentUser.fullName}
              onChange={(e) => updateCurrentUserField("fullName", e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="גיל"
              value={currentUser.age}
              onChange={(e) => updateCurrentUserField("age", e.target.value)}
              style={inputStyle}
            />

            <select
              value={currentUser.currentStatus}
              onChange={(e) =>
                updateCurrentUserField("currentStatus", e.target.value)
              }
              style={inputStyle}
            >
              <option>רמיסיה</option>
              <option>רגיש</option>
              <option>התלקחות</option>
            </select>

            <textarea
              placeholder="מאכלים שבטוחים לי"
              value={currentUser.safeFoods}
              onChange={(e) =>
                updateCurrentUserField("safeFoods", e.target.value)
              }
              style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
            />

            <textarea
              placeholder="מאכלים שעושים לי לא טוב"
              value={currentUser.triggerFoods}
              onChange={(e) =>
                updateCurrentUserField("triggerFoods", e.target.value)
              }
              style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
            />

            <textarea
              placeholder="הדבק כאן את תקציר התזונאית"
              value={currentUser.nutritionText || ""}
              onChange={(e) =>
                updateCurrentUserField("nutritionText", e.target.value)
              }
              style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
            />

            <button style={secondaryButton} onClick={saveProfileChanges}>
              נתח מחדש את התקציר
            </button>

            <button style={mainButton} onClick={saveProfileChanges}>
              שמור שינויים
            </button>

            <button style={secondaryButton} onClick={() => setScreen("home")}>
              חזור
            </button>
          </div>
        )}
      </div>
    </div>
  );
}