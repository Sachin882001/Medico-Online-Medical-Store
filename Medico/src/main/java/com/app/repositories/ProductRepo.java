package com.app.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Category;
import com.app.entities.Product;
import com.app.payloads.ProductDTO;
@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
	
	Page<Product> findByProductNameLike(String keyword, Pageable pagedetails);
	
	Page<Product> findByCategory(Category category, Pageable pageable);

	Optional<ProductDTO> findByProductId(Long id);

	
}
