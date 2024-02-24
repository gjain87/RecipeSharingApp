  package com.recipe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.config.jwtProvider;
import com.recipe.model.User;
import com.recipe.repository.UserRepo;
import com.recipe.request.loginRequest;
import com.recipe.response.AuthResponse;
import com.recipe.service.customUserDetailService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepo userrepo;
	@Autowired
	private customUserDetailService customuserdetails;
	@Autowired
	private jwtProvider jwtprovider;
	@Autowired
	private PasswordEncoder passwordencoder;
	
	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception
	{
		String email=user.getEmail();
		String password=user.getPassword();
		String name=user.getName();
		
		User isExist=userrepo.findByEmail(email);
		if(isExist!=null)
		{
			throw new Exception("Email already Taken...");
		}
		User createdUser=new User();
		createdUser.setEmail(email);
		createdUser.setPassword(passwordencoder.encode(password));
		createdUser.setName(name);
		
		User saved = userrepo.save(createdUser); 
		Authentication authentication=new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token=jwtprovider.generateToken(authentication);
		
		AuthResponse response=new AuthResponse();
		response.setJwt(token);
		response.setMessage("Success!!");
		
		return response;
		
	}
	
	@PostMapping("/signin")
	public AuthResponse signinHandler(@RequestBody loginRequest login)
	{
		String username=login.getEmail();
		String password=login.getPassword();
		
		Authentication authentication=authenticate(username,password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token=jwtprovider.generateToken(authentication);
		
		AuthResponse response=new AuthResponse();
		response.setJwt(token);
		response.setMessage("Success signing in!!");
		
		return response;
		
		
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userdetail=customuserdetails.loadUserByUsername(username);
		if(userdetail==null)
		{
			throw new BadCredentialsException("User not Found...");
			
		}
		if(!passwordencoder.matches(password, userdetail.getPassword()))
		{
			throw new BadCredentialsException("Invalid password...");
		}
		
		
		return new UsernamePasswordAuthenticationToken(userdetail,null,userdetail.getAuthorities());
	}
	
	

}
