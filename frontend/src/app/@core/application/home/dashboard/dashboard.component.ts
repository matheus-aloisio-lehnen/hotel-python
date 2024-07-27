import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { ROOMS } from "../../../domain/mock/rooms.mock";
import { Room } from "../../../domain/model/room";
import { RoomStatus } from "../../../domain/enum/room-status.enum";
import { BaseComponent } from "../../shared/base/base.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../infra/store/ngrx/state/app.state";
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatDividerModule,
        MatIconModule
    ],
})
export class DashboardComponent extends BaseComponent {

    protected readonly ROOMS: Room[];
    freeRooms: number;

    constructor(
        store: Store<AppState>,
        router: Router,
    ) {
        super(store, router);
        this.ROOMS = ROOMS;
        this.freeRooms = ROOMS.reduce((total, value) => {
            return value.status === RoomStatus.free
                ? total + 1
                : total;
        }, 0)
    }


}
