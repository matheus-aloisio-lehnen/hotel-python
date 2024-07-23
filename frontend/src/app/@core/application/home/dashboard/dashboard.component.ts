import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { ROOMS } from "../../../domain/mock/rooms.mock";
import { Room } from "../../../domain/model/room";
import { RoomStatusEnum } from "../../../domain/enum/room-status.enum";

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
export class DashboardComponent {

    protected readonly ROOMS: Room[];
    freeRooms: number;

    constructor() {
        this.ROOMS = ROOMS;
        this.freeRooms = ROOMS.reduce((total, value) => {
            return value.status === RoomStatusEnum.free
                ? total + 1
                : total;
        }, 0)
    }


}
