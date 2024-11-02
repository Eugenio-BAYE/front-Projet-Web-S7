import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCreatePageComponent } from './manager-create-page.component';

describe('ManagerCreatePageComponent', () => {
  let component: ManagerCreatePageComponent;
  let fixture: ComponentFixture<ManagerCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
