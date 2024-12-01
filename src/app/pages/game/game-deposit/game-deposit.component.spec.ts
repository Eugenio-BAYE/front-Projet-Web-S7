import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDepositComponent } from './game-deposit.component';

describe('GameDepositComponent', () => {
  let component: GameDepositComponent;
  let fixture: ComponentFixture<GameDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
