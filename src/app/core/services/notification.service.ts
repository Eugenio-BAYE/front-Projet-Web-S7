import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }


  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success']
    });
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['msg']
    });
  }

  /**
   * Displays an error message in the user interface.
   * 
   * This function takes an error object, extracts relevant information,
   * and shows an appropriate message to the user.
   *
   * @param {any} error - The error object containing details about the error.
   * @returns {void}
   */
  showError(error: any): void {
    function extractErrorMessage(error: any): string {
      let parsedError;
    
      // Vérifie si `error.error` est une chaîne de caractères et la retourne directement
      if (typeof error.error === 'string') {
        return error.error; // Par exemple, "Token invalide ou expiré."
      }
    
      // Tente de parser `error.error` si c'est une chaîne JSON
      if (typeof error.error === 'string') {
        try {
          parsedError = JSON.parse(error.error);
        } catch (e) {
          parsedError = null;
        }
      } else {
        parsedError = error.error;
      }
    
      if (error.message) {
        return error.message;
      }
      if (error.body) {
        return error.body;
      }
    
      // Accède aux messages dans `parsedError` si disponibles
      if (parsedError?.msg) {
        return parsedError.msg;
      } else if (parsedError?.errors && Array.isArray(parsedError.errors)) {
        // Si `errors` est un tableau (cas des erreurs de validation)
        return parsedError.errors.map((err: any) => err.msg).join(', ');
      } else if (error.msg) {
        return error.msg;
      } else if (error.error) {
        return error.error;
      } else {
        return 'An unexpected error occurred'; // Message par défaut
      }
    }
    


    const message = extractErrorMessage(error);
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}

