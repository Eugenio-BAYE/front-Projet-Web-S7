import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Manager } from 'src/app/models/manager';
import { ManagerService } from 'src/app/core/services/api/manager.service';

@Component({
  selector: 'app-manager-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './manager-create-page.component.html',
  styleUrl: './manager-create-page.component.css'
})
export class ManagerCreatePageComponent{

  managerCreateForm = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.email 
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    adresse: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      //Validators.minLength(6),
    ]),
  });

  constructor(
    private managerService: ManagerService,
    private notificationService: NotificationService,
  ) { }

  get nom() {
    return this.managerCreateForm.get('nom');
  }

  get email() {
    return this.managerCreateForm.get('email');
  }

  get telephone() {
    return this.managerCreateForm.get('telephone');
  }

  get adresse() {
    return this.managerCreateForm.get('adresse');
  }

  async onSubmit() {
    const manager: Manager = {
      nom: this.managerCreateForm.value.nom || '',
      email: this.managerCreateForm.value.email || '',
      telephone: this.managerCreateForm.value.telephone || '',
      adresse: this.managerCreateForm.value.adresse || '',
      motdepasse: this.managerCreateForm.value.password || '',
    };

    this.managerService.createManager(manager).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Manager created successfully');
      },
      error: (error) => {
        if(error.status === 400) {
          this.notificationService.showError(error);
          console.error("Bad Request: ",error); // TODO : Remove this line
        }
        else if(error.status === 500) {
          this.notificationService.showError(error);
          console.error("Internal Server Error: ",error); // TODO : Remove this line
        }
        else {
          //this.notificationService.showError(error); // TODO : Uncomment this line
          console.error("Unexpected Error: ",error); // TODO : Remove this line
        }
      }
    });
  }
}
