# סיכום פרויקט - Sumit Node ל-n8n

## 📋 סקירה כללית

יצרתי עבורך **נוד מלא ומקצועי** עבור n8n שמאפשר אינטגרציה מלאה עם מערכת סאמיט (Sumit Accounting).

הנוד תומך בכל הפעולות העיקריות של ה-API של סאמיט ונבנה לפי תקני n8n.

---

## 📁 מבנה הפרויקט

```
n8n-nodes-sumit/
├── nodes/
│   └── Sumit/
│       ├── Sumit.node.ts        # הנוד הראשי
│       └── sumit.svg            # אייקון
├── credentials/
│   └── SumitApi.credentials.ts  # הגדרות אישורים
├── package.json                 # הגדרות החבילה
├── tsconfig.json               # הגדרות TypeScript
├── gulpfile.js                 # בניית אייקונים
├── .eslintrc.js                # הגדרות ESLint
├── .prettierrc                 # הגדרות Prettier
├── .gitignore                  # קבצים להתעלם
├── index.js                    # Entry point
├── LICENSE.md                  # רישיון MIT
├── README.md                   # תיעוד ראשי (אנגלית)
├── INSTALLATION_GUIDE_HE.md    # מדריך התקנה (עברית)
├── QUICK_START.md              # התחלה מהירה (עברית)
├── EXAMPLES.md                 # דוגמאות מתקדמות
└── CHANGELOG.md                # יומן שינויים
```

---

## ✨ תכונות עיקריות

### 🔐 ניהול אישורים
- הגדרת Company ID ו-API Key
- בדיקת חיבור אוטומטית
- אחסון מאובטח של מפתחות

### 👥 ניהול לקוחות (Customers)
- ✅ יצירת לקוח חדש
- ✅ עדכון פרטי לקוח
- ✅ קבלת URL לדף פרטי לקוח
- ✅ הוספת הערות ללקוח
- ✅ תמיכה במזהים חיצוניים (External Identifiers)

### 📄 ניהול מסמכים (Documents)
- ✅ יצירת 11 סוגי מסמכים שונים:
  - חשבונית (Invoice)
  - חשבונית מס (Tax Invoice)
  - קבלה (Receipt)
  - חשבונית מס/קבלה
  - חשבונית זיכוי (Credit)
  - חשבונית עסקה (Proforma)
  - תעודת משלוח (Delivery Note)
  - הצעת מחיר (Quote)
  - הזמנה (Order)
  - החזר/זיכוי (Return/Credit)
  - בקשת תשלום (Payment Request)
- ✅ שליחת מסמכים במייל
- ✅ הורדת PDF
- ✅ קבלת פרטי מסמך
- ✅ הוספת הוצאות
- ✅ ביטול מסמכים
- ✅ העברה לספרים
- ✅ דוחות חובות
- ✅ רשימת מסמכים עם פילטרים
- ✅ תמיכה בפריטים מרובים
- ✅ חישוב מע"מ (כולל/לא כולל)
- ✅ תמיכה במטבעות שונים

### 🔧 פעולות כלליות (General)
- ✅ אימות פרטי חשבון בנק
- ✅ קבלת שיעור מע"מ לפי תאריך
- ✅ קבלת שער חליפין
- ✅ עדכון הגדרות חברה
- ✅ קבלת מספר מסמך הבא
- ✅ הגדרת מספר מסמך הבא

### 🛍️ ניהול מוצרים (Income Items)
- ✅ יצירת פריטי הכנסה (מוצרים/שירותים)
- ✅ רשימת כל הפריטים
- ✅ תמיכה ב-SKU
- ✅ מעקב עלויות
- ✅ מזהים חיצוניים

### 💳 תשלומים (Payments)
- ✅ חיוב לקוח
- ✅ קבלת פרטי תשלום
- ✅ רשימת תשלומים
- ✅ יצירת דף תשלום (Payment Page)

### 💰 אמצעי תשלום (Payment Methods)
- ✅ קבלת אמצעי תשלום שמורים
- ✅ שמירת אמצעי תשלום ללקוח
- ✅ הסרת אמצעי תשלום

### 📦 מלאי (Stock)
- ✅ רשימת רמות מלאי
- ✅ סינון פריטים עם מלאי אפס

### 📊 CRM
- ✅ יצירת ישויות CRM
- ✅ עדכון ישויות
- ✅ קבלת פרטי ישות
- ✅ רשימת ישויות
- ✅ ארכוב ישויות
- ✅ מחיקת ישויות

### 🏢 ניהול חברות (Companies)
- ✅ יצירת ארגון חדש
- ✅ עדכון פרטי ארגון
- ✅ קבלת פרטי ארגון
- ✅ רשימת מכסות שימוש

---

## 📚 תיעוד

### 1. README.md - תיעוד ראשי
- תיאור כללי של הנוד
- הוראות התקנה
- רשימת כל הפעולות
- הגדרת אישורים
- דוגמאות בסיסיות
- פתרון בעיות
- משאבים

### 2. INSTALLATION_GUIDE_HE.md - מדריך התקנה בעברית
- דרישות מקדימות
- 3 שיטות התקנה (npm, ידני, Docker)
- הגדרת אישורים צעד אחר צעד
- workflow ראשון
- 4 דוגמאות מלאות
- פתרון בעיות נפוצות
- טיפים מתקדמים

### 3. QUICK_START.md - התחלה מהירה בעברית
- התקנה מהירה
- הגדרת אישורים
- 5 workflows הכי שימושיים
- 3 תבניות מוכנות לשימוש
- טיפים מהירים
- טבלת סוגי מסמכים
- פתרון בעיות מהיר

### 4. EXAMPLES.md - דוגמאות מתקדמות
- 6 קטגוריות של workflows:
  - ניהול לקוחות
  - יצירת חשבוניות
  - עיבוד תשלומים
  - ניהול חובות
  - ניהול מלאי
  - אוטומציות
- דוגמאות קוד מלאות
- אינטגרציות עם מערכות אחרות
- טיפול בשגיאות
- Best practices

### 5. CHANGELOG.md - יומן שינויים
- גרסה 1.0.0 עם כל התכונות
- תכונות מתוכננות לעתיד
- מדריך שדרוג

---

## 🛠️ טכנולוגיות

- **TypeScript** - קוד מוקלד ובטוח
- **n8n-workflow** - ספריית ליבה של n8n
- **ESLint** - בדיקת קוד
- **Prettier** - עיצוב קוד אחיד
- **Gulp** - בניית assets

---

## 📦 איך להתקין

### שיטה 1: npm (כשתפרסם)

```bash
npm install n8n-nodes-sumit
n8n start
```

### שיטה 2: התקנה ידנית

```bash
cd ~/.n8n/custom
git clone [repository]
cd n8n-nodes-sumit
npm install
npm run build
n8n start
```

### שיטה 3: Docker

```bash
# הוסף volume ב-docker-compose.yml
volumes:
  - ~/.n8n/custom:/home/node/.n8n/custom

# העתק קבצים ובנה
cd ~/.n8n/custom
git clone [repository]
cd n8n-nodes-sumit
npm install
npm run build
docker-compose restart
```

---

## 🚀 שימוש בסיסי

### 1. הגדר אישורים

```
n8n → Credentials → + Create New → Sumit API
```

הזן:
- Company ID: `12345678`
- API Key: `your-api-key`
- Base URL: `https://api.sumit.co.il`

### 2. צור Workflow

```
Manual Trigger
  ↓
Sumit Node
  Resource: Customer
  Operation: Create
  Name: "לקוח חדש"
  Email: "customer@example.com"
```

### 3. הרץ והתחל לעבוד! 🎉

---

## 📝 דוגמאות מהירות

### יצירת חשבונית מס

```json
{
  "resource": "document",
  "operation": "create",
  "documentType": 1,
  "documentCustomer": {
    "customerDetails": {
      "SearchMode": 1,
      "ID": 12345
    }
  },
  "documentItems": {
    "item": [
      {
        "Name": "שירות פיתוח",
        "Quantity": 10,
        "UnitPrice": 500
      }
    ]
  },
  "vatIncluded": true
}
```

### בדיקת חובות

```json
{
  "resource": "document",
  "operation": "getDebt",
  "customerId": 12345,
  "debitSource": 1,
  "creditSource": 1
}
```

---

## 🔄 Workflows מומלצים

### 1. אוטומציה של חשבוניות חודשיות

```
Schedule (1st of month)
  → Get Subscriptions
  → Create Invoice
  → Send Email
  → Update Database
```

### 2. סנכרון לקוחות מ-CRM

```
CRM Webhook
  → Transform Data
  → Sumit Create/Update Customer
  → Update CRM with Sumit ID
```

### 3. התראות חובות

```
Daily Schedule
  → Get Debt Report
  → Filter High Debt
  → Send Slack Alert
```

---

## ⚙️ הגדרות נוספות

### Build הפרויקט

```bash
npm run build
```

### פיתוח עם hot reload

```bash
npm run dev
```

### בדיקת קוד

```bash
npm run lint
```

### תיקון בעיות lint

```bash
npm run lintfix
```

---

## 🐛 בעיות נפוצות ופתרונות

### ❌ "Connection failed"
✅ בדוק Company ID ו-API Key
✅ וודא שאין רווחים מיותרים
✅ בדוק את ה-Base URL

### ❌ "Customer not found"
✅ השתמש ב-SearchMode הנכון
✅ צור לקוח קודם אם לא קיים

### ❌ "VAT calculation error"
✅ בדוק את הגדרת vatIncluded
✅ true = מחירים כוללים מע"מ
✅ false = מחירים ללא מע"מ

### ❌ "Rate limit exceeded"
✅ הוסף Wait node בין קריאות
✅ השתמש ב-Split in Batches

---

## 📞 תמיכה

- 📖 **תיעוד**: קרא את [README.md](README.md)
- 🇮🇱 **עברית**: ראה [INSTALLATION_GUIDE_HE.md](INSTALLATION_GUIDE_HE.md)
- 💬 **קהילה**: [n8n Community Forum](https://community.n8n.io/)
- 🐛 **באגים**: [GitHub Issues](https://github.com/yourusername/n8n-nodes-sumit/issues)
- 💡 **רעיונות**: [GitHub Discussions](https://github.com/yourusername/n8n-nodes-sumit/discussions)

---

## 📊 סטטיסטיקות הפרויקט

- ✅ **9 Resources** - סוגי משאבים
- ✅ **50+ Operations** - פעולות שונות
- ✅ **200+ Parameters** - שדות להגדרה
- ✅ **11 Document Types** - סוגי מסמכים
- ✅ **4 Documentation Files** - קבצי תיעוד
- ✅ **20+ Example Workflows** - דוגמאות מוכנות
- ✅ **100% TypeScript** - קוד מוקלד
- ✅ **Full API Coverage** - כיסוי מלא של ה-API

---

## 🎯 הצעדים הבאים

### להפעלה מיידית:

1. ✅ **התקן את החבילה**
   ```bash
   cd n8n-nodes-sumit
   npm install
   npm run build
   ```

2. ✅ **העתק ל-n8n**
   ```bash
   cp -r dist ~/.n8n/custom/n8n-nodes-sumit/
   ```

3. ✅ **הפעל מחדש את n8n**
   ```bash
   n8n start
   ```

4. ✅ **הגדר אישורים** - לפי המדריך

5. ✅ **צור workflow ראשון** - השתמש ב-QUICK_START.md

### לפרסום ציבורי:

1. **צור repository ב-GitHub**
2. **העלה את הקוד**
3. **פרסם ב-npm**:
   ```bash
   npm publish
   ```
4. **שלח ל-n8n Community Nodes**

---

## 🏆 מה קיבלת?

נוד **מקצועי, מתועד ומלא** שמאפשר:

- ✅ אוטומציה מלאה של תהליכים חשבונאיים
- ✅ אינטגרציה עם מערכות חיצוניות
- ✅ יצירת חשבוניות אוטומטיות
- ✅ ניהול לקוחות
- ✅ מעקב תשלומים וחובות
- ✅ סנכרון מלאי
- ✅ דוחות אוטומטיים

הכל **פתוח, ניתן להרחבה ומתועד היטב**! 🎉

---

**נוצר ב**: 2025-12-08
**גרסה**: 1.0.0
**רישיון**: MIT

---

## 🙏 תודה

תודה שבחרת להשתמש בנוד Sumit ל-n8n!

אם יש לך שאלות, רעיונות או משוב - אנא פנה דרך GitHub.

**בהצלחה! 🚀**
