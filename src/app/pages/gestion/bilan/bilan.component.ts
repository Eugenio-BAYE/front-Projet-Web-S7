import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/core/services/api/gestion.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-bilan',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './bilan.component.html',
  styleUrl: './bilan.component.css'
})
export class BilanComponent {
  session: any = null;
  bilan: any = null;
  displayedColumns: string[] = ['totalGenere', 'totalDu', 'argentAdmin'];


  constructor(
    private gestionService : GestionService ,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadBilan();
  }

  loadBilan() {
    this.gestionService.getBilan().subscribe({
      next: (data) => {
        if (data && data.session && data.bilan) {
          this.session = data.session;
          this.bilan = {
            totalGenereParVendeurs: data.bilan.total_generé_par_vendeurs,
            totalDuAuxVendeurs: data.bilan.total_dû_aux_vendeurs,
            argentGenerePourAdmin: data.bilan.argent_généré_pour_admin
          };
        } else {
          this.notificationService.showError('Aucune donnée disponible.');
        }
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }
  

}
