import { RoomStatusEnum } from "../enum/room-status.enum";
import { ReservationType } from "../type/reservation.type";

export type Room = {
    number: number,
    status: RoomStatusEnum,
    price: number,
    reservations: ReservationType[]
}
