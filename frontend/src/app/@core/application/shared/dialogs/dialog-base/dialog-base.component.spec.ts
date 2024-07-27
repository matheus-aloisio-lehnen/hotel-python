import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogBaseComponent } from './dialog-base.component';

describe('DialogBaseComponent', () => {
    let component: DialogBaseComponent;
    let fixture: ComponentFixture<DialogBaseComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ DialogBaseComponent ],
            imports: [  ]
        }).compileComponents();

        fixture = TestBed.createComponent(DialogBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
