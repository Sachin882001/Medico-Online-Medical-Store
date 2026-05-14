package com.app.services;

import java.util.List;

import com.app.payloads.OrderDTO;
import com.app.payloads.OrderResponse;
import com.app.payloads.ProductOrderRequest;

public interface OrderService {
	
	OrderDTO getOrder(String emailId, Long orderId);
	
	List<OrderDTO> getOrdersByUser(String emailId);
	
	OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
	
	OrderDTO updateOrder(String emailId, Long orderId, String orderStatus);

	OrderDTO placeOrder(String email, List<ProductOrderRequest> products, String paymentMethod, Double total);

}
