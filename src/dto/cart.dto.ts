import { ItemDto } from "./item.dto";

export class CartDto {
    uuid: string;
    items: ItemDto[];
    modifiedAt: string;
}