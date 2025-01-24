import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from 'src/app/core/services/api/game.service';
import { LicenseService } from 'src/app/core/services/api/license.service';
import { SellerService } from 'src/app/core/services/api/seller.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { License } from 'src/app/models/license';
import { Seller } from 'src/app/models/seller';

@Component({
  selector: 'app-game-deposit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './game-deposit.component.html',
  styleUrl: './game-deposit.component.css'
})
export class GameDepositComponent implements OnInit{

  gameForm!: FormGroup;
  licenses: License[] = [];
  seller!: Seller;

  constructor(
    private fb: FormBuilder,
    private licenseService: LicenseService,
    private gameService: GameService,
    private notificationService: NotificationService,
    private sellerService: SellerService,
  ) { }

  ngOnInit() {
    this.gameForm = this.fb.group({
      licence_id: [null, Validators.required],
      seller_email: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      hasPromoCode: [false],
      code_promo: [''],
    });
    this.loadLicenses();
  }

  loadLicenses() {
    this.licenseService.getLicenses().subscribe({
      next: (data: License[]) => {
        this.licenses = data;
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }

  async onSubmit() {
    if (this.gameForm.invalid) {
      return;
    }

    const formValue = this.gameForm.value;
    const game = {
      licence_id: formValue.licence_id,
      prix: formValue.prix,
      depot_id: formValue.depot_id,
    };

    const games = [game];

    const quantity = [formValue.quantity];
    const code_promo = formValue.code_promo;
    this.sellerService.getSellerByEmail(formValue?.seller_email).subscribe({
      next: (seller: Seller) => {
        console.log(seller);
        this.gameService.deposerJeu(games, quantity, code_promo, seller).subscribe({
          next: () => {
            this.notificationService.showSuccess('Jeu déposé avec succès');
          },
          error: (error) => {
            this.notificationService.showError(error);
          }
        });
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }
}
