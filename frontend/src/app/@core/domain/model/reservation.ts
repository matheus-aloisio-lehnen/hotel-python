import { Room } from "./room";
import { Guest } from "./guest";
import { PaymentStatus } from "../enum/payment-status.enum";

export interface Reservation {
    guest: Guest,
    startDate: Date,
    endDate: Date,
    room: Room,
    paymentStatus: PaymentStatus
}