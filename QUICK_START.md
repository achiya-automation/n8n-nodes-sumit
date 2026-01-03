# התחלה מהירה - Sumit Node ל-n8n

מדריך התחלה מהירה ליצירת workflows ראשונים עם נוד Sumit.

## 🚀 התקנה מהירה

```bash
# התקן את החבילה
npm install n8n-nodes-sumit

# הפעל מחדש את n8n
n8n start
```

## 🔑 הגדרת אישורים

1. היכנס ל-n8n → **Credentials** → **+ Create New**
2. בחר **"Sumit API"**
3. הזן:
   - **Company ID**: המזהה מסאמיט
   - **API Key**: המפתח מסאמיט
   - **Base URL**: `https://api.sumit.co.il`
4. לחץ **Save**

## 📋 5 Workflows הכי שימושיים

### 1️⃣ יצירת לקוח חדש

```
Manual Trigger
  ↓
Sumit Node
  Resource: Customer
  Operation: Create
  Name: "שם הלקוח"
  Email: "email@example.com"
  Phone: "050-1234567"
```

**תוצאה**: לקוח חדש נוצר בסאמיט עם מזהה יניקאלי.

---

### 2️⃣ יצירת חשבונית מס

```
Manual Trigger
  ↓
Sumit Node
  Resource: Document
  Operation: Create
  Document Type: Tax Invoice (1)
  Customer ID: 12345
  Items:
    - Name: "שירות"
    - Quantity: 1
    - Unit Price: 1000
  VAT Included: true
```

**תוצאה**: חשבונית מס עם מספר רשמי.

---

### 3️⃣ שליחת חשבונית במייל

```
Sumit Node (יצירת חשבונית)
  ↓
Sumit Node
  Resource: Document
  Operation: Send
  Document ID: {{ $json.Data.ID }}
  Email: "customer@example.com"
```

**תוצאה**: החשבונית נשלחת ללקוח במייל.

---

### 4️⃣ בדיקת חובות לקוח

```
Manual Trigger
  ↓
Sumit Node
  Resource: Document
  Operation: Get Debt
  Customer ID: 12345
```

**תוצאה**: רשימת כל החובות של הלקוח.

---

### 5️⃣ רשימת כל החשבוניות

```
Manual Trigger
  ↓
Sumit Node
  Resource: Document
  Operation: List
  Document Type: Tax Invoice (1)
  Include Drafts: false
```

**תוצאה**: רשימת כל החשבוניות במערכת.

---

## 🔥 תבניות Workflow מוכנות

### תבנית: הזמנה → חשבונית → מייל

```javascript
// 1. קבל הזמנה (Webhook/Database)
{
  "orderId": "12345",
  "customerName": "ישראל ישראלי",
  "customerEmail": "israel@example.com",
  "items": [
    { "name": "מוצר 1", "qty": 2, "price": 100 },
    { "name": "מוצר 2", "qty": 1, "price": 200 }
  ]
}

// 2. Function Node - המרה
const order = $input.item.json;
return [{
  json: {
    customer: {
      SearchMode: 4, // By Name
      Name: order.customerName,
      EmailAddress: order.customerEmail
    },
    items: order.items.map(i => ({
      Name: i.name,
      Quantity: i.qty,
      UnitPrice: i.price
    }))
  }
}];

// 3. Sumit Node - יצירת חשבונית
// Resource: Document
// Operation: Create
// Customer: {{ $json.customer }}
// Items: {{ $json.items }}

// 4. Sumit Node - שליחה
// Resource: Document
// Operation: Send
// Document ID: {{ $json.Data.ID }}
// Email: {{ $json.customer.EmailAddress }}
```

### תבנית: סנכרון לקוחות מ-Google Sheets

```
Google Sheets Trigger (כל שורה חדשה)
  ↓
Sumit Node
  Resource: Customer
  Operation: Create
  Name: {{ $json.Name }}
  Email: {{ $json.Email }}
  Phone: {{ $json.Phone }}
  Company Number: {{ $json.CompanyNumber }}
  ↓
Google Sheets Node
  Operation: Update
  Column: "Sumit ID"
  Value: {{ $json.Data.ID }}
```

### תבנית: התראה על חובות

```
Schedule Trigger (יומי ב-9:00)
  ↓
Sumit Node
  Resource: Document
  Operation: Get Debt Report
  ↓
Function Node (סינון חובות > 5000 ₪)
  ↓
IF Node (יש חובות גבוהים?)
  ↓ Yes
  Slack/Email Node
    "התראה: יש {{ $json.length }} לקוחות עם חוב מעל 5000 ₪"
```

---

## 💡 טיפים מהירים

### ✅ שמירת מזהי לקוחות

השתמש ב-External Identifier כדי לקשר בין מערכות:

```json
{
  "additionalFields": {
    "ExternalIdentifier": "CRM-12345"
  }
}
```

### ✅ טיפול בשגיאות

תמיד הוסף Try/Catch:

```
Try
  ↓ Sumit Node
Catch
  ↓ Send Alert
```

### ✅ בדיקת חיבור

לפני workflow מורכב, בדוק חיבור:

```
Sumit Node
  Resource: General
  Operation: Get VAT Rate
```

אם עובד - הכל תקין!

---

## 📊 סוגי מסמכים נפוצים

| קוד | סוג מסמך | מתי להשתמש |
|-----|---------|-----------|
| 0 | חשבונית | לעסקים רשומים |
| 1 | חשבונית מס | **הכי נפוץ** - למכירות רגילות |
| 2 | קבלה | לתקבולים בלבד |
| 3 | חשבונית מס/קבלה | מכירה + תשלום מיידי |
| 4 | זיכוי | החזר כספי |
| 7 | הצעת מחיר | לפני מכירה |

---

## 🐛 פתרון בעיות מהיר

### שגיאה: "Customer not found"
👉 **פתרון**: השתמש ב-`SearchMode: 4` (By Name) או צור את הלקוח קודם.

### שגיאה: "Invalid VAT calculation"
👉 **פתרון**: בדוק ש-`vatIncluded` מוגדר נכון:
- `true` = מחירים כוללים מע״מ
- `false` = מחירים לא כוללים מע״מ

### שגיאה: "Document already sent"
👉 **פתרון**: בדוק סטטוס מסמך לפני שליחה:
```
Sumit Node (Get Details)
  ↓
IF (status = draft)
  ↓
  Sumit Node (Send)
```

### שגיאה: "Rate limit exceeded"
👉 **פתרון**: הוסף Wait node:
```
Sumit Node
  ↓
Wait (1 second)
  ↓
Sumit Node
```

---

## 🔗 קישורים שימושיים

- 📖 [תיעוד מלא](README.md)
- 🇮🇱 [מדריך התקנה בעברית](INSTALLATION_GUIDE_HE.md)
- 💻 [דוגמאות מתקדמות](EXAMPLES.md)
- 🌐 [API של סאמיט](https://api.sumit.co.il/)

---

## 🆘 צריך עזרה?

1. **בדוק את התיעוד**: [README.md](README.md)
2. **חפש בקהילה**: [n8n Community](https://community.n8n.io/)
3. **דווח על באג**: [GitHub Issues](https://github.com/yourusername/n8n-nodes-sumit/issues)

---

**🎉 מוכן להתחיל!**

בחר אחת מהתבניות למעלה והתחל לבנות את ה-workflow הראשון שלך! 🚀
