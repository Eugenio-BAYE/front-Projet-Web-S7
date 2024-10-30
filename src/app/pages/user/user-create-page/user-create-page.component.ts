import { Component } from '@angular/core';
import { UserCreateFormComponent } from './components/user-create-form/user-create-form.component';
import { USER_CREATE_FORM_FIELDS } from './user-create-page.constants';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [
    UserCreateFormComponent
  ],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {
  formFields = USER_CREATE_FORM_FIELDS;

  onFormSubmit(data: any) {
    console.log(data);
  }
}
