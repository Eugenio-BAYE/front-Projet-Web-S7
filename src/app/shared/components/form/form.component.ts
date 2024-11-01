import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputFieldComponent } from "../input-field/input-field.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() fields: any[] = []; // Liste des champs de configuration
  @Output() formSubmit = new EventEmitter<any>(); // Émet les données du formulaire

  formData: { [key: string]: any } = {}; // Contient les valeurs saisies

  onSubmit() {
    this.formSubmit.emit(this.formData); // Émet les données du formulaire lors de la soumission
  }
}
