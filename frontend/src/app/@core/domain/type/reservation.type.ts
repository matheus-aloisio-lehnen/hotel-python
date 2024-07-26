import { Guest } from "../model/guest";
import { Room } from "../model/room";

export type ReservationType = {
    // [day: string]: string,
    // room: Room,
    guest: Guest | null,
    startDate: string,
    endDate: string
}