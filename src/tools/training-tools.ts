import { BambooHRClient } from '../clients/bamboohr.js';
import type { TrainingCourse, TrainingCategory, TrainingType } from '../types/index.js';

export const trainingTools = {
  list_training_courses: {
    description: 'List training courses for an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        filter: {
          type: 'string',
          enum: ['all', 'required', 'completed', 'incomplete'],
          description: 'Filter courses',
          default: 'all',
        },
      },
      required: ['employee_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; filter?: string }) => {
      try {
        const filter = args.filter || 'all';
        const courses = await client.get<TrainingCourse[]>(
          `/employees/${args.employee_id}/training`,
          { filter }
        );
        
        return {
          success: true,
          employee_id: args.employee_id,
          courses,
          count: courses.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  get_training_course: {
    description: 'Get details of a specific training course',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        course_id: {
          type: 'string',
          description: 'Course ID',
        },
      },
      required: ['employee_id', 'course_id'],
    },
    handler: async (client: BambooHRClient, args: { employee_id: string; course_id: string }) => {
      try {
        const course = await client.get<TrainingCourse>(
          `/employees/${args.employee_id}/training/${args.course_id}`
        );
        
        return {
          success: true,
          course,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  create_training_course: {
    description: 'Assign a training course to an employee',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        name: {
          type: 'string',
          description: 'Course name',
        },
        description: {
          type: 'string',
          description: 'Course description',
        },
        category_id: {
          type: 'string',
          description: 'Training category ID',
        },
        type_id: {
          type: 'string',
          description: 'Training type ID',
        },
        required: {
          type: 'boolean',
          description: 'Is this course required?',
          default: false,
        },
        due_date: {
          type: 'string',
          description: 'Due date (YYYY-MM-DD)',
        },
      },
      required: ['employee_id', 'name'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        const courseData = {
          name: args.name,
          description: args.description,
          categoryId: args.category_id,
          typeId: args.type_id,
          required: args.required,
          dueDate: args.due_date,
        };
        
        const result = await client.post(
          `/employees/${args.employee_id}/training`,
          courseData
        );
        
        return {
          success: true,
          course_id: result.id || result,
          message: 'Training course assigned successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  update_training_course: {
    description: 'Update a training course assignment',
    parameters: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'string',
          description: 'Employee ID',
        },
        course_id: {
          type: 'string',
          description: 'Course ID',
        },
        course_data: {
          type: 'object',
          description: 'Course data to update',
        },
      },
      required: ['employee_id', 'course_id', 'course_data'],
    },
    handler: async (client: BambooHRClient, args: any) => {
      try {
        await client.put(
          `/employees/${args.employee_id}/training/${args.course_id}`,
          args.course_data
        );
        
        return {
          success: true,
          message: 'Training course updated successfully',
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_training_categories: {
    description: 'List all training categories',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const categories = await client.get<TrainingCategory[]>('/meta/training/categories');
        
        return {
          success: true,
          categories,
          count: categories.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },

  list_training_types: {
    description: 'List all training types',
    parameters: {
      type: 'object',
      properties: {},
    },
    handler: async (client: BambooHRClient) => {
      try {
        const types = await client.get<TrainingType[]>('/meta/training/types');
        
        return {
          success: true,
          types,
          count: types.length,
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  },
};
