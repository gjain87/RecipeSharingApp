package com.recipe.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.model.User;
import com.recipe.repository.UserRepo;
import com.recipe.service.userService;

@RestController
public class userController {
	
	@Autowired
	private userService userservice;
	
	@GetMapping("/api/users/profile")
	public User findUserByJwt(@RequestHeader("Authorization")String jwt) throws Exception
	{
		User user=userservice.findUserByJwt(jwt);
		return user;
	}
}
