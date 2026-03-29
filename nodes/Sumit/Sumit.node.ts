import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeApiError,
	NodeConnectionTypes,
	IHttpRequestMethods,
	JsonObject,
} from 'n8n-workflow';

export class Sumit implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sumit',
		name: 'sumit',
		icon: 'file:sumit.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Sumit Accounting API',
		defaults: {
			name: 'Sumit',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'sumitApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resource Selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'CRM Data',
						value: 'crmData',
					},
					{
						name: 'CRM Schema',
						value: 'crmSchema',
					},
					{
						name: 'CRM Views',
						value: 'crmViews',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Customer Service',
						value: 'customerService',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'General',
						value: 'general',
					},
					{
						name: 'Income Item',
						value: 'incomeItem',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Payment Method',
						value: 'paymentMethod',
					},
					{
						name: 'Stock',
						value: 'stock',
					},
					{
						name: 'Website Permissions',
						value: 'websitePermissions',
					},
					{
						name: 'Website Users',
						value: 'websiteUsers',
					},
				],
				default: 'customer',
			},

			// ========================================
			//         CUSTOMER OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customer'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new customer',
						action: 'Create a customer',
					},
					{
						name: 'Create Remark',
						value: 'createRemark',
						description: 'Add a remark to a customer',
						action: 'Create a customer remark',
					},
					{
						name: 'Get Details URL',
						value: 'getDetailsUrl',
						description: 'Get URL to customer details page',
						action: 'Get customer details URL',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an existing customer',
						action: 'Update a customer',
					},
				],
				default: 'create',
			},

			// Customer Fields - Create/Update
			{
				displayName: 'Name',
				name: 'customerName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Customer name',
			},
			{
				displayName: 'Email',
				name: 'customerEmail',
				type: 'string',
				placeholder: 'name@email.com',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Customer email address',
			},
			{
				displayName: 'Phone',
				name: 'customerPhone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Customer phone number',
			},
			{
				displayName: 'Company Number',
				name: 'companyNumber',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Company registration number (HP/ID)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'City',
						name: 'City',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Address',
						name: 'Address',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Zip Code',
						name: 'ZipCode',
						type: 'string',
						default: '',
					},
					{
						displayName: 'External Identifier',
						name: 'ExternalIdentifier',
						type: 'string',
						default: '',
						description: 'Your internal customer ID',
					},
					{
						displayName: 'No VAT',
						name: 'NoVAT',
						type: 'boolean',
						default: false,
						description: 'Whether customer is exempt from VAT',
					},
					{
						displayName: 'Customer ID',
						name: 'ID',
						type: 'number',
						default: 0,
						description: 'Sumit customer ID (for update operation)',
					},
					{
						displayName: 'Folder',
						name: 'Folder',
						type: 'string',
						default: '',
						description: 'Customer folder/category',
					},
				],
			},

			// Customer ID - for getDetailsUrl and createRemark
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['getDetailsUrl', 'createRemark'],
					},
				},
				default: 0,
				required: true,
				description: 'Sumit customer ID',
			},

			// Remark text - for createRemark
			{
				displayName: 'Remark',
				name: 'remark',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['createRemark'],
					},
				},
				default: '',
				required: true,
				description: 'Remark text to add to customer',
			},

			// ========================================
			//         DOCUMENT OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['document'],
					},
				},
				options: [
					{
						name: 'Add Expense',
						value: 'addExpense',
						description: 'Add an expense document',
						action: 'Add an expense',
					},
					{
						name: 'Cancel',
						value: 'cancel',
						description: 'Cancel a document',
						action: 'Cancel a document',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new document (Invoice/Receipt/etc.)',
						action: 'Create a document',
					},
					{
						name: 'Get Debt',
						value: 'getDebt',
						description: 'Get customer debt information',
						action: 'Get customer debt',
					},
					{
						name: 'Get Debt Report',
						value: 'getDebtReport',
						description: 'Get full debt report',
						action: 'Get debt report',
					},
					{
						name: 'Get Details',
						value: 'getDetails',
						description: 'Get document details',
						action: 'Get document details',
					},
					{
						name: 'Get PDF',
						value: 'getPdf',
						description: 'Get document as PDF',
						action: 'Get document PDF',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List documents',
						action: 'List documents',
					},
					{
						name: 'Move to Books',
						value: 'moveToBooks',
						description: 'Move draft document to books',
						action: 'Move document to books',
					},
					{
						name: 'Send',
						value: 'send',
						description: 'Send document by email',
						action: 'Send a document',
					},
				],
				default: 'create',
			},

			// Document Type
			{
				displayName: 'Document Type',
				name: 'documentType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create', 'send', 'getPdf', 'getDetails', 'list'],
					},
				},
				options: [
					{
						name: 'Invoice (חשבונית)',
						value: 0,
					},
					{
						name: 'Invoice and Receipt (חשבונית מס קבלה)',
						value: 1,
					},
					{
						name: 'Receipt (קבלה)',
						value: 2,
					},
					{
						name: 'Proforma Invoice (חשבונית עסקה)',
						value: 3,
					},
					{
						name: 'Donation Receipt (קבלה לתרומה)',
						value: 4,
					},
					{
						name: 'Credit Invoice (חשבונית זיכוי)',
						value: 5,
					},
					{
						name: 'Credit Invoice and Receipt (חשבונית זיכוי וקבלה)',
						value: 6,
					},
					{
						name: 'Credit Receipt (קבלת זיכוי)',
						value: 7,
					},
					{
						name: 'Order (הזמנה)',
						value: 8,
					},
					{
						name: 'Delivery Note (תעודת משלוח)',
						value: 9,
					},
					{
						name: 'Goods Return Note (תעודת החזרה)',
						value: 10,
					},
					{
						name: 'Purchasing Order (הזמנת רכש)',
						value: 11,
					},
					{
						name: 'Price Quotation (הצעת מחיר)',
						value: 12,
					},
					{
						name: 'Payment Request (בקשת תשלום)',
						value: 13,
					},
					{
						name: 'Credit Donation Receipt (קבלת זיכוי לתרומה)',
						value: 14,
					},
					{
						name: 'Expense Invoice Receipt (חשבונית/קבלה הוצאה)',
						value: 15,
					},
					{
						name: 'Expense Invoice (חשבונית הוצאה)',
						value: 16,
					},
					{
						name: 'Expense Receipt (קבלת הוצאה)',
						value: 17,
					},
					{
						name: 'Expense Request (בקשת הוצאה)',
						value: 18,
					},
					{
						name: 'Credit Expense Invoice Receipt (זיכוי חשבונית/קבלה הוצאה)',
						value: 19,
					},
					{
						name: 'Credit Expense Invoice (זיכוי חשבונית הוצאה)',
						value: 20,
					},
					{
						name: 'Credit Expense Receipt (זיכוי קבלת הוצאה)',
						value: 21,
					},
					{
						name: 'Supplier Payment (תשלום לספק)',
						value: 22,
					},
				],
				default: 1,
				description: 'Type of document to work with',
			},

			// Document Create Fields
			{
				displayName: 'Customer',
				name: 'documentCustomer',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: false,
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create'],
					},
				},
				default: {},
				placeholder: 'Add Customer',
				options: [
					{
						displayName: 'Customer Details',
						name: 'customerDetails',
						values: [
							{
								displayName: 'Search Mode',
								name: 'SearchMode',
								type: 'options',
								options: [
									{ name: 'Automatic', value: 0 },
									{ name: 'By ID', value: 1 },
									{ name: 'By External Identifier', value: 2 },
									{ name: 'By Company Number', value: 3 },
									{ name: 'By Name', value: 4 },
								],
								default: 0,
							},
							{
								displayName: 'Name',
								name: 'Name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Email',
								name: 'EmailAddress',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Customer ID',
								name: 'ID',
								type: 'number',
								default: 0,
							},
							{
								displayName: 'External Identifier',
								name: 'ExternalIdentifier',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Company Number',
								name: 'CompanyNumber',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},

			// Document Items
			{
				displayName: 'Items',
				name: 'documentItems',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create'],
					},
				},
				default: {},
				placeholder: 'Add Item',
				options: [
					{
						displayName: 'Item',
						name: 'item',
						values: [
							{
								displayName: 'Item Name',
								name: 'Name',
								type: 'string',
								default: '',
								required: true,
							},
							{
								displayName: 'Quantity',
								name: 'Quantity',
								type: 'number',
								default: 1,
								required: true,
							},
							{
								displayName: 'Unit Price',
								name: 'UnitPrice',
								type: 'number',
								default: 0,
								required: true,
							},
							{
								displayName: 'Description',
								name: 'Description',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},

			// VAT Settings
			{
				displayName: 'VAT Included',
				name: 'vatIncluded',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create'],
					},
				},
				default: true,
				description: 'Whether prices include VAT',
			},

			// Document Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'documentAdditionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Is Draft',
						name: 'IsDraft',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Date',
						name: 'Date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Due Date',
						name: 'DueDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Description',
						name: 'Description',
						type: 'string',
						default: '',
					},
					{
						displayName: 'External Reference',
						name: 'ExternalReference',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Opening Text',
						name: 'OpeningText',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Closing Text',
						name: 'ClosingText',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Language',
						name: 'Language',
						type: 'options',
						options: [
							{ name: 'Hebrew', value: 0 },
							{ name: 'English', value: 1 },
						],
						default: 0,
					},
					{
						displayName: 'Send By Email',
						name: 'SendByEmail',
						type: 'boolean',
						default: false,
					},
				],
			},

			// Document ID/Number fields for other operations
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['send', 'getPdf', 'getDetails', 'cancel', 'moveToBooks'],
					},
				},
				default: 0,
				description: 'The Sumit document ID',
			},

			{
				displayName: 'Document Number',
				name: 'documentNumber',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['send', 'getPdf', 'getDetails'],
					},
				},
				default: 0,
				description: 'The document number (alternative to Document ID)',
			},

			// Send Document Fields
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['send'],
					},
				},
				default: '',
				required: true,
				description: 'Email address to send document to',
			},

			// ========================================
			//         GENERAL OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['general'],
					},
				},
				options: [
					{
						name: 'Get Exchange Rate',
						value: 'getExchangeRate',
						description: 'Get currency exchange rate',
						action: 'Get exchange rate',
					},
					{
						name: 'Get Next Document Number',
						value: 'getNextDocumentNumber',
						description: 'Get next available document number',
						action: 'Get next document number',
					},
					{
						name: 'Get VAT Rate',
						value: 'getVatRate',
						description: 'Get VAT rate for a specific date',
						action: 'Get VAT rate',
					},
					{
						name: 'Set Next Document Number',
						value: 'setNextDocumentNumber',
						description: 'Set next document number',
						action: 'Set next document number',
					},
					{
						name: 'Update Settings',
						value: 'updateSettings',
						description: 'Update company settings',
						action: 'Update settings',
					},
					{
						name: 'Verify Bank Account',
						value: 'verifyBankAccount',
						description: 'Verify Israeli bank account details',
						action: 'Verify bank account',
					},
				],
				default: 'getVatRate',
			},

			// Bank Account Verification Fields
			{
				displayName: 'Bank Code',
				name: 'bankCode',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['general'],
						operation: ['verifyBankAccount'],
					},
				},
				default: 0,
				required: true,
				description: 'Israeli bank code',
			},
			{
				displayName: 'Branch Code',
				name: 'branchCode',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['general'],
						operation: ['verifyBankAccount'],
					},
				},
				default: 0,
				required: true,
				description: 'Bank branch code',
			},
			{
				displayName: 'Account Number',
				name: 'accountNumber',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['general'],
						operation: ['verifyBankAccount'],
					},
				},
				default: 0,
				required: true,
				description: 'Bank account number',
			},

			// Exchange Rate Fields
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['general'],
						operation: ['getVatRate', 'getExchangeRate'],
					},
				},
				default: '',
				description: 'Date for rate lookup',
			},
			{
				displayName: 'Currency From',
				name: 'currencyFrom',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['general'],
						operation: ['getExchangeRate'],
					},
				},
				default: 'USD',
				required: true,
				description: 'Source currency code',
			},
			{
				displayName: 'Currency To',
				name: 'currencyTo',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['general'],
						operation: ['getExchangeRate'],
					},
				},
				default: 'ILS',
				required: true,
				description: 'Target currency code',
			},

			// ========================================
			//         INCOME ITEM OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['incomeItem'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new income item (product/service)',
						action: 'Create an income item',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all income items',
						action: 'List income items',
					},
				],
				default: 'create',
			},

			// Income Item Fields
			{
				displayName: 'Item Name',
				name: 'itemName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['incomeItem'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the product or service',
			},
			{
				displayName: 'Price',
				name: 'itemPrice',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['incomeItem'],
						operation: ['create'],
					},
				},
				default: 0,
				required: true,
				description: 'Item price',
			},
			{
				displayName: 'Additional Fields',
				name: 'itemAdditionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['incomeItem'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Description',
						name: 'Description',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Cost',
						name: 'Cost',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Currency',
						name: 'Currency',
						type: 'string',
						default: 'ILS',
					},
					{
						displayName: 'SKU',
						name: 'SKU',
						type: 'string',
						default: '',
					},
					{
						displayName: 'External Identifier',
						name: 'ExternalIdentifier',
						type: 'string',
						default: '',
					},
				],
			},

			// ========================================
			//         PAYMENT OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['payment'],
					},
				},
				options: [
					{
						name: 'Begin Redirect',
						value: 'beginRedirect',
						description: 'Create payment page redirect',
						action: 'Begin payment redirect',
					},
					{
						name: 'Charge Customer',
						value: 'charge',
						description: 'Charge a customer',
						action: 'Charge a customer',
					},
					{
						name: 'Get Payment',
						value: 'get',
						description: 'Get payment details',
						action: 'Get a payment',
					},
					{
						name: 'List Payments',
						value: 'list',
						description: 'List payments',
						action: 'List payments',
					},
				],
				default: 'charge',
			},

			// Payment ID
			{
				displayName: 'Payment ID',
				name: 'paymentId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['get'],
					},
				},
				default: 0,
				required: true,
				description: 'The payment ID',
			},

			// ========================================
			//         PAYMENT METHOD OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['paymentMethod'],
					},
				},
				options: [
					{
						name: 'Get for Customer',
						value: 'getForCustomer',
						description: 'Get stored payment methods for customer',
						action: 'Get payment methods',
					},
					{
						name: 'Remove',
						value: 'remove',
						description: 'Remove stored payment method',
						action: 'Remove payment method',
					},
					{
						name: 'Set for Customer',
						value: 'setForCustomer',
						description: 'Store payment method for customer',
						action: 'Set payment method',
					},
				],
				default: 'getForCustomer',
			},

			// Customer Reference for Payment Methods
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['paymentMethod'],
						operation: ['getForCustomer', 'setForCustomer', 'remove'],
					},
				},
				default: 0,
				description: 'Sumit customer ID',
			},

			// ========================================
			//         STOCK OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['stock'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List stock levels',
						action: 'List stock',
					},
				],
				default: 'list',
			},

			// ========================================
			//         CRM DATA OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['crmData'],
					},
				},
				options: [
					{
						name: 'Archive Entity',
						value: 'archiveEntity',
						description: 'Archive an entity',
						action: 'Archive entity',
					},
					{
						name: 'Create Entity',
						value: 'createEntity',
						description: 'Create a new CRM entity',
						action: 'Create entity',
					},
					{
						name: 'Delete Entity',
						value: 'deleteEntity',
						description: 'Delete an entity',
						action: 'Delete entity',
					},
					{
						name: 'Get Entity',
						value: 'getEntity',
						description: 'Get entity details',
						action: 'Get entity',
					},
					{
						name: 'List Entities',
						value: 'listEntities',
						description: 'List entities',
						action: 'List entities',
					},
					{
						name: 'Update Entity',
						value: 'updateEntity',
						description: 'Update a CRM entity',
						action: 'Update entity',
					},
				],
				default: 'listEntities',
			},

			// Entity ID
			{
				displayName: 'Entity ID',
				name: 'entityId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['crmData'],
						operation: ['getEntity', 'updateEntity', 'archiveEntity', 'deleteEntity'],
					},
				},
				default: 0,
				required: true,
				description: 'The entity ID',
			},

			// ========================================
			//         CRM SCHEMA OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['crmSchema'],
					},
				},
				options: [
					{
						name: 'Get Folder',
						value: 'getFolder',
						description: 'Get folder schema details',
						action: 'Get folder',
					},
					{
						name: 'List Folders',
						value: 'listFolders',
						description: 'List all available folders',
						action: 'List folders',
					},
				],
				default: 'listFolders',
			},

			// Folder Name - for CRM Schema getFolder
			{
				displayName: 'Folder',
				name: 'folder',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['crmSchema'],
						operation: ['getFolder'],
					},
				},
				default: '',
				required: true,
				description: 'Folder name to get schema for',
			},

			// Include Properties - for CRM Schema getFolder
			{
				displayName: 'Include Properties',
				name: 'includeProperties',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['crmSchema'],
						operation: ['getFolder'],
					},
				},
				default: true,
				description: 'Whether to include folder properties',
			},

			// Name Filter - for CRM Schema listFolders
			{
				displayName: 'Name Filter',
				name: 'nameFilter',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['crmSchema'],
						operation: ['listFolders'],
					},
				},
				default: '',
				description: 'Filter folders by name',
			},

			// ========================================
			//         CRM VIEWS OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['crmViews'],
					},
				},
				options: [
					{
						name: 'List Views',
						value: 'listViews',
						description: 'List available views for a folder',
						action: 'List views',
					},
				],
				default: 'listViews',
			},

			// Folder ID - for CRM Views
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['crmViews'],
						operation: ['listViews'],
					},
				},
				default: 0,
				required: true,
				description: 'Folder ID to list views for',
			},

			// ========================================
			//         CUSTOMER SERVICE OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customerService'],
					},
				},
				options: [
					{
						name: 'Create Ticket',
						value: 'createTicket',
						description: 'Create a support ticket',
						action: 'Create ticket',
					},
				],
				default: 'createTicket',
			},

			// Ticket Fields
			{
				displayName: 'Subject',
				name: 'ticketSubject',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['customerService'],
						operation: ['createTicket'],
					},
				},
				default: '',
				required: true,
				description: 'Ticket subject',
			},
			{
				displayName: 'Description',
				name: 'ticketDescription',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['customerService'],
						operation: ['createTicket'],
					},
				},
				default: '',
				required: true,
				description: 'Ticket description',
			},

			// ========================================
			//         WEBSITE PERMISSIONS OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['websitePermissions'],
					},
				},
				options: [
					{
						name: 'Remove Permission',
						value: 'removePermission',
						description: 'Remove user permission',
						action: 'Remove permission',
					},
					{
						name: 'Set Permission',
						value: 'setPermission',
						description: 'Grant user permission',
						action: 'Set permission',
					},
				],
				default: 'setPermission',
			},

			// User ID - for Website Permissions
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['websitePermissions'],
						operation: ['setPermission', 'removePermission'],
					},
				},
				default: 0,
				required: true,
				description: 'User ID to manage permissions for',
			},

			// Role - for Website Permissions set
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['websitePermissions'],
						operation: ['setPermission'],
					},
				},
				options: [
					{
						name: 'Shared',
						value: 'Shared',
					},
					{
						name: 'Admin',
						value: 'Admin',
					},
					{
						name: 'Read Only',
						value: 'ReadOnly',
					},
				],
				default: 'Shared',
				required: true,
				description: 'Role to grant',
			},

			// ========================================
			//         WEBSITE USERS OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
					},
				},
				options: [
					{
						name: 'Create User',
						value: 'createUser',
						description: 'Create user and grant permissions',
						action: 'Create user',
					},
					{
						name: 'Login Redirect',
						value: 'loginRedirect',
						description: 'Get login redirect URL',
						action: 'Login redirect',
					},
				],
				default: 'createUser',
			},

			// User Fields - for Website Users create
			{
				displayName: 'Name',
				name: 'userName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
						operation: ['createUser'],
					},
				},
				default: '',
				required: true,
				description: 'User name',
			},
			{
				displayName: 'Email',
				name: 'userEmail',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
						operation: ['createUser', 'loginRedirect'],
					},
				},
				default: '',
				required: true,
				description: 'User email address',
			},
			{
				displayName: 'Password',
				name: 'userPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
						operation: ['createUser', 'loginRedirect'],
					},
				},
				default: '',
				required: true,
				description: 'User password',
			},
			{
				displayName: 'Phone',
				name: 'userPhone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
						operation: ['createUser'],
					},
				},
				default: '',
				description: 'User phone number',
			},
			{
				displayName: 'Role',
				name: 'userRole',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
						operation: ['createUser'],
					},
				},
				options: [
					{
						name: 'Shared',
						value: 'Shared',
					},
					{
						name: 'Admin',
						value: 'Admin',
					},
					{
						name: 'Read Only',
						value: 'ReadOnly',
					},
				],
				default: 'Shared',
				required: true,
				description: 'User role',
			},
			{
				displayName: 'Skip Activation',
				name: 'skipActivation',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['websiteUsers'],
						operation: ['createUser'],
					},
				},
				default: false,
				description: 'Whether to skip email activation',
			},

			// ========================================
			//         COMPANY OPERATIONS
			// ========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['company'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new organization',
						action: 'Create company',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update organization details',
						action: 'Update company',
					},
					{
						name: 'Get Details',
						value: 'getDetails',
						description: 'Get organization details',
						action: 'Get company details',
					},
					{
						name: 'List Quotas',
						value: 'listQuotas',
						description: 'List usage quotas',
						action: 'List quotas',
					},
				],
				default: 'getDetails',
			},

			// Company Name
			{
				displayName: 'Company Name',
				name: 'companyName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Organization name',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const credentials = await this.getCredentials('sumitApi');

		const baseUrl = credentials.baseUrl as string;
		const companyId = credentials.companyId as number;
		const apiKey = credentials.apiKey as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let endpoint = '';
				let method: IHttpRequestMethods = 'POST';
				let body: IDataObject = {
					Credentials: {
						CompanyID: companyId,
						APIKey: apiKey,
					},
				};

				// ========================================
				//         CUSTOMER RESOURCE
				// ========================================
				if (resource === 'customer') {
					if (operation === 'create') {
						endpoint = '/accounting/customers/create/';
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						body.Details = {
							Name: this.getNodeParameter('customerName', i) as string,
							EmailAddress: this.getNodeParameter('customerEmail', i) as string,
							Phone: this.getNodeParameter('customerPhone', i) as string,
							CompanyNumber: this.getNodeParameter('companyNumber', i) as string,
							...additionalFields,
						};
					} else if (operation === 'update') {
						endpoint = '/accounting/customers/update/';
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						body.Details = {
							Name: this.getNodeParameter('customerName', i) as string,
							EmailAddress: this.getNodeParameter('customerEmail', i) as string,
							Phone: this.getNodeParameter('customerPhone', i) as string,
							CompanyNumber: this.getNodeParameter('companyNumber', i) as string,
							...additionalFields,
						};
					} else if (operation === 'getDetailsUrl') {
						endpoint = '/accounting/customers/getdetailsurl/';
						body.CustomerID = this.getNodeParameter('customerId', i) as number;
					} else if (operation === 'createRemark') {
						endpoint = '/accounting/customers/createremark/';
						body.CustomerID = this.getNodeParameter('customerId', i) as number;
						body.Remark = this.getNodeParameter('remark', i) as string;
					}
				}

				// ========================================
				//         DOCUMENT RESOURCE
				// ========================================
				else if (resource === 'document') {
					if (operation === 'create') {
						endpoint = '/accounting/documents/create/';
						const documentType = this.getNodeParameter('documentType', i) as number;
						const vatIncluded = this.getNodeParameter('vatIncluded', i) as boolean;
						const customerData = this.getNodeParameter('documentCustomer', i, {}) as IDataObject;
						const itemsData = this.getNodeParameter('documentItems', i, {}) as IDataObject;
						const additionalFields = this.getNodeParameter('documentAdditionalFields', i, {}) as IDataObject;

						// Process customer
						let customer = {};
						if (customerData.customerDetails) {
							customer = (customerData.customerDetails as IDataObject);
						}

						// Process items
						const items: IDataObject[] = [];
						if (itemsData.item && Array.isArray(itemsData.item)) {
							for (const item of itemsData.item) {
								const itemData = item as IDataObject;
								items.push({
									Quantity: itemData.Quantity,
									UnitPrice: itemData.UnitPrice,
									TotalPrice: (itemData.Quantity as number) * (itemData.UnitPrice as number),
									Item: {
										Name: itemData.Name,
										Description: itemData.Description || null,
										SearchMode: 0,
									},
									Description: itemData.Description || null,
								});
							}
						}

						body.Details = {
							Type: documentType,
							Customer: customer,
							...additionalFields,
						};
						body.Items = items;
						body.VATIncluded = vatIncluded;

					} else if (operation === 'send') {
						endpoint = '/accounting/documents/send/';
						body.DocumentID = this.getNodeParameter('documentId', i) as number;
						body.DocumentType = this.getNodeParameter('documentType', i) as number;
						body.DocumentNumber = this.getNodeParameter('documentNumber', i, 0) as number;
						body.EmailAddress = this.getNodeParameter('emailAddress', i) as string;
						body.Original = true;

					} else if (operation === 'getPdf') {
						endpoint = '/accounting/documents/getpdf/';
						body.DocumentID = this.getNodeParameter('documentId', i, 0) as number;
						body.DocumentType = this.getNodeParameter('documentType', i) as number;
						body.DocumentNumber = this.getNodeParameter('documentNumber', i, 0) as number;
						body.Original = true;

					} else if (operation === 'getDetails') {
						endpoint = '/accounting/documents/getdetails/';
						body.DocumentID = this.getNodeParameter('documentId', i, 0) as number;
						body.DocumentType = this.getNodeParameter('documentType', i) as number;
						body.DocumentNumber = this.getNodeParameter('documentNumber', i, 0) as number;

					} else if (operation === 'cancel') {
						endpoint = '/accounting/documents/cancel/';
						body.DocumentID = this.getNodeParameter('documentId', i) as number;

					} else if (operation === 'moveToBooks') {
						endpoint = '/accounting/documents/movetobooks/';
						body.DocumentID = this.getNodeParameter('documentId', i) as number;

					} else if (operation === 'addExpense') {
						endpoint = '/accounting/documents/addexpense/';
						body.ExpenseNumber = this.getNodeParameter('expenseNumber', i, '') as string;
						body.ExpenseFile = this.getNodeParameter('expenseFile', i, '') as string;
						body.ExpenseFilename = this.getNodeParameter('expenseFilename', i, '') as string;
						body.Date = this.getNodeParameter('expenseDate', i, new Date()) as string;
						body.Description = this.getNodeParameter('expenseDescription', i, '') as string;
						body.IsDraft = this.getNodeParameter('isDraft', i, true) as boolean;

					} else if (operation === 'getDebt') {
						endpoint = '/accounting/documents/getdebt/';
						body.CustomerID = this.getNodeParameter('customerId', i) as number;
						body.DebitSource = 1; // TaxInvoice default
						body.CreditSource = 1;
						body.IncludeDraftDocuments = this.getNodeParameter('includeDrafts', i, true) as boolean;

					} else if (operation === 'getDebtReport') {
						endpoint = '/accounting/documents/getdebtreport/';
						body.DebitSource = 1;
						body.CreditSource = 1;
						body.IncludeDraftDocuments = this.getNodeParameter('includeDrafts', i, true) as boolean;

					} else if (operation === 'list') {
						endpoint = '/accounting/documents/list/';
						body.DocumentTypes = [this.getNodeParameter('documentType', i) as number];
						body.IncludeDrafts = true;
					}
				}

				// ========================================
				//         GENERAL RESOURCE
				// ========================================
				else if (resource === 'general') {
					if (operation === 'verifyBankAccount') {
						endpoint = '/accounting/general/verifybankaccount/';
						body.BankCode = this.getNodeParameter('bankCode', i) as number;
						body.BranchCode = this.getNodeParameter('branchCode', i) as number;
						body.AccountNumber = this.getNodeParameter('accountNumber', i) as number;
						body.VerifyBranchNumber = true;
						body.VerifyLimitedAccount = true;

					} else if (operation === 'getVatRate') {
						endpoint = '/accounting/general/getvatrate/';
						const date = this.getNodeParameter('date', i, new Date().toISOString()) as string;
						body.Date = date;

					} else if (operation === 'getExchangeRate') {
						endpoint = '/accounting/general/getexchangerate/';
						const date = this.getNodeParameter('date', i, new Date().toISOString()) as string;
						body.Date = date;
						body.Currency_From = this.getNodeParameter('currencyFrom', i) as string;
						body.Currency_To = this.getNodeParameter('currencyTo', i) as string;

					} else if (operation === 'getNextDocumentNumber') {
						endpoint = '/accounting/general/getnextdocumentnumber/';
						body.Type = this.getNodeParameter('documentType', i) as number;

					} else if (operation === 'setNextDocumentNumber') {
						endpoint = '/accounting/general/setnextdocumentnumber/';
						body.Type = this.getNodeParameter('documentType', i) as number;
						// Add NextDocumentNumber parameter
					}
				}

				// ========================================
				//         INCOME ITEM RESOURCE
				// ========================================
				else if (resource === 'incomeItem') {
					if (operation === 'create') {
						endpoint = '/accounting/incomeitems/create/';
						const additionalFields = this.getNodeParameter('itemAdditionalFields', i, {}) as IDataObject;

						body.IncomeItem = {
							Name: this.getNodeParameter('itemName', i) as string,
							Price: this.getNodeParameter('itemPrice', i) as number,
							SearchMode: null,
							...additionalFields,
						};

					} else if (operation === 'list') {
						endpoint = '/accounting/incomeitems/list/';
					}
				}

				// ========================================
				//         PAYMENT RESOURCE
				// ========================================
				else if (resource === 'payment') {
					if (operation === 'charge') {
						endpoint = '/billing/payments/charge/';
						body.Customer = {
							Name: this.getNodeParameter('customerName', i, '') as string,
							EmailAddress: this.getNodeParameter('customerEmail', i, '') as string,
						};
						body.Items = this.getNodeParameter('paymentItems', i, []) as IDataObject[];
						body.VATIncluded = this.getNodeParameter('vatIncluded', i, true) as boolean;
						body.SendDocumentByEmail = this.getNodeParameter('sendEmail', i, true) as boolean;

					} else if (operation === 'get') {
						endpoint = '/billing/payments/get/';
						body.PaymentID = this.getNodeParameter('paymentId', i) as number;

					} else if (operation === 'list') {
						endpoint = '/billing/payments/list/';
						body.Date_From = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
						body.Date_To = new Date().toISOString();

					} else if (operation === 'beginRedirect') {
						endpoint = '/billing/payments/beginredirect/';
						body.Customer = {
							Name: this.getNodeParameter('customerName', i, '') as string,
							EmailAddress: this.getNodeParameter('customerEmail', i, '') as string,
						};
						body.Items = this.getNodeParameter('paymentItems', i, []) as IDataObject[];
						body.VATIncluded = this.getNodeParameter('vatIncluded', i, true) as boolean;
						body.RedirectURL = this.getNodeParameter('redirectUrl', i) as string;
					}
				}

				// ========================================
				//         PAYMENT METHOD RESOURCE
				// ========================================
				else if (resource === 'paymentMethod') {
					if (operation === 'getForCustomer') {
						endpoint = '/billing/paymentmethods/getforcustomer/';
						body.Customer = {
							ID: this.getNodeParameter('customerId', i, 0) as number,
							SearchMode: 1, // By ID
						};

					} else if (operation === 'setForCustomer') {
						endpoint = '/billing/paymentmethods/setforcustomer/';
						body.Customer = {
							ID: this.getNodeParameter('customerId', i) as number,
							SearchMode: 1,
						};
						body.SingleUseToken = this.getNodeParameter('singleUseToken', i, '') as string;

					} else if (operation === 'remove') {
						endpoint = '/billing/paymentmethods/remove/';
						body.Customer = {
							ID: this.getNodeParameter('customerId', i) as number,
							SearchMode: 1,
						};
					}
				}

				// ========================================
				//         STOCK RESOURCE
				// ========================================
				else if (resource === 'stock') {
					if (operation === 'list') {
						endpoint = '/stock/stock/list/';
						body.ExcludeZeroStock = true;
					}
				}

				// ========================================
				//         CRM DATA RESOURCE
				// ========================================
				else if (resource === 'crmData') {
					if (operation === 'createEntity') {
						endpoint = '/crm/data/createentity/';
						body.Entity = {
							Folder: this.getNodeParameter('folder', i, '') as string,
							Properties: this.getNodeParameter('properties', i, {}) as IDataObject,
						};

					} else if (operation === 'updateEntity') {
						endpoint = '/crm/data/updateentity/';
						body.Entity = {
							ID: this.getNodeParameter('entityId', i) as number,
							Folder: this.getNodeParameter('folder', i, '') as string,
							Properties: this.getNodeParameter('properties', i, {}) as IDataObject,
						};
						body.CreateIfMissing = this.getNodeParameter('createIfMissing', i, false) as boolean;

					} else if (operation === 'getEntity') {
						endpoint = '/crm/data/getentity/';
						body.EntityID = this.getNodeParameter('entityId', i) as number;

					} else if (operation === 'listEntities') {
						endpoint = '/crm/data/listentities/';
						body.LoadProperties = true;

					} else if (operation === 'archiveEntity') {
						endpoint = '/crm/data/archiveentity/';
						body.EntityID = this.getNodeParameter('entityId', i) as number;

					} else if (operation === 'deleteEntity') {
						endpoint = '/crm/data/deleteentity/';
						body.EntityID = this.getNodeParameter('entityId', i) as number;
					}
				}

				// ========================================
				//         CRM SCHEMA RESOURCE
				// ========================================
				else if (resource === 'crmSchema') {
					if (operation === 'getFolder') {
						endpoint = '/crm/schema/getfolder/';
						body.Folder = this.getNodeParameter('folder', i) as string;
						body.IncludeProperties = this.getNodeParameter('includeProperties', i, true) as boolean;

					} else if (operation === 'listFolders') {
						endpoint = '/crm/schema/listfolders/';
						const nameFilter = this.getNodeParameter('nameFilter', i, '') as string;
						if (nameFilter) {
							body.NameFilter = nameFilter;
						}
					}
				}

				// ========================================
				//         CRM VIEWS RESOURCE
				// ========================================
				else if (resource === 'crmViews') {
					if (operation === 'listViews') {
						endpoint = '/crm/views/listviews/';
						body.FolderID = this.getNodeParameter('folderId', i) as number;
					}
				}

				// ========================================
				//         CUSTOMER SERVICE RESOURCE
				// ========================================
				else if (resource === 'customerService') {
					if (operation === 'createTicket') {
						endpoint = '/customerservice/tickets/create/';
						body.Subject = this.getNodeParameter('ticketSubject', i) as string;
						body.Description = this.getNodeParameter('ticketDescription', i) as string;
					}
				}

				// ========================================
				//         WEBSITE PERMISSIONS RESOURCE
				// ========================================
				else if (resource === 'websitePermissions') {
					if (operation === 'setPermission') {
						endpoint = '/website/permissions/set/';
						body.UserID = this.getNodeParameter('userId', i) as number;
						body.Role = this.getNodeParameter('role', i) as string;

					} else if (operation === 'removePermission') {
						endpoint = '/website/permissions/remove/';
						body.UserID = this.getNodeParameter('userId', i) as number;
					}
				}

				// ========================================
				//         WEBSITE USERS RESOURCE
				// ========================================
				else if (resource === 'websiteUsers') {
					if (operation === 'createUser') {
						endpoint = '/website/users/create/';
						body.User = {
							Name: this.getNodeParameter('userName', i) as string,
							EmailAddress: this.getNodeParameter('userEmail', i) as string,
							Password: this.getNodeParameter('userPassword', i) as string,
							Phone: this.getNodeParameter('userPhone', i, '') as string,
							SkipActivation: this.getNodeParameter('skipActivation', i, false) as boolean,
						};
						body.Role = this.getNodeParameter('userRole', i) as string;

					} else if (operation === 'loginRedirect') {
						endpoint = '/website/users/loginredirect/';
						body.EmailAddress = this.getNodeParameter('userEmail', i) as string;
						body.Password = this.getNodeParameter('userPassword', i) as string;
					}
				}

				// ========================================
				//         COMPANY RESOURCE
				// ========================================
				else if (resource === 'company') {
					if (operation === 'create') {
						endpoint = '/website/companies/create/';
						body.Company = {
							Name: this.getNodeParameter('companyName', i) as string,
							EmailAddress: this.getNodeParameter('companyEmail', i) as string,
							CorporateNumber: this.getNodeParameter('corporateNumber', i, '') as string,
							Address: this.getNodeParameter('companyAddress', i, '') as string,
							Phone: this.getNodeParameter('companyPhone', i, '') as string,
						};

					} else if (operation === 'update') {
						endpoint = '/website/companies/update/';
						body.Company = {
							Name: this.getNodeParameter('companyName', i) as string,
							EmailAddress: this.getNodeParameter('companyEmail', i) as string,
							CorporateNumber: this.getNodeParameter('corporateNumber', i, '') as string,
							Address: this.getNodeParameter('companyAddress', i, '') as string,
							Phone: this.getNodeParameter('companyPhone', i, '') as string,
						};

					} else if (operation === 'getDetails') {
						endpoint = '/website/companies/getdetails/';

					} else if (operation === 'listQuotas') {
						endpoint = '/website/companies/listquotas/';
					}
				}

				// Make the API request
				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'sumitApi', {
					method,
					url: `${baseUrl}${endpoint}`,
					body,
					headers: {
						'Content-Type': 'application/json',
					},
				});

				returnData.push(response as IDataObject);

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ error: errorMessage });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, {
					itemIndex: i,
				});
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
