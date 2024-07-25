import { ReservationType } from "../type/reservation.type";
import { RoomStatusEnum } from "../enum/room-status.enum";
import { Guest } from "../model/guest";
import { Room } from "../model/room";

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

// Função para gerar reservas aleatórias para um mês e 10 quartos
export const generateRandomReservations = (month: number, roomsQuantity: number): ReservationType[] => {
    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate(); // Obtém o número de dias no mês
    const rooms: Room[] = Array.from({ length: roomsQuantity }, (_, i) => ({
        name: `${i + 1}`,
        // name: `${i + 1}`,
        status: RoomStatusEnum.reserved,
        price: 250 + i * 10, // Exemplo de estratégia de preços
    }));

    const guests: Guest[] = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: getRandomName(),
    }));

    const reservations: ReservationType[] = [];

    for (let room of rooms) {
        const roomReservations: { [date: string]: string | undefined } = {};
        let day = 1;

        while (day <= daysInMonth) {
            if (Math.random() > 0.5) {
                const stayLength = getRandomInt(2, 3); // Duração da estadia (2 ou 3 dias)
                const guest = guests[getRandomInt(0, guests.length - 1)]; // Seleciona um hóspede aleatório

                for (let i = 0; i < stayLength && day <= daysInMonth; i++) {
                    roomReservations[day] = guest.name;
                    day++;
                }
            } else {
                day++;
            }
        }

        reservations.push({
            ...roomReservations,
            room: room,
            guest: undefined // Conformidade com o tipo `ReservationType`
        });
    }

    return reservations;
}