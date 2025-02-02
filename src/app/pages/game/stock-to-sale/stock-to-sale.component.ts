import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GameService } from 'src/app/core/services/api/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Game } from 'src/app/models/game';

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
  displayedColumns: string[] = ['id', 'licence_id', 'prix', 'statut', 'depot_id', 'actions'];

  constructor(
    private gameService: GameService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.jeuxPasEnRayon().subscribe({
      next: (data: Game[]) => {
        this.jeux = data;
      },
      error: (error) => {
        this.notificationService.showError('Erreur lors du chargement des jeux.');
      }
    });
  }

  mettreEnRayon(jeu: Game) {
    this.gameService.mettreEnRayon([jeu]).subscribe({
      next: (data: Game[]) => {
        this.jeux = this.jeux.filter(j => j.id !== jeu.id);
        this.notificationService.showSuccess('Le jeu a bien été mis en rayon.');
      },
      error: (error) => {
        this.notificationService.showError('Erreur lors de la mise en rayon du jeu.');
      }
    });
  }
}
