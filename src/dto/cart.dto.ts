import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsUUID, ValidateNested, validateOrReject } from 'class-validator';

import { ItemDto } from "./item.dto";
import { Type } from 'class-transformer';

export interface CartDto {
    uuid: string;
    items?: ItemDto[];
    modifiedAt?: string;
}