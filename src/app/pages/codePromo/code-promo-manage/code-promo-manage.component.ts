import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CodePromoService} from 'src/app/core/services/api/code-promo.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CodePromo } from 'src/app/models/code-promo';


@Component({
  selector: 'app-code-promo-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './code-promo-manage.component.html',
  styleUrl: './code-promo-manage.component.css'
})
export class CodePromoManageComponent {
  codePromoForm: FormGroup;
  isCreating = true; // Par défaut, on affiche le formulaire
  codesPromo: CodePromo[] = [];
  displayedColumns: string[] = ['libelle', 'reductionPourcent'];

  constructor(
    private fb: FormBuilder,
    private codePromoService: CodePromoService,
    private notificationService: NotificationService
  ) {
    this.codePromoForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.minLength(3)]],
      reductionPourcent: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  toggleView() {
    this.isCreating = !this.isCreating;
    if (!this.isCreating) {
      this.loadCodesPromo();
    }
  }

  loadCodesPromo() {
    this.codePromoService.getAllCodesPromo().subscribe({
      next: (codes) => {
        this.codesPromo = codes;
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }

  onSubmit() {
    if (this.codePromoForm.invalid) {
      this.notificationService.showError('Veuillez remplir correctement tous les champs.');
      return;
    }

    const codePromo: CodePromo = this.codePromoForm.value;

    this.codePromoService.createCodePromo(codePromo).subscribe({
      next: () => {
        this.notificationService.showSuccess('Code promo créé avec succès !');
        this.codePromoForm.reset();
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }
}
