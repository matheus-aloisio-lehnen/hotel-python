import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";

import { MONTHS } from "../../../domain/constants/months.constants";
import { generateRandomReservations } from "../../../domain/mock/reservation.mock";
import { MonthType } from "../../../domain/type/month.type";
import { ReservationType } from "../../../domain/type/reservation.type";
import { ROOMS } from "../../../domain/mock/rooms.mock";

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatTabsModule,
        MatTableModule,
    ]
})
export class ReservationsComponent {

    @ViewChild(MatTabGroup) tabs!: MatTabGroup;
    protected readonly months: MonthType[];
    selectedIndex: number;
    dataSource: ReservationType[];
    displayedColumns: string[];

    constructor() {
        this.months = MONTHS;
        this.selectedIndex = 0;
        this.dataSource = generateRandomReservations(this.selectedIndex + 1, ROOMS.length);
        this.displayedColumns = this.generateColumns(this.selectedIndex + 1);
        // this.generateReservationColors();
    }



    onTabChange() {
        const month = this.selectedIndex + 1;
        this.dataSource = generateRandomReservations(month, ROOMS.length);
        this.displayedColumns = this.generateColumns(month);
    }

    openReservation(column: any, element: any) {
        if(!column) return;
        const guest = this.filterByGuest(element[column], element.room.name, Number(column));
    }

    filterByGuest(name: string, roomName: number, clickedDay: number) {
        const daysWithRoom = this.dataSource.filter((data: any) => {
            return data['room'] && data['room'].name === roomName;
        });
        const daysWithReservationByGuestName = daysWithRoom.map((data: any) => {
            const filteredDay: any = {};
            Object.keys(data).forEach(key => {
                if (key !== 'room' && data[key] === name) {
                    filteredDay[key] = data[key];
                }
            });
            return filteredDay;
        }).filter(day => Object.keys(day).length > 0);
        const result = daysWithReservationByGuestName.flatMap((data: any) => {
            return Object.keys(data).filter(key => !isNaN(Number(key))).map((key: any) => {
                return {
                    date: new Date(new Date().getFullYear(), this.selectedIndex, key),
                    guest: name
                };
            });
        }).sort((a: any, b: any) => a.date.getTime() - b.date.getTime()); // Ordena as datas;
        // Identifica o streak de reservas consecutivas a partir do dia clicado


        const streakStartingDate = new Date(new Date().getFullYear(), this.selectedIndex, clickedDay);
        console.log(streakStartingDate)
        const streak: any[] = [];
        let currentStreak: any[] = [];



        for (const day of daysWithReservationByGuestName) {
            console.log('day', day)
            if (currentStreak.length === 0) {
                const date = new Date(new Date().getFullYear(), this.selectedIndex, clickedDay);
                if (date.getTime() === streakStartingDate.getTime()) {
                    currentStreak.push(day);
                }
            } else {

                const lastDay = currentStreak[currentStreak.length - 1];
                if (day.date.getTime() === new Date(lastDay.date.getTime() + 24 * 60 * 60 * 1000).getTime()) {
                    // Se o dia atual é o dia seguinte ao último, adiciona ao streak
                    currentStreak.push(day);
                } else {
                    // Se o streak foi iniciado e não é mais consecutivo, termina o streak
                    break;
                }
            }
        }

        console.log(currentStreak)

        // Retorna o streak iniciado a partir do dia clicado
        return currentStreak;
    }

    hasReservation(column: string, element: any) {
        return column !== 'room' && element[column];
    }

    generateColumns(month: number): any[] {
        const columns = ['room'];
        const numDays = new Date(new Date().getFullYear(), month, 0).getDate();
        for (let day = 1; day <= numDays; day++) {
            columns.push(day.toString());
        }

        return columns;
    }

    getRowText(column: string, element: any) {
        return column === 'room'
            ? element[column]?.name
            : element[column];
    }

    getColor(column: string, element: any) {
        const guestName = element[column];
        return this.hasReservation(column, element)
            ? this.generateColor(guestName)
            : 'transparent'
    }

    generateColor(name: string): string {

        // Gera um valor hash baseado no nome
        const hash = Array.from(name).reduce((acc, char) => {
            return (acc * 31 + char.charCodeAt(0)) & 0xFFFFFF;
        }, 0);
        // Converte o hash em uma cor RGB e ajusta para ser pastel
        const r = (hash >> 16) & 0xFF;
        const g = (hash >> 8) & 0xFF;
        const b = hash & 0xFF;

        // Ajuste para cores pastéis
        const pastelR = (r + 255) / 2;
        const pastelG = (g + 255) / 2;
        const pastelB = (b + 255) / 2;

        // Garante que os valores estejam dentro do intervalo RGB
        return `rgb(${ Math.min(pastelR, 255) }, ${ Math.min(pastelG, 255) }, ${ Math.min(pastelB, 255) })`;
    }


}
