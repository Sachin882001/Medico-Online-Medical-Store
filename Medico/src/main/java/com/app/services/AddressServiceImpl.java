package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Address;
import com.app.entities.User;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.AddressDTO;
import com.app.repositories.AddressRepo;
import com.app.repositories.UserRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepo addressRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public AddressDTO createAddress(AddressDTO addressDTO) {
//		This method creates a new address if it doesn't already exist in the database.
//		It checks for an existing address with the same details.
//		If no existing address is found, it saves the new address and returns the corresponding AddressDTO.

		String country = addressDTO.getCountry();
		String state = addressDTO.getState();
		String city = addressDTO.getCity();
		String pincode = addressDTO.getPincode();
		String street = addressDTO.getStreet();
		String buildingName = addressDTO.getBuildingName();
		
		Address addressFromDB = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(country, state, city, pincode, street, buildingName);
		
		if(addressFromDB != null) {
			throw new APIException("Address already exists with addressId: " + addressFromDB.getAddressId());	
		}
		
		Address address = modelMapper.map(addressDTO, Address.class);
		
		Address savedAddress = addressRepo.save(address);
		
		return modelMapper.map(savedAddress, AddressDTO.class);
	}

	@Override
	public List<AddressDTO> getAddresses() {
//		This method retrieves all addresses from the database.
//		It converts each Address entity to an AddressDTO.
//		It returns a list of AddressDTO objects.
		List<Address> addresses = addressRepo.findAll();
		
		List<AddressDTO> addressDTOs = addresses.stream().map(address -> modelMapper.map(address, AddressDTO.class))
				.collect(Collectors.toList());
		return addressDTOs;
	}

	@Override
	public AddressDTO getAddress(Long addressId) {
//		This method retrieves an address by its ID from the database.
//		If the address is not found, it throws a ResourceNotFoundException.
//		It maps the Address entity to an AddressDTO and returns the AddressDTO.
		Address address = addressRepo.findById(addressId)
				.orElseThrow(()-> new ResourceNotFoundException("Address", "addressId", addressId));
		
		return modelMapper.map(address, AddressDTO.class);
	}

	@Override
	public AddressDTO updateAddress(Long addressId, Address address) {
//		Non-Duplicate Address: Updates the existing address with new details and returns the updated AddressDTO.
//		Duplicate Address: Updates associated users to refer to the 
//		existing address, deletes the original address, and returns the existing address as AddressDTO.
		Address addressFromDB = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(address.getCountry(), address.getState(), address.getCity(), address.getPincode(), address.getStreet(), address.getBuildingName());
		if(addressFromDB == null) {
			
			addressFromDB = addressRepo.findById(addressId)
					.orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
			
			addressFromDB.setCountry(address.getCountry());
			addressFromDB.setState(address.getState());
			addressFromDB.setCity(address.getCity());
			addressFromDB.setPincode(address.getPincode());
			addressFromDB.setStreet(address.getStreet());
			addressFromDB.setBuildingName(address.getBuildingName());
			
			Address updatedAddress = addressRepo.save(addressFromDB);
			return modelMapper.map(updatedAddress, AddressDTO.class);
			
		}
		else {
			List<User> users = userRepo.findByAddress(addressId);
			final Address a = addressFromDB;
			
			users.forEach(user -> user.getAddresses().add(a));
			
			deleteAddress(addressId);
		
		return modelMapper.map(addressFromDB, AddressDTO.class);}
	}

	@Override
	public String deleteAddress(Long addressId) {
//		Retrieves the address by its ID and checks its existence.
//		Removes the address from all associated users and updates the users.
//		Deletes the address from the repository.
//		Returns a success message with the ID of the deleted address.
		Address addressFroDB = addressRepo.findById(addressId)
				.orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
		
		List<User> users = userRepo.findByAddress(addressId);
		
		users.forEach(user -> {
			user.getAddresses().remove(addressFroDB);
			
			userRepo.save(user);
		});
		
		addressRepo.deleteById(addressId);
		
		return "Address deleted succesfully with addressId" + addressId;
	}

}
