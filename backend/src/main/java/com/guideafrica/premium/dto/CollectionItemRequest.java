package com.guideafrica.premium.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CollectionItemRequest {

    @NotBlank
    private String type;

    @NotNull
    private Long itemId;

    // Getters and Setters

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
}
