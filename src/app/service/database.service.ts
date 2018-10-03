import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  usersCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor( private afs: AngularFirestore, private authService: AuthService) {
  this.usersCollection = afs.collection<User>('users');
  this.user = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getData() {
    return this.user;
  }

  addPublish(userData: User) {
    // console.log('se publicó');
    this.usersCollection.add(userData);
  }
}
