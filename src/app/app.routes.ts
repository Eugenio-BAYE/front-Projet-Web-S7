import { Routes } from '@angular/router';
import { PagetestComponent } from './pages/pagetest/pagetest.component'; // Importe ton composant

export const routes: Routes = [
  { path: 'pagetest', component: PagetestComponent }, // Ajoute la route pour la page de test
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Optionnel : redirection par défaut vers pagetest
  { path: '**', redirectTo: '/' }, // Optionnel : Gestion des routes non trouvées
];
