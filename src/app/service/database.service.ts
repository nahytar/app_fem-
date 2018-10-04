import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface
import { User } from '../interface/user.interface';
import {Red } from '../interface/red';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  usersCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  redCollection: AngularFirestoreCollection<Red>;
  red: Observable<Red[]>;

  constructor( private afs: AngularFirestore, private authService: AuthService) {
  this.usersCollection = afs.collection<User>('users');
  this.user = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    //  this.redCollection = afs.collection('users').doc().collection('red').valueChanges;
  }

  getData() {
    return this.user;
  }

  addPublish(usuario: User) {
    this.usersCollection.add(usuario);
  }

  editContac(usuario: User) {
    this.usersCollection.ref.doc(usuario.userid).update(usuario);
  }

}
