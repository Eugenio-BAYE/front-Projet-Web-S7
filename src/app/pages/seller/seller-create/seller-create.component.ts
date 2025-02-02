import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../../core/services/notification.service';
import { SellerService } from '../../../core/services/api/seller.service';
import { Seller } from '../../../models/seller';

@Component({
  selector: 'app-seller-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './seller-create.component.html',
  styleUrl: './seller-create.component.css'
})

export class SellerCreateComponent implements OnInit {

  myForm = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    telephone: new FormControl('', [
      Validators.required,
    ]),
    adresse: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
  });

  constructor(
    private sellerService: SellerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() { }

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
    const seller: Seller = {
      nom: this.myForm.value.nom || '',
      email: this.myForm.value.email || '',
      telephone: this.myForm.value.telephone || '',
      adresse: this.myForm.value.adresse || ''
    };
    // TODO : Remove the debug log
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
