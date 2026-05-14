package com.app.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Role;
import com.app.entities.User;
import com.app.exceptions.UserNotFoundException;
import com.app.payloads.LoginCredentials;
import com.app.payloads.UserDTO;
import com.app.security.JWTUtil;
import com.app.services.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerHandler(@Valid @RequestBody UserDTO user) throws UserNotFoundException {
		String encodedPass = passwordEncoder.encode(user.getPassword());

		user.setPassword(encodedPass);

		UserDTO userDTO = userService.registerUser(user);

		String token = jwtUtil.generateToken(userDTO.getEmail());

		return new ResponseEntity<Map<String, Object>>(Collections.singletonMap("jwt-token", token),
				HttpStatus.CREATED);
	}

	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/login")
	public Map<String, Object> loginHandler(@Valid @RequestBody LoginCredentials credentials) {

		UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(
				credentials.getEmail(), credentials.getPassword());

		authenticationManager.authenticate(authCredentials);
		
		Set<Role> roles = userService.verifyRole(credentials.getEmail());
		Role firstRole = roles.iterator().next();
		User user = userService.getUserInfo(credentials.getEmail());

		String token = jwtUtil.generateToken(credentials.getEmail());

		 Map<String, Object> response = new HashMap<>();
		    response.put("jwt-token", token);
		    response.put("role", firstRole.getRoleName());
		    response.put("user", user.getEmail());
		    response.put("firstName", user.getFirstName());
		    response.put("lastName", user.getLastName());

		    return response;
	}
}