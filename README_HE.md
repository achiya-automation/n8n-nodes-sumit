# n8n-nodes-sumit

נוד קהילתי עבור [n8n](https://n8n.io/) לאינטגרציה מלאה עם [Sumit Accounting](https://www.sumit.co.il/).

[English](README.md) | **עברית**

---

## 📋 תוכן עניינים

- [סקירה כללית](#סקירה-כללית)
- [התקנה](#התקנה)
- [הגדרת אישורים](#הגדרת-אישורים)
- [פעולות נתמכות](#פעולות-נתמכות)
- [דוגמאות שימוש](#דוגמאות-שימוש)
- [תיעוד מלא](#תיעוד-מלא)
- [תמיכה](#תמיכה)

---

## 🎯 סקירה כללית

**Sumit** היא פלטפורמת חשבונאות וניהול עסקי מובילה בישראל. נוד זה מאפשר אוטומציה מלאה של תהליכים חשבונאיים ב-n8n.

### מה אפשר לעשות?

- ✅ **ניהול לקוחות** - יצירה, עדכון, מעקב
- ✅ **יצירת חשבוניות** - חשבוניות מס, קבלות, הצעות מחיר
- ✅ **שליחת מסמכים** - אוטומטית במייל
- ✅ **מעקב תשלומים** - חיוב לקוחות, מעקב חובות
- ✅ **ניהול מלאי** - מעקב מלאי בזמן אמת
- ✅ **דוחות** - דוחות חובות, תשלומים, מע"מ
- ✅ **אינטגרציות** - חיבור ל-WooCommerce, CRMs, ועוד

---

## 📦 התקנה

### דרישות מקדימות

- n8n גרסה 1.0.0 ומעלה
- Node.js גרסה 18 ומעלה
- חשבון Sumit פעיל עם גישה ל-API

### התקנה מהירה

```bash
# התקן את החבילה
npm install n8n-nodes-sumit

# הפעל מחדש את n8n
n8n start
```

### התקנה ידנית

```bash
# העתק לתיקיית custom של n8n
cd ~/.n8n/custom
git clone https://github.com/yourusername/n8n-nodes-sumit.git
cd n8n-nodes-sumit

# התקן תלויות
npm install

# בנה את הפרויקט
npm run build

# הפעל מחדש את n8n
n8n start
```

**📖 למדריך התקנה מפורט**: [INSTALLATION_GUIDE_HE.md](INSTALLATION_GUIDE_HE.md)

---

## 🔑 הגדרת אישורים

### שלב 1: קבל את פרטי ה-API מסאמיט

1. היכנס לחשבון הסאמיט שלך: [www.sumit.co.il](https://www.sumit.co.il)
2. עבור אל: **הגדרות** → **הגדרות API**
3. העתק:
   - **מזהה חברה (Company ID)**
   - **מפתח API (API Key)**

### שלב 2: הגדר ב-n8n

1. היכנס ל-n8n
2. לחץ על **Credentials** בתפריט
3. לחץ על **+ Create New Credential**
4. חפש ובחר **"Sumit API"**
5. הזן את הפרטים:

| שדה | ערך |
|-----|-----|
| **Company ID** | המספר שקיבלת מסאמיט |
| **API Key** | המפתח שקיבלת מסאמיט |
| **Base URL** | `https://api.sumit.co.il` |

6. לחץ **Test** לבדיקת החיבור
7. לחץ **Save** לשמירה

---

## ⚡ פעולות נתמכות

### 👥 לקוחות (Customers)
- ✅ יצירת לקוח חדש
- ✅ עדכון פרטי לקוח
- ✅ קבלת קישור לדף לקוח
- ✅ הוספת הערות

### 📄 מסמכים (Documents)
- ✅ יצירת מסמכים:
  - חשבונית (Invoice)
  - חשבונית מס (Tax Invoice) ⭐
  - קבלה (Receipt)
  - חשבונית מס/קבלה
  - זיכוי (Credit)
  - הצעת מחיר (Quote)
  - הזמנה (Order)
  - ועוד...
- ✅ שליחת מסמכים במייל
- ✅ הורדת PDF
- ✅ קבלת פרטי מסמך
- ✅ ביטול מסמכים
- ✅ דוחות חובות
- ✅ רשימת מסמכים

### 💳 תשלומים (Payments)
- ✅ חיוב לקוח
- ✅ קבלת פרטי תשלום
- ✅ רשימת תשלומים
- ✅ יצירת דף תשלום

### 🛍️ מוצרים (Income Items)
- ✅ יצירת מוצר/שירות
- ✅ רשימת מוצרים
- ✅ מעקב עלויות

### 📊 כלליות (General)
- ✅ אימות חשבון בנק
- ✅ קבלת שיעור מע"מ
- ✅ שער חליפין
- ✅ הגדרות חברה

### 📦 מלאי (Stock)
- ✅ רשימת מלאי
- ✅ סינון פריטים

### 🎯 CRM
- ✅ ניהול ישויות
- ✅ רשימות מסוננות
- ✅ ארכוב ומחיקה

### 🏢 ניהול חברות
- ✅ יצירת ארגון
- ✅ עדכון פרטים
- ✅ מכסות שימוש

---

## 💡 דוגמאות שימוש

### דוגמה 1: יצירת לקוח חדש

```
Manual Trigger
  ↓
Sumit Node
  Resource: Customer
  Operation: Create
  Name: "ישראל ישראלי"
  Email: "israel@example.com"
  Phone: "050-1234567"
```

### דוגמה 2: יצירת חשבונית מס

```
Manual Trigger
  ↓
Sumit Node (Create Customer)
  ↓
Sumit Node (Create Invoice)
  Resource: Document
  Operation: Create
  Document Type: Tax Invoice
  Customer ID: {{ $json.Data.ID }}
  Items:
    - Name: "שירות פיתוח"
    - Quantity: 10
    - Price: 500
  ↓
Sumit Node (Send Invoice)
  Resource: Document
  Operation: Send
  Document ID: {{ $json.Data.ID }}
  Email: customer@example.com
```

### דוגמה 3: אוטומציה חודשית

```
Schedule Trigger (1st of month, 9 AM)
  ↓
Database (Get Active Subscriptions)
  ↓
Sumit Node (Create Invoices)
  ↓
Sumit Node (Send Emails)
  ↓
Slack Notification (Summary)
```

### דוגמה 4: אינטגרציה עם WooCommerce

```
WooCommerce Trigger (New Order)
  ↓
Function (Transform Order)
  ↓
Sumit Node (Create/Update Customer)
  ↓
Sumit Node (Create Tax Invoice)
  ↓
Sumit Node (Send Invoice)
```

---

## 📚 תיעוד מלא

### מדריכים

- 📘 **[מדריך התקנה מפורט](INSTALLATION_GUIDE_HE.md)** - התקנה צעד אחר צעד, הגדרות, פתרון בעיות
- 🚀 **[התחלה מהירה](QUICK_START.md)** - 5 workflows הכי שימושיים, תבניות מוכנות
- 💻 **[דוגמאות מתקדמות](EXAMPLES.md)** - 20+ workflows לכל צורך
- 📋 **[סיכום פרויקט](PROJECT_SUMMARY.md)** - מבנה, תכונות, סטטיסטיקות

### מסמכים טכניים

- 📖 **[README](README.md)** - תיעוד ראשי באנגלית
- 📝 **[CHANGELOG](CHANGELOG.md)** - יומן שינויים
- ⚖️ **[LICENSE](LICENSE.md)** - רישיון MIT

---

## 🎬 workflows מומלצים

### 💼 עסקים

1. **חיוב חודשי אוטומטי**
   - מנויים → חשבוניות → שליחה → עדכון מסד נתונים

2. **ניהול חובות**
   - בדיקה יומית → סינון חובות גבוהים → התראות

3. **דוחות שבועיים**
   - סיכום מכירות → יצירת PDF → שליחת מייל

### 🛒 חנויות אונליין

1. **WooCommerce → Sumit**
   - הזמנה חדשה → לקוח → חשבונית → שליחה

2. **Shopify → Sumit**
   - מכירה → חשבונית מס/קבלה → עדכון מלאי

### 📊 אינטגרציות CRM

1. **סנכרון לקוחות**
   - CRM ↔ Sumit (דו-כיווני)

2. **עדכון נתונים**
   - שינוי ב-CRM → עדכון בסאמיט

---

## 🔧 תצורה מתקדמת

### משתני סביבה

```bash
# בקובץ .env של n8n
N8N_CUSTOM_EXTENSIONS=~/.n8n/custom
```

### Docker

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    volumes:
      - ~/.n8n:/home/node/.n8n
      - ~/.n8n/custom:/home/node/.n8n/custom
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
```

---

## 🐛 פתרון בעיות

### בעיה: "Connection failed"

**פתרון**:
1. ✅ בדוק שה-Company ID נכון (מספר, לא טקסט)
2. ✅ וודא שה-API Key מועתק במלואו
3. ✅ בדוק שאין רווחים מיותרים
4. ✅ וודא שה-Base URL הוא `https://api.sumit.co.il`

### בעיה: "Customer not found"

**פתרון**:
1. ✅ השתמש ב-SearchMode הנכון (By ID/By Name)
2. ✅ צור את הלקוח קודם אם לא קיים
3. ✅ שמור את ה-ID שמתקבל לשימוש מאוחר יותר

### בעיה: שגיאת מע"מ

**פתרון**:
1. ✅ בדוק את הגדרת `vatIncluded`
2. ✅ `true` = מחירים כוללים מע"מ
3. ✅ `false` = מחירים לא כוללים מע"מ

### בעיה: "Rate limit exceeded"

**פתרון**:
1. ✅ הוסף **Wait Node** (1-2 שניות) בין קריאות
2. ✅ השתמש ב-**Split in Batches** לעיבוד המוני

**📖 למדריך פתרון בעיות מלא**: [INSTALLATION_GUIDE_HE.md#פתרון-בעיות](INSTALLATION_GUIDE_HE.md#פתרון-בעיות)

---

## 🆘 תמיכה ועזרה

### משאבים

- 🌐 **[תיעוד API של סאמיט](https://api.sumit.co.il/)**
- 💬 **[מרכז עזרה סאמיט](https://help.sumit.co.il/)**
- 📚 **[תיעוד n8n](https://docs.n8n.io/)**
- 👥 **[קהילת n8n](https://community.n8n.io/)**

### צור קשר

- 🐛 **דיווח על באג**: [GitHub Issues](https://github.com/yourusername/n8n-nodes-sumit/issues)
- 💡 **הצעת feature**: [GitHub Discussions](https://github.com/yourusername/n8n-nodes-sumit/discussions)
- ❓ **שאלות כלליות**: [n8n Community Forum](https://community.n8n.io/)

---

## 🤝 תרומה לפרויקט

אנחנו מזמינים אותך לתרום לפרויקט!

1. 🍴 Fork את הריפוזיטורי
2. 🌿 צור branch חדש (`git checkout -b feature/amazing-feature`)
3. 💾 בצע commit לשינויים (`git commit -m 'Add amazing feature'`)
4. 📤 דחוף ל-branch (`git push origin feature/amazing-feature`)
5. 🔀 פתח Pull Request

---

## 📊 סטטיסטיקות

- ✅ **9 Resources**
- ✅ **50+ Operations**
- ✅ **200+ Parameters**
- ✅ **11 Document Types**
- ✅ **1,500+ Lines of Code**
- ✅ **20+ Example Workflows**
- ✅ **100% TypeScript**

---

## 📜 רישיון

פרויקט זה מופץ תחת רישיון MIT. ראה [LICENSE.md](LICENSE.md) לפרטים.

---

## 🙏 תודות

- **n8n** - על הפלטפורמה המדהימה
- **Sumit** - על ה-API המצוין
- **הקהילה** - על התמיכה והמשוב

---

## ⚠️ הצהרה

נוד זה הוא פרויקט קהילתי ו**אינו נתמך רשמית** על ידי Sumit או n8n.
השימוש בו הוא באחריותך.

---

## 📞 יצירת קשר

יש לך שאלות? רעיונות? משוב?

פנה אלינו דרך:
- GitHub Issues
- GitHub Discussions
- n8n Community

---

## 🎉 התחל עכשיו!

```bash
npm install n8n-nodes-sumit
n8n start
```

**בהצלחה עם האוטומציות שלך! 🚀**

---

**גרסה**: 1.0.0
**עודכן לאחרונה**: 2025-12-08
**תחזוקה**: פעילה

---

**[⬆ חזרה למעלה](#n8n-nodes-sumit)**
