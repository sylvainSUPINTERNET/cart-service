import { ITem } from "./item.modeL";

export interface ICart {
    uuid: string;
    items: ITem[];
    modifiedAt: string;
}