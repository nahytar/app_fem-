import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user.interface';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

usuario: any;

  constructor(public database: DatabaseService) { }

  ngOnInit() {
    this.database.getData().subscribe(usuario => {
      this.usuario = usuario;
      console.log(this.usuario);
    });
  }

}
