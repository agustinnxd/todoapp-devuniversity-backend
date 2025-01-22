import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform{
    constructor(private schema:ZodSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        
        if(metadata.type === 'param') {
            return value
        }

        const parsedValue = this.schema.safeParse(value);
        
        if(parsedValue.success === false) {
            throw new BadRequestException(parsedValue.error.issues)
        };
        
        return parsedValue.data
    }
}