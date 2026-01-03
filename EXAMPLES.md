# Sumit Node - Example Workflows

This document provides detailed examples of common workflows using the Sumit node.

## Table of Contents

1. [Customer Management](#customer-management)
2. [Invoice Creation](#invoice-creation)
3. [Payment Processing](#payment-processing)
4. [Debt Management](#debt-management)
5. [Stock Management](#stock-management)
6. [Automated Workflows](#automated-workflows)

---

## Customer Management

### Create a New Customer

**Workflow**: New customer registration from form

```
Webhook (Receive form data)
  ↓
Sumit Node
  Resource: Customer
  Operation: Create
  Fields:
    - Name: {{ $json.body.fullName }}
    - Email: {{ $json.body.email }}
    - Phone: {{ $json.body.phone }}
    - Company Number: {{ $json.body.companyId }}
  ↓
Send confirmation email
```

**Sumit Node Configuration**:
```json
{
  "resource": "customer",
  "operation": "create",
  "customerName": "={{ $json.body.fullName }}",
  "customerEmail": "={{ $json.body.email }}",
  "customerPhone": "={{ $json.body.phone }}",
  "companyNumber": "={{ $json.body.companyId }}",
  "additionalFields": {
    "City": "={{ $json.body.city }}",
    "Address": "={{ $json.body.address }}",
    "ExternalIdentifier": "={{ $json.body.customerId }}"
  }
}
```

**Expected Response**:
```json
{
  "Status": "Success (0)",
  "Data": {
    "ID": 12345,
    "Name": "John Doe",
    "EmailAddress": "john@example.com"
  }
}
```

### Update Customer Details

**Workflow**: Update customer when CRM data changes

```
CRM Trigger (Customer updated)
  ↓
Sumit Node
  Resource: Customer
  Operation: Update
  Fields:
    - Customer ID: {{ $json.customerId }}
    - Name: {{ $json.name }}
    - Email: {{ $json.email }}
```

---

## Invoice Creation

### Create a Simple Tax Invoice

**Workflow**: Create invoice from order

```
Order Database (Get order)
  ↓
Sumit Node
  Resource: Document
  Operation: Create
  Document Type: Tax Invoice (1)
  ↓
Sumit Node
  Resource: Document
  Operation: Send
  Email: Customer email
```

**Document Creation Configuration**:
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
        "Name": "Web Development Service",
        "Quantity": 10,
        "UnitPrice": 500,
        "Description": "10 hours of development"
      },
      {
        "Name": "Hosting",
        "Quantity": 1,
        "UnitPrice": 200,
        "Description": "Monthly hosting fee"
      }
    ]
  },
  "vatIncluded": true,
  "documentAdditionalFields": {
    "Description": "Project XYZ - Phase 1",
    "DueDate": "={{ $now.plus(30, 'days').toISO() }}",
    "SendByEmail": true
  }
}
```

### Create Invoice with Multiple Items from Array

**Workflow**: Process bulk order

```javascript
// In Function node before Sumit
const items = $input.item.json.orderItems;

return items.map(item => ({
  json: {
    Name: item.productName,
    Quantity: item.quantity,
    UnitPrice: item.price,
    Description: item.description
  }
}));

// Then in Sumit node use:
// documentItems: {{ $json }}
```

### Create Proforma Invoice (Quote)

```json
{
  "resource": "document",
  "operation": "create",
  "documentType": 5,
  "documentCustomer": {
    "customerDetails": {
      "SearchMode": 4,
      "Name": "Potential Customer Ltd"
    }
  },
  "documentItems": {
    "item": [
      {
        "Name": "Product A",
        "Quantity": 100,
        "UnitPrice": 50
      }
    ]
  },
  "vatIncluded": true,
  "documentAdditionalFields": {
    "IsDraft": false,
    "Description": "Quote for Project ABC",
    "OpeningText": "Thank you for your interest. Here is our quote:",
    "ClosingText": "This quote is valid for 30 days"
  }
}
```

---

## Payment Processing

### Charge Customer for Invoice

**Workflow**: Process payment after invoice creation

```
Sumit Node (Create Invoice)
  ↓
Set Variable (Store document ID)
  ↓
Sumit Node (Charge Customer)
  Resource: Payment
  Operation: Charge Customer
```

### Get Customer Payment Methods

```json
{
  "resource": "paymentMethod",
  "operation": "getForCustomer",
  "customerId": 12345
}
```

**Response**:
```json
{
  "Status": "Success (0)",
  "Data": [
    {
      "ID": 67890,
      "Type": "CreditCard",
      "CreditCard_LastDigits": "4580",
      "IsActive": true
    }
  ]
}
```

---

## Debt Management

### Check Customer Debt Status

**Workflow**: Daily debt check and notification

```
Schedule Trigger (Daily at 9 AM)
  ↓
Sumit Node (Get Debt Report)
  Resource: Document
  Operation: Get Debt Report
  ↓
Filter (Only customers with debt > 1000)
  ↓
Send Reminder Email
```

**Get Debt Configuration**:
```json
{
  "resource": "document",
  "operation": "getDebt",
  "customerId": 12345,
  "debitSource": 1,
  "creditSource": 1,
  "includeDraftDocuments": false
}
```

### Generate Monthly Debt Report

```javascript
// In Function node
const moment = require('moment');
const startOfMonth = moment().startOf('month').toISOString();
const endOfMonth = moment().endOf('month').toISOString();

return [{
  json: {
    dateFrom: startOfMonth,
    dateTo: endOfMonth
  }
}];

// Then use in Sumit node
```

---

## Stock Management

### Update Stock Levels

**Workflow**: Sync stock from warehouse system

```
Warehouse API (Get stock levels)
  ↓
Function (Transform data)
  ↓
Sumit Node
  Resource: Stock
  Operation: List
  ↓
Compare and Update
```

**List Stock Configuration**:
```json
{
  "resource": "stock",
  "operation": "list"
}
```

---

## Automated Workflows

### Automatic Monthly Invoice Generation

**Complete Workflow**: Generate and send monthly invoices

```
Schedule Trigger (1st of each month at 8 AM)
  ↓
Database Query (Get active subscriptions)
  ↓
Split in Batches (Process 10 at a time)
  ↓
Sumit Node (Create Invoice)
  Resource: Document
  Operation: Create
  ↓
Sumit Node (Send Invoice)
  Resource: Document
  Operation: Send
  ↓
Database Update (Mark as invoiced)
  ↓
Slack Notification (Summary)
```

**Loop Through Customers**:
```javascript
// Function node to prepare customer data
const customers = $input.all();

return customers.map(customer => ({
  json: {
    customerId: customer.json.sumitCustomerId,
    customerEmail: customer.json.email,
    planName: customer.json.plan,
    amount: customer.json.monthlyAmount
  }
}));
```

### Payment Reminder System

**Workflow**: Send payment reminders for overdue invoices

```
Schedule Trigger (Daily at 10 AM)
  ↓
Sumit Node (Get Debt Report)
  ↓
Filter (Invoices overdue > 7 days)
  ↓
Split in Batches
  ↓
Sumit Node (Get Document Details)
  ↓
Email Node (Send reminder)
  ↓
Sumit Node (Create Remark)
  Note: "Payment reminder sent on {{ $now }}"
```

### CRM Integration Workflow

**Workflow**: Sync Sumit customers with external CRM

```
Schedule Trigger (Every hour)
  ↓
CRM API (Get updated contacts)
  ↓
Function (Transform to Sumit format)
  ↓
Sumit Node (Update/Create Customer)
  ↓
CRM API (Update with Sumit ID)
```

**Transform Function Example**:
```javascript
const contacts = $input.all();

return contacts.map(contact => ({
  json: {
    customerName: `${contact.json.firstName} ${contact.json.lastName}`,
    customerEmail: contact.json.email,
    customerPhone: contact.json.phone,
    companyNumber: contact.json.taxId,
    additionalFields: {
      ExternalIdentifier: contact.json.crmId,
      City: contact.json.city,
      Address: contact.json.street
    }
  }
}));
```

### E-commerce Order to Invoice

**Workflow**: Convert WooCommerce order to Sumit invoice

```
Webhook (WooCommerce order completed)
  ↓
Function (Extract order data)
  ↓
Sumit Node (Create/Update Customer)
  ↓
Set Variable (Store customer ID)
  ↓
Sumit Node (Create Tax Invoice)
  Items from order
  ↓
IF Node (Payment method = Credit Card)
  ↓ Yes
  Sumit Node (Record Payment)
  ↓
Sumit Node (Send Invoice Email)
```

**Order Processing Function**:
```javascript
const order = $input.first().json;

// Prepare customer
const customer = {
  customerName: `${order.billing.first_name} ${order.billing.last_name}`,
  customerEmail: order.billing.email,
  customerPhone: order.billing.phone,
  companyNumber: order.billing.company_tax_id || '',
  additionalFields: {
    City: order.billing.city,
    Address: `${order.billing.address_1} ${order.billing.address_2}`.trim(),
    ZipCode: order.billing.postcode,
    ExternalIdentifier: `WC-${order.id}`
  }
};

// Prepare items
const items = order.line_items.map(item => ({
  Name: item.name,
  Quantity: item.quantity,
  UnitPrice: parseFloat(item.price),
  Description: item.sku ? `SKU: ${item.sku}` : ''
}));

return [{
  json: {
    customer,
    items,
    orderId: order.id,
    orderNumber: order.number
  }
}];
```

### VAT Rate Monitor

**Workflow**: Monitor and update when VAT rate changes

```
Schedule Trigger (Daily)
  ↓
Sumit Node (Get VAT Rate)
  Resource: General
  Operation: Get VAT Rate
  ↓
Compare with stored value
  ↓
IF Changed
  ↓
  Slack/Email Notification
  ↓
  Update configuration
```

---

## Error Handling Best Practices

### Example with Error Handling

```
Try/Catch (Enable Continue on Fail)
  ↓
  Sumit Node (Create Customer)
  ↓
IF Error Occurred
  ↓ Yes
    Check Error Type
    ↓
    IF "Customer exists"
      ↓
      Sumit Node (Update Customer)
    ↓
    ELSE
      ↓
      Log Error
      ↓
      Send Admin Alert
```

### Retry Logic

```javascript
// Function node for retry logic
const maxRetries = 3;
const currentRetry = $node["Sumit"].json.retryCount || 0;

if (currentRetry < maxRetries) {
  return [{
    json: {
      retryCount: currentRetry + 1,
      shouldRetry: true
    }
  }];
}

return [{
  json: {
    shouldRetry: false,
    error: "Max retries reached"
  }
}];
```

---

## Tips and Tricks

### 1. Use External Identifiers

Always use the `ExternalIdentifier` field to link Sumit records with your external system:

```json
{
  "additionalFields": {
    "ExternalIdentifier": "CRM-12345"
  }
}
```

### 2. Batch Processing

When processing many records, use the "Split in Batches" node:

```
Split in Batches (10 items)
  ↓
Sumit Node
  ↓
Wait (1 second between batches)
  ↓
Loop Back
```

### 3. Date Formatting

Sumit expects ISO 8601 date format:

```javascript
// Correct format
const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 30);
return [{
  json: {
    DueDate: dueDate.toISOString()
  }
}];
```

### 4. Price Calculations

Always ensure prices are numbers:

```javascript
const unitPrice = parseFloat($json.price);
const quantity = parseInt($json.quantity);
const total = unitPrice * quantity;
```

---

## Common Issues and Solutions

### Issue: "Customer not found"
**Solution**: Use `SearchMode: 1` (By ID) when you have the Sumit customer ID, or create the customer first.

### Issue: "VAT calculation error"
**Solution**: Make sure `vatIncluded` boolean matches your price structure. If prices include VAT, set to `true`.

### Issue: "Document already sent"
**Solution**: Check document status before sending. Use "Get Details" operation first.

### Issue: "Payment method not found"
**Solution**: Ensure customer has a stored payment method before charging. Use "Get for Customer" operation to check.

---

## Need Help?

- Check the [README](README.md) for basic setup
- Review [Sumit API Documentation](https://api.sumit.co.il/)
- Visit [n8n Community Forum](https://community.n8n.io/)
- Create an issue on GitHub

---

**Last Updated**: 2025-12-08
