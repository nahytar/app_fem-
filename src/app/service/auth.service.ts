import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument,  AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

interface User {
  uid: string;
  email: string;
  photoURL?: any;
  displayName?: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  usersCollection: AngularFirestoreCollection<any>;

  constructor(private firebaseAuth: AngularFireAuth, private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
      this.user = firebaseAuth.authState;
      this.usersCollection = afs.collection<any>('info');
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
      if (user) {
        console.log(user);
        const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phone: user.phoneNumber
      };
      return this.afs.collection(`users`).doc(`${user.uid}`).set(data);
    }
    });
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phone: user.phone
    };
    return userRef.set(data);
  }
}
