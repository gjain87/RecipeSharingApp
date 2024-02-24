package com.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recipe.model.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {

}
