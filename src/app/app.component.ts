<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;
import { MessagingService } from "./service/messaging.service";
>>>>>>> 98ef04be00ddf25e11507d95951216cc1ce65284

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-fem';
<<<<<<< HEAD

  constructor() { }
=======
  public query: string;
  message;

  constructor(private messagingService: MessagingService) {
    this.query = "";
  }
>>>>>>> 98ef04be00ddf25e11507d95951216cc1ce65284

  ngOnInit() {
  }
}
