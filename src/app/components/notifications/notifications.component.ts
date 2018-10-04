import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../service/database.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

 usuario: any;

  constructor(public database: DatabaseService) { }

  ngOnInit() {
    this.database.getData().subscribe(usuario => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }
}


