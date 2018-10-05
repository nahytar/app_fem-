import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user.interface';
import { Red } from '../../interface/red';
import { DatabaseService } from '../../service/database.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: any;
  red: any;
  item: any;
  redItem: any;

  constructor(public database: DatabaseService, public authservice: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.database.getData().subscribe(usuario => {
      this.usuario = usuario;
      const userp = usuario.filter(user => user.userid === this.authservice.Uid);
      userp.forEach(item => {
        this.item = item;
        console.log(item);
      });
    });

    this.database.getAgenda().subscribe(red => {
      this.red = red;
      const redUser = red.filter(user => user.redId === this.authservice.Uid);
      console.log(redUser);
      this.redItem = redUser;
    });
  }

  onLogout() {
    this.authservice.logOut()
      .then(() => {
        this.router.navigate(['/Login']);
      })
      .catch(() => {
      });
  }
}
