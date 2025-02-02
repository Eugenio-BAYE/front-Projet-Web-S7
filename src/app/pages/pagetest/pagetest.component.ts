import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { FIELD_CONFIGS } from 'src/app/shared/components/input-field/input-field.constants';

@Component({
  selector: 'app-pagetest',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
  ],
  templateUrl: './pagetest.component.html',
  styleUrl: './pagetest.component.css'
})
export class PagetestComponent {
  /**
   * The reactive form for seller creation.
   */
  myForm!: FormGroup;

  /**
   * List of fields to generate dynamically in the form.
   */
  fields = [
    { key: 'name', type: 'name' },
    { key: 'email', type: 'email' },
  ];

  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the reactive form with empty controls for each field.
   */
  ngOnInit(): void {
    const formControls: any = {};
    this.fields.forEach(field => {
      formControls[field.key] = this.fb.control('');
    });
    this.myForm = this.fb.group(formControls);
  }

  /**
   * Handles the form submission.
   */
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
    }
  }
}
