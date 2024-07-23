import { Room } from "../model/room";
import { RoomStatusEnum } from "../enum/room-status.enum";

export const ROOMS: Room[] = [
    {
        name: '1',
        status: RoomStatusEnum.busy,
        price: 150
    },
    {
        name: '2',
        status: RoomStatusEnum.free,
        price: 150
    },
    {
        name: '3',
        status: RoomStatusEnum.reserved,
        price: 150
    },
    {
        name: '4',
        status: RoomStatusEnum.busy,
        price: 250
    },
    {
        name: '5',
        status: RoomStatusEnum.free,
        price: 250
    },
    {
        name: '7',
        status: RoomStatusEnum.reserved,
        price: 250
    }
]
