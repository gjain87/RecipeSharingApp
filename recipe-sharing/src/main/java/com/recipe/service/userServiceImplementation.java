package com.recipe.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.config.jwtProvider;
import com.recipe.model.User;
import com.recipe.repository.UserRepo;

@Service
public class userServiceImplementation implements userService {
	
	@Autowired
	private UserRepo userrepo;
	
	@Autowired
	private jwtProvider jwtprovider;

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> user = userrepo.findById(userId);
		
		if(user.isPresent())
		{
			return user.get();
		}
		throw new Exception("User not present!!");
	}

	@Override
	public User findUserByJwt(String jwt) throws Exception {
		String email=jwtprovider.getEmailFromToken(jwt);
		if(email==null)
		{
			throw new Exception("Provide Jwt Token");
		}
		User user=userrepo.findByEmail(email);
		if(user==null)
		{
			throw new Exception("User not found with email "+email);
		}
		return user;
	}

}
