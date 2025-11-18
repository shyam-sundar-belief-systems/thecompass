import { z } from 'zod';

export const kpiSchema = z.object({
  objectiveId: z.string(),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  target: z.number().positive('Target must be positive'),
  frequency: z.enum(['DAILY', 'WEEKLY', 'FORTNIGHTLY', 'MONTHLY']),
  aggregationMethod: z.enum(['SUM', 'AVERAGE']).default('SUM'),
  assignedToId: z.string().optional(),
});

export const updateKPISchema = kpiSchema.partial();

export type KPIInput = z.infer<typeof kpiSchema>;
export type UpdateKPIInput = z.infer<typeof updateKPISchema>;
