import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-user-create-form',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './user-create-form.component.html',
  styleUrl: './user-create-form.component.css'
})
export class UserCreateFormComponent {
  @Input() formFields: any[] = []; // Reçoit les champs depuis UserCreatePageComponent
  @Output() formSubmit = new EventEmitter<any>(); // Émet l’événement de soumission

  onFormSubmit(data: any) {
    this.formSubmit.emit(data); // Relaye les données vers UserCreatePageComponent
  }
}
