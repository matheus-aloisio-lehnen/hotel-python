import { Reservation } from "../../../../domain/model/reservation";

export const initialReservationState: ReservationState = {
    reservation: null,
};

export interface ReservationState {
    reservation: Reservation | null;
}
