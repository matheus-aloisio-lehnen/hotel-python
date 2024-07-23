import { RoomStatusEnum } from "../enum/room-status.enum";

export type Room = {
    name: string,
    status: RoomStatusEnum,
    price: number
}
