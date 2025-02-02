import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockToSaleComponent } from './stock-to-sale.component';

describe('StockToSaleComponent', () => {
  let component: StockToSaleComponent;
  let fixture: ComponentFixture<StockToSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockToSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockToSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
