import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { RegisterComponent } from './client/register/register.component';
import { KoomerceComponent } from './client/koomerce/koomerce.component';
import { HomeComponent } from './client/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/koomerce', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'koomerce', component: KoomerceComponent,
    children:[
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path:'home', component: HomeComponent}
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
