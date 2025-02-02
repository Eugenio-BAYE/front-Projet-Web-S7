import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from 'src/app/core/services/api/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BuyerService } from 'src/app/core/services/api/buyer.service';
import { Buyer } from 'src/app/models/buyer';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-game-sale-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
    templateUrl: './game-sale-page.component.html',
  styleUrl: './game-sale-page.component.css'
})

export class GameSalePageComponent {
  purchaseForm: FormGroup;
  buyer: Buyer | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private buyerService: BuyerService,
    private notificationService: NotificationService
  ) {
    this.purchaseForm = this.fb.group({
      email: ['', Validators.email], // L'acheteur est optionnel
      jeux_a_acheter: ['', Validators.required], // IDs des jeux séparés par des virgules
      code_promo: ['']
    });
  }

  fetchBuyer() {
    const email = this.purchaseForm.get('email')?.value;

    if (!email) {
      this.buyer = null; // Ne pas afficher d'erreur si aucun email n'est entré
      return;
    }

    this.buyerService.getBuyerByEmail(email).subscribe({
      next: (buyer) => {
        this.buyer = buyer;
        this.notificationService.showSuccess(`Acheteur trouvé : ${buyer.nom}`);
      },
      error: (error) => {
        this.buyer = null;
        this.notificationService.showError(error);
      }
    });
  }

  onSubmit() {
    if (this.purchaseForm.invalid) {
      this.notificationService.showError('Veuillez remplir correctement les champs.');
      return;
    }

    const formValue = this.purchaseForm.value;
    const jeux_a_acheter = formValue.jeux_a_acheter
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));

    if (jeux_a_acheter.length === 0) {
      this.notificationService.showError('Veuillez entrer des IDs de jeux valides.');
      return;
    }

    const code_promo = formValue.code_promo || null;
    const acheteurId: number | undefined = this.buyer ? this.buyer.id : undefined; // L'acheteur est optionnel

    this.gameService.buyGames(jeux_a_acheter, code_promo, acheteurId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Jeux achetés avec succès !');
        this.purchaseForm.reset();
        this.buyer = null;
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }
}
