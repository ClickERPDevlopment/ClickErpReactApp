import { z } from "zod";

export const TransferInAddFormSchema = z.object({
  FROM_MC_GROUP_ID: z.coerce.number().gte(1, "Must be 1 and above"),
  MC_QTY: z.coerce.number().gte(1, "Must be 1 and above"),
});
export type TransferInAddFormType = z.infer<typeof TransferInAddFormSchema>;

export const transferInFormSchema = z.object({
  fromDate: z.date().optional().default(new Date()),
  toDate: z.date().optional().default(new Date()),
  TO_MC_GROUP_ID: z.coerce.number().gte(1, "Must be 1 and above"),
  details: z.array(
    z.object({
      FROM_MC_GROUP_ID: z.coerce.number().gte(1, "Must be 1 and above"),
      FROM_MC_GROUP: z.string(),
      MC_QTY: z.coerce.number().gte(1, "Must be 1 and above"),
    })
  ),
});
export type transferInFormType = z.infer<typeof transferInFormSchema>;

export const TransferOutAddFormSchema = z.object({
  TO_MC_GROUP_ID: z.coerce.number().gte(1, "Must be 1 and above"),
  MC_QTY: z.coerce.number().gte(1, "Must be 1 and above"),
});
export type TransferOutAddFormType = z.infer<typeof TransferOutAddFormSchema>;

export const transferOutFormSchema = z.object({
  fromDate: z.date().optional().default(new Date()),
  toDate: z.date().optional().default(new Date()),
  FROM_MC_GROUP_ID: z.coerce.number().gte(1, "Must be 1 and above"),
  details: z.array(
    z.object({
      TO_MC_GROUP_ID: z.coerce.number().gte(1, "Must be 1 and above"),
      TO_MC_GROUP: z.string(),
      MC_QTY: z.coerce.number().gte(1, "Must be 1 and above"),
    })
  ),
});
export type TransferOutFormType = z.infer<typeof transferOutFormSchema>;
