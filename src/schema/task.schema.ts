import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";

@Schema()
export class Task {
    @Prop({required: true})
    title: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    user: User
};

export const TaskSchema = SchemaFactory.createForClass(Task);