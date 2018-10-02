import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PuntoSeguroComponent } from './components/punto-seguro/punto-seguro.component';
import { PublicServiceComponent } from './components/public-service/public-service.component';
import { RegisterRedComponent } from './components/register-red/register-red.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuButtonComponent,
    ProfileComponent,
    PuntoSeguroComponent,
    PublicServiceComponent,
    RegisterRedComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
