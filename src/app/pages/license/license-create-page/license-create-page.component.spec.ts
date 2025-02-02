import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCreatePageComponent } from './license-create-page.component';

describe('LicenseCreatePageComponent', () => {
  let component: LicenseCreatePageComponent;
  let fixture: ComponentFixture<LicenseCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
