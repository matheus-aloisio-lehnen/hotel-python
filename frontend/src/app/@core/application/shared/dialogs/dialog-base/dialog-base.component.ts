import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    ViewContainerRef
} from '@angular/core';
import { ComponentPortal, PortalModule } from "@angular/cdk/portal";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { MatDividerModule } from "@angular/material/divider";
import { DialogBase } from "../../../../domain/type/dialog-base.type";

@Component({
    selector: 'app-dialog-base',
    templateUrl: './dialog-base.component.html',
    styleUrls: [ './dialog-base.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatToolbarModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        PortalModule
    ]
})
export class DialogBaseComponent {

    componentPortal: ComponentPortal<any>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogBase<any>,
        public dialogRef: MatDialogRef<DialogBaseComponent>,
    ) {
        this.componentPortal = new ComponentPortal(this.data.content.component);
    }


}