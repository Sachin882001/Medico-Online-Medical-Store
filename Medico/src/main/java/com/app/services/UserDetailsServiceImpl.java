package com.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.app.config.UserInfoConfig;
import com.app.entities.User;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repositories.UserRepo;
@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Retrieves a user based on the username (email).
//		Converts the user to a UserInfoConfig object if found.
//		Throws an exception if the user is not found.
		Optional<User> user = userRepo.findByEmail(username);
		
		return user.map(UserInfoConfig::new).orElseThrow(() -> new ResourceNotFoundException("User", "email", username));
	}
}
