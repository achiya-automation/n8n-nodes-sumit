# 🎉 החבילה פורסמה בהצלחה!

החבילה **n8n-nodes-sumit** פורסמה ב-npm ונמצאת כעת זמינה להתקנה ציבורית!

---

## 📦 פרטי החבילה

- **שם החבילה**: `n8n-nodes-sumit`
- **גרסה**: `1.0.0`
- **קישור npm**: [https://www.npmjs.com/package/n8n-nodes-sumit](https://www.npmjs.com/package/n8n-nodes-sumit)
- **מחבר**: Achiya
- **רישיון**: MIT

---

## 🚀 התקנה מהירה

### אופן 1: התקנה ישירה בסביבת n8n

אם אתה משתמש ב-n8n self-hosted:

```bash
# עצור את n8n
# הפעל את הפקודה הבאה:
npm install n8n-nodes-sumit

# הפעל מחדש את n8n
n8n start
```

### אופן 2: התקנה ב-Docker

הוסף לקובץ `docker-compose.yml`:

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - 5678:5678
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
    volumes:
      - ~/.n8n:/home/node/.n8n
    command: /bin/sh -c "cd /home/node/.n8n && npm install n8n-nodes-sumit && n8n start"
```

או התקן ידנית:

```bash
# הכנס לקונטיינר
docker exec -it n8n /bin/sh

# התקן את החבילה
cd /home/node/.n8n
npm install n8n-nodes-sumit

# צא והפעל מחדש את הקונטיינר
exit
docker restart n8n
```

### אופן 3: n8n Cloud (מוגבל)

⚠️ **שים לב**: n8n Cloud לא תומך בנודים מותאמים אישית כרגע. תצטרך להשתמש ב-self-hosted instance.

---

## ✅ אימות ההתקנה

1. היכנס ל-n8n שלך
2. צור workflow חדש
3. לחץ על "+" להוספת node
4. חפש "Sumit"
5. אם אתה רואה את הנוד - ההתקנה הצליחה! ✅

---

## 🔑 הגדרת אישורים

### שלב 1: קבל נתונים מסאמיט

1. היכנס לחשבון הסאמיט שלך: [www.sumit.co.il](https://www.sumit.co.il)
2. עבור אל: **הגדרות** → **הגדרות API**
3. העתק:
   - **מזהה חברה (Company ID)**
   - **מפתח API (API Key)**

### שלב 2: הגדר ב-n8n

1. ב-n8n, לך ל-**Credentials**
2. לחץ **+ Create New Credential**
3. חפש **"Sumit API"**
4. הזן:
   - **Company ID**: המספר מסאמיט
   - **API Key**: המפתח מסאמיט
   - **Base URL**: `https://api.sumit.co.il`
5. לחץ **Test** לבדיקת החיבור
6. לחץ **Save**

---

## 💡 דוגמה מהירה - Workflow ראשון

צור workflow פשוט לבדיקה:

### יצירת לקוח חדש

1. **הוסף Manual Trigger**
2. **הוסף Sumit Node**
3. **הגדר**:
   - Credential: בחר את האישור שיצרת
   - Resource: `Customer`
   - Operation: `Create`
   - Name: `לקוח בדיקה`
   - Email: `test@example.com`
   - Phone: `050-1234567`
4. **הפעל את ה-Workflow**

אם הכל עובד - תראה תגובה עם מזהה הלקוח החדש! 🎉

---

## 📚 תיעוד מלא

החבילה מגיעה עם תיעוד מקיף:

### בעברית 🇮🇱
- **[README_HE.md](README_HE.md)** - תיעוד ראשי בעברית
- **[QUICK_START.md](QUICK_START.md)** - התחלה מהירה
- **[INSTALLATION_GUIDE_HE.md](INSTALLATION_GUIDE_HE.md)** - מדריך התקנה מפורט

### באנגלית 🇺🇸
- **[README.md](README.md)** - Main documentation
- **[EXAMPLES.md](EXAMPLES.md)** - Advanced examples

---

## 🌟 תכונות עיקריות

### משאבים נתמכים:

- ✅ **לקוחות** (Customers) - יצירה, עדכון, ניהול
- ✅ **מסמכים** (Documents) - 11 סוגי מסמכים שונים
  - חשבונית מס (Tax Invoice)
  - קבלה (Receipt)
  - הצעת מחיר (Quote)
  - ועוד...
- ✅ **תשלומים** (Payments) - חיוב, מעקב
- ✅ **מוצרים** (Income Items) - ניהול מוצרים/שירותים
- ✅ **מלאי** (Stock) - מעקב מלאי
- ✅ **CRM** - ניהול ישויות
- ✅ **כלליות** - אימות בנק, מע"מ, שער חליפין

### 50+ פעולות זמינות!

---

## 🎯 דוגמאות שימוש נפוצות

### 1️⃣ אוטומציה של חשבוניות חודשיות

```
Schedule Trigger (1st of month)
  → Database (Get Subscriptions)
  → Sumit Node (Create Invoice)
  → Sumit Node (Send Email)
  → Update Database
```

### 2️⃣ אינטגרציה עם WooCommerce

```
WooCommerce Trigger (New Order)
  → Function (Transform Data)
  → Sumit Node (Create Customer)
  → Sumit Node (Create Tax Invoice)
  → Sumit Node (Send Invoice)
```

### 3️⃣ מעקב חובות אוטומטי

```
Schedule Trigger (Daily)
  → Sumit Node (Get Debt Report)
  → Filter (High Debt)
  → Slack/Email Alert
```

---

## 🔗 קישורים שימושיים

- 📦 **npm Package**: [npmjs.com/package/n8n-nodes-sumit](https://www.npmjs.com/package/n8n-nodes-sumit)
- 📚 **Sumit API Docs**: [api.sumit.co.il](https://api.sumit.co.il/)
- 💬 **n8n Community**: [community.n8n.io](https://community.n8n.io/)
- 📖 **n8n Docs**: [docs.n8n.io](https://docs.n8n.io/)

---

## 🆘 תמיכה

### בעיות נפוצות

**שגיאה: "Cannot find module 'n8n-nodes-sumit'"**
- ✅ וודא שהפעלת מחדש את n8n אחרי ההתקנה
- ✅ בדוק ש-npm install הצליח ללא שגיאות

**שגיאה: "Connection failed"**
- ✅ בדוק את ה-Company ID וה-API Key
- ✅ וודא שה-Base URL נכון: `https://api.sumit.co.il`

**הנוד לא מופיע ברשימה**
- ✅ הפעל מחדש את n8n
- ✅ נקה cache: `n8n start --flush`
- ✅ בדוק שההתקנה הצליחה: `npm list n8n-nodes-sumit`

### קבל עזרה

- 🐛 **דווח על באג**: [GitHub Issues](#) (אם יש repository)
- 💬 **שאלות**: [n8n Community Forum](https://community.n8n.io/)
- 📧 **צור קשר**: achiya@achiya-automation.com

---

## 📈 סטטיסטיקות

- ✅ **גרסה**: 1.0.0
- ✅ **גודל חבילה**: 14.6 KB (compressed)
- ✅ **קבצים**: 10
- ✅ **משאבים**: 9
- ✅ **פעולות**: 50+
- ✅ **תיעוד**: 8 מסמכים
- ✅ **רישיון**: MIT

---

## 🎊 תודה שבחרת ב-n8n-nodes-sumit!

אם החבילה עזרה לך, אנא:
- ⭐ תן כוכב ב-npm
- 📣 ספר לחברים
- 💬 שתף משוב בקהילה

**בהצלחה עם האוטומציות שלך! 🚀**

---

**תאריך פרסום**: 2025-12-08
**מחבר**: Achiya
**גרסה**: 1.0.0
