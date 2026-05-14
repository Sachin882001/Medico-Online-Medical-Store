package com.app.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartOrderRequest {
    private String email;
    private Double total;
    private String paymentMethod;
    private List<ProductOrderRequest> products;
}