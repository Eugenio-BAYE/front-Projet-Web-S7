import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameViewPageComponent } from './game-view-page.component';

describe('GameViewPageComponent', () => {
  let component: GameViewPageComponent;
  let fixture: ComponentFixture<GameViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
