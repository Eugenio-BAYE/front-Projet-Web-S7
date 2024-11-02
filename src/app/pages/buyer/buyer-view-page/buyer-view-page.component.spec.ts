import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerViewPageComponent } from './buyer-view-page.component';

describe('BuyerViewPageComponent', () => {
  let component: BuyerViewPageComponent;
  let fixture: ComponentFixture<BuyerViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
