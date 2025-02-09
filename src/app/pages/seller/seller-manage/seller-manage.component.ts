import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SellerService } from '../../../core/services/api/seller.service';
import { NotificationService } from '../../../core/services/notification.service';
import { SessionService } from 'src/app/core/services/api/session.service';
import { Game } from 'src/app/models/game';
import { Seller } from 'src/app/models/seller';
import { Session } from 'src/app/models/session';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-seller-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './seller-manage.component.html',
  styleUrl: './seller-manage.component.css'
})

export class SellerManageComponent implements OnInit {
  findSeller!: FormGroup;
  seller: Seller | null = null;
  stock: Game[] = [];
  soldGames: Game[] = [];
  amountDue: number = 0;
  totalEarned: number = 0;
  stats: any[] = [];
  sessions: Session[] = []; // Liste des sessions disponibles
  totalSoldGames = 0;
  totalRevenue = 0;
  totalRevenueAllSessions: number = 0;
  totalAmountDue: number = 0;



  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private sessionService: SessionService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.findSeller = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      idSession: ['', [Validators.required]] // Remplacé par une sélection de session
    });

    this.loadSessions();
  }

  loadSessions() {
    this.sessionService.getAllSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  loadSellerGeneralStats(idVendeur: number) {

    this.sellerService.getSellerStats(idVendeur).subscribe({
      next: (stats) => {
        this.totalSoldGames = stats.reduce((acc: number, item: { quantiteVendu: number }) => acc + item.quantiteVendu, 0);
      },
      error: (error) => {
        this.totalSoldGames = 0;
        this.notificationService.showError(error); // ✅ Passe `error` en argument
      }
    });

    // 🔄 Récupérer toutes les sessions et additionner les montants
    this.sessionService.getAllSessions().subscribe({
      next: (sessions) => {
        console.log('Sessions:', sessions);
        let totalRevenue = 0;
        let totalDue = 0;
        let remainingRequests = sessions.length;

        sessions.forEach(session => {
          if (session.id !== undefined) { // ✅ Vérification de session.id avant requête
            // Récupérer le revenu total pour chaque session et l'additionner
            this.sellerService.getTotalEarned(session.id, idVendeur).subscribe({
              next: (data) => {
                totalRevenue += data.sommegenerée;
                remainingRequests--;

                if (remainingRequests === 0) {
                  this.totalRevenueAllSessions = totalRevenue;
                }
              },
              error: (error) => {
                remainingRequests--;
                if (remainingRequests === 0) {
                  this.totalRevenueAllSessions = totalRevenue;
                }
                if (error.status !== 404) { // ✅ Ne pas afficher d'erreur si la somme n'existe pas
                  this.notificationService.showError(error);
                }
              }
            });

            // Récupérer la somme due pour chaque session et l'additionner
            this.sellerService.getAmountDue(session.id, idVendeur).subscribe({
              next: (data) => {
                totalDue += data.sommedue;
                remainingRequests--;

                if (remainingRequests === 0) {
                  this.totalAmountDue = totalDue; // ✅ Ne pas forcer à 0 si négatif
                }
              },
              error: (error) => {
                remainingRequests--;
                if (remainingRequests === 0) {
                  this.totalAmountDue = totalDue; // ✅ Ne pas forcer à 0 si négatif
                }
                if (error.status !== 404) { // ✅ Ne pas afficher d'erreur si la somme n'existe pas
                  this.notificationService.showError(error);
                }
              }
            });
          } else {
            remainingRequests--;
            if (remainingRequests === 0) {
              this.totalRevenueAllSessions = totalRevenue;
              this.totalAmountDue = totalDue; // ✅ Ne pas forcer à 0 si négatif
            }
          }
        });
      },
      error: (error) => {
      }
    });
  }

  resetBalance() {
    const idSession = Number(this.findSeller.value.idSession);
    const idVendeur = this.seller?.id;

    if (!idSession || !idVendeur) {
      this.notificationService.showError("Session ou vendeur invalide.");
      return;
    }

    this.sellerService.resetAmountDue(idSession, idVendeur).subscribe({
      next: () => {
        this.notificationService.showSuccess("Le solde du vendeur a été remis à zéro.");
        this.loadSellerDetails(idVendeur, idSession); // Recharger les infos après mise à zéro
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }



  get email() {
    return this.findSeller.get('email');
  }

  get idSession() {
    return this.findSeller.get('idSession');
  }

  onSubmit() {
    if (this.findSeller.invalid) {
      this.notificationService.showError('Veuillez entrer un email valide et sélectionner une session.');
      return;
    }

    const email = this.findSeller.value.email;
    const idSession = Number(this.findSeller.value.idSession);

    console.log('Recherche du vendeur:', email, 'pour la session', idSession);

    this.sellerService.getSellerByEmail(email).subscribe({
      next: (seller) => {
        this.seller = seller;
        this.notificationService.showSuccess('Vendeur trouvé');
        this.loadSellerDetails(seller.id, idSession);
        this.loadSellerGeneralStats(seller.id);
      },
      error: (error) => {
        console.error(error);
        this.seller = null;
        this.stock = [];
        this.soldGames = [];
        this.amountDue = 0;
        this.totalEarned = 0;
        this.stats = [];
        this.notificationService.showError(error);
      }
    });
  }

  loadSellerDetails(idVendeur: number, idSession: number) {
    // Charger le stock de jeux
    this.sellerService.getSellerStock(idSession, idVendeur).subscribe({
      next: (games) => {
        this.stock = games;
      },
      error: (error) => {
        this.stock = [];
        this.notificationService.showError(error);
      }
    });

    // Charger les jeux vendus
    this.sellerService.getSoldGames(idSession, idVendeur).subscribe({
      next: (games) => {
        this.soldGames = games;
      },
      error: (error) => {
        this.soldGames = [];
        this.notificationService.showError(error);
      }
    });

    // Charger la somme due
    this.sellerService.getAmountDue(idSession, idVendeur).subscribe({
      next: (data) => {
        this.amountDue = data.sommedue;
      },
      error: (error) => {
        this.amountDue = 0;
        this.notificationService.showError(error);
      }
    });

    // Charger l'argent généré
    this.sellerService.getTotalEarned(idSession, idVendeur).subscribe({
      next: (data) => {
        this.totalEarned = data.sommegenerée;
      },
      error: (error) => {
        this.totalEarned = 0;
        this.notificationService.showError(error);
      }
    });

    // Charger les statistiques
    this.sellerService.getSellerStats(idVendeur).subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        this.stats = [];
        this.notificationService.showError(error);
      }
    });
  }
}
