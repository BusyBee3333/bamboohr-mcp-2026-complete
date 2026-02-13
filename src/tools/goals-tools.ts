import { BambooHRClient } from '../clients/bamboohr.js';
import type { Goal, GoalComment } from '../types/index.js';

export const goalsTools = {
  list_goals: {
    description: 'List goals for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        filter: {
          type: 'string',
          enum: ['all', 'active', 'completed'],
          description: 'Filter goals by status',
          default: 'all',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; filter?: string }) => {
      try {
        const filter = args.filter || 'all';
        const goals = await client.get<Goal[]>(
          `/employees/${args.employee_id}/goals`,
          { filter }
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          goals,
          count: goals.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_goal: {
    description: 'Get details of a specific goal',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        goal_id: {
          type: 'string',
          description: 'Goal ID',
        },
      },
      required: ['employee_id', 'goal_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; goal_id: string }) => {
      try {
        const goal = await client.get<Goal>(
          `/employees/${args.employee_id}/goals/${args.goal_id}`
        );
        
        return {
          success: true,
          goal,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  create_goal: {
    description: 'Create a new goal for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        title: {
          type: 'string',
          description: 'Goal title',
        },
        description: {
          type: 'string',
          description: 'Goal description',
        },
        due_date: {
          type: 'string',
          description: 'Due date (YYYY-MM-DD)',
        },
        shared_with_employee_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Employee IDs to share with',
        },
      },
      required: ['employee_id', 'title'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const goalData = {
          title: args.title,
          description: args.description,
          dueDate: args.due_date,
          sharedWithEmployeeIds: args.shared_with_employee_ids,
        };
        
        const result = await client.post(
          `/employees/${args.employee_id}/goals`,
          goalData
        );
        
        return {
          success: true,
          goal_id: result.id || result,
          message: 'Goal created successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  update_goal: {
    description: 'Update an existing goal',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        goal_id: {
          type: 'string',
          description: 'Goal ID',
        },
        goal_data: {
          type: 'object',
          description: 'Goal data to update',
        },
      },
      required: ['employee_id', 'goal_id', 'goal_data'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        await client.put(
          `/employees/${args.employee_id}/goals/${args.goal_id}`,
          args.goal_data
        );
        
        return {
          success: true,
          message: 'Goal updated successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  close_goal: {
    description: 'Close/complete a goal',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        goal_id: {
          type: 'string',
          description: 'Goal ID',
        },
        percent_complete: {
          type: 'number',
          description: 'Completion percentage (0-100)',
          default: 100,
        },
      },
      required: ['employee_id', 'goal_id'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        await client.put(
          `/employees/${args.employee_id}/goals/${args.goal_id}/close`,
          { percentComplete: args.percent_complete || 100 }
        );
        
        return {
          success: true,
          message: 'Goal closed successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_goal_comments: {
    description: 'List comments on a goal',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        goal_id: {
          type: 'string',
          description: 'Goal ID',
        },
      },
      required: ['employee_id', 'goal_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; goal_id: string }) => {
      try {
        const comments = await client.get<GoalComment[]>(
          `/employees/${args.employee_id}/goals/${args.goal_id}/comments`
        );
        
        return {
          success: true,
          comments,
          count: comments.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
