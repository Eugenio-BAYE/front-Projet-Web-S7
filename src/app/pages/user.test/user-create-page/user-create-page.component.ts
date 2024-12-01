import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-seller-create',
  standalone: true,
  imports: [
    FormComponent,
  ],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {
  formFields = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter username',
      required: true,
      value: ''
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
      required: true,
      value: ''
    },
    {
      label: 'Role',
      name: 'role',
      type: 'select',
      options: ['admin', 'manager'],
      placeholder: 'Select a role',
      required: true,
      value: 'manager'
    }
  ];

  onFormSubmit(data: any) {
    console.log(data);
  }
}
