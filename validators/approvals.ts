import { z } from 'zod';

export const approvalDecisionSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  comments: z.string().optional(),
});

export const bulkApprovalSchema = z.object({
  entryIds: z.array(z.string()).min(1, 'At least one entry ID is required'),
  status: z.enum(['APPROVED', 'REJECTED']),
});

export type ApprovalDecisionInput = z.infer<typeof approvalDecisionSchema>;
export type BulkApprovalInput = z.infer<typeof bulkApprovalSchema>;
