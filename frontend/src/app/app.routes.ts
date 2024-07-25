import { Routes } from '@angular/router';
import { RouteList } from "./@core/domain/enum/route-list.enum";
import { authGuard } from "./@core/infra/security/guards/auth/auth.guard";
import { PageNotFoundComponent } from "./@core/application/page-not-found/page-not-found.component";

export const ROUTES: Routes = [
    { path: RouteList.auth, loadChildren: () => import('./@core/application/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    // { path: RouteList.home, loadChildren: () => import('./@core/application/home/home.routes').then(m => m.HOME_ROUTES), canActivate: [authGuard] },
    { path: '', loadChildren: () => import('./@core/application/home/home.routes').then(m => m.HOME_ROUTES)},
    { path: RouteList.wildCard, component: PageNotFoundComponent },
];