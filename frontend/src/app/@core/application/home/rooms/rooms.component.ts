import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatCardModule, } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatRippleModule } from "@angular/material/core";
import { CurrencyPipe, DatePipe, formatDate, TitleCasePipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { LetDirective } from "@ngrx/component";

import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { Room } from "../../../domain/model/room";
import { BaseComponent } from "../../shared/base/base.component";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { Reservation } from "../../../domain/model/reservation";
import { setRoom } from "../../../infra/store/ngrx/actions/room.actions";
import { setReservation } from "../../../infra/store/ngrx/actions/reservation.actions";
import { CpfPipe } from "../../../infra/utils/pipes/cpf.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatListModule,
        MatTooltipModule,
        MatRippleModule,
        MatExpansionModule,
        TitleCasePipe,
        LetDirective,
        DatePipe,
        CurrencyPipe,
        CpfPipe
    ],
})
export class RoomsComponent extends BaseComponent implements OnDestroy {

    protected readonly RoomStatusEnum: typeof RoomStatus;

    constructor(
        store: Store<AppState>,
        router: Router

    ) {
        super(store, router);
        this.RoomStatusEnum = RoomStatus;
    }

    selectRoom(room: Room) {
        this.store.dispatch(setRoom({ room: room }));
        const selectedReservation = this.findReservation(room);
        this.store.dispatch(setReservation( {reservation: selectedReservation } ))
    }

    findReservation(room: Room) {
        const formattedToday = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
        return room.reservations?.find((reservation: Reservation) => formattedToday >= formatDate(reservation.startDate, 'yyyy-MM-dd', 'pt-BR') && formattedToday <= formatDate(reservation.endDate, 'yyyy-MM-dd', 'pt-BR')) ?? null;
    }

    ngOnDestroy() {
        this.store.dispatch(setRoom( { room: null }));
    }

}
