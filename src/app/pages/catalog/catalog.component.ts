import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from 'src/app/core/services/api/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Editor } from 'src/app/models/editor';
import { License } from 'src/app/models/license';
import { EditorService } from 'src/app/core/services/api/editor.service';
import { LicenseService } from 'src/app/core/services/api/license.service';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  searchForm: FormGroup;
  editeurControl = new FormControl('');
  licenceControl = new FormControl('');
  editeurs: Editor[] = [];
  licences: License[] = [];
  games: Game[] = [];

  filteredEditeurs!: Observable<Editor[]>;
  filteredLicences!: Observable<License[]>;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private editorService: EditorService,
    private licenseService: LicenseService,
    private notificationService: NotificationService
  ) {
    this.searchForm = this.fb.group({
      price_min: [''],
      price_max: [''],
      editeur: this.editeurControl,
      licence: this.licenceControl
    });
  }

  ngOnInit() {

    // Charger tous les jeux au départ
    this.searchGames();
  }

  private _filterEditeurs(value: string): Editor[] {
    const filterValue = value.toLowerCase();
    return this.editeurs.filter(editeur => editeur.nom.toLowerCase().includes(filterValue));
  }

  private _filterLicences(value: string): License[] {
    const filterValue = value.toLowerCase();
    return this.licences.filter(licence => licence.nom.toLowerCase().includes(filterValue));
  }

  searchGames() {
    const params = this.searchForm.value;

    this.gameService.searchGames(params).subscribe({
      next: (response) => {
        this.games = response.map(game => ({
          id: game.id,
          licence_id: game.licence_id,
          licence_name: game.licence_nom,
          prix: game.prix_min,
          statut: 'en vente',
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  } 
}
