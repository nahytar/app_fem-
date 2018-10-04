import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;
import { MessagingService } from "./service/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-fem';
  public query: string;
  message;

  constructor(private messagingService: MessagingService) {
    this.query = "";
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }
}
