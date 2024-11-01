import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDepositPageComponent } from './game-deposit-page.component';

describe('GameDepositPageComponent', () => {
  let component: GameDepositPageComponent;
  let fixture: ComponentFixture<GameDepositPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDepositPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDepositPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
