import { z } from "zod";

export const updateTaskSchema = z.object({
    title: z.string().optional(),
})

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>

