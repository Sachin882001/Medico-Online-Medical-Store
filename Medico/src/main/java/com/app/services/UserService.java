package com.app.services;

import java.util.Set;

import com.app.entities.Role;
import com.app.entities.User;
import com.app.payloads.UserDTO;
import com.app.payloads.UserResponse;

public interface UserService {
	UserDTO registerUser(UserDTO userDTO);
	
	UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
	
	UserDTO getUserById(Long userId);
	
	UserDTO updateUser(Long userId, UserDTO userDTO);
	
	String deleteUser(Long userId);
	
	public Set<Role> verifyRole(String email);
	
	User getUserInfo(String email);

}
