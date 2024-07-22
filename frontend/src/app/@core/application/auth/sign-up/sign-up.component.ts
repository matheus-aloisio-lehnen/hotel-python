import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { ErrorMessengerUtil } from "../../../infra/utils/form/messenger/error-messenger.util";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ AuthService, ],
    imports: [
    ]
})
export class SignUpComponent extends ErrorMessengerUtil implements OnDestroy {


    // protected readonly ROLE_BUTTONS: RoleButton[];
    // protected readonly ZIPCODE_MASK: string;
    // protected readonly CNPJ_MASK: string;
    // protected readonly CPF_MASK: string;
    // protected readonly MOBILE_MASK: string;
    // protected readonly Role: typeof Role;
    // protected readonly LegalStatus: typeof LegalStatus;
    // protected readonly RouteList: typeof RouteList;
    // @ViewChild('form') form!: ElementRef;
    // @ViewChild('stepper') stepper!: MatStepper;
    // loading$: Observable<boolean>;
    // hide: boolean;
    // authForm: FormGroup;
    // personalDataForm: FormGroup;
    // addressForm: FormGroup;
    //
    // constructor(
    //     private authService: AuthService,
    //     private dialog: MatDialog,
    //     private formBuilder: FormBuilder,
    //     private store: Store<AppState>
    // ) {
    //     super();
    //     this.ROLE_BUTTONS = ROLE_BUTTONS;
    //     this.ZIPCODE_MASK = ZIPCODE_MASK;
    //     this.CNPJ_MASK  = CNPJ_MASK;
    //     this.CPF_MASK = CPF_MASK;
    //     this.MOBILE_MASK = MOBILE_MASK;
    //     this.Role = Role;
    //     this.LegalStatus = LegalStatus;
    //     this.loading$ = this.store.select((appState: AppState) => appState.loading[Loading.signUp])
    //     this.RouteList = RouteList;
    //     this.hide = true;
    //     this.authForm = this.formBuilder.group({
    //         email: [ '', [ Validators.required, Validators.email ] ],
    //         password: [ '', Validators.required ],
    //         status: [ true ],
    //         role: [ '', Validators.required ],
    //     }, { updateOn: 'blur' })
    //     this.personalDataForm = this.formBuilder.group({
    //         name: [ '', Validators.required ],
    //         documentNumber: [ '', Validators.required ],
    //         mobile: [ '', Validators.required ],
    //         legalStatus: [ LegalStatus.NaturalPerson ],
    //     }, { updateOn: 'blur' })
    //     this.addressForm = this.formBuilder.group({
    //         zipCode: [ '', Validators.required ],
    //         street: [ '', Validators.required ],
    //         number: [ '', Validators.required ],
    //     }, { updateOn: 'blur' });
    //
    // }
    //
    // selectRole(role: Role) {
    //     this.role?.patchValue(role);
    //     setTimeout(() => scrollTo(this.form.nativeElement), 200)
    // }
    //
    // async signUp() {
    //     if(await this.checkInvalidForm()) return;
    //     const createUserDto: CreateUserDto = createUserDtoFactory(this.authForm, this.personalDataForm, this.addressForm);
    //     await this.authService.signUp(createUserDto);
    //     this.stepper.selectedIndex = 0;
    //     this.email?.setErrors({ emailUsed: true })
    // }
    //
    // get email() {
    //     return this.authForm.get('email');
    // }
    //
    // get password() {
    //     return this.authForm.get('password');
    // }
    //
    // get role() {
    //     return this.authForm.get('role');
    // }
    //
    // get name() {
    //     return this.personalDataForm.get('name');
    // }
    //
    // get documentNumber() {
    //     return this.personalDataForm.get('documentNumber');
    // }
    //
    // get mobile() {
    //     return this.personalDataForm.get('mobile');
    // }
    //
    // get legalStatus() {
    //     return this.personalDataForm.get('legalStatus');
    // }
    //
    // get zipCode() {
    //     return this.addressForm.get('zipCode');
    // }
    //
    // get street() {
    //     return this.addressForm.get('street');
    // }
    //
    // get number() {
    //     return this.addressForm.get('number');
    // }
    //
    // get documentNumberMask() {
    //     return this.legalStatus?.value === LegalStatus.NaturalPerson
    //         ? CPF_MASK
    //         : CNPJ_MASK
    // }
    //
    // resetForm() {
    //     DIALOG_CONFIG.data = {
    //         title: 'Limpar formulário',
    //         content: '<p> Tem certeza que deseja limpar o formulário? </p>',
    //         actions: [
    //             { label: 'Não', action: () => {} },
    //             { label: 'Sim', action: () => {} },
    //         ]
    //     };
    //     this.dialog.open(DialogBaseComponent, DIALOG_CONFIG)
    //         .afterClosed()
    //         .subscribe(hasConfirmed => hasConfirmed && this.stepper.reset());
    // }
    //
    // private async checkInvalidForm() {
    //     let hasInvalidForm = false;
    //     if(this.authForm.invalid) {
    //         this.authForm.markAllAsTouched();
    //         hasInvalidForm = true;
    //     }
    //
    //     if(this.personalDataForm.invalid) {
    //         this.personalDataForm.markAllAsTouched();
    //         hasInvalidForm = true;
    //     }
    //
    //     if(this.addressForm.invalid) {
    //         this.addressForm.markAllAsTouched();
    //         hasInvalidForm = true;
    //     }
    //     return hasInvalidForm;
    // }
    //
    // private clearForms() {
    //     this.authForm.reset();
    //     this.personalDataForm.reset();
    //     this.addressForm.reset();
    // }
    //
    ngOnDestroy() {
        // this.clearForms();
    }

}
