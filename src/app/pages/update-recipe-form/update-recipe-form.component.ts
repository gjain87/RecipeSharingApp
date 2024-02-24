import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/Recipe/recipe.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatRadioButton,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './update-recipe-form.component.html',
  styleUrl: './update-recipe-form.component.scss'
})
export class UpdateRecipeFormComponent {

  
  recipeItem:any={
    title:"",
    description:"",
    foodType:"",
    image:''

  }
constructor(@Inject (MAT_DIALOG_DATA) public recipe:any ,private recipeservice:RecipeService){}
  onSubmit()
  {
    this.recipeservice.updateRecipe(this.recipeItem).subscribe({
      next:data=>console.log(data),
      error:error=>console.log(error)
    });
    console.log("Submit form: ",this.recipeItem);
    
  }

  ngOnInit()
  {
    this.recipeItem=this.recipe
  }
}
