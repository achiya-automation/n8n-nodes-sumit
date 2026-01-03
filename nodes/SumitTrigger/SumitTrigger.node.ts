import {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

export class SumitTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sumit Trigger',
		name: 'sumitTrigger',
		icon: 'file:sumit.png',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["triggerType"]}}',
		description: 'Handle Sumit webhooks and triggers',
		defaults: {
			name: 'Sumit Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'sumitApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Trigger Type',
				name: 'triggerType',
				type: 'options',
				options: [
					{
						name: 'CRM Entity Created',
						value: 'CrmEntityCreated',
						description: 'Trigger when a new CRM entity is created',
					},
					{
						name: 'CRM Entity Updated',
						value: 'CrmEntityUpdated',
						description: 'Trigger when a CRM entity is updated',
					},
					{
						name: 'Document Created',
						value: 'DocumentCreated',
						description: 'Trigger when a new document is created',
					},
					{
						name: 'Payment Received',
						value: 'PaymentReceived',
						description: 'Trigger when a payment is received',
					},
					{
						name: 'Custom',
						value: 'Custom',
						description: 'Custom trigger type',
					},
				],
				default: 'CrmEntityCreated',
				required: true,
			},
			{
				displayName: 'Folder',
				name: 'folder',
				type: 'string',
				displayOptions: {
					show: {
						triggerType: ['CrmEntityCreated', 'CrmEntityUpdated'],
					},
				},
				default: '',
				description: 'CRM folder name to monitor',
			},
			{
				displayName: 'View ID',
				name: 'viewId',
				type: 'number',
				displayOptions: {
					show: {
						triggerType: ['CrmEntityCreated', 'CrmEntityUpdated'],
					},
				},
				default: 0,
				description: 'View ID to monitor (optional)',
			},
			{
				displayName: 'Custom Trigger Type',
				name: 'customTriggerType',
				type: 'string',
				displayOptions: {
					show: {
						triggerType: ['Custom'],
					},
				},
				default: '',
				description: 'Custom trigger type string',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Check if webhook already exists
				const webhookUrl = this.getNodeWebhookUrl('default');
				const credentials = await this.getCredentials('sumitApi');

				try {
					// In a real implementation, you would check if the webhook is registered
					// For now, we'll return false to always create a new one
					return false;
				} catch (error) {
					return false;
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const credentials = await this.getCredentials('sumitApi');
				const triggerType = this.getNodeParameter('triggerType') as string;
				const folder = this.getNodeParameter('folder', '') as string;
				const viewId = this.getNodeParameter('viewId', 0) as number;
				const customTriggerType = this.getNodeParameter('customTriggerType', '') as string;

				const baseUrl = 'https://api.sumit.co.il/billing/';

				const body: IDataObject = {
					Credentials: {
						CompanyID: credentials.companyId,
						APIKey: credentials.apiKey,
					},
					URL: webhookUrl,
					TriggerType: triggerType === 'Custom' ? customTriggerType : triggerType,
				};

				// Add folder if specified
				if (folder && (triggerType === 'CrmEntityCreated' || triggerType === 'CrmEntityUpdated')) {
					body.Folder = folder;
				}

				// Add view ID if specified
				if (viewId && (triggerType === 'CrmEntityCreated' || triggerType === 'CrmEntityUpdated')) {
					body.View = viewId;
				}

				try {
					const response = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}triggers/triggers/subscribe/`,
						body,
						headers: {
							'Content-Type': 'application/json',
						},
						json: true,
					});

					if (response.Status !== 'Success (0)') {
						throw new NodeOperationError(
							this.getNode(),
							`Failed to create webhook: ${response.UserErrorMessage || response.TechnicalErrorDetails}`,
						);
					}

					return true;
				} catch (error) {
					throw new NodeOperationError(this.getNode(), error as Error);
				}
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const credentials = await this.getCredentials('sumitApi');

				const baseUrl = 'https://api.sumit.co.il/billing/';

				const body: IDataObject = {
					Credentials: {
						CompanyID: credentials.companyId,
						APIKey: credentials.apiKey,
					},
					URL: webhookUrl,
				};

				try {
					const response = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}triggers/triggers/unsubscribe/`,
						body,
						headers: {
							'Content-Type': 'application/json',
						},
						json: true,
					});

					if (response.Status !== 'Success (0)') {
						// Don't throw error on delete failure, just return false
						return false;
					}

					return true;
				} catch (error) {
					// Don't throw error on delete failure
					return false;
				}
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();

		// Ensure we have an array
		const dataArray = Array.isArray(bodyData) ? bodyData : [bodyData];

		return {
			workflowData: [this.helpers.returnJsonArray(dataArray as IDataObject[])],
		};
	}
}
