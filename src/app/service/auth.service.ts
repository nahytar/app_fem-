import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument,  AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth, private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
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
}
