import { Icon } from "../enum/icon.enum";
import { Sidenav } from "../type/links.type";
import { RouteList } from "../enum/route-list.enum";

export const SIDENAV: Sidenav[] = [
    {
        title: 'Quartos',
        icon: Icon.rooms,
        link: RouteList.rooms
    },
    {
        title: 'Reservas',
        icon: Icon.reservation,
        link: RouteList.reservations
    },
    // {
    //     title: 'Coletor',
    //     icon: Icon.collector,
    // },
    // {
    //     title: 'Indústria',
    //     icon: Icon.industry,
    // }
]
