import { RoomStatusEnum } from '../enum/room-status.enum';
import { User } from "./user";

export interface PersonalData {
    id?: number;
    name: string;
    documentNumber: string;
    legalStatus: RoomStatusEnum;
    mobile: string;
    user: User;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
