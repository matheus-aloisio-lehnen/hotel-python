import { Guest } from "../model/guest";
import { Room } from "../model/room";

export type ReservationType = {
    [date: string]: string | Room | Guest | undefined | null,
    room: Room,
    guest?: Guest | null,
}