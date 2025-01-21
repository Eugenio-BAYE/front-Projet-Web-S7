import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldConfig, FIELD_CONFIGS } from './input-field.constants';
import { CommonModule } from '@angular/common';


/**
 * Component responsible for rendering an input field with validation.
 * 
 * @param {AbstractControl} control - The form control associated with this input field.
 * @param {string} fieldType - The type of the input field (e.g., 'name', 'email').
 * 
 * @constructor
 * 
 * @method ngOnInit - Initializes the field configuration based on the provided field type.
 * @method getErrorMessage - Retrieves the appropriate error message for the field validation errors.
 */
@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})

export class InputFieldComponent {
  /**
   * The form control associated with this field.
   */
  @Input() control!: AbstractControl;

  /**
   * The type of the field (e.g., 'name', 'email').
   */
  @Input() fieldType!: string;

  /**
   * Configuration for the field, including label, type, and error messages.
   */
  fieldConfig!: { label: string; type: string; errorMessages: { [key: string]: string } };

  /**
   * Configuration for all field types.
   */
  private static FIELD_CONFIGS = {
    name: {
      label: 'Name',
      type: 'text',
      errorMessages: {
        required: 'Name is required.',
        minlength: 'Name must be at least 2 characters long.',
        maxlength: 'Name cannot exceed 50 characters.',
      },
    },
    email: {
      label: 'Email',
      type: 'email',
      errorMessages: {
        required: 'Email is required.',
        email: 'Please enter a valid email address.',
      },
    },
  };

  /**
   * Initializes the field configuration based on the field type.
   */
  // ngOnInit(): void {
  //   this.fieldConfig = InputFieldComponent.FIELD_CONFIGS[this.fieldType];
  //   const validators = Object.keys(this.fieldConfig.errorMessages).map(key => Validators[key]);
  //   this.control.setValidators(validators);
  // }

  /**
   * Retrieves the appropriate error message for the field's validation errors.
   */
  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    const firstErrorKey = Object.keys(this.control.errors)[0];
    return this.fieldConfig.errorMessages[firstErrorKey];
  }
}