import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl="http://localhost:8080";

  constructor(private http:HttpClient) { }

  recipeSubject=new BehaviorSubject<any>
  ({
    recipes:[],
    loading:false,
    newRecipe:null
  })
  private getHeaders():HttpHeaders{
    const token=localStorage.getItem("jwt")
    return new HttpHeaders({
      Authorization:`Bearer ${localStorage.getItem("jwt")}`

    })
  }


  getRecipes():Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/recipes`,{headers}).pipe(
      tap((recipes)=>{
        const currentState=this.recipeSubject.value;
        this.recipeSubject.next({...currentState,recipes})
      })
    );

  }

  createRecipe(recipe:any):Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.post(`${this.baseUrl}/api/recipes`,recipe,{headers}).pipe(
      tap((newrecipe)=>{
        const currentState=this.recipeSubject.value;
        this.recipeSubject.next({...currentState,recipes:
          [newrecipe,...currentState.recipes]
        });
      })
    );

  }

  updateRecipe(recipe:any):Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipes/${recipe.id}`,recipe,{headers}).pipe(
      tap((updatedrecipe:any)=>{
        const currentState=this.recipeSubject.value;
        const updatedrecipes=currentState.recipe.map
        ((item:any)=>item.id===updatedrecipe.id?updatedrecipe:item )
        this.recipeSubject.next({...currentState,recipes:updatedrecipes})
      })
    );

  }

  deleteRecipe(id:any):Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.delete(`${this.baseUrl}/api/recipes/${id}`,{headers}).pipe(
      tap((deletedrecipe:any)=>{
        const currentState=this.recipeSubject.value;
        const updatedrecipes=currentState.recipe.filter
        ((item:any)=>item.id!==id)
        this.recipeSubject.next({...currentState,recipes:updatedrecipes})
      })
    );

  }

  likeRecipe(id:any):Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipes/${id}/like`,{headers}).pipe(
      tap((updatedrecipe:any)=>{
        const currentState=this.recipeSubject.value;
        const updatedrecipes=currentState.recipe.map
        ((item:any)=>item.id===updatedrecipe.id?updatedrecipe:item )
        this.recipeSubject.next({...currentState,recipes:updatedrecipes})
      })
    );

  }






}


