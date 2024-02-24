import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from './services/Auth/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
     RouterOutlet,
     NavbarComponent,
     FooterComponent,
     HomePageComponent,
     AuthComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public authservice:AuthService){}
  title = 'recipe-sharing-ui';

  user:any=null;




  ngOnInit(){
    this.authservice.getUserProfile().subscribe({
      next:data=>console.log("Req user: ",data),
      error:error=>console.log("error: ",error)
    });
    this.authservice.authSubject.subscribe(
      (auth)=>{
        console.log("auth state: ",auth)
        this.user=auth.user
      }
    )

  }
}
