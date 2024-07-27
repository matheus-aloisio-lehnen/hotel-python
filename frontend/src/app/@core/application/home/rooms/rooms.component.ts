import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    MatCardModule,
} from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatRippleModule } from "@angular/material/core";
import { Room } from "../../../domain/model/room";
import { CurrencyPipe, DatePipe, formatDate, TitleCasePipe } from "@angular/common";
import { BaseComponent } from "../../shared/base/base.component";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { LetDirective } from "@ngrx/component";
import { Observable } from "rxjs";
import { Reservation } from "../../../domain/model/reservation";
import { selectReservation } from "../../../infra/store/ngrx/selectors/reservation.selector";
import { selectRoom, selectRoomList } from "../../../infra/store/ngrx/selectors/room.selector";
import { setRoom } from "../../../infra/store/ngrx/actions/room.actions";
import { setReservation } from "../../../infra/store/ngrx/actions/reservation.actions";
import { CpfPipe } from "../../../infra/utils/pipes/cpf.pipe";

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
        MatRippleModule,
        TitleCasePipe,
        LetDirective,
        DatePipe,
        CurrencyPipe,
        CpfPipe
    ],
})
export class RoomsComponent extends BaseComponent {

    protected readonly RoomStatusEnum: typeof RoomStatus;
    roomList$: Observable<Room[]>;
    selectedRoom$: Observable<Room | null>
    selectedReservation$: Observable<Reservation | null>

    constructor(
        store: Store<AppState>,
        router: Router

    ) {
        super(store, router);
        this.RoomStatusEnum = RoomStatus;
        this.roomList$ = this.store.select(selectRoomList);
        this.selectedRoom$ = this.store.select(selectRoom);
        this.selectedReservation$ = this.store.select(selectReservation);
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

}
