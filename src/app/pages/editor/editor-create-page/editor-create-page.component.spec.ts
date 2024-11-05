import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCreatePageComponent } from './editor-create-page.component';

describe('EditorCreatePageComponent', () => {
  let component: EditorCreatePageComponent;
  let fixture: ComponentFixture<EditorCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
