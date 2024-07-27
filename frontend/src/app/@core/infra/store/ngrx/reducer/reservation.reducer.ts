import { ActionReducer, createReducer, on } from '@ngrx/store';
import { createReservation, deleteReservation, setReservation, updateReservation } from "../actions/reservation.actions";
import { initialReservationState, ReservationState } from "../state/reservation.state";

export const reservationReducer: ActionReducer<ReservationState> = createReducer(
    initialReservationState,
    on(createReservation, (state, { reservation }) => ({
        ...state,
        reservation
    })),
    on(updateReservation, (state, { reservation }) => ({
        ...state,
        reservation
    })),
    on(deleteReservation, (state) => ({
        ...state,
        reservation: null
    })),
    on(setReservation, (state, { reservation }) => ({
        ...state,
        reservation
    }))
);
