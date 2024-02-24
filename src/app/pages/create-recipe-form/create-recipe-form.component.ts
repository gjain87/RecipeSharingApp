import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { RecipeService } from '../../services/Recipe/recipe.service';


@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatRadioModule
  ],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss'
})
export class CreateRecipeFormComponent {

  constructor(private recipeservice:RecipeService){}

  recipeItem:any={
    title:"",
    description:"",
    foodType:"",
    image:''

  }

  onSubmit()
  {
    console.log("Submit form: ",this.recipeItem);
    this.recipeservice.createRecipe(this.recipeItem).subscribe({
      next:data=>console.log("created recipe",data),
      error:error=>console.log(error)
    })
  }

}
