import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

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
    name: "טוסט עם אבוקדו וביצה",
    ingredients: ["טוסט", "אבוקדו", "ביצה"],
    fullIngredients: ["טוסט", "אבוקדו בשל", "ביצה", "מעט מלח"],
    description: "לחם קלוי עם אבוקדו, ביצה קשה ומרקם נעים.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "עשיר בחלבון",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "דייסת שיבולת שועל עם בננה",
    ingredients: ["דייסה", "שיבולת שועל", "בננה"],
    fullIngredients: ["דייסת שיבולת שועל", "בננה", "מעט מים"],
    description: "דייסה חמה, רכה ונעימה לבוקר רגוע יותר.",
    mealType: "בוקר",
    safeLevel: 2,
    isSoup: false,
    tag: "בוקר רגוע",
    image:
      "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "יוגורט עם בננה ושיבולת שועל",
    ingredients: ["יוגורט", "בננה", "שיבולת שועל"],
    fullIngredients: ["יוגורט טבעי", "בננה", "מעט שיבולת שועל"],
    description: "מעדן בוקר קליל, קרמי ומשביע יחסית.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "קל להכנה",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "טוסט עם גבינה עדינה",
    ingredients: ["טוסט", "גבינה"],
    fullIngredients: ["טוסט", "גבינה עדינה"],
    description: "בוקר פשוט, מהיר ומאוזן למי שמתאים לו חלב.",
    mealType: "בוקר",
    safeLevel: 1,
    isSoup: false,
    tag: "בוקר קלאסי",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "אורז עם עוף וגזר",
    ingredients: ["אורז", "עוף", "גזר"],
    fullIngredients: ["אורז לבן", "חזה עוף", "גזר מבושל", "מעט מלח", "מעט שמן זית"],
    description: "מנה מאוזנת, מסודרת ונוחה לעיכול יחסית.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: false,
    tag: "ארוחת צהריים",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "פסטה עם עוף וגזר",
    ingredients: ["פסטה", "עוף", "גזר"],
    fullIngredients: ["פסטה", "חזה עוף", "גזר מבושל", "מעט שמן זית", "מלח"],
    description: "פסטה עדינה יחסית עם חלבון פשוט וירק מבושל.",
    mealType: "צהריים",
    safeLevel: 1,
    isSoup: false,
    tag: "מגוון",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "אורז עם דג לבן וגזר",
    ingredients: ["אורז", "דג", "גזר"],
    fullIngredients: ["אורז לבן", "דג לבן", "גזר מבושל", "מעט מלח", "שמן זית"],
    description: "שילוב נקי ועדין עם דג לבן ואורז.",
    mealType: "צהריים",
    safeLevel: 2,
    isSoup: false,
    tag: "צהריים עדין",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "קערת אורז עם הודו וגזר",
    ingredients: ["אורז", "הודו", "גזר"],
    fullIngredients: ["אורז לבן", "הודו", "גזר מבושל", "מעט מלח", "שמן זית"],
    description: "חלופה טובה לעוף עם מרקם נעים ופשוט.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: false,
    tag: "חלבון רזה",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "פירה עם דג לבן וקישוא",
    ingredients: ["פירה", "דג", "קישוא"],
    fullIngredients: ["פירה", "דג לבן", "קישוא מבושל", "מעט מלח", "שמן זית"],
    description: "ארוחת ערב רכה, מסודרת ונעימה.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: false,
    tag: "ערב",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "פירה עם עוף טחון",
    ingredients: ["פירה", "עוף טחון"],
    fullIngredients: ["פירה מתפוח אדמה", "עוף טחון", "מעט מלח", "שמן זית"],
    description: "שילוב רך ומשביע יחסית לימים עדינים יותר.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: false,
    tag: "רך ונוח",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "אורז עם ביצה קשה וגזר",
    ingredients: ["אורז", "ביצה", "גזר"],
    fullIngredients: ["אורז לבן", "ביצה קשה", "גזר מבושל", "מעט מלח"],
    description: "מנה בסיסית וטובה לערב קליל יותר.",
    mealType: "ערב",
    safeLevel: 2,
    isSoup: false,
    tag: "ערב קל",
    image:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "קרקרים עם גבינה וביצה קשה",
    ingredients: ["קרקרים", "גבינה", "ביצה"],
    fullIngredients: ["קרקרים", "גבינה עדינה", "ביצה קשה"],
    description: "נשנוש או ארוחת ביניים קטנה ומשביעה.",
    mealType: "נשנוש",
    safeLevel: 1,
    isSoup: false,
    tag: "נשנוש",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "צנים עם אבוקדו וביצה",
    ingredients: ["צנים", "אבוקדו", "ביצה"],
    fullIngredients: ["צנים", "אבוקדו בשל", "ביצה קשה", "מעט מלח"],
    description: "ביניים טוב עם שובע נעים וטעם מאוזן.",
    mealType: "נשנוש",
    safeLevel: 2,
    isSoup: false,
    tag: "ביניים",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "מרק עוף עם תפוח אדמה וקישוא",
    ingredients: ["עוף", "תפוח אדמה", "קישוא", "מרק"],
    fullIngredients: ["חזה עוף", "תפוח אדמה", "קישוא", "מים", "מעט מלח", "כורכום"],
    description: "מרק קלאסי, חם ומרגיע לימים רגישים יותר.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: true,
    tag: "מרק עוף",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "מרק גזר וקישוא עדין",
    ingredients: ["גזר", "קישוא", "מרק"],
    fullIngredients: ["גזר", "קישוא", "מים", "מעט מלח", "כורכום"],
    description: "מרק ירקות חלק ונעים עם טעם עדין.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: true,
    tag: "עדין",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "מרק תפוח אדמה וגזר",
    ingredients: ["תפוח אדמה", "גזר", "מרק"],
    fullIngredients: ["תפוח אדמה", "גזר", "מים", "מעט מלח"],
    description: "מרק משביע יחסית במרקם רך ונוח.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: true,
    tag: "משביע",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "מרק דלעת חלק",
    ingredients: ["דלעת", "מרק"],
    fullIngredients: ["דלעת", "מים", "מעט מלח", "כורכום"],
    description: "מרק עם טעם מעט מתקתק ומרקם חלק.",
    mealType: "ערב",
    safeLevel: 3,
    isSoup: true,
    tag: "דלעת",
    image:
      "https://images.unsplash.com/photo-1608500218808-2a7dc6f2b7f9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "מרק עוף עם אורז",
    ingredients: ["עוף", "אורז", "מרק"],
    fullIngredients: ["חזה עוף", "אורז לבן", "מים", "מעט מלח"],
    description: "מרק רך יותר עם אורז שנותן קצת יותר גוף.",
    mealType: "צהריים",
    safeLevel: 3,
    isSoup: true,
    tag: "מרק מחזק",
    image:
      "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=900&q=80",
  },
];

const menuItems = [
  { key: "home", label: "תפריט מומלץ", icon: "🍽️" },
  { key: "recipes", label: "כל המתכונים", icon: "📚" },
  { key: "addMeal", label: "מה אכלתי", icon: "🗓️" },
  { key: "profile", label: "פרופיל אישי", icon: "👤" },
];

export default function App() {
  const [screen, setScreen] = useState("auth");
  const [authMode, setAuthMode] = useState("login");
  const [activeTab, setActiveTab] = useState("home");

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
        setActiveTab("home");
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

      if (currentMode === "allowed") allowed.push(...detectedParts);
      if (currentMode === "forbidden") forbidden.push(...detectedParts);
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
    setActiveTab("home");

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
    setActiveTab("home");
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
    setActiveTab("home");
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
    setActiveTab("home");
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
    setActiveTab("home");
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

    let base = recipeLibrary.filter((recipe) => {
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

    if (currentUser.currentStatus === "התלקחות") {
      base = base.filter((recipe) => recipe.isSoup);
    }

    return base;
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

    if (currentUser?.currentStatus === "התלקחות") {
      const soupOptions = shuffleArray(filteredRecipes.filter((recipe) => recipe.isSoup));
      const flareMenu = [
        { title: "מרק בוקר", recipe: soupOptions[0] || null },
        { title: "מרק צהריים", recipe: soupOptions[1] || soupOptions[0] || null },
        { title: "מרק ערב", recipe: soupOptions[2] || soupOptions[0] || null },
      ].filter((item) => item.recipe);

      setDailyMenu(flareMenu);
      return;
    }

    const breakfastOptions = shuffleArray(
      filteredRecipes.filter((recipe) => recipe.mealType === "בוקר")
    );
    const lunchOptions = shuffleArray(
      filteredRecipes.filter((recipe) => recipe.mealType === "צהריים")
    );
    const dinnerOptions = shuffleArray(
      filteredRecipes.filter((recipe) => recipe.mealType === "ערב")
    );
    const snackOptions = shuffleArray(
      filteredRecipes.filter((recipe) => recipe.mealType === "נשנוש")
    );

    const fallback = shuffleArray(filteredRecipes);

    const breakfast = breakfastOptions[0] || fallback[0] || null;
    const lunch = lunchOptions[0] || fallback[1] || null;
    const dinner = dinnerOptions[0] || fallback[2] || null;
    const snack = snackOptions[0] || fallback[3] || null;

    const menu = [
      { title: "ארוחת בוקר", recipe: breakfast },
      { title: "ארוחת צהריים", recipe: lunch },
      { title: "ארוחת ערב", recipe: dinner },
      { title: "נשנוש", recipe: snack },
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

  const allowedCount = currentUser?.allowedFoods?.length || 0;
  const forbiddenCount = currentUser?.forbiddenFoods?.length || 0;

  const renderHomeDashboard = () => (
    <>
      <div className="hero-card">
        <div className="hero-badge">👋 שלום {currentUser.fullName}</div>
        <h1>הנה התפריט המותאם אישית שלך להיום</h1>
        <p>
          נוצר במיוחד עבורך בהתבסס על ההעדפות התזונתיות שלך, המצב הנוכחי והמאכלים
          שהזנת.
        </p>
      </div>

      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>תפריט יומי מומלץ</h2>
            <p>החלפנו עבורך מגוון ארוחות טעימות ומדויקות.</p>
          </div>
        </div>

        <div className="daily-menu-grid">
          {dailyMenu.length > 0 ? (
            dailyMenu.map((item, index) => (
              <div className="daily-menu-card" key={`${item.title}-${index}`}>
                <div className="daily-menu-topline">{item.title}</div>
                <div className="daily-menu-title">{item.recipe.name}</div>
                <div className="daily-menu-desc">{item.recipe.description}</div>
                <div className="daily-menu-tag">{item.recipe.tag}</div>
                <button
                  className="outline-action-button"
                  onClick={() => addSuggestedMealToToday(item.recipe)}
                >
                  הוספתי שאכלתי ✓
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              עדיין אין מספיק מאכלים מותרים כדי לייצר תפריט איכותי.
            </div>
          )}
        </div>

        <div className="centered-action">
          <button className="refresh-button" onClick={generateDailyMenu}>
            תפריט חדש ומגוון ↻
          </button>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>מתכונים מותאמים לך</h2>
            <p>מגוון רחב של אפשרויות טעימות לפי ההגבלות שלך.</p>
          </div>

          <div className="recipe-filters">
            <button className="pill active">הכל</button>
            <button className="pill">בוקר</button>
            <button className="pill">צהריים</button>
            <button className="pill">ערב</button>
            <button className="pill">נשנוש</button>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="recipe-grid">
            {filteredRecipes.map((recipe, index) => (
              <div className="recipe-card" key={`${recipe.name}-${index}`}>
                <div className="recipe-image-wrap">
                  <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                </div>

                <div className="recipe-content">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>

                  <div className="recipe-meta-row">
                    <span className="meta-chip blue">{recipe.mealType}</span>
                    <span className="meta-chip green">{recipe.tag}</span>
                  </div>

                  <div className="recipe-ingredients">
                    {recipe.fullIngredients.join(", ")}
                  </div>

                  <button
                    className="ghost-button"
                    onClick={() => addSuggestedMealToToday(recipe)}
                  >
                    הצג מתכון
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            עדיין אין מספיק מאכלים מותרים כדי להציע מתכונים.
          </div>
        )}
      </section>

      {currentUser.currentStatus === "התלקחות" && (
        <section className="warning-box">
          <h3>התלקחות – הנחיות מיוחדות ⚠️</h3>
          <p>
            במצב התלקחות, אנחנו מציגים לך כרגע מנות עדינות יותר ובמיוחד מרקים רכים
            וקלים לעיכול.
          </p>
          <div className="warning-chips">
            <span>מרק עוף</span>
            <span>מרק דלעת</span>
            <span>מרק גזר</span>
            <span>מרק תפוח אדמה</span>
            <span>מרק קישוא</span>
          </div>
        </section>
      )}
    </>
  );

  const renderAllRecipes = () => (
    <section className="section-block">
      <div className="section-header">
        <div>
          <h2>כל המתכונים</h2>
          <p>כל מה שהמערכת מצאה כמתאים למצבך הנוכחי.</p>
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe, index) => (
            <div className="recipe-card" key={`${recipe.name}-${index}`}>
              <div className="recipe-image-wrap">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              </div>

              <div className="recipe-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>

                <div className="recipe-meta-row">
                  <span className="meta-chip blue">{recipe.mealType}</span>
                  <span className="meta-chip green">{recipe.tag}</span>
                </div>

                <div className="recipe-ingredients">
                  {recipe.fullIngredients.join(", ")}
                </div>

                <button
                  className="ghost-button"
                  onClick={() => addSuggestedMealToToday(recipe)}
                >
                  הוספתי לארוחות
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">לא נמצאו כרגע מתכונים שמתאימים לפרופיל שלך.</div>
      )}
    </section>
  );

  const renderMeals = () => (
    <section className="section-block">
      <div className="section-header">
        <div>
          <h2>היסטוריית ארוחות</h2>
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
            className={`feeling-btn ${mealFeeling === "טוב" ? "active" : ""}`}
            onClick={() => setMealFeeling("טוב")}
          >
            טוב
          </button>
          <button
            className={`feeling-btn ${mealFeeling === "סביר" ? "active" : ""}`}
            onClick={() => setMealFeeling("סביר")}
          >
            סביר
          </button>
          <button
            className={`feeling-btn ${mealFeeling === "לא טוב" ? "active" : ""}`}
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
      <div className="section-header">
        <div>
          <h2>פרופיל אישי</h2>
          <p>עדכן פרטים כדי לחדד את ההמלצות והתפריט.</p>
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

  if (screen === "auth") {
    return (
      <div className="auth-page" dir="rtl">
        <div className="auth-card">
          <div className="brand-mini">תפריט יומי מומלץ</div>

          {authMode === "login" ? (
            <>
              <h1 className="auth-title">התחברות</h1>
              <p className="auth-subtitle">
                היכנס עם שם המשתמש והסיסמה שלך כדי לראות תפריט מותאם אישית.
              </p>

              <input
                placeholder="שם משתמש"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="text-input"
              />

              <input
                type="password"
                placeholder="סיסמה"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
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
                צור פרופיל אישי והמערכת תתאים לך תפריט ומתכונים.
              </p>

              <input
                placeholder="שם מלא"
                value={registerData.fullName}
                onChange={(e) =>
                  setRegisterData({ ...registerData, fullName: e.target.value })
                }
                className="text-input"
              />

              <input
                placeholder="גיל"
                value={registerData.age}
                onChange={(e) =>
                  setRegisterData({ ...registerData, age: e.target.value })
                }
                className="text-input"
              />

              <input
                placeholder="שם משתמש"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                className="text-input"
              />

              <input
                type="password"
                placeholder="סיסמה"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
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
                onChange={(e) =>
                  setRegisterData({ ...registerData, safeFoods: e.target.value })
                }
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
    <div className="app-shell" dir="rtl">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">✚</div>
          <div>
            <div className="sidebar-brand-title">תפריט יומי מומלץ</div>
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
              onClick={() => {
                if (item.key === "addMeal") {
                  setScreen("home");
                  setActiveTab("addMeal");
                } else if (item.key === "profile") {
                  setScreen("home");
                  setActiveTab("profile");
                } else {
                  setScreen("home");
                  setActiveTab(item.key);
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="side-info-card medical">
          <div className="side-info-title">סטטוס רפואי</div>
          <div className="side-info-row">
            <strong>מחלה:</strong> {currentUser?.diseaseType}
          </div>
          <div className="side-info-row">
            <strong>סטטוס:</strong> {currentUser?.currentStatus}
          </div>
          <div className="side-info-note">
            המערכת מתאימה עבורך מתכונים מגוונים ועשירים.
          </div>
        </div>

        <div className="side-count-card allowed-card">
          <span>מאכלים מותרים</span>
          <strong>{allowedCount}</strong>
        </div>

        <div className="side-count-card forbidden-card">
          <span>מאכלים אסורים</span>
          <strong>{forbiddenCount}</strong>
        </div>

        <div className="side-tip-card">
          <div className="side-tip-title">טיפ יומי ✨</div>
          <p>שמירה על מגוון עוזרת לייצר תפריט יותר נעים ומאוזן לאורך זמן.</p>
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
              <div className="topbar-title">תפריט יומי מומלץ</div>
              <div className="topbar-subtitle">תפריט מותאם אישית עבורך</div>
            </div>
            <div className="topbar-plus">✚</div>
          </div>
        </header>

        {activeTab === "home" && renderHomeDashboard()}
        {activeTab === "recipes" && renderAllRecipes()}
        {activeTab === "addMeal" && renderMeals()}
        {activeTab === "profile" && renderProfile()}
      </main>
    </div>
  );
}