import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.css'
})
export class UserCreatePageComponent {

  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() { // TODO: Add form validation messages
    this.myForm = this.fb.group({
      nom: ['', [
        Validators.required,
        // Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        // Validators.email,
        Validators.maxLength(100)
      ]],
      telephone: ['', [
        Validators.required,
        // Validators.pattern('^[0-9]{10}$')
      ]],
      adresse: ['', [
        Validators.required,
        // Validators.minLength(5),
        Validators.maxLength(100)
      ]],
    });
  }
  get nom() {
    return this.myForm.get('nom');
  }

  get email() {
    return this.myForm.get('email');
  }

  get telephone() {
    return this.myForm.get('telephone');
  }

  get adresse() {
    return this.myForm.get('adresse');
  }

  async onSubmit() {
    const formData = this.myForm.value;
    console.log(JSON.stringify(formData) + " was submitted");
    if (false) {
      return;
    }
    console.log("Form is valid");

    this.apiService.createUser(formData).subscribe({ // TODO: Use toasts for success and error messages
      next: (response) => {
        console.log("User created successfully" + JSON.stringify(response));
      },
      error: (error) => {
        // Directly handle the error from the response here
        if (error.status === 400) {
          console.error("Validation Error: Please check the input data.");
        } else if (error.status === 500) {
          console.error("Server Error: Please try again later.");
        } else {
          console.error("Unexpected Error:", error);
        }
      }
    });
  }
}

