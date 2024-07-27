import { createAction, props } from '@ngrx/store';
import { Reservation } from "../../../../domain/model/reservation";

export const createReservation = createAction(
    '[Reservation] Create Reservation',
    props<{ reservation: Reservation }>()
);

export const updateReservation = createAction(
    '[Reservation] Update Reservation',
    props<{ reservation: Reservation }>()
);

export const deleteReservation = createAction(
    '[Reservation] Delete Reservation'
);

export const getReservation = createAction(
    '[Reservation] Get Reservation'
);

export const setReservation = createAction(
    '[Reservation] Set Reservation',
    props<{ reservation: Reservation | null }>()
);
