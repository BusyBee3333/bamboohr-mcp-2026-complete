import { BambooHRClient } from '../clients/bamboohr.js';
import type { BenefitPlan, BenefitEnrollment, BenefitDependent } from '../types/index.js';

export const benefitsTools = {
  list_benefit_plans: {
    description: 'List all benefit plans',
    parameters: {
      type: 'object',
      properties: {
        active_only: {
          type: 'boolean',
          description: 'Filter to active plans only',
          default: true,
        },
      },
    },
    handler: async (client: BambooHRClient, args: { active_only?: boolean }) => {
      try {
        const plans = await client.get<BenefitPlan[]>('/benefits/plans');
        
        let filteredPlans = plans;
        if (args.active_only !== false) {
          filteredPlans = plans.filter(p => p.active !== false);
        }
        
        return {
          success: true,
          plans: filteredPlans,
          count: filteredPlans.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_benefit_plan: {
    description: 'Get details of a specific benefit plan',
    parameters: {
      type: 'object',
      properties: {
        plan_id: {
          type: 'string',
          description: 'Benefit plan ID',
        },
      },
      required: ['plan_id'],
    },
    handler: async (client: BambooHRClient, args: { plan_id: string }) => {
      try {
        const plan = await client.get<BenefitPlan>(`/benefits/plans/${args.plan_id}`);
        
        return {
          success: true,
          plan,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_benefit_enrollments: {
    description: 'List benefit enrollments for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string }) => {
      try {
        const enrollments = await client.get<BenefitEnrollment[]>(
          `/employees/${args.employee_id}/benefits/enrollments`
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          enrollments,
          count: enrollments.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_benefit_dependents: {
    description: 'List benefit dependents for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string }) => {
      try {
        const dependents = await client.get<BenefitDependent[]>(
          `/employees/${args.employee_id}/benefits/dependents`
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          dependents,
          count: dependents.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
