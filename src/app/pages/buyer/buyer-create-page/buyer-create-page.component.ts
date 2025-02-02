import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BuyerService } from 'src/app/core/services/api/buyer.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Buyer } from 'src/app/models/buyer';

@Component({
  selector: 'app-buyer-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './buyer-create-page.component.html',
  styleUrl: './buyer-create-page.component.css'
})
export class BuyerCreatePageComponent {
  buyerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private buyerService: BuyerService,
    private notificationService: NotificationService
  ) {
    this.buyerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      adresse: ['']
    });
  }

  onSubmit() {
    if (this.buyerForm.invalid) {
      this.notificationService.showError('Veuillez remplir tous les champs correctement.');
      return;
    }

    const buyer: Buyer = this.buyerForm.value;

    this.buyerService.registerBuyer(buyer).subscribe({
      next: (response) => {
        this.notificationService.showSuccess(response);
        this.buyerForm.reset();
      },
      error: (error) => {
        if (error.status === 400) {
          this.notificationService.showError(error || 'Un utilisateur avec cet email existe déjà.');
        } else {
          this.notificationService.showError('Erreur lors de la création du compte.');
        }
      }
    });
  }
}
