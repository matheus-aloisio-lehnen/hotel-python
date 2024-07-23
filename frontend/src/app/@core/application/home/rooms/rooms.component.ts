import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-rooms',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss',
})
export class RoomsComponent {

}
