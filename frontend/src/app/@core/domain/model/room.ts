import { RoomStatus } from "../enum/room-status.enum";
import { Reservation } from "./reservation";

export type Room = {
    id?: number
    number: number,
    status: RoomStatus,
    price: number,
    reservations?: Reservation[]
}
