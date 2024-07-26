import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";

import { MONTHS } from "../../../domain/constants/months.constants";
import { generateRandomReservations } from "../../../domain/mock/reservation.mock";
import { MonthType } from "../../../domain/type/month.type";
import { ROOMS } from "../../../domain/mock/rooms.mock";
import { Room } from "../../../domain/model/room";
import { formatDate } from "@angular/common";
import { LetDirective } from "@ngrx/component";
import { BaseComponent } from "../../shared/base/base.component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../infra/store/ngrx/state/app.state";

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
        LetDirective,
    ]
})
export class ReservationsComponent extends BaseComponent {

    @ViewChild(MatTabGroup) tabs!: MatTabGroup;
    protected readonly months: MonthType[];
    selectedMonth: number;
    dataSource: any[];
    displayedColumns: string[];

    constructor(
        store: Store<AppState>,
        router: Router
    ) {
        super(store, router);
        this.months = MONTHS;
        this.selectedMonth = 0;
        this.dataSource = generateRandomReservations(this.selectedMonth + 1, ROOMS.length);
        this.displayedColumns = this.getDisplayedColumns(this.selectedMonth + 1);
        console.log(this.dataSource)
    }

    onTabChange() {
        const month = this.selectedMonth + 1;
        this.dataSource = generateRandomReservations(month, ROOMS.length);
        this.displayedColumns = this.getDisplayedColumns(month);
    }

    getDisplayedColumns(month: number): any[] {
        const columns = ['room'];
        const numDays = new Date(new Date().getFullYear(), month, 0).getDate();
        for (let day = 1; day <= numDays; day++) {
            columns.push(day.toString());
        }

        return columns;
    }

    getTableText(column: string, room: Room) {
        if(column === 'room') return room.number;
        return this.findReservation(column, room)?.guest?.name;
    }

    openReservation(column: string, room: Room) {
        console.log(this.findReservation(column, room))
    }

    findReservation(column: string, room: Room) {
        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(column)), 'dd-MM-yyyy', 'pt-BR')
        return room.reservations.find(reservation => selectedDate >= reservation.startDate && selectedDate <= reservation.endDate);
    }

    hasReservation(column: string, element: Room) {
        if(column === 'room') return false;
        return this.findReservation(column, element)
    }

    isStartDate(column: string, room: Room) {
        if(column === 'room') return false;
        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(column)), 'dd-MM-yyyy', 'pt-BR');
        return selectedDate === this.findReservation(column, room)?.startDate;
    }

    isEndDate(column: string, room: Room) {
        if(column === 'room') return false;
        const selectedDate = formatDate(new Date(new Date().getFullYear(), this.selectedMonth, Number(column)), 'dd-MM-yyyy', 'pt-BR');
        return selectedDate === this.findReservation(column, room)?.endDate;
    }

    getColor(column: string, room: Room) {
        const guestName = this.findReservation(column, room)?.guest?.name;

        if(!guestName) return;
        return this.generateColor(guestName)
    }

    generateColor(name: string): string {
        const hash = Array.from(name).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xFFFFFF, 0);
        const pastelColors = [
            'rgb(173, 216, 230)',
            'rgb(152, 251, 152)',
            'rgb(255, 182, 193)',
            'rgb(255, 200, 124)',
            'rgb(216, 191, 216)'
        ];
        const colorIndex = hash % pastelColors.length;
        return pastelColors[colorIndex];
    }

}
