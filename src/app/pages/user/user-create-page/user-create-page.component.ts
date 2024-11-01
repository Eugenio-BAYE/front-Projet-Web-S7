import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SellerService } from 'src/app/core/services/api/seller.service';
import { Seller } from 'src/app/models/seller';

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
    private sellerService: SellerService,
    private notificationService: NotificationService,
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
    const seller: Seller = this.myForm.value;
    console.log(JSON.stringify(seller) + " was submitted");
    if (false) {
      return;
    }
    console.log("Form is valid");

    this.sellerService.createSeller(seller).subscribe({
      next: (response) => {
        this.notificationService.showSuccess("User created successfully");
      },
      error: (error) => {
        if (error.status === 400) {
          this.notificationService.showError(error);
        } else if (error.status === 500) {
          this.notificationService.showError(error);
        } else {
          console.error("Unexpected Error:", error);
          this.notificationService.showError(error);
        }
      }
    });
  }
}

