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
  redDoc: AngularFirestoreDocument<Red>;

  constructor( private afs: AngularFirestore, private authService: AuthService) {
  this.usersCollection = afs.collection<User>('users');
  this.user = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  this.redCollection = afs.collection<Red>('red');
  this.red = this.redCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Red;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  }

  getData() {
    return this.user;
  }

  getAgenda() {
    return this.red;
  }

  addPublish(usuario: User) {
    this.usersCollection.add(usuario);
  }

  addAgenda(red: Red) {
    this.redCollection.add(red);
  }
}
