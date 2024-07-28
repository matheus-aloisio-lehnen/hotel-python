import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { toggleDarkMode } from "../../../infra/store/ngrx/actions/dark-mode.actions";
import { RouteList } from "../../../domain/enum/route-list.enum";
import { Room } from "../../../domain/model/room";
import { Reservation } from "../../../domain/model/reservation";
import { selectRoom, selectRoomList } from "../../../infra/store/ngrx/selectors/room.selector";
import {
    selectCheckout,
    selectCheckoutList,
    selectReservation,
    selectReservationList
} from "../../../infra/store/ngrx/selectors/reservation.selector";

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: [ './base.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {

    protected readonly RouteList: typeof RouteList;
    isDarkMode$: Observable<boolean>;
    roomList$: Observable<Room[]>;
    checkoutList$: Observable<Reservation[] | null>
    reservationList$: Observable<Reservation[] | null>
    selectedReservation$: Observable<Reservation | null>;
    selectedCheckout$: Observable<Reservation | null>;
    selectedRoom$: Observable<Room | null>

    constructor(
        protected store: Store<AppState>,
        protected router: Router,
    ) {
        this.RouteList = RouteList;
        this.isDarkMode$ = this.store.select((appState: AppState) => appState.isDarkMode);
        this.roomList$ = this.store.select(selectRoomList);
        this.checkoutList$ = this.store.select(selectCheckoutList);
        this.reservationList$ = this.store.select(selectReservationList);
        this.selectedRoom$ = this.store.select(selectRoom);
        this.selectedReservation$ = this.store.select(selectReservation);
        this.selectedCheckout$ = this.store.select(selectCheckout);
    }

    changeThemeMode(isDarkMode: boolean): void {
        this.store.dispatch(toggleDarkMode(isDarkMode));
    }

    get signInRoute() {
        return this.router.url.endsWith(RouteList.signIn);
    }

}
