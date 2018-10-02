import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RutValidator} from 'ng2-rut';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    public snackBar: MatSnackBar, 
    private router: Router, 
    public rv: RutValidator
  ) { 
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      // rut: ['', Validators.compose([Validators.required, rv])],
      emailRegister: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(9)])],
      femele: ['', Validators.compose([Validators.requiredTrue])]
    });
  }

  onRegister() {
    this.authService.signUp(this.registerForm.value.emailRegister, this.registerForm.value.pass)
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch(() => {
      this.snackBar.open('Error en tu Registro, ¡Intentemoslo otra vez!', null , {
        duration: 3000,
      });
    });
  }
}
