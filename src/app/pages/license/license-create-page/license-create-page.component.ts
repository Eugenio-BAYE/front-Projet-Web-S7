import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EditorService } from 'src/app/core/services/api/editor.service';
import { LicenseService } from 'src/app/core/services/api/license.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Editor } from 'src/app/models/editor';
import { License } from 'src/app/models/license';

@Component({
  selector: 'app-license-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './license-create-page.component.html',
  styleUrl: './license-create-page.component.css'
})
export class LicenseCreatePageComponent implements OnInit {

  myForm!: FormGroup;
  editors: Editor[] = [];

  constructor(
    private fb: FormBuilder,
    private editorService: EditorService,
    private licenseService: LicenseService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      nom: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      selectedEditor: [null, Validators.required]  // Nouveau champ pour la sélection d'un éditeur
    });
    this.loadEditors();
  }

  loadEditors() {
    this.editorService.getEditors().subscribe({
      next: (data: Editor[]) => {
        this.editors = data;
        console.log(this.editors);
      },
      error: (error) => {
        this.notificationService.showError("Erreur lors du chargement des éditeurs");
      }
    });
  }

  get nom() {
    return this.myForm.get('nom');
  }

  get selectedEditor() {
    return this.myForm.get('selectedEditor');
  }

  async onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    var license : License = this.myForm.value;
    license.editeur_id = this.selectedEditor?.value;
    console.log(license);

    this.licenseService.createLicense(license).subscribe({
      next: () => {
        this.notificationService.showSuccess('Licence créée avec succès');
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }
}
