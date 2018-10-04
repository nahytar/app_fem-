import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { DatabaseService } from '../../service/database.service';
import { User } from '../../interface/user.interface';
import { Red } from '../../interface/red';

@Component({
  selector: 'app-register-red',
  templateUrl: './register-red.component.html',
  styleUrls: ['./register-red.component.css']
})
export class RegisterRedComponent implements OnInit {
  registerRedForm: FormGroup;

  red: Red = {
    contac: '',
    emailContac: '',
    redId: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private afs: AngularFirestore,
    private dataservice: DatabaseService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { this.creatorRegisterRedForm(); }

  ngOnInit() {
  }

  creatorRegisterRedForm() {
    this.registerRedForm = this.formBuilder.group({
      emailContac: ['', Validators.compose([Validators.required, Validators.email])],
      contac: ['', Validators.compose([Validators.required])]
    });
    console.log(this.registerRedForm.value);
  }

  addContac() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.red.contac = this.registerRedForm.value.contac;
        this.red.emailContac = this.registerRedForm.value.emailContac;
        this.red.redId = this.authService.Uid;
        this.router.navigate(['/Perfil']);
        this.dataservice.addAgenda(this.red);
      }
    });
  }
}
