import { z } from 'zod';

export const objectiveSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  assignedToId: z.string().optional(),
});

export const updateObjectiveSchema = objectiveSchema.partial();

export type ObjectiveInput = z.infer<typeof objectiveSchema>;
export type UpdateObjectiveInput = z.infer<typeof updateObjectiveSchema>;
