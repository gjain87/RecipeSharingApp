package com.recipe.service;

import com.recipe.model.User;

public interface userService {

	public User findUserById(Long userId)throws Exception;
	
	public User findUserByJwt(String jwt)throws Exception;
}
