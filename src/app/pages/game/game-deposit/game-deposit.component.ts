import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from 'src/app/core/services/api/game.service';
import { LicenseService } from 'src/app/core/services/api/license.service';
import { SellerService } from 'src/app/core/services/api/seller.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Game } from 'src/app/models/game';
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
    MatListModule,
    MatIconModule
  ],
  templateUrl: './game-deposit.component.html',
  styleUrl: './game-deposit.component.css'
})
export class GameDepositComponent implements OnInit {

  gameSelectionForm!: FormGroup;
  gameDepositForm!: FormGroup;
  licenses: License[] = [];
  games: Game[] = [];
  quantities: number[] = [];

  constructor(
    private fb: FormBuilder,
    private licenseService: LicenseService,
    private gameService: GameService,
    private notificationService: NotificationService,
    private sellerService: SellerService,
  ) { }

  ngOnInit() {
    this.gameDepositForm = this.fb.group({
      seller_email: ['',
        [
        Validators.required,
        Validators.email
        ]
      ],
      hasPromoCode: [false],
      code_promo: ['',
        Validators.pattern('^[a-zA-Z0-9]*$'),
      ]
    });
    this.gameSelectionForm = this.fb.group({
      licence_id: ['',
        Validators.required
      ],
      prix: ['',
        [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        ]
      ],
      quantity: ['',
        [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
        ]
      ]
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

  async addGame() {
    if (this.gameSelectionForm.invalid) {
      this.notificationService.showError('Veuillez remplir tous les champs correctement');
      return;
    }

    const formValue = this.gameSelectionForm.value;

    const newGame = {
      licence_id: formValue.licence_id,
      licence_name: this.licenses.find(license => license.id === formValue.licence_id)?.nom,
      prix: formValue.prix,
    };

    this.games.push(newGame);
    this.quantities.push(formValue.quantity);
    this.notificationService.showSuccess('Jeu(x) ajouté(s)');

    this.gameSelectionReset();
  }

  async removeGame(index: number) {
    try {
      if (index < 0 || index >= this.games.length) {
        this.notificationService.showError('Index out of bounds');
        return;
      }
  
      this.games.splice(index, 1);
      this.quantities.splice(index, 1);
  
      console.log('Jeu supprimé. État actuel des tableaux :');
      console.log(this.games);
      console.log(this.quantities);
    } catch (error) {
      console.error('Erreur inattendue dans removeGame:', error);
      this.notificationService.showError('An unexpected error occurred while removing the game');
    }
  }
  

  gameSelectionReset() {
    this.gameSelectionForm.reset();
  }

  async onSubmit() {
    if (this.gameDepositForm.invalid) {
      return;
    }
    if (this.games.length === 0 || this.quantities.length === 0) {
      this.notificationService.showError('Veuillez ajouter des jeux avant de valider votre dépôt');
      return;
    }

    const gameDepositValue = this.gameDepositForm.value;
    const code_promo = gameDepositValue.hasPromoCode ? gameDepositValue.code_promo : null;

    this.sellerService.getSellerByEmail(gameDepositValue?.seller_email).subscribe({
      next: (seller: Seller) => {
        console.log(seller);
        this.gameService.deposerJeu(this.games, this.quantities, code_promo, seller).subscribe({
          next: () => {
            this.notificationService.showSuccess('Jeu déposé avec succès');
          },
          error: (error) => {
            console.error(error);
            switch (error.status) {
              case 400:
              this.notificationService.showError(error.message);
              break;
              case 401:
              this.notificationService.showError(error.message);
              break;
              case 404:
              this.notificationService.showError(error.message);
              break;
              case 500:
              this.notificationService.showError(error.message);
              break;
              default:
              this.notificationService.showError(error.message);
              break;
            }
          }
        });
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }
}
