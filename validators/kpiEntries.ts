import { z } from 'zod';

export const kpiEntrySchema = z.object({
  kpiId: z.string(),
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'),
  value: z.number(),
  status: z.enum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED']).default('DRAFT'),
});

export const updateKPIEntrySchema = kpiEntrySchema.partial();

export type KPIEntryInput = z.infer<typeof kpiEntrySchema>;
export type UpdateKPIEntryInput = z.infer<typeof updateKPIEntrySchema>;
