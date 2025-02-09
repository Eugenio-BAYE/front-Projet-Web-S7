import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePromoManageComponent } from './code-promo-manage.component';

describe('CodePromoManageComponent', () => {
  let component: CodePromoManageComponent;
  let fixture: ComponentFixture<CodePromoManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodePromoManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodePromoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
