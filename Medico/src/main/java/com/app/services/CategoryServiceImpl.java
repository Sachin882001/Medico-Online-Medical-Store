package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Service;

import com.app.entities.Category;
import com.app.entities.Product;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.CategoryDTO;
import com.app.payloads.CategoryResponse;
import com.app.repositories.CategoryRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CategoryDTO createCategory(Category category) {
//		Checks if a category with the same name already exists in the repository.
//		Throws an exception if it does exist.
//		If not, saves the new category to the repository.
//		Converts the saved category to a DTO and returns it.
		Category savedCategory = categoryRepo.findByCategoryName(category.getCategoryName());
		
		if(savedCategory!=null) {
			throw new APIException("Category with the name" + category.getCategoryName() + "already exists !!!");	
		}
		
		savedCategory = categoryRepo.save(category);
		
		return modelMapper.map(savedCategory, CategoryDTO.class);
	}

	@Override
	public CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//		Defines sorting order and pagination details.
//		Retrieves a paginated list of categories from the repository.
//		Converts the retrieved categories to DTOs.
//		Populates a CategoryResponse object with the DTOs and pagination details.
//		Returns the CategoryResponse.
		Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();

		Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
		
		Page<Category> pageCategories = categoryRepo.findAll(pageDetails);

		List<Category> categories = pageCategories.getContent();

		if (categories.size() == 0) {
			throw new APIException("No category is created till now");
		}

		List<CategoryDTO> categoryDTOs = categories.stream()
				.map(category -> modelMapper.map(category, CategoryDTO.class)).collect(Collectors.toList());

		CategoryResponse categoryResponse = new CategoryResponse();
		
		categoryResponse.setContent(categoryDTOs);
		categoryResponse.setPageNumber(pageCategories.getNumber());
		categoryResponse.setPageSize(pageCategories.getSize());
		categoryResponse.setTotalElements(pageCategories.getTotalElements());
		categoryResponse.setTotalPages(pageCategories.getTotalPages());
		categoryResponse.setLastPage(pageCategories.isLast());
		
		return categoryResponse;
	}

	@Override
	public CategoryDTO updateCategory(Category category, Long categoryId) {
//		Retrieves the existing category by ID.
//		Updates the category ID of the provided category to ensure it matches the existing category.
//		Saves the updated category back to the repository.
//		Converts the saved category to a DTO and returns it
		Category savedCategory = categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

		category.setCategoryId(categoryId);

		savedCategory = categoryRepo.save(category);

		return modelMapper.map(savedCategory, CategoryDTO.class);
	}

	@Override
	public String deleteCategory(Long categoryId) {
//		Retrieves the category by ID.
//		Retrieves and deletes all products associated with the category.
//		Deletes the category itself.
//		Returns a confirmation message indicating the successful deletion.
		Category category = categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
		
		List<Product> products = category.getProducts();

		products.forEach(product -> {
			productService.deleteProduct(product.getProductId());
		});
		
		categoryRepo.delete(category);

		return "Category with categoryId: " + categoryId + " deleted successfully !!!";
	}

	

}
