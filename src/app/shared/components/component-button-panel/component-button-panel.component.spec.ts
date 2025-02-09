import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentButtonPanelComponent } from './component-button-panel.component';

describe('ComponentButtonPanelComponent', () => {
  let component: ComponentButtonPanelComponent;
  let fixture: ComponentFixture<ComponentButtonPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentButtonPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentButtonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
