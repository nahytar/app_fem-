
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessagingService } from "./service/messaging.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-fem';


  constructor() { }


  ngOnInit() {
  }
}
