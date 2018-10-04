import { Component, OnInit } from '@angular/core';
import { MessagingService } from "src/app/service/messaging.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  message;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    const userId = 'user';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }
}


