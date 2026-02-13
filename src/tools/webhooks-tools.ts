import { BambooHRClient } from '../clients/bamboohr.js';
import type { Webhook } from '../types/index.js';

export const webhooksTools = {
  list_webhooks: {
    description: 'List all webhooks',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const webhooks = await client.get<Webhook[]>('/webhooks');
        
        return {
          success: true,
          webhooks,
          count: webhooks.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  create_webhook: {
    description: 'Create a new webhook',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Webhook name',
        },
        url: {
          type: 'string',
          description: 'Webhook URL',
        },
        format: {
          type: 'string',
          enum: ['json', 'form'],
          description: 'Post format',
          default: 'json',
        },
        frequency: {
          type: 'string',
          enum: ['realtime', 'daily', 'weekly'],
          description: 'Update frequency',
          default: 'realtime',
        },
        post_fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Fields to include in webhook posts',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of posts',
        },
      },
      required: ['name', 'url'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const webhookData = {
          name: args.name,
          url: args.url,
          format: args.format || 'json',
          frequency: args.frequency || 'realtime',
          postFields: args.post_fields,
          limit: args.limit,
        };
        
        const result = await client.post('/webhooks', webhookData);
        
        return {
          success: true,
          webhook_id: result.id || result,
          message: 'Webhook created successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  delete_webhook: {
    description: 'Delete a webhook',
    parameters: {
      type: 'object',
      properties: {
        webhook_id: {
          type: 'string',
          description: 'Webhook ID',
        },
      },
      required: ['webhook_id'],
    },
    handler: async (client: BambooHRClient, args: { webhook_id: string }) => {
      try {
        await client.delete(`/webhooks/${args.webhook_id}`);
        
        return {
          success: true,
          message: 'Webhook deleted successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
