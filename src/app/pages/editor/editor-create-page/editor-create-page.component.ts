import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditorService } from 'src/app/core/services/api/editor.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Editor } from 'src/app/models/editor';

@Component({
  selector: 'app-editor-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './editor-create-page.component.html',
  styleUrl: './editor-create-page.component.css'
})
export class EditorCreatePageComponent {

  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editorService: EditorService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      nom: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]]
    });
  }

  get nom() {
    return this.myForm.get('nom');
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    const editor: Editor = this.myForm.value;

    this.editorService.createEditor(editor).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Editor created successfully');
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    })
  }
}
