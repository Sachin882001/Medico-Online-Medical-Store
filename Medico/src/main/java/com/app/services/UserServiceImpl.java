package com.app.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.config.AppConstants;
import com.app.entities.Address;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.AddressDTO;
import com.app.payloads.UserDTO;
import com.app.payloads.UserResponse;
import com.app.repositories.AddressRepo;
import com.app.repositories.RoleRepo;
import com.app.repositories.UserRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        // Register user without Cart-related functionality
        try {
            // Map UserDTO to User entity
            User user = modelMapper.map(userDTO, User.class);

            // Assign default role to the user
            Role role = roleRepo.findById(AppConstants.USER_ID).orElseThrow(
                () -> new ResourceNotFoundException("Role", "ID", AppConstants.USER_ID)
            );
            user.getRoles().add(role);

            // Set default or provided address details
            String country = (userDTO.getAddress() != null && userDTO.getAddress().getCountry() != null) 
                    ? userDTO.getAddress().getCountry() 
                    : "DefaultCountry";
            String state = (userDTO.getAddress() != null && userDTO.getAddress().getState() != null) 
                    ? userDTO.getAddress().getState() 
                    : "DefaultState";
            String city = (userDTO.getAddress() != null && userDTO.getAddress().getCity() != null) 
                    ? userDTO.getAddress().getCity() 
                    : "DefaultCity";
            String pincode = (userDTO.getAddress() != null && userDTO.getAddress().getPincode() != null) 
                    ? userDTO.getAddress().getPincode() 
                    : "000000";
            String street = (userDTO.getAddress() != null && userDTO.getAddress().getStreet() != null) 
                    ? userDTO.getAddress().getStreet() 
                    : "DefaultStreet";
            String buildingName = (userDTO.getAddress() != null && userDTO.getAddress().getBuildingName() != null) 
                    ? userDTO.getAddress().getBuildingName() 
                    : "DefaultBuilding";

            // Check if address exists, otherwise create a new one
            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(country, state,
                city, pincode, street, buildingName);

            if (address == null) {
                address = new Address(country, state, city, pincode, street, buildingName);
                address = addressRepo.save(address);
            }

            user.setAddresses(List.of(address));

            // Save user entity
            User registeredUser = userRepo.save(user);

            // Map back to DTO and set the address
            userDTO = modelMapper.map(registeredUser, UserDTO.class);
            userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));

            return userDTO;
        } catch (DataIntegrityViolationException e) {
            throw new APIException("User already exists with emailId: " + userDTO.getEmail());
        }
    }

    @Override
    public UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Fetch and paginate users without Cart-related logic
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<User> pageUsers = userRepo.findAll(pageDetails);

        List<User> users = pageUsers.getContent();

        if (users.isEmpty()) {
            throw new APIException("No User exists !!!");
        }

        // Map users to DTOs
        List<UserDTO> userDTOs = users.stream().map(user -> {
            UserDTO dto = modelMapper.map(user, UserDTO.class);

            if (!user.getAddresses().isEmpty()) {
                dto.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
            }

            // Removed cart-related functionality

            return dto;
        }).collect(Collectors.toList());

        // Build the response
        UserResponse userResponse = new UserResponse();
        userResponse.setContent(userDTOs);
        userResponse.setPageNumber(pageUsers.getNumber());
        userResponse.setPageSize(pageUsers.getSize());
        userResponse.setTotalElements(pageUsers.getTotalElements());
        userResponse.setTotalPages(pageUsers.getTotalPages());
        userResponse.setLastPage(pageUsers.isLast());

        return userResponse;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        // Fetch user by ID
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        // Map user entity to DTO
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        // Map address
        userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));

        // Removed cart-related logic

        return userDTO;
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        // Update user details without cart-related logic
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        String encodedPass = passwordEncoder.encode(userDTO.getPassword());

        // Update fields
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setEmail(userDTO.getEmail());
        user.setPassword(encodedPass);

        // Handle address update
        if (userDTO.getAddress() != null) {
            String country = userDTO.getAddress().getCountry();
            String state = userDTO.getAddress().getState();
            String city = userDTO.getAddress().getCity();
            String pincode = userDTO.getAddress().getPincode();
            String street = userDTO.getAddress().getStreet();
            String buildingName = userDTO.getAddress().getBuildingName();

            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(country, state,
                    city, pincode, street, buildingName);

            if (address == null) {
                address = new Address(country, state, city, pincode, street, buildingName);
                address = addressRepo.save(address);
            }

            user.setAddresses(List.of(address));
        }

        // Map updated user to DTO
        userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));

        // Removed cart-related functionality

        return userDTO;
    }

    @Override
    public String deleteUser(Long userId) {
        // Delete user without Cart-related logic
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        // Removed cart-related deletion logic

        userRepo.delete(user);

        return "User with userId " + userId + " deleted successfully!!!";
    }

    public Set<Role> verifyRole(String email) {
        // Verify roles
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Email", email));
        return user.getRoles();
    }

    public User getUserInfo(String email) {
        // Get user info by email
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Email", email));
        return user;
    }
}
