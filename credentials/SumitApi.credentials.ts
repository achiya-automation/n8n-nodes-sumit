import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SumitApi implements ICredentialType {
	name = 'sumitApi';
	displayName = 'Sumit API';
	documentationUrl = 'https://api.sumit.co.il/';
	properties: INodeProperties[] = [
		{
			displayName: 'Company ID',
			name: 'companyId',
			type: 'number',
			default: '',
			required: true,
			description: 'The Company ID from your Sumit account',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API Key from your Sumit account',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.sumit.co.il',
			required: true,
			description: 'The base URL for Sumit API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/accounting/general/getvatrate/',
			method: 'POST',
			body: {
				Credentials: {
					CompanyID: '={{$credentials.companyId}}',
					APIKey: '={{$credentials.apiKey}}',
				},
				Date: new Date().toISOString(),
			},
		},
	};
}
