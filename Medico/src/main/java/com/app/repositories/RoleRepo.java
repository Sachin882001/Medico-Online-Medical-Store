package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Role;

@Repository
//@Repository: Indicates that this interface is a Spring Data repository.(optional)
public interface RoleRepo extends JpaRepository<Role, Long> {

	
}
