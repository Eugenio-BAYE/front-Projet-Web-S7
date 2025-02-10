import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SessionService } from 'src/app/core/services/api/session.service';
import { Session } from 'src/app/models/session';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-session-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css'
})

export class SessionCreatePageComponent {

  sessionCreateForm = new FormGroup({
    date_debut: new FormControl('', [Validators.required]),
    date_fin: new FormControl('', [Validators.required]),
    valeur_commission: new FormControl('', [Validators.required, Validators.min(0)]),
    commission_en_pourcentage: new FormControl(false),
    valeur_frais_depot: new FormControl('', [Validators.required, Validators.min(0)]),
    frais_depot_en_pourcentage: new FormControl(false),
  });

  constructor(
    private sessionService: SessionService,
    private notificationService: NotificationService
  ) { }

  async onSubmit() {
    if (this.sessionCreateForm.invalid) {
      return;
    }
  
    const formValue = this.sessionCreateForm.value;
  
    const session: Session = {
      date_debut: formValue.date_debut || '',
      date_fin: formValue.date_fin || '',
      valeur_commission: parseFloat(formValue.valeur_commission || '0'),
      commission_en_pourcentage: formValue.commission_en_pourcentage || false,
      valeur_frais_depot: parseFloat(formValue.valeur_frais_depot || '0'),
      frais_depot_en_pourcentage: formValue.frais_depot_en_pourcentage || false,
    };
  
    this.sessionService.createSession(session).subscribe({
      next: () => {
        this.notificationService.showSuccess('Session créée avec succès.');
        this.sessionCreateForm.reset(); // Réinitialiser le formulaire après la création
      },
      error: (error) => {
        this.notificationService.showError('Une erreur est survenue lors de la création de la session.');
        console.error("Erreur : ", error); // TODO : Retirer ce log en production
      }
    });
  }

  get date_debut() {
    return this.sessionCreateForm.get('date_debut');
  }

  get date_fin() {
    return this.sessionCreateForm.get('date_fin');
  }

  get valeur_commission() {
    return this.sessionCreateForm.get('valeur_commission');
  }

  get commission_en_pourcentage() {
    return this.sessionCreateForm.get('commission_en_pourcentage');
  }

  get valeur_frais_depot() {
    return this.sessionCreateForm.get('valeur_frais_depot');
  }

  get frais_depot_en_pourcentage() {
    return this.sessionCreateForm.get('frais_depot_en_pourcentage');
  }
}