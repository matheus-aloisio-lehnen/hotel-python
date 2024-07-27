import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective } from "ngx-mask";
import { MatStepperModule, } from "@angular/material/stepper";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { LetDirective } from "@ngrx/component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AppState } from "../../../../../infra/store/ngrx/state/app.state";
import { Loading } from "../../../../../domain/enum/loading.enum";
import { ErrorMessengerUtil } from "../../../../../infra/utils/form/messenger/error-messenger.util";
import { CPF_MASK, MOBILE_MASK, ZIPCODE_MASK } from "../../../../../infra/configs/mask.config";
import { Room } from "../../../../../domain/model/room";
import { selectRoom } from "../../../../../infra/store/ngrx/selectors/room.selector";
import { CreateReservationDto, createReservationDtoFactory } from "../../../../../domain/dto/reservation/create/create-reservation.dto";
import { ReservationService } from "../../service/reservation.service";

@Component({
    selector: 'app-add-reservation',
    templateUrl: './add-reservation.component.html',
    styleUrl: './add-reservation.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        NgxMaskDirective,
        MatStepperModule,
        MatDatepickerModule,
        LetDirective,
        MatDialogModule,
        MatToolbarModule,
        MatDividerModule
    ]
})
export class AddReservationComponent extends ErrorMessengerUtil {


    protected readonly ZIPCODE_MASK: string;
    protected readonly CPF_MASK: string;
    protected readonly MOBILE_MASK: string;
    loading$: Observable<boolean>;
    reservationForm: FormGroup;
    personalDataForm: FormGroup;
    addressForm: FormGroup;
    room$: Observable<Room | null>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private reservationService: ReservationService,
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<AddReservationComponent>
    ) {
        super();
        this.ZIPCODE_MASK = ZIPCODE_MASK;
        this.CPF_MASK = CPF_MASK;
        this.MOBILE_MASK = MOBILE_MASK;
        this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.signUp])
        this.room$ = this.store.select(selectRoom);
        this.reservationForm = this.formBuilder.group({
            startDate: [ '' ],
            endDate: [ '' ],
            roomNumber: [ '' ],
        }, { updateOn: 'blur' })
        this.personalDataForm = this.formBuilder.group({
            name: [ '', Validators.required ],
            documentNumber: [ '', Validators.required ],
            mobile: [ '', Validators.required ],
        }, { updateOn: 'blur' })
        this.addressForm = this.formBuilder.group({
            zipCode: [ '', Validators.required ],
            street: [ '', Validators.required ],
            number: [ '', Validators.required ],
            city: [ '', Validators.required ],
            uf: [ '', Validators.required ],
        }, { updateOn: 'blur' });
    }

    async add(room: Room | null) {
        if (await this.checkInvalidForm()) return;
        this.reservationForm.patchValue({ roomNumber: room?.number });
        const createReservationDto: CreateReservationDto = createReservationDtoFactory(this.reservationForm, this.personalDataForm, this.addressForm);
        await this.reservationService.add(createReservationDto);
        this.dialogRef.close(true);
    }

    get startDate() {
        return this.reservationForm.get('startDate');
    }

    get endDate() {
        return this.reservationForm.get('endDate');
    }

    get name() {
        return this.personalDataForm.get('name');
    }

    get documentNumber() {
        return this.personalDataForm.get('documentNumber');
    }

    get mobile() {
        return this.personalDataForm.get('mobile');
    }

    get zipCode() {
        return this.addressForm.get('zipCode');
    }

    get street() {
        return this.addressForm.get('street');
    }

    get number() {
        return this.addressForm.get('number');
    }

    get city() {
        return this.addressForm.get('city');
    }

    get uf() {
        return this.addressForm.get('uf');
    }

    private async checkInvalidForm() {
        let hasInvalidForm = false;
        if (this.reservationForm.invalid) {
            this.reservationForm.markAllAsTouched();
            hasInvalidForm = true;
        }

        if (this.personalDataForm.invalid) {
            this.personalDataForm.markAllAsTouched();
            hasInvalidForm = true;
        }

        if (this.addressForm.invalid) {
            this.addressForm.markAllAsTouched();
            hasInvalidForm = true;
        }
        return hasInvalidForm;
    }


}
