package com.app;

import org.springframework.boot.SpringApplication;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.config.AppConstants;
import com.app.entities.Role;
import com.app.repositories.RoleRepo;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@SpringBootApplication
//@SecurityScheme: Configures a security scheme for the application using a bearer token, suitable for API documentation tools like OpenAPI (Swagger)
@SecurityScheme(name = "E-Commerce Application", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class MedicoApplication implements CommandLineRunner {
//	The class implements CommandLineRunner to run specific code at application startup.
	
	
//	Dependency Injection:
//	@Autowired: Injects the RoleRepo repository.
	@Autowired
	private RoleRepo roleRepo;
	
	

	public static void main(String[] args) {
		SpringApplication.run(MedicoApplication.class, args);
	}
	
//	Beans:
//	modelMapper method defines a ModelMapper bean for object mapping.
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
//		Role Initialization:
//		In the run method, two roles (ADMIN and USER) are created and saved to the database using roleRepo.
		try {
			Role adminRole = new Role();
			adminRole.setRoleId(AppConstants.ADMIN_ID);
			adminRole.setRoleName("ADMIN");

			Role userRole = new Role();
			userRole.setRoleId(AppConstants.USER_ID);
			userRole.setRoleName("USER");

			List<Role> roles = List.of(adminRole, userRole);

			List<Role> savedRoles = roleRepo.saveAll(roles);

			savedRoles.forEach(System.out::println);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
