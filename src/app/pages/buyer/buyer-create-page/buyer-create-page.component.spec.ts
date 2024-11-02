import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCreatePageComponent } from './buyer-create-page.component';

describe('BuyerCreatePageComponent', () => {
  let component: BuyerCreatePageComponent;
  let fixture: ComponentFixture<BuyerCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
