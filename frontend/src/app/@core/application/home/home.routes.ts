import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { RouteList } from "../../domain/enum/route-list.enum";
import { RoomsComponent } from "./rooms/rooms.component";
import { ReservationsComponent } from "./reservations/reservations.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CashFlowComponent } from "./cash-flow/cash-flow.component";

export const HOME_ROUTES: Routes = [
    { path: '', redirectTo: RouteList.dashboard, pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: RouteList.dashboard, component: DashboardComponent },
            { path: RouteList.rooms, component: RoomsComponent },
            { path: RouteList.reservations, component: ReservationsComponent },
            { path: RouteList.cashFlow, component: CashFlowComponent },
        ]
    },
];
