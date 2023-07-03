import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);

  message: string = '';

  constructor() {
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  async onSubmit() {
    const response = await this.userService.login(this.formulario.value);
    if(!response.error){
      localStorage.setItem('token_songs', response.token);
      this.router.navigate(['/songs']);
    }else{
      this.message = response.error;
    }
  }

}
