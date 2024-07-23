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

    protected readonly ROOMS = ROOMS;
    protected readonly RoomStatusEnum = RoomStatusEnum;
    selectedRoom?: Room;

    constructor() {
        console.log(RoomStatusEnum)
        console.log(ROOMS)
    }

    selectRoom(room: Room) {
        this.selectedRoom = room;
    }
}
