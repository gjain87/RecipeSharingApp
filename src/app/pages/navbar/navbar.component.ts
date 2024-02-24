import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user:any=null;
  constructor(public authservice:AuthService,private router:Router){}
  ngOnInit(){
    this.authservice.authSubject.subscribe(
      (auth)=>{
        console.log("auth state: ",auth)
        this.user=auth.user
      }
    )

  }

  logout()
  {
    this.authservice.logout();
  }

}
