import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCreatePageComponent } from './seller-create-page.component';

describe('SellerCreatePageComponent', () => {
  let component: SellerCreatePageComponent;
  let fixture: ComponentFixture<SellerCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
