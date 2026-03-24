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

const routes: Routes = [
  {path: '', redirectTo: '/koomerce', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'koomerce', component: KoomerceComponent,
    children:[
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path:'home', component: HomeComponent},
      {path:'details', component: DetailsComponent},
      {path: 'produits', component: ProduitsComponent},
      {path:'panier', component: PanierComponent}
    ]

  },
  {path:'auth', component: AuthComponent},
  {path:'admin', component: AdminComponent,
    children:[
      {path:'', redirectTo: 'dashboard', pathMatch:'full'},
      {path:'dashboard', component: DashboardComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
