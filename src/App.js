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
  "דג לבן",
  "לחמית",
  "צנים",
  "מלח",
  "כורכום",
  "שמן זית",
  "מים",
];

const recipeLibrary = [
  {
    name: "בננה עם טוסט",
    ingredients: ["בננה", "טוסט"],
    fullIngredients: ["בננה", "טוסט", "מעט חמאה או בלי ממרח"],
    description: "פתרון קל ומהיר לבוקר.",
    mealType: "בוקר",
    safeLevel: 3,
  },
  {
    name: "חביתה עם לחם לבן",
    ingredients: ["ביצה", "לחם לבן"],
    fullIngredients: ["2 ביצים", "לחם לבן", "מעט מלח", "מעט שמן זית"],
    description: "ארוחת בוקר פשוטה ונגישה.",
    mealType: "בוקר",
    safeLevel: 2,
  },
  {
    name: "דייסת שיבולת שועל עם בננה",
    ingredients: ["שיבולת שועל", "בננה"],
    fullIngredients: ["שיבולת שועל", "בננה", "מים", "מעט קינמון אם מתאים"],
    description: "ארוחת בוקר עדינה יותר.",
    mealType: "בוקר",
    safeLevel: 2,
  },
  {
    name: "יוגורט עם בננה",
    ingredients: ["יוגורט", "בננה"],
    fullIngredients: ["יוגורט טבעי", "בננה"],
    description: "בוקר קליל ומהיר.",
    mealType: "בוקר",
    safeLevel: 1,
  },
  {
    name: "אורז עם עוף",
    ingredients: ["אורז", "עוף"],
    fullIngredients: ["אורז לבן", "חזה עוף", "מים", "מלח", "מעט שמן זית"],
    description: "מנה פשוטה, קלה יחסית לעיכול.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "אורז עם גזר",
    ingredients: ["אורז", "גזר"],
    fullIngredients: ["אורז לבן", "גזר מבושל", "מים", "מלח", "מעט שמן זית"],
    description: "שילוב עדין ופשוט.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "מרק עוף עם תפוח אדמה",
    ingredients: ["עוף", "תפוח אדמה", "מרק"],
    fullIngredients: [
      "חזה עוף",
      "תפוח אדמה",
      "גזר",
      "מים",
      "אבקת מרק עוף עדינה",
      "מלח",
      "כורכום",
    ],
    description: "ארוחה חמה ובסיסית.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "עוף עם גזר",
    ingredients: ["עוף", "גזר"],
    fullIngredients: ["חזה עוף", "גזר מבושל", "מלח", "כורכום", "מעט שמן זית"],
    description: "שילוב פשוט ועדין יחסית.",
    mealType: "צהריים",
    safeLevel: 3,
  },
  {
    name: "פסטה עם עוף",
    ingredients: ["פסטה", "עוף"],
    fullIngredients: ["פסטה", "חזה עוף", "מעט מלח", "מעט שמן זית"],
    description: "מנה טובה לגיוון.",
    mealType: "צהריים",
    safeLevel: 1,
  },
  {
    name: "דג עם תפוח אדמה",
    ingredients: ["דג", "תפוח אדמה"],
    fullIngredients: ["דג לבן", "תפוח אדמה", "מלח", "מעט שמן זית"],
    description: "מנה פשוטה שמתאימה להרבה מצבים.",
    mealType: "ערב",
    safeLevel: 2,
  },
  {
    name: "פירה עם ביצה",
    ingredients: ["תפוח אדמה", "ביצה"],
    fullIngredients: ["תפוחי אדמה", "ביצה קשה", "מלח", "מעט שמן זית"],
    description: "מנה רכה ופשוטה לערב.",
    mealType: "ערב",
    safeLevel: 3,
  },
  {
    name: "טוסט עם גבינה",
    ingredients: ["טוסט", "גבינה"],
    fullIngredients: ["טוסט", "גבינה עדינה"],
    description: "ארוחת ערב קצרה ונוחה.",
    mealType: "ערב",
    safeLevel: 1,
  },
  {
    name: "מרק קישוא וגזר",
    ingredients: ["קישוא", "גזר", "מרק"],
    fullIngredients: ["קישוא", "גזר", "מים", "אבקת מרק עדינה", "מלח"],
    description: "מרק קליל וחם לערב.",
    mealType: "ערב",
    safeLevel: 3,
  },
  {
    name: "קרקר עם בננה",
    ingredients: ["קרקר", "בננה"],
    fullIngredients: ["קרקרים פשוטים", "בננה"],
    description: "נשנוש קל בין הארוחות.",
    mealType: "נשנוש",
    safeLevel: 3,
  },
  {
    name: "צנים עם ביצה קשה",
    ingredients: ["צנים", "ביצה"],
    fullIngredients: ["צנים", "ביצה קשה", "מעט מלח"],
    description: "נשנוש משביע ועדין יחסית.",
    mealType: "נשנוש",
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
    nutritionistNotes: "",
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
      nutritionistNotes: "",
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
    if (value === "טוב") return "#16a34a";
    if (value === "סביר") return "#d97706";
    if (value === "לא טוב") return "#dc2626";
    if (value === "עוד לא סימנתי") return "#6b7280";
    return "#6b7280";
  };

  const feelingButtonStyle = (value, selectedValue) => ({
    padding: "12px 18px",
    borderRadius: "12px",
    border:
      selectedValue === value ? "2px solid #10b981" : "1px solid #d1d5db",
    backgroundColor: selectedValue === value ? "#ecfdf5" : "white",
    color: "#111827",
    fontSize: "16px",
    cursor: "pointer",
    minWidth: "90px",
    fontWeight: "500",
  });

  const smallFeelingButtonStyle = (value, selectedValue) => ({
    padding: "8px 10px",
    borderRadius: "10px",
    border:
      selectedValue === value ? "2px solid #10b981" : "1px solid #d1d5db",
    backgroundColor: selectedValue === value ? "#ecfdf5" : "white",
    color: "#111827",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
  });

  const mainButton = {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#10b981",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "16px",
  };

  const secondaryButton = {
    padding: "12px 18px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    color: "#111827",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    marginTop: "12px",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
    marginBottom: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
    marginBottom: "12px",
    fontFamily: "Arial, sans-serif",
  };

  if (screen === "auth") {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          fontFamily: "Arial, sans-serif",
          padding: "24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "460px", width: "100%" }}>
          {authMode === "login" ? (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
              }}
            >
              <h1 style={{ marginTop: 0, fontSize: "32px", color: "#111827" }}>
                התחברות
              </h1>

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
                    padding: "10px",
                    borderRadius: "12px",
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
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
              }}
            >
              <h1 style={{ marginTop: 0, fontSize: "32px", color: "#111827" }}>
                הרשמה
              </h1>

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
                  <div style={{ fontWeight: "700", marginBottom: "8px" }}>
                    מאכלים מותרים:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {registerData.allowedFoods.map((food, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#ecfdf5",
                          color: "#166534",
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontSize: "14px",
                          border: "1px solid #bbf7d0",
                        }}
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {registerData.forbiddenFoods.length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "700", marginBottom: "8px" }}>
                    מאכלים אסורים:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {registerData.forbiddenFoods.map((food, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#fef2f2",
                          color: "#991b1b",
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontSize: "14px",
                          border: "1px solid #fecaca",
                        }}
                      >
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
                    padding: "10px",
                    borderRadius: "12px",
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
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        padding: "24px 16px",
      }}
    >
      <div style={{ maxWidth: "460px", margin: "0 auto" }}>
        {screen === "home" && currentUser && (
          <>
            <div
              style={{
                background: "linear-gradient(135deg, #10b981, #34d399)",
                color: "white",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(16,185,129,0.18)",
                marginBottom: "18px",
              }}
            >
              <div style={{ fontSize: "14px", opacity: 0.95, marginBottom: "8px" }}>
                שלום {currentUser.fullName}
              </div>
              <h1 style={{ margin: 0, fontSize: "32px", lineHeight: "1.2" }}>
                מה בטוח לי לאכול היום?
              </h1>
              <div style={{ marginTop: "12px", fontSize: "15px" }}>
                מצב נוכחי: <strong>{currentUser.currentStatus}</strong>
              </div>
              <div style={{ marginTop: "6px", fontSize: "15px" }}>
                מחלה: <strong>{currentUser.diseaseType}</strong>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>
                תפריט יומי AI
              </h3>

              {dailyMenu.length > 0 ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  {dailyMenu.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#166534",
                          marginBottom: "6px",
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#111827",
                          marginBottom: "8px",
                        }}
                      >
                        {item.recipe.name}
                      </div>

                      <div style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>
                        {item.recipe.description}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "#166534",
                          fontWeight: "600",
                          marginBottom: "10px",
                        }}
                      >
                        רכיבים: {(item.recipe.fullIngredients || item.recipe.ingredients).join(", ")}
                      </div>

                      <button
                        onClick={() => addSuggestedMealToToday(item.recipe)}
                        style={{
                          backgroundColor: "#10b981",
                          color: "white",
                          border: "none",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        אכלתי את זה
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#6b7280", margin: 0 }}>
                  עדיין אין מספיק מאכלים מותרים כדי לייצר תפריט.
                </p>
              )}

              <button style={mainButton} onClick={generateDailyMenu}>
                תן לי תפריט חדש
              </button>
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>
                מתכונים שמתאימים לך
              </h3>

              {filteredRecipes.length > 0 ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  {filteredRecipes.map((recipe, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <div style={{ fontSize: "17px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>
                        {recipe.name}
                      </div>

                      <div style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>
                        {recipe.description}
                      </div>

                      <div style={{ fontSize: "14px", color: "#166534", fontWeight: "600" }}>
                        רכיבים מלאים: {(recipe.fullIngredients || recipe.ingredients).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#6b7280", margin: 0 }}>
                  עדיין אין מספיק מאכלים מותרים כדי להציע מתכונים.
                </p>
              )}
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>
                מאכלים מותרים
              </h3>

              {currentUser.allowedFoods && currentUser.allowedFoods.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {currentUser.allowedFoods.map((food, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#ecfdf5",
                        color: "#166534",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        fontSize: "14px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      {food}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#6b7280", margin: 0 }}>
                  עדיין לא זוהו מאכלים מותרים
                </p>
              )}
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>
                מה אכלתי היום
              </h3>

              {meals.length === 0 ? (
                <p style={{ color: "#6b7280", margin: 0 }}>
                  עדיין לא הוספת ארוחות
                </p>
              ) : (
                <div style={{ display: "grid", gap: "10px" }}>
                  {meals.map((meal, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "14px",
                        padding: "12px",
                        backgroundColor: "#f9fafb",
                      }}
                    >
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {meal.name}
                      </div>

                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "14px",
                          fontWeight: "500",
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
            <h1 style={{ marginTop: 0, fontSize: "30px", color: "#111827" }}>
              הוספת ארוחה
            </h1>

            <p style={{ color: "#6b7280", marginBottom: "14px" }}>
              כתוב מה אכלת ואיך הרגשת אחריה
            </p>

            <input
              placeholder="מה אכלת?"
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              style={inputStyle}
            />

            <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "20px", color: "#111827" }}>
              איך הרגשת אחרי האוכל?
            </h3>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
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
            <h1 style={{ marginTop: 0, fontSize: "30px", color: "#111827" }}>
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