package com.recipe.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.model.Recipe;
import com.recipe.model.User;
import com.recipe.repository.RecipeRepo;

@Service
public class recipeServiceImplementation implements recipeService {
	
	@Autowired
	private RecipeRepo reciperepo;

	@Override
	public Recipe createRecipe(Recipe recipe, User user) {
		
		Recipe newrecipe=new Recipe();
		newrecipe.setTitle(recipe.getTitle());
		newrecipe.setImage(recipe.getImage());
		newrecipe.setDescription(recipe.getDescription());
		newrecipe.setUser(user);
		newrecipe.setCreatedAt(LocalDateTime.now());
		newrecipe.setVegetarian(recipe.isVegetarian());
		return reciperepo.save(newrecipe);
	}

	@Override
	public Recipe findrRecipeById(Long id) throws Exception {
		Optional<Recipe> optRecipe = reciperepo.findById(id);
		if(optRecipe.isPresent())
		{
			return optRecipe.get();
		}
		throw new Exception("Recipe Not found with id: "+id);
	}

	@Override
	public void deletRecipe(Long id) throws Exception {
		findrRecipeById(id);
		reciperepo.deleteById(id);
		
	}

	@Override
	public Recipe updateRecipe(Recipe recipe, Long id) throws Exception {
		Recipe oldrecipe = findrRecipeById(id);
		if(recipe.getTitle()!=null)
			oldrecipe.setTitle(recipe.getTitle());
		if(recipe.getImage()!=null)
			oldrecipe.setImage(recipe.getImage());
		if(recipe.getDescription()!=null)
			oldrecipe.setDescription(recipe.getDescription());
		
		return reciperepo.save(oldrecipe);
	}

	@Override
	public List<Recipe> findAllRecipe() {
		return reciperepo.findAll();
	}

	@Override
	public Recipe likeRecipe(Long recipeId, User user) throws Exception {
		Recipe recipe = findrRecipeById(recipeId);
		if(recipe.getLikes().contains(user.getId()))
		{
			recipe.getLikes().remove(user.getId());
		}
		else
			recipe.getLikes().add(user.getId());
		
		reciperepo.save(recipe);
		
		return recipe;
	}
	
	
	

}
