import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Router, RouterModule } from "@angular/router";

import { BaseComponent } from "../shared/base/base.component";
import { Sidenav } from "../../domain/type/sidenav.type";
import { AppState } from "../../infra/store/ngrx/state/app.state";
import { SIDENAV } from "../../domain/constants/sidenav.constant";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { LetDirective } from "@ngrx/component";
import { RouteList } from "../../domain/enum/route-list.enum";
import { setRoomList } from "../../infra/store/ngrx/actions/room.actions";
import { ROOMS } from "../../domain/mock/rooms.mock";
import { generateRandomReservations } from "../../infra/utils/generators/random-reservation";
import { selectRoomList } from "../../infra/store/ngrx/selectors/room.selector";
import { ReservationService } from "./reservations/service/reservation.service";

@Component({
    selector: 'app-home',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatDividerModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        LetDirective
    ]
})
export class HomeComponent extends BaseComponent {

    navHovered: boolean;
    SIDENAV: Sidenav[];

    constructor(
        store: Store<AppState>,
        router: Router,
        private reservationService: ReservationService
    ) {
        super(store, router);
        this.navHovered = false;
        this.SIDENAV = SIDENAV;
        this.reservationService.getReservations();
        const teste = this.store.select(selectRoomList).subscribe(result => console.log(result))
    }

    logout() {
        this.router.navigate([ RouteList.auth ])
    }

}
