import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { RegisterComponent } from './client/register/register.component';
import { KoomerceComponent } from './client/koomerce/koomerce.component';
import { HomeComponent } from './client/home/home.component';
import { DetailsComponent } from './client/details/details.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthComponent } from './admin/auth/auth.component';
import { ProduitsComponent } from './client/produits/produits.component';
import { PanierComponent } from './client/panier/panier.component';
import { PublierComponent } from './admin/publier/publier.component';
import { GestionComponent } from './admin/gestion/gestion.component';
import { CommandeComponent } from './admin/commande/commande.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './client/resetpassword/resetpassword.component';
import { ProfilComponent } from './client/profil/profil.component';
import { DeletecountComponent } from './client/deletecount/deletecount.component';
import { ConfidentialiteComponent } from './client/confidentialite/confidentialite.component';
import { ContactComponent } from './client/contact/contact.component';
import { MessageComponent } from './admin/message/message.component';
import { VoircommandeComponent } from './admin/voircommande/voircommande.component';

const routes: Routes = [
  {path: '', redirectTo: '/koomerce', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'register', component: RegisterComponent},
  {path:'reset-password/:token', component: ResetpasswordComponent},
  {path:'koomerce', component: KoomerceComponent,
    children:[
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path:'home', component: HomeComponent},
      {path:'details/:id', component: DetailsComponent},
      {path: 'produits', component: ProduitsComponent},
      {path:'panier', component: PanierComponent},
      {path:'profil', component: ProfilComponent},
      {path:'deletecount', component: DeletecountComponent},
      {path:'confidentialite', component: ConfidentialiteComponent},
      {path:'contact', component: ContactComponent}
    ]

  },
  {path:'auth', component: AuthComponent},
  {path:'admin', component: AdminComponent,
    children:[
      {path:'', redirectTo: 'dashboard', pathMatch:'full'},
      {path:'dashboard', component: DashboardComponent},
      {path:'publier', component: PublierComponent},
      {path:'gestion', component: GestionComponent},
      {path:'commande', component: CommandeComponent},
      {path:'messages', component: MessageComponent},
      {path:'voircommande/:id', component: VoircommandeComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
