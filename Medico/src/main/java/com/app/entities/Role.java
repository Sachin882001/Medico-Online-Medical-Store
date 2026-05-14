package com.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
//@Data: Lombok annotation to generate getters, setters, toString, equals, and hashCode methods.
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class Role {

	@Id
	private Long roleId;
	private String roleName;
}
