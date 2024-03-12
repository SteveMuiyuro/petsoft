import { z } from "zod"
import { DEFAULT_IMAGE } from "./constant"

export const petIdSchema = z.string().cuid()
export const petDataSchema = z.object({

    name:z.string().trim().min(1, {message:"name is required"}).max(100),
    ownerName: z.string().trim().min(1, {message:"owner name is required"}).max(100),
    imageUrl:z.union([z.literal(""), z.string().trim().url({message:"imageUrl must be of format url"})]),
    age:z.coerce.number().int().positive().max(999),
    notes:z.union([z.literal(""), z.string().trim().max(1000)])

}).transform(data => ({
    ...data,
    imageUrl: data.imageUrl ||
    DEFAULT_IMAGE
}))

export type TPetData = z.infer<typeof petDataSchema>
