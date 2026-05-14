package com.app.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductOrderRequest {
    private Long productId;
    private Double orderedProductPrice;
    private Integer quantity;
    private Double discountedPrice;
}
