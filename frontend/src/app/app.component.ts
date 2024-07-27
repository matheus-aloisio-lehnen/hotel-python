import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, tap } from "rxjs";
import { Store } from "@ngrx/store";

import { registerAllIcons } from "./@core/infra/utils/icon/icon.utils";
import { AppState } from "./@core/infra/store/ngrx/state/app.state";
import { OverlayContainer } from "@angular/cdk/overlay";
import { LetDirective } from "@ngrx/component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        LetDirective
    ],
})
export class AppComponent {

    isDarkMode$: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private overlayContainer: OverlayContainer,
    ) {
        this.isDarkMode$ = this.store.select((app: AppState) => app.isDarkMode)
            .pipe(tap(isDarkMode => this.changeTheme(isDarkMode)));
        registerAllIcons();
    }

    private changeTheme(isDarkMode: boolean) {
        this.overlayContainer.getContainerElement().classList.add(isDarkMode ? 'dark-theme' : 'light-theme');
        this.overlayContainer.getContainerElement().classList.remove(isDarkMode ? 'light-theme' : 'dark-theme');
    }

}
