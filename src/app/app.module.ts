import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './client/login/login.component';
import { RegisterComponent } from './client/register/register.component';
import { KoomerceComponent } from './client/koomerce/koomerce.component';
import { HomeComponent } from './client/home/home.component';
import { NavbarComponent } from './client/navbar/navbar.component';
import { FooterComponent } from './client/footer/footer.component';
import { DetailsComponent } from './client/details/details.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthComponent } from './admin/auth/auth.component';
import { ProduitsComponent } from './client/produits/produits.component';
import { PanierComponent } from './client/panier/panier.component';
import { PublierComponent } from './admin/publier/publier.component';
import { GestionComponent } from './admin/gestion/gestion.component';
import { FormsModule } from '@angular/forms';
import { CommandeComponent } from './admin/commande/commande.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    KoomerceComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DetailsComponent,
    AdminComponent,
    DashboardComponent,
    AuthComponent,
    ProduitsComponent,
    PanierComponent,
    PublierComponent,
    GestionComponent,
    CommandeComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
