package com.app.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.app.entities.Order;
import com.app.entities.OrderItem;
import com.app.entities.Payment;
import com.app.entities.Product;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.OrderDTO;
import com.app.payloads.OrderItemDTO;
import com.app.payloads.OrderResponse;
import com.app.payloads.ProductOrderRequest;
import com.app.repositories.OrderItemRepo;
import com.app.repositories.OrderRepo;
import com.app.repositories.PaymentRepo;
import com.app.repositories.ProductRepo;
import com.app.repositories.UserRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    public UserRepo userRepo;

    @Autowired
    public OrderRepo orderRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    public OrderItemRepo orderItemRepo;

    @Autowired
    public UserService userService;

    @Autowired
    public ModelMapper modelMapper;

    @Autowired
    private ProductRepo productRepo;


    @Override
    public OrderDTO placeOrder(String emailId, List<ProductOrderRequest> products, String paymentMethod, Double totalAmount) {
        // Create order
        Order order = new Order();
        order.setEmail(emailId);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(totalAmount);
        order.setOrderStatus("Order Accepted");

        // Create payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMethod(paymentMethod);
        payment = paymentRepo.save(payment);

        order.setPayment(payment);

        // Save the order
        Order savedOrder = orderRepo.save(order);

        // Handle multiple order items
        List<OrderItem> orderItems = new ArrayList<>();
        for (ProductOrderRequest productRequest : products) {
            OrderItem orderItem = new OrderItem();
            // You should retrieve the actual product entity based on productId
            Product product = productRepo.findById(productRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productRequest.getProductId()));

            orderItem.setProduct(product);
            orderItem.setQuantity(productRequest.getQuantity());
            orderItem.setDiscount(productRequest.getDiscountedPrice());
            orderItem.setOrderedProductPrice(productRequest.getOrderedProductPrice());
            orderItem.setOrder(savedOrder);

            orderItems.add(orderItem);

            // Adjust the product quantity
            product.setQuantity(product.getQuantity() - productRequest.getQuantity());
            productRepo.save(product);
        }

        // Save all order items
        orderItems = orderItemRepo.saveAll(orderItems);

        // Map to OrderDTO
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item -> orderDTO.getOrderItems().add(modelMapper.map(item, OrderItemDTO.class)));

        return orderDTO;
    }



    @Override
    public OrderDTO getOrder(String emailId, Long orderId) {
        // Retrieves a specific order for a user based on emailId and orderId.
        Order order = orderRepo.findOrderByEmailAndOrderId(emailId, orderId);
        if (order == null) {
            throw new ResourceNotFoundException("Order", "orderId", orderId);
        }
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public List<OrderDTO> getOrdersByUser(String emailId) {
        // Retrieves all orders for a user based on their email ID.
        List<Order> orders = orderRepo.findAllByEmail(emailId);
        List<OrderDTO> orderDTOs = orders.stream().map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());

        if (orderDTOs.isEmpty()) {
            throw new APIException("No orders placed yet by the user with email: " + emailId);
        }

        return orderDTOs;
    }

    @Override
    public OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Retrieves all orders with pagination and sorting.
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Order> pageOrders = orderRepo.findAll(pageDetails);

        List<Order> orders = pageOrders.getContent();

        List<OrderDTO> orderDTOs = orders.stream().map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());

        if (orderDTOs.isEmpty()) {
            throw new APIException("No orders placed yet by the users");
        }

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDTOs);
        orderResponse.setPageNumber(pageOrders.getNumber());
        orderResponse.setPageSize(pageOrders.getSize());
        orderResponse.setTotalElements(pageOrders.getTotalElements());
        orderResponse.setTotalPages(pageOrders.getTotalPages());
        orderResponse.setLastPage(pageOrders.isLast());

        return orderResponse;
    }

    @Override
    public OrderDTO updateOrder(String emailId, Long orderId, String orderStatus) {
        // Retrieves an order and updates its status.
        Order order = orderRepo.findOrderByEmailAndOrderId(emailId, orderId);
        if (order == null) {
            throw new ResourceNotFoundException("Order", "orderId", orderId);
        }
        order.setOrderStatus(orderStatus);
        return modelMapper.map(order, OrderDTO.class);
    }

}
