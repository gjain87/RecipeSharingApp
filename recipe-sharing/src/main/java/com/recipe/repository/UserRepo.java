package com.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.recipe.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);

}
