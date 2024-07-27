import { Injectable } from '@angular/core';
import { CreateReservationDto } from "../../../../domain/dto/reservation/create/create-reservation.dto";
import { Reservation } from "../../../../domain/model/reservation";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor() {
    }

    async add(createReservationDto: CreateReservationDto) {
        console.log('add', createReservationDto)
    }

    async edit(reservationDto: Reservation) {
        console.log('edit', reservationDto)
    }

    async delete(reservationDto: Reservation) {
        console.log('delete', reservationDto)
    }

}
