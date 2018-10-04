import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RutValidator } from 'ng2-rut';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpUserEvent } from '@angular/common/http';
import { DatabaseService } from '../../service/database.service';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usuario: User = {
    userid: '',
    name: '',
    photoUrl: '',
    phone: '',
    mail: '',
    latitud: '',
    longitud: '',
    nombreContact: '',
    contacto: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    private afs: AngularFirestore,
    private dataservice: DatabaseService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    public rutv: RutValidator
  ) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      rut: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      nombre: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      femele: ['', [Validators.requiredTrue]]
    });
  }

  onRegister() {
    this.authService.signUp(this.registerForm.value.email, this.registerForm.value.pass)
      .then(() => {
        this.router.navigate(['/Home']);
        this.afAuth.authState.subscribe(user => {
          if (user) {
          this.usuario.name = this.registerForm.value.nombre;
          this.usuario.phone = this.registerForm.value.phone;
          // this.usuario.photoURL = this.registerForm.value.photoURL;
          this.usuario.mail = this.registerForm.value.email;
          this.usuario.userid = this.authService.Uid;
          this.dataservice.addPublish(this.usuario);
          console.log(this.usuario);
        }
      }
    );
  });
  }
}
