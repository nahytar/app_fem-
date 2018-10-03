import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RutValidator } from 'ng2-rut';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  uid: string;
  mail: string;
  // photoURL?: any;
  displayName?: string;
  phone: string;

  usersCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    private afs: AngularFirestore,
    public rv: RutValidator
  ) {
    this.createRegisterForm();
    this.usersCollection = afs.collection<any>('users');
    this.items = this.usersCollection.valueChanges();
  }

  ngOnInit() {
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      // rut: ['', Validators.compose([Validators.required, rv])],
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
        this.usersCollection.add({
          displayName: this.registerForm.value.nombre,
          phone: this.registerForm.value.phone,
          // photoURL: this.registerForm.value.photoURL,
          mail: this.registerForm.value.email,
        });
        console.log(this.registerForm.value);
        // .catch((err) => {
        //   console.log(err);
        // });

      });
    }
}
