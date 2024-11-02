import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSalePageComponent } from './game-sale-page.component';

describe('GameSalePageComponent', () => {
  let component: GameSalePageComponent;
  let fixture: ComponentFixture<GameSalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSalePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
