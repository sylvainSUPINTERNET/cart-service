import { IsNotEmpty } from "class-validator";

export interface ItemDto {
    name: string;
    price: number;
}