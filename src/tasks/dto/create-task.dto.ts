import { z } from "zod";

export const createTaskSchema = z
    .object({
        title: z.string(),
    })
    .required()

export type CreateTaskDto = z.infer<typeof createTaskSchema>

