import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() field: any; // Champ de configuration du formulaire
  @Input() value: string = ''; // Valeur du champ
  @Output() valueChange = new EventEmitter<any>(); // Émet un événement lors d'un changement de valeur

  // Méthode appelée à chaque changement pour émettre la nouvelle valeur
  onValueChange(value: any) {
    this.valueChange.emit(value);
  }
}
