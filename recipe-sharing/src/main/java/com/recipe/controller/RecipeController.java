package com.recipe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.model.Recipe;
import com.recipe.model.User;
import com.recipe.service.recipeService;
import com.recipe.service.userService;

@RequestMapping("/api/recipes")
@RestController
public class RecipeController {
	
	@Autowired
	private recipeService recipeservice;
	
	@Autowired
	private userService userservice;

	@PostMapping()
	public Recipe createRecipe(@RequestBody Recipe recipe, @RequestHeader("Authorization")String jwt) throws Exception
	{
		
		User user = userservice.findUserByJwt(jwt);
		Recipe createdRecipe = recipeservice.createRecipe(recipe, user);
		return createdRecipe;
	}
	
	@GetMapping()
	public List<Recipe> getallRecipe()
	{
		
		List<Recipe> allRecipe = recipeservice.findAllRecipe(); 
		return allRecipe;
	}
	
	@DeleteMapping("/{recipeId}")
	public String deleteRecipe(@PathVariable("recipeId")Long id) throws Exception
	{
		
		 recipeservice.deletRecipe(id);
		return "Recipe Deleted Successfully!!";
	}
	
	@PutMapping("/{recipeId}")
	public Recipe updateRecipe(@RequestBody Recipe recipe, @PathVariable("recipeId")Long id) throws Exception
	{
		Recipe updatedRecipe = recipeservice.updateRecipe(recipe, id);
		return updatedRecipe;
	}
	
	@PutMapping("/{recipeId}/like")
	public Recipe likeRecipe(@PathVariable("recipeId")Long recipeId, @RequestHeader("Authorization")String jwt) throws Exception
	{
		User user = userservice.findUserByJwt(jwt);
		Recipe likeRecipe = recipeservice.likeRecipe(recipeId, user);
		return likeRecipe;
	}
	
	
	
	
}
