import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Task {
    @Prop({required: true, unique: true})
    title: string;
};

export const TaskSchema = SchemaFactory.createForClass(Task);