import { Component, Input, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {  MatIconModule } from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeService } from '../../services/Recipe/recipe.service';


@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {


  @Input() recipe:any
  constructor(public dialog:MatDialog,private recipeservice:RecipeService){}

  handleOpenEditRecipeForm()
  {
    this.dialog.open(UpdateRecipeFormComponent,{
      data:this.recipe
    });
  }

  deleteRecipe()
  {
    this.recipeservice.deleteRecipe(this.recipe.id).subscribe();
    location.reload();
  }

  likeButton()
  {
    this.recipeservice.likeRecipe(this.recipe.id).subscribe();
  }

}
