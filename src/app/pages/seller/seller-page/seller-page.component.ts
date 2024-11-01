import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SellerService } from 'src/app/core/services/api/seller.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-seller-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './seller-page.component.html',
  styleUrl: './seller-page.component.css'
})
export class SellerPageComponent {

  findSeller!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.findSeller = this.fb.group({
      email: [''],
    })
  }

  get email() {
    return this.findSeller.get('email');
  }

  async onSubmit() {
    const email = this.findSeller.value.email;
    console.log('Formulaire soumis: ' + email);
    this.sellerService.getSellerByEmail(email).subscribe(
      (seller) => {
        console.log(seller);
        this.notificationService.showSuccess('Vendeur trouvé');
      },
      (error) => {
        console.error(error);
        this.notificationService.showError('Vendeur non trouvé');
      }
    );
  }

}
