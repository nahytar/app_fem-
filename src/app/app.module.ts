import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatExpansionModule, MatListModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatIconModule} from '@angular/material/icon';
import { AsyncPipe } from '../../node_modules/@angular/common';


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
import { MessagingService } from './service/messaging.service';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterRedComponent } from './components/register-red/register-red.component';
import { MapComponent } from './components/map/map.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { GuiaComponent } from './components/guia/guia.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'Login',
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
    path: 'Perfil/Red-familiar',
    component: RegisterRedComponent
  },
  {
    path: 'Guia',
    component: GuiaComponent
  },
  {
    path: 'Map',
    component: MapComponent,
    data: environment.hereConfig
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuButtonComponent,
    ProfileComponent,
    RegisterRedComponent,
    MapComponent,
    NotificationsComponent,
    GuiaComponent
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
    MatIconModule,
    Ng2Rut,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,

  ],
  providers: [RutValidator, AuthService, DatabaseService, MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
