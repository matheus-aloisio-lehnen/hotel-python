import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    MatCardModule,
} from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { ROOMS } from "../../../domain/mock/rooms.mock";
import { RoomStatusEnum } from "../../../domain/enum/room-status.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatRippleModule } from "@angular/material/core";
import { Room } from "../../../domain/model/room";
import { TitleCasePipe } from "@angular/common";

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
        TitleCasePipe
    ],
})
export class RoomsComponent {

    protected readonly rooms: Room[];
    protected readonly RoomStatusEnum: typeof RoomStatusEnum;
    selectedRoom?: Room;

    constructor() {
        this.rooms = ROOMS;
        this.RoomStatusEnum = RoomStatusEnum;
    }

    selectRoom(room: Room) {
        this.selectedRoom = room;
    }

}
