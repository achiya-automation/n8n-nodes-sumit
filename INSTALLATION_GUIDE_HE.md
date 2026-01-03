# מדריך התקנה - נוד Sumit עבור n8n

מדריך מפורט להתקנה ושימוש בנוד Sumit Accounting עבור n8n בעברית.

## תוכן עניינים

1. [דרישות מקדימות](#דרישות-מקדימות)
2. [התקנה](#התקנה)
3. [הגדרת אישורים](#הגדרת-אישורים)
4. [התחלת עבודה](#התחלת-עבודה)
5. [דוגמאות שימוש](#דוגמאות-שימוש)
6. [פתרון בעיות](#פתרון-בעיות)

---

## דרישות מקדימות

לפני ההתקנה, ודא שיש לך:

1. **n8n מותקן ופועל** - גרסה 1.0.0 ומעלה
2. **חשבון סאמיט פעיל** - עם גישה ל-API
3. **Node.js** - גרסה 18 ומעלה (אם מתקין ידנית)

### קבלת נתוני API מסאמיט

1. היכנס לחשבון הסאמיט שלך: [https://www.sumit.co.il](https://www.sumit.co.il)
2. עבור אל: **הגדרות** → **הגדרות API**
3. העתק את:
   - **מזהה חברה (Company ID)** - מספר החברה שלך
   - **מפתח API (API Key)** - מפתח הגישה ל-API
4. שמור את הפרטים במקום בטוח

---

## התקנה

### שיטה 1: התקנה ב-n8n Cloud

אם אתה משתמש ב-n8n Cloud, התקנת נודים מותאמים אישית מוגבלת. יש לעבור ל-self-hosted.

### שיטה 2: התקנה ב-n8n Self-Hosted (מומלץ)

#### א. התקנה דרך npm (כשהחבילה תתפרסם)

```bash
npm install n8n-nodes-sumit
```

לאחר מכן, הפעל מחדש את n8n:

```bash
n8n start
```

#### ב. התקנה ידנית (למפתחים)

1. **שכפל את הריפוזיטורי**:

```bash
cd ~/.n8n/custom
git clone https://github.com/yourusername/n8n-nodes-sumit.git
cd n8n-nodes-sumit
```

2. **התקן תלויות**:

```bash
npm install
```

3. **בנה את הפרויקט**:

```bash
npm run build
```

4. **הפעל מחדש את n8n**:

```bash
# אם n8n רץ בשירות systemd
sudo systemctl restart n8n

# אם רץ ב-Docker
docker restart n8n

# אם רץ ישירות
# עצור את התהליך והפעל מחדש:
n8n start
```

### שיטה 3: התקנה ב-Docker

אם אתה משתמש ב-n8n דרך Docker:

1. **צור תיקיית custom nodes**:

```bash
mkdir -p ~/.n8n/custom
```

2. **הוסף volume ל-docker-compose.yml**:

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - 5678:5678
    volumes:
      - ~/.n8n:/home/node/.n8n
      - ~/.n8n/custom:/home/node/.n8n/custom
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
```

3. **העתק את הנוד לתיקייה**:

```bash
cd ~/.n8n/custom
git clone https://github.com/yourusername/n8n-nodes-sumit.git
cd n8n-nodes-sumit
npm install
npm run build
```

4. **הפעל מחדש את ה-container**:

```bash
docker-compose restart
```

---

## הגדרת אישורים

לאחר התקנת הנוד, עליך להגדיר את אישורי ה-API של סאמיט:

### שלב 1: צור Credential חדש

1. היכנס ל-n8n שלך
2. לחץ על **Credentials** בתפריט הצד
3. לחץ על **+ Create New Credential**
4. חפש **"Sumit API"**
5. לחץ עליו כדי ליצור אישור חדש

### שלב 2: הזן את הפרטים

הזן את הפרטים הבאים:

| שדה | תיאור | דוגמה |
|-----|--------|-------|
| **Credential Name** | שם לזיהוי האישור | "סאמיט - חברת דוגמה בע״מ" |
| **Company ID** | מזהה החברה שקיבלת מסאמיט | `12345678` |
| **API Key** | מפתח ה-API שקיבלת מסאמיט | `abc123xyz...` |
| **Base URL** | כתובת ה-API של סאמיט | `https://api.sumit.co.il` |

### שלב 3: בדיקת חיבור

1. לחץ על **Test** כדי לבדוק את החיבור
2. אם הכל תקין, תראה הודעה: ✅ **Connection successful**
3. לחץ על **Save** לשמירת האישור

אם יש שגיאה:
- ✅ בדוק שהעתקת נכון את ה-Company ID וה-API Key
- ✅ וודא שאין רווחים מיותרים
- ✅ בדוק שמפתח ה-API לא פג תוקפו

---

## התחלת עבודה

### יצירת Workflow ראשון

נצור workflow פשוט שיוצר לקוח חדש בסאמיט:

1. **צור Workflow חדש**:
   - לחץ על **Workflows** → **+ Add Workflow**
   - תן שם: "יצירת לקוח בסאמיט"

2. **הוסף Manual Trigger**:
   - גרור **Manual Trigger** לקנבס
   - זה יאפשר לך להפעיל את ה-workflow באופן ידני

3. **הוסף Sumit Node**:
   - חפש "Sumit" בחיפוש
   - גרור את **Sumit** node לקנבס
   - חבר אותו ל-Manual Trigger

4. **הגדר את ה-Node**:
   - **Credential**: בחר את האישור שיצרת
   - **Resource**: `Customer`
   - **Operation**: `Create`
   - **Name**: `ישראל ישראלי`
   - **Email**: `israel@example.com`
   - **Phone**: `050-1234567`
   - **Company Number**: `514000123`

5. **הפעל את ה-Workflow**:
   - לחץ על **Execute Workflow**
   - אם הכל תקין, תראה את התוצאה:

```json
{
  "Status": "Success (0)",
  "Data": {
    "ID": 12345,
    "Name": "ישראל ישראלי",
    "EmailAddress": "israel@example.com"
  }
}
```

---

## דוגמאות שימוש

### דוגמה 1: יצירת חשבונית מס

**תרחיש**: אתה רוצה ליצור חשבונית מס עבור לקוח קיים.

**Workflow**:

```
Manual Trigger
  ↓
Sumit Node - יצירת חשבונית
  ↓
Sumit Node - שליחת חשבונית במייל
```

**הגדרות Node יצירת חשבונית**:

- **Resource**: `Document`
- **Operation**: `Create`
- **Document Type**: `Tax Invoice (1)` - חשבונית מס
- **Customer** → **Search Mode**: `By ID (1)`
- **Customer** → **Customer ID**: `12345` (מזהה הלקוח)
- **Items**:
  - **Item 1**:
    - Name: `שירותי פיתוח`
    - Quantity: `10`
    - Unit Price: `500`
    - Description: `10 שעות פיתוח`
- **VAT Included**: `true` (מחיר כולל מע"מ)
- **Additional Fields**:
  - **Description**: `פרויקט ABC - שלב 1`
  - **Due Date**: תאריך פירעון (30 יום מהיום)

**הגדרות Node שליחת חשבונית**:

- **Resource**: `Document`
- **Operation**: `Send`
- **Document ID**: `={{ $json.Data.ID }}` (מזהה החשבונית שנוצרה)
- **Document Type**: `Tax Invoice (1)`
- **Email Address**: `customer@example.com`

### דוגמה 2: עדכון פרטי לקוח מ-CRM

**תרחיש**: כאשר לקוח מתעדכן ב-CRM שלך, עדכן אותו גם בסאמיט.

**Workflow**:

```
Webhook (קבלת עדכון מ-CRM)
  ↓
Function (המרת מבנה נתונים)
  ↓
Sumit Node - עדכון לקוח
  ↓
Respond to Webhook
```

**Function Node - המרת נתונים**:

```javascript
// המר נתונים מ-CRM לפורמט סאמיט
const crmData = $input.item.json;

return [{
  json: {
    customerId: crmData.sumitId,
    name: `${crmData.firstName} ${crmData.lastName}`,
    email: crmData.email,
    phone: crmData.phone,
    city: crmData.city,
    address: crmData.address
  }
}];
```

### דוגמה 3: דוח חובות חודשי

**תרחיש**: שלח דוח חובות כל יום ראשון בחודש.

**Workflow**:

```
Schedule Trigger (יום ראשון ב-9:00)
  ↓
Sumit Node - קבלת דוח חובות
  ↓
IF Node (יש חובות מעל ₹1000)
  ↓ כן
  Email Node - שליחת התראה
```

**Schedule Trigger**:
- Cron Expression: `0 9 * * 0` (כל יום ראשון ב-9 בבוקר)

**Sumit Node - דוח חובות**:
- **Resource**: `Document`
- **Operation**: `Get Debt Report`
- **Debit Source**: `Tax Invoice (1)`
- **Credit Source**: `Tax Invoice (1)`

**IF Node**:
- **Condition**: `{{ $json.Data.TotalDebt > 1000 }}`

### דוגמה 4: אינטגרציה עם WooCommerce

**תרחיש**: צור חשבונית בסאמיט כאשר הזמנה מתקבלת ב-WooCommerce.

**Workflow**:

```
WooCommerce Trigger (הזמנה חדשה)
  ↓
Function (המרת הזמנה לפורמט סאמיט)
  ↓
Sumit Node - יצירת/עדכון לקוח
  ↓
Set (שמירת מזהה לקוח)
  ↓
Sumit Node - יצירת חשבונית מס
  ↓
Sumit Node - שליחת חשבונית
```

**Function Node - המרת הזמנה**:

```javascript
const order = $input.item.json;

// הכן נתוני לקוח
const customer = {
  name: `${order.billing.first_name} ${order.billing.last_name}`,
  email: order.billing.email,
  phone: order.billing.phone,
  city: order.billing.city,
  address: `${order.billing.address_1} ${order.billing.address_2}`.trim(),
  externalId: `WC-${order.id}`
};

// הכן פריטים
const items = order.line_items.map(item => ({
  name: item.name,
  quantity: item.quantity,
  unitPrice: parseFloat(item.price),
  description: item.sku ? `מקט: ${item.sku}` : ''
}));

return [{
  json: { customer, items, orderId: order.id }
}];
```

---

## פתרון בעיות

### בעיה: "Connection failed" בבדיקת אישורים

**פתרונות**:

1. ✅ **בדוק את ה-Company ID**:
   - הוא צריך להיות מספר (לא מחרוזת)
   - אין רווחים לפני או אחרי
   - העתק שוב מסאמיט

2. ✅ **בדוק את ה-API Key**:
   - העתק את כל המפתח (בדרך כלל 50+ תווים)
   - אין שורות חדשות או רווחים
   - המפתח תקף ולא פג תוקפו

3. ✅ **בדוק את ה-Base URL**:
   - צריך להיות: `https://api.sumit.co.il`
   - ללא `/` בסוף
   - עם `https` ולא `http`

4. ✅ **בדוק חיבור אינטרנט**:
   - וודא ש-n8n יכול להתחבר לאינטרנט
   - בדוק חומת אש/firewall

### בעיה: "Customer not found"

**פתרונות**:

1. ✅ **השתמש ב-Search Mode נכון**:
   - `By ID (1)` - אם יש לך מזהה סאמיט
   - `By Name (4)` - לחיפוש לפי שם
   - `By Company Number (3)` - לפי ח.פ./ע.מ.

2. ✅ **צור לקוח קודם**:
   - אם הלקוח לא קיים, צור אותו ב-node נפרד
   - שמור את ה-ID שמתקבל
   - השתמש בו ב-nodes הבאים

### בעיה: חשבונית לא נוצרת

**פתרונות**:

1. ✅ **בדוק פריטים (Items)**:
   - כל פריט חייב Name, Quantity, UnitPrice
   - המחירים חייבים להיות מספרים
   - הכמות חייבת להיות מספר חיובי

2. ✅ **בדוק הגדרות מע"מ**:
   - `vatIncluded: true` - אם המחירים כוללים מע"מ
   - `vatIncluded: false` - אם המחירים ללא מע"מ

3. ✅ **בדוק סוג מסמך**:
   - 1 = חשבונית מס (הכי נפוץ)
   - 3 = חשבונית מס/קבלה
   - בדוק בסאמיט איזה סוג מסמך מתאים

### בעיה: שגיאת "VAT calculation error"

**פתרון**:

וודא ש-`vatIncluded` תואם את מבנה המחירים:

```javascript
// אם המחירים שלך כוללים מע"מ:
"vatIncluded": true

// אם המחירים שלך לא כוללים מע"מ:
"vatIncluded": false
```

### בעיה: "Rate limit exceeded"

**פתרון**:

סאמיט מגביל מספר קריאות API. השתמש ב:

1. **Wait Node** - בין קריאות:
   ```
   Sumit Node
     ↓
   Wait (1 second)
     ↓
   Sumit Node
   ```

2. **Split in Batches** - לעיבוד המוני:
   ```
   Split in Batches (10 items)
     ↓
   Sumit Node
     ↓
   Wait (2 seconds)
     ↓
   Loop back
   ```

---

## עזרה נוספת

### משאבים

- **תיעוד API של סאמיט**: [https://api.sumit.co.il/](https://api.sumit.co.il/)
- **מרכז עזרה סאמיט**: [https://help.sumit.co.il/](https://help.sumit.co.il/)
- **תיעוד n8n**: [https://docs.n8n.io/](https://docs.n8n.io/)
- **קהילת n8n**: [https://community.n8n.io/](https://community.n8n.io/)

### צור קשר

- **דווח על באג**: [GitHub Issues](https://github.com/yourusername/n8n-nodes-sumit/issues)
- **הצע feature**: [GitHub Discussions](https://github.com/yourusername/n8n-nodes-sumit/discussions)
- **שאלות כלליות**: [n8n Community](https://community.n8n.io/)

---

## טיפים לשימוש מתקדם

### 1. שימוש ב-External Identifier

תמיד שמור מזהה חיצוני כדי לקשר בין המערכות:

```json
{
  "additionalFields": {
    "ExternalIdentifier": "CRM-12345"
  }
}
```

כך תוכל למצוא את הלקוח בקלות גם ב-workflows אחרים.

### 2. עיבוד אצווה יעיל

כאשר מעבדים הרבה רשומות, השתמש ב-Split in Batches:

```
Get All Records
  ↓
Split in Batches (20 items)
  ↓
Loop Start
  ↓
Sumit Node (Process items)
  ↓
Wait (2 seconds)
  ↓
Loop End
```

### 3. טיפול בשגיאות

הוסף טיפול בשגיאות לכל workflow ייצור:

```
Try
  ↓
  Sumit Node
  ↓
Catch Error
  ↓
  IF Error Type = "Customer Exists"
    ↓ Yes
    Sumit Node (Update instead)
    ↓ No
    Send Admin Alert
```

### 4. לוגים וניטור

הוסף logging ל-workflows חשובים:

```
Sumit Node
  ↓
Function (Log to database)
  ↓
Continue workflow
```

**Function לשמירת לוג**:

```javascript
const timestamp = new Date().toISOString();
const operation = $node["Sumit"].operation;
const status = $json.Status;

return [{
  json: {
    timestamp,
    operation,
    status,
    data: $json
  }
}];
```

---

**עודכן לאחרונה**: 2025-12-08

**גרסה**: 1.0.0
