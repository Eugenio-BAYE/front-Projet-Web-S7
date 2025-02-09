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
  invoiceDetails: any[] = [];
  totalInvoiceAmount: number = 0;

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

  printInvoice() {
    let invoiceContent = `=== Facture d'Achat ===\n\n`;
    let total = 0;

    this.invoiceDetails.forEach((game) => {
        invoiceContent += `Jeu : ${game.nom}\n`;
        invoiceContent += `Prix : ${game.prix.toFixed(2)} €\n`;
        invoiceContent += `Commission : ${game.commission.toFixed(2)} €\n`;
        invoiceContent += `Total après commission : ${game.total.toFixed(2)} €\n`;
        invoiceContent += `Éditeur : ${game.editeur}\n`;
        invoiceContent += `Vendeur : ${game.vendeur}\n`;
        invoiceContent += `----------------------\n`;
        total += game.total;
    });

    invoiceContent += `\n💰 Total à payer : ${total.toFixed(2)} €\n`;

    const invoiceWindow = window.open('', '_blank');
    if (invoiceWindow) {
        invoiceWindow.document.write(`<pre>${invoiceContent}</pre>`);
        invoiceWindow.document.close();
        invoiceWindow.print();
    }
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
    const acheteurId: number | undefined = this.buyer ? this.buyer.id : undefined;

    this.gameService.buyGames(jeux_a_acheter, code_promo, acheteurId).subscribe({
        next: (response) => {
            console.log(response);
            this.notificationService.showSuccess('Jeux achetés avec succès !');

            const parsedResponse = typeof response === "string" ? JSON.parse(response) : response;
            const achats = parsedResponse.achats;
            console.log('🛒 Achats :', achats);
            this.invoiceDetails = [];
            this.totalInvoiceAmount = 0;
            let remainingRequests = achats.length;

            achats.forEach((achat: any) => {
                this.gameService.getGameById(achat.jeu_id).subscribe({
                    next: (gameInfo) => {
                        const prix = gameInfo.prix;
                        const commission = prix * parseFloat(achat.commission); // Calcul de la commission
                        const total = prix - commission;
                        console.log(gameInfo) // TODO: Remove this line

                        this.invoiceDetails.push({
                            id: gameInfo.id,
                            nom: gameInfo.licence_name,
                            prix: prix,
                            commission: commission,
                            total: total,
                        });

                        this.totalInvoiceAmount += total;

                        remainingRequests--;
                        if (remainingRequests === 0) {
                            console.log("📜 Facture prête :", this.invoiceDetails);
                        }
                    },
                    error: (error) => {
                        remainingRequests--;
                        this.notificationService.showError(error);
                    }
                });
            });

            this.purchaseForm.reset();
            this.buyer = null;
        },
        error: (error) => {
            this.notificationService.showError(error);
        }
    });
}

}
