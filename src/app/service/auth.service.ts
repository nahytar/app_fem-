import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { MAT_CHECKBOX_REQUIRED_VALIDATOR } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  Uid: string;

  constructor(private firebaseAuth: AngularFireAuth, private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
      this.uploadUserToFirestore();
  }

  signUp(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.firebaseAuth.auth
      .signOut();
  }

  uploadUserToFirestore() {
    this.afAuth.authState.subscribe(user => {
      if (user) { this.Uid = user.uid;
        console.log(this.Uid);
      }
    }
    );
  }
}
