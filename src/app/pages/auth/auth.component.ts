import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(public authservice:AuthService){}

  isRegistered=false;

  registerForm=new FormGroup({
    name:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.email,Validators.required]),
    password:new FormControl("",[Validators.minLength(6)])
  })

  loginForm=new FormGroup({
    email:new FormControl("",[Validators.email,Validators.required]),
    password:new FormControl("",[Validators.required])
  })
 

 registerUser()
  {
    console.log("User registered: ",this.registerForm);
    this.authservice.register(this.registerForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem("jwt",response.jwt);
        this.authservice.getUserProfile().subscribe();
        console.log("Signup Success!!!",response);

      }
    })
  }

  loginUser()
  {
    console.log("User registered: ",this.loginUser);
    this.authservice.login(this.loginForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem("jwt",response.jwt);
        this.authservice.getUserProfile().subscribe();
        console.log("Login Success!!!",response);

      }
    })
  }

  togglepanel()
  {
    this.isRegistered=!this.isRegistered;
  }
}
