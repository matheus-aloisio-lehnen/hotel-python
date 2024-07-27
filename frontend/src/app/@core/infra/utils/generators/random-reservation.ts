import { Guest } from "../../../domain/model/guest";
import { getRandomName } from "./random-name";
import { getRandomCpf } from "./random-cpf";
import { Room } from "../../../domain/model/room";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { formatDate } from "@angular/common";
import { PaymentStatus } from "../../../domain/enum/payment-status.enum";
import { Reservation } from "../../../domain/model/reservation";

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkRoomStatus = (reservations: Reservation[], today: Date): RoomStatus => {
    const formattedToday = today.toISOString().split('T')[0]; // formato 'YYYY-MM-DD'

    // Verificar se o quarto está ocupado
    const isBusy = reservations.some(reservation => {
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        return today >= startDate && today <= endDate;
    });

    // Verificar se o quarto está reservado
    const isReserved = reservations.some(reservation => {
        const startDate = new Date(reservation.startDate);
        return startDate > today || (startDate.toISOString().split('T')[0] === formattedToday && !isBusy);
    });

    // Determinar o status do quarto
    if (isBusy) {
        return RoomStatus.busy;
    }
    if (isReserved) {
        return RoomStatus.reserved;
    }
    return RoomStatus.free;
}

export const generateRandomReservations = (month: number, roomsQuantity: number) => {
    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
    const guests: Guest[] = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        personalData: {
            name: getRandomName(),
            documentNumber: getRandomCpf(),
            mobile: String(Math.random())
        }
    }));
    const rooms: Room[] = Array.from({ length: roomsQuantity }, (_, i) => ({
        number: i + 1,
        status: RoomStatus.busy,
        price: 250,
        reservations: []
    }));

    // const reservationChance = 0;
    const reservationChance = 0.7;

    rooms.forEach(room => {
        const today = new Date();
        const maxRepeat = 2;
        let count = 0;
        let day = 1;

        while (day <= daysInMonth) {
            const shouldGenerateReservation = Math.random() >= reservationChance;

            if (shouldGenerateReservation) {
                const stayLength = getRandomInt(2, 3);

                if (day + stayLength - 1 > daysInMonth) {
                    break;
                }

                const formattedToday = formatDate(today, 'yyyy-MM-dd', 'pt-BR');
                const guest = guests[getRandomInt(0, guests.length - 1)];
                const startDate = new Date(new Date().getFullYear(), month - 1, day);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + stayLength - 1);
                const startDateFormatted = formatDate(startDate, 'yyyy-MM-dd', 'pt-BR');
                const endDateFormatted = formatDate(endDate, 'yyyy-MM-dd', 'pt-BR');
                const canAddReservation = room.reservations?.every(existingReservation => {

                    const existingStartDateFormatted = formatDate(existingReservation.startDate, 'yyyy-MM-dd', 'pt-BR');
                    const existingEndDateFormatted = formatDate(existingReservation.endDate, 'yyyy-MM-dd', 'pt-BR');
                    return endDateFormatted <= existingStartDateFormatted || startDateFormatted >= existingEndDateFormatted;
                });

                if (canAddReservation) {
                    room.reservations?.push({
                        guest: guest,
                        startDate: startDate,
                        endDate: endDate,
                        room: room,
                        paymentStatus: PaymentStatus.paid
                    });

                }
                count++;
                if (count > 1) {
                    day += stayLength;
                }
            } else {
                day++;
            }
        }
        room.status = checkRoomStatus(room.reservations || [], today);
    })

    return rooms;
}