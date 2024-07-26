import { Room } from "../model/room";
import { RoomStatusEnum } from "../enum/room-status.enum";

export const ROOMS: Room[] = [
    {
        number: 1,
        status: RoomStatusEnum.busy,
        price: 150,
        reservations: []
    },
    {
        number: 2,
        status: RoomStatusEnum.free,
        price: 150,
        reservations: []
    },
    {
        number: 3,
        status: RoomStatusEnum.reserved,
        price: 150,
        reservations: []
    },
    {
        number: 4,
        status: RoomStatusEnum.busy,
        price: 250,
        reservations: []
    },
    {
        number: 5,
        status: RoomStatusEnum.free,
        price: 250,
        reservations: []
    },
    {
        number: 6,
        status: RoomStatusEnum.reserved,
        price: 250,
        reservations: []
    }
]
