import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public snackBar: MatSnackBar, private router: Router) {
    this.creatorAuthForm();
  }

  ngOnInit() {
  }

  creatorAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onLogin() {
    this.authService.login(this.authForm.value.email, this.authForm.value.password)
      .then(() => {
        this.router.navigate(['/Home']);
      })
      .catch(() => {
        this.snackBar.open('Error en inicio de sesión, ¡Intentemoslo otra vez!'
          , null
          , {
            duration: 4000
          });
      });
  }
}
