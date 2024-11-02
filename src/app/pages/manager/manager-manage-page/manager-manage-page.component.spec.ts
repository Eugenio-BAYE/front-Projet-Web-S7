import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerManagePageComponent } from './manager-manage-page.component';

describe('ManagerManagePageComponent', () => {
  let component: ManagerManagePageComponent;
  let fixture: ComponentFixture<ManagerManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
