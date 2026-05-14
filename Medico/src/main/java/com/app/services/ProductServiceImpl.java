package com.app.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Category;
import com.app.entities.Product;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.ProductDTO;
import com.app.payloads.ProductResponse;
import com.app.repositories.CategoryRepo;
import com.app.repositories.ProductRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CategoryRepo categoryRepo;

// Removed references to CartRepo and CartService since cart functionality is now handled by Redux

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${project.image}")
    private String path;

    @Override
    public ProductDTO addProduct(Long categoryId, Product product) {
        // Retrieves the category by ID.
        // Checks if a product with the same name and description already exists in the category.
        // If the product does not exist, sets a default image, associates it with the category, calculates the special price, and saves the product.
        // Returns the saved product as a ProductDTO.
        // If the product already exists, throws an exception.
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        boolean isProductNotPresent = true;

        List<Product> products = category.getProducts();

        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getProductName().equals(product.getProductName())
                    && products.get(i).getDescription().equals(product.getDescription())) {

                isProductNotPresent = false;
                break;
            }
        }

        if (isProductNotPresent) {
            product.setImage("default.png");

            product.setCategory(category);

            double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
            product.setSpecialPrice(specialPrice);

            Product savedProduct = productRepo.save(product);

            return modelMapper.map(savedProduct, ProductDTO.class);
        } else {
            throw new APIException("Product already exists !!!");
        }
    }

    public ProductDTO getProductById(Long productId) {
        Product product = productRepo.findById(productId)
                          .orElseThrow(() -> new ResourceNotFoundException());
        return modelMapper.map(product, ProductDTO.class);
    }
    
    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Determines the sort order based on the input parameters.
        // Defines paging details.
        // Retrieves a paginated list of products from the repository.
        // Maps product entities to DTOs.
        // Populates and returns a ProductResponse with product data and pagination details.
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> pageProducts = productRepo.findAll(pageDetails);

        List<Product> products = pageProducts.getContent();
        
        List<ProductDTO> productDTOs = products.stream().map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();

        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());

        return productResponse;
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        //Retrieves the category by ID.
        //Determines the sort order based on the input parameters.
        //Defines paging details.
        //Retrieves a paginated list of products from the repository.
        //Checks if the category contains any products and throws an exception if not.
        //Maps product entities to DTOs.
        //Populates and returns a ProductResponse with product data and pagination details.
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> pageProducts = productRepo.findByCategory(category, pageDetails);

        List<Product> products = pageProducts.getContent();

        if (products.isEmpty()) {
            throw new APIException(category.getCategoryName() + " category doesn't contain any products!!!");
        }

        List<ProductDTO> productDTOs = products.stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());

        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, Product product) {
        // Removes cart-related updates as it's now handled by Redux.
        // Updates product details and saves it in the repository.
        
        Product productFromDB = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (productFromDB == null) {
            throw new APIException("Product not found with productId: " + productId);
        }

        product.setImage(productFromDB.getImage());
        product.setProductId(productId);
        product.setCategory(productFromDB.getCategory());

        double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
        product.setSpecialPrice(specialPrice);

        Product savedProduct = productRepo.save(product);

        // Removed cart-related logic that updates product in cart, as this is managed on the frontend.

        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        // Retrieves the product by ID and handles the case where it is not found.
        // Uploads the new image using the fileService and updates the product's image field.
        // Saves the updated product and returns it as a ProductDTO.
        Product productFromDB = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (productFromDB == null) {
            throw new APIException("Product not found with productId: " + productId);
        }
        
        String fileName = fileService.uploadImage(path, image);
        
        productFromDB.setImage(fileName);
        
        Product updatedProduct = productRepo.save(productFromDB);
        
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    @Override
    public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Determines the sort order based on input parameters.
        // Defines paging details.
        // Retrieves a paginated list of products matching the keyword from the repository.
        // Checks if any products match the keyword and throws an exception if not.
        // Maps product entities to DTOs.
        // Populates and returns a ProductResponse with product data and pagination details
        
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> pageProducts = productRepo.findByProductNameLike(keyword, pageDetails);

        List<Product> products = pageProducts.getContent();
        
        if (products.size() == 0) {
            throw new APIException("Products not found with keyword: " + keyword);
        }

        List<ProductDTO> productDTOs = products.stream().map(p -> modelMapper.map(p, ProductDTO.class))
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();

        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());

        return productResponse;
    }

    @Override
    public String deleteProduct(Long productId) {
        // Removes cart-related deletion as it is now handled by Redux.
        // Deletes the product from the repository.

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        productRepo.delete(product);
        
        // Removed cart-related logic for deleting the product from the cart.
        return "product deleted success";
    }
}
