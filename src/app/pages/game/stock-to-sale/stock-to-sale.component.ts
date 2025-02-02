import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GameService } from 'src/app/core/services/api/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Game } from 'src/app/models/game';
import { License } from 'src/app/models/license';
import { LicenseService } from 'src/app/core/services/api/license.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-stock-to-sale',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './stock-to-sale.component.html',
  styleUrl: './stock-to-sale.component.css'
})
export class StockToSaleComponent implements OnInit {
  jeux: Game[] = [];
  displayedColumns: string[] = ['id', 'licence', 'prix', 'statut', 'actions'];
  licenseNames: Map<number, string> = new Map(); // Stocker les noms des licences pour éviter des requêtes répétées

  constructor(
    private gameService: GameService,
    private licenseService: LicenseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.jeuxPasEnRayon().subscribe({
      next: (data: Game[]) => {
        this.jeux = data;
        this.loadLicenseNames(); // Charger les noms des licences après avoir récupéré les jeux
      },
      error: (error) => {
        this.notificationService.showError('Erreur lors du chargement des jeux.');
      }
    });
  }

  loadLicenseNames() {
    this.jeux.forEach((jeu) => {
      if (!this.licenseNames.has(jeu.licence_id)) {
        this.licenseService.getLicense(jeu.licence_id).pipe(
          tap((license) => this.licenseNames.set(jeu.licence_id, license.nom)),
          catchError(() => {
            this.licenseNames.set(jeu.licence_id, 'Licence inconnue');
            return of(null);
          })
        ).subscribe();
      }
    });
  }

  getLicenseName(licenceId: number): string {
    return this.licenseNames.get(licenceId) || 'Chargement...';
  }

  mettreEnRayon(jeu: Game) {
    this.notificationService.showSuccess(`Jeu ID ${jeu.id} mis en rayon.`);
  }
}
