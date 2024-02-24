import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../create-recipe-form/create-recipe-form.component';
import { AuthService } from '../../services/Auth/auth.service';
import { RecipeService } from '../../services/Recipe/recipe.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(public dialog:MatDialog,public authservice:AuthService,private recipeservice:RecipeService){}

  recipes=[]

  OpenCreateRecipeForm()
  {
    this.dialog.open(CreateRecipeFormComponent);

  }

  ngOnInit(){
    this.authservice.getUserProfile();
    this.recipeservice.getRecipes().subscribe()
    this.recipeservice.recipeSubject.subscribe(
      (state)=>{
        this.recipes=state.recipes
      }
    )

  }

}
