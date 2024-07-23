import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { RouteList } from "../../domain/enum/route-list.enum";
import { RoomsComponent } from "./rooms/rooms.component";
import { ReservationsComponent } from "./reservations/reservations.component";

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: RouteList.rooms, component: RoomsComponent },
            { path: RouteList.reservations, component: ReservationsComponent },
        ]
    },
];
