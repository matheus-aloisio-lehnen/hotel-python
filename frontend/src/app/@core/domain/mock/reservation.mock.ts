import { RoomStatusEnum } from "../enum/room-status.enum";
import { Room } from "../model/room";
import { Guest } from "../model/guest";
import { formatDate } from "@angular/common";

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava',
    'Isabella', 'Mason', 'Sophia', 'James', 'Charlotte',
    'Benjamin', 'Amelia', 'Lucas', 'Evelyn', 'Ethan',
    'Harper', 'Alexander', 'Ella', 'Henry', 'Grace',
    'Jacob', 'Chloe', 'Michael', 'Isla', 'Daniel',
    'Mia', 'Matthew', 'Zoe', 'Aiden', 'Lily',
    'William', 'Aria', 'Jack', 'Madison', 'Owen',
    'Emily', 'Jameson', 'Hannah', 'Elijah', 'Avery',
    'Ryan', 'Samantha', 'David', 'Nora', 'Andrew',
    'Scarlett', 'Joshua', 'Mila', 'Eli', 'Ella',
    'Nathan', 'Addison', 'Gabriel', 'Luna', 'Caleb',
    'Stella', 'Isaiah', 'Paisley', 'Adam', 'Riley'
];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson'];

const getRandomName = (): string => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
};

export const generateRandomReservations = (month: number, roomsQuantity: number) => {
    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
    const guests: Guest[] = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: getRandomName(),
    }));
    const rooms: Room[] = Array.from({ length: roomsQuantity }, (_, i) => ({
        number: i + 1,
        status: RoomStatusEnum.reserved,
        price: 250,
        reservations: []
    }));


    rooms.forEach(room => {
        let day = 1;

        while (day <= daysInMonth) {
            const shouldGenerateReservation = Math.random() > 0.7;
            if(shouldGenerateReservation) {
                const stayLength = getRandomInt(2, 3); // Duração da estadia (2 ou 3 dias)

                if (day + stayLength - 1 > daysInMonth) {
                    break;
                }

                const guest = guests[getRandomInt(0, guests.length - 1)];
                const startDate = new Date(new Date().getFullYear(), month - 1, day);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + stayLength - 1);

                room.reservations.push({
                    guest: guest,
                    startDate: formatDate(startDate, 'dd-MM-yyyy', 'pt-BR'),
                    endDate: formatDate(endDate, 'dd-MM-yyyy', 'pt-BR'),
                });
                day += stayLength;
            } else {
                day++;
            }
        }
    })

    return rooms;
}