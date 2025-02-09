import { Validators } from '@angular/forms';

/**
 * Interface representing the configuration for an input field.
 *
 * @interface FieldConfig
 * @property {string} label - The label for the input field.
 * @property {string} type - The type of the input field (e.g., text, password, email).
 * @property {any[]} validators - An array of validators to apply to the input field.
 * @property {{ [key: string]: string }} errorMessages - An object containing error messages for each validation error.
 */
export interface FieldConfig {
  label: string;
  type: string;
  validators: any[];
  errorMessages: { [key: string]: string };
}

/**
 * An array of pre-defined field configurations for the input fields.
 */
export const FIELD_CONFIGS: { [key: string]: FieldConfig } = {
    name: {
      label: 'Nom',
      type: 'text',
      validators: [
        Validators.required,
        Validators.maxLength(50),
      ],
      errorMessages: {
        required: 'Le nom est obligatoire.',
        maxlength: 'Le nom ne peut pas dépasser 50 caractères.',
      },
    },
    email: {
      label: 'Email',
      type: 'email',
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ],
      errorMessages: {
        required: 'L’email est obligatoire.',
        email: 'Veuillez entrer une adresse email valide.',
        maxlength: 'L’email ne peut pas dépasser 100 caractères.',
      },
    },
    telephone: {
      label: 'Téléphone',
      type: 'tel',
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ],
      errorMessages: {
        required: 'Le numéro de téléphone est obligatoire.',
        pattern: 'Le numéro de téléphone doit comporter 10 chiffres.',
      },
    },
    address: {
      label: 'Adresse',
      type: 'text',
      validators: [
        Validators.required,
        Validators.maxLength(100),
      ],
      errorMessages: {
        required: 'L’adresse est obligatoire.',
        maxlength: 'L’adresse ne peut pas dépasser 100 caractères.',
      },
    },
  };