import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userType: ['admin'],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get userType() {
    return this.loginForm.get('userType');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, userType } = this.loginForm.value;

    this.authService.login(email, password, userType).subscribe({
      next: (response) => {
        console.log(`Login successful as ${userType}`);
        console.log(response);
        this.router.navigate(['/']);
        this.notificationService.showSuccess('Logged in successfully');
      },
      error: (error) => {
        console.error(`Login failed as ${userType}:`, error);
        this.notificationService.showError(error);
        // TODO: Afficher un message d'erreur à l'utilisateur
      }
    });

  }
}
