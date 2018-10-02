import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatExpansionModule, MatListModule } from '@angular/material';

// Librerias
import { Ng2Rut, RutValidator } from 'ng2-rut';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Servicios
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { DatabaseService } from './service/database.service';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterRedComponent } from './components/register-red/register-red.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'Registro',
    component: RegisterComponent,
  },
  {
    path: 'Home',
    component: MenuButtonComponent
  },
  {
    path: 'Perfil',
    component: ProfileComponent
  },
  {
    path: 'Red_Apoyo',
    component: RegisterRedComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuButtonComponent,
    ProfileComponent,
    RegisterRedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatListModule,
    ReactiveFormsModule,
    Ng2Rut
  ],
  providers: [RutValidator, AuthService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
