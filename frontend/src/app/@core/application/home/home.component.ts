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
        router: Router
    ) {
        super(store, router);
        this.navHovered = false;
        this.SIDENAV = SIDENAV;
    }

    logout() {
        const to = [ RouteList.auth ]
        this.router.navigate(to)
    }
}
