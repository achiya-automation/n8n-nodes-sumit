# n8n-nodes-sumit

This is an n8n community node that lets you use [Sumit Accounting](https://www.sumit.co.il/) in your n8n workflows.

Sumit is a popular Israeli accounting and business management platform. This node provides comprehensive integration with Sumit's API, allowing you to automate your accounting workflows.

**Now includes a Trigger Node for real-time webhooks!** 🎯

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Trigger Node](#trigger-node)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Manual Installation

1. Go to your n8n installation directory
2. Navigate to `~/.n8n/custom`
3. Clone this repository or download it
4. Run `npm install` in the package directory
5. Restart n8n

### Using npm

```bash
npm install n8n-nodes-sumit
```

## Operations

This node supports the following resources and operations:

### Customer
- **Create**: Create a new customer
- **Update**: Update an existing customer
- **Get Details URL**: Get URL to customer details page in Sumit
- **Create Remark**: Add a remark/note to a customer

### Document
- **Create**: Create various document types (Invoice, Tax Invoice, Receipt, Quote, etc.)
- **Send**: Send document by email
- **Get PDF**: Download document as PDF
- **Get Details**: Get full document details
- **Add Expense**: Add an expense document
- **Cancel**: Cancel a document
- **Move to Books**: Move draft document to books
- **Get Debt**: Get customer debt information
- **Get Debt Report**: Generate full debt report
- **List**: List documents with filters

### General
- **Verify Bank Account**: Verify Israeli bank account details
- **Get VAT Rate**: Get VAT rate for a specific date
- **Get Exchange Rate**: Get currency exchange rate
- **Update Settings**: Update company settings
- **Get Next Document Number**: Get next available document number
- **Set Next Document Number**: Set next document number

### Income Item
- **Create**: Create a new product or service item
- **List**: List all income items

### Payment
- **Charge Customer**: Process a payment
- **Get Payment**: Get payment details
- **List Payments**: List all payments
- **Begin Redirect**: Create payment page redirect URL

### Payment Method
- **Get for Customer**: Get stored payment methods for a customer
- **Set for Customer**: Store payment method for a customer
- **Remove**: Remove stored payment method

### Stock
- **List**: List stock levels for items

### CRM Data
- **Create Entity**: Create a new CRM entity
- **Update Entity**: Update a CRM entity
- **Get Entity**: Get entity details
- **List Entities**: List entities with filters
- **Archive Entity**: Archive an entity
- **Delete Entity**: Delete an entity

### CRM Schema
- **Get Folder**: Get folder schema details with properties
- **List Folders**: List all available CRM folders with optional name filter

### CRM Views
- **List Views**: List available views for a specific folder

### Customer Service
- **Create Ticket**: Create a support ticket with subject and description

### Website Permissions
- **Set Permission**: Grant user permissions (Shared/Admin/ReadOnly)
- **Remove Permission**: Remove user permissions from organization

### Website Users
- **Create User**: Create new user and grant permissions to organization
- **Login Redirect**: Generate login redirect URL for existing users

### Company
- **Create**: Create a new organization
- **Update**: Update organization details
- **Get Details**: Get organization details
- **List Quotas**: List usage quotas

## Trigger Node

The **Sumit Trigger** node allows you to build real-time, event-driven workflows!

### Available Triggers

- **CRM Entity Created**: Triggers when a new CRM entity is created
- **CRM Entity Updated**: Triggers when a CRM entity is updated
- **Document Created**: Triggers when a new document is created
- **Payment Received**: Triggers when a payment is received
- **Custom**: Define your own custom trigger type

### How It Works

1. Add the "Sumit Trigger" node to your workflow
2. Select the trigger type (e.g., "CRM Entity Created")
3. Optionally specify a CRM folder to monitor
4. Optionally specify a View ID for filtered triggers
5. Activate your workflow

The trigger node will:
- ✅ Automatically subscribe to Sumit webhooks when activated
- ✅ Receive real-time data from Sumit events
- ✅ Automatically unsubscribe when deactivated

### Example Use Cases

- **Auto-respond to leads**: When a new CRM entity is created, send a welcome email
- **Payment notifications**: Get notified in Slack when a payment is received
- **Document sync**: Automatically sync new documents to Google Drive
- **Data integration**: Update your CRM when Sumit data changes

## Credentials

To use this node, you need to set up your Sumit API credentials in n8n:

1. **Company ID**: Your Sumit company/organization ID
2. **API Key**: Your Sumit API key
3. **Base URL**: The Sumit API base URL (default: `https://api.sumit.co.il`)

### How to Get Your Credentials

1. Log in to your Sumit account at [https://www.sumit.co.il](https://www.sumit.co.il)
2. Navigate to Settings → API Settings
3. Generate or copy your API Key
4. Your Company ID is shown in the API settings page
5. Copy both values to your n8n credentials

## Compatibility

This node has been tested with:
- n8n version 1.0.0 and above
- Sumit API v1

## Usage Examples

### Example 1: Create a Customer and Invoice

1. **Customer Node** (Resource: Customer, Operation: Create)
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "050-1234567"

2. **Document Node** (Resource: Document, Operation: Create)
   - Document Type: Tax Invoice
   - Customer: Use expression `{{ $json.Data.ID }}` from previous node
   - Items: Add your products/services
   - VAT Included: Yes

### Example 2: Send Monthly Invoices

1. **Schedule Trigger** (Run monthly)
2. **Document Node** (Resource: Document, Operation: List)
   - Document Type: Tax Invoice
   - Date From: First day of current month
   - Date To: Last day of current month
3. **Document Node** (Resource: Document, Operation: Send)
   - Document ID: `{{ $json.ID }}`
   - Email: `{{ $json.Customer.EmailAddress }}`

### Example 3: Check Customer Debt

1. **HTTP Request** or **Webhook** (Trigger on customer ID)
2. **Document Node** (Resource: Document, Operation: Get Debt)
   - Customer ID: From trigger
3. **Email Node** or **Slack Node** (Send notification if debt > threshold)

## Document Types

The following document types are supported:

| Value | Type |
|-------|------|
| 0 | Invoice (חשבונית) |
| 1 | Tax Invoice (חשבונית מס) |
| 2 | Receipt (קבלה) |
| 3 | Tax Invoice/Receipt (חשבונית מס/קבלה) |
| 4 | Credit Invoice (חשבונית זיכוי) |
| 5 | Proforma Invoice (חשבונית עסקה) |
| 6 | Delivery Note (תעודת משלוח) |
| 7 | Quote (הצעת מחיר) |
| 8 | Order (הזמנה) |
| 9 | Return/Credit (החזר/זיכוי) |
| 10 | Payment Request (בקשת תשלום) |

## API Response Format

All Sumit API responses follow this structure:

```json
{
  "Status": "Success (0)" | "Error",
  "UserErrorMessage": "Error message in Hebrew/English",
  "TechnicalErrorDetails": "Technical error details",
  "Data": { /* Response data varies by operation */ }
}
```

The node returns the full response object. You can access:
- Success status: `{{ $json.Status }}`
- Error message: `{{ $json.UserErrorMessage }}`
- Response data: `{{ $json.Data }}`

## Troubleshooting

### Authentication Errors
- Verify your Company ID and API Key are correct
- Make sure there are no extra spaces in credentials
- Check that your API key hasn't expired

### Document Creation Fails
- Ensure VAT settings match your company configuration
- Verify customer exists or provide complete customer details
- Check that item prices are valid numbers

### Network Errors
- Verify the Base URL is correct: `https://api.sumit.co.il`
- Check your firewall allows outbound HTTPS connections
- Ensure n8n has internet access

## Development

To modify or extend this node:

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-sumit.git
cd n8n-nodes-sumit

# Install dependencies
npm install

# Build
npm run build

# Run in development mode with watch
npm run dev
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Sumit API Documentation](https://api.sumit.co.il/)
* [Sumit Help Center](https://help.sumit.co.il/)

## Version History

### 1.0.0
- Initial release
- Support for Customers, Documents, Payments, and more
- Complete API coverage for main accounting operations

## License

[MIT](LICENSE.md)

## Support

For issues and questions:
- Create an issue on [GitHub](https://github.com/yourusername/n8n-nodes-sumit/issues)
- Check [Sumit Help Center](https://help.sumit.co.il/) for API-related questions
- Visit [n8n Community Forum](https://community.n8n.io/) for general n8n questions

---

**Note**: This is a community-maintained node and is not officially supported by Sumit or n8n. Use at your own risk.
