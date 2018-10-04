
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessagingService } from "./service/messaging.service";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-fem';
  message;

  constructor(private messagingService: MessagingService, private afs: AngularFirestore) { }


  ngOnInit() {
    const userId = 'user';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }
}
