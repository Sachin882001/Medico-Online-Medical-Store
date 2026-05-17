package com.app.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@SecurityRequirement(name = "E-Commerce Application")
@Tag(name = "Authentication APIs", description = "Handles user registration and login")
public class AuthController {

	private static final Logger logger =
			LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerHandler(
			@Valid @RequestBody UserDTO userDTO)
			throws UserNotFoundException {

		logger.info("Register request received for user: {}", userDTO.getEmail());

		// Encode password before saving
		String encodedPass = passwordEncoder.encode(userDTO.getPassword());

		userDTO.setPassword(encodedPass);

		// Save user
		UserDTO savedUser = userService.registerUser(userDTO);

		logger.info("User registered successfully: {}", savedUser.getEmail());

		// Generate JWT token
		String token = jwtUtil.generateToken(savedUser.getEmail());

		return new ResponseEntity<>(
				Collections.singletonMap("jwt-token", token),
				HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginHandler(
			@Valid @RequestBody LoginCredentials credentials) {

		logger.info("Login request received for user: {}", credentials.getEmail());

		UsernamePasswordAuthenticationToken authCredentials =
				new UsernamePasswordAuthenticationToken(
						credentials.getEmail(),
						credentials.getPassword());

		// Authenticate user
		authenticationManager.authenticate(authCredentials);

		logger.info("User authenticated successfully: {}", credentials.getEmail());

		// Fetch user roles
		Set<Role> roles = userService.verifyRole(credentials.getEmail());

		final Role firstRole = roles.iterator().next();

		// Fetch user details
		User user = userService.getUserInfo(credentials.getEmail());

		// Generate JWT token
		String token = jwtUtil.generateToken(credentials.getEmail());

		Map<String, Object> authResponse = new HashMap<>();

		authResponse.put("jwt-token", token);
		authResponse.put("role", firstRole.getRoleName());
		authResponse.put("user", user.getEmail());
		authResponse.put("firstName", user.getFirstName());
		authResponse.put("lastName", user.getLastName());

		logger.info("Login successful for user: {}", credentials.getEmail());

		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}
}
