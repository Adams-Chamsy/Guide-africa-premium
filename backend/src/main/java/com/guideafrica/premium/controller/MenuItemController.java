package com.guideafrica.premium.controller;

import com.guideafrica.premium.model.MenuItem;
import com.guideafrica.premium.model.enums.CategorieMenu;
import com.guideafrica.premium.service.MenuItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping("/restaurants/{restaurantId}/menu")
    public ResponseEntity<List<MenuItem>> getMenu(
            @PathVariable Long restaurantId,
            @RequestParam(required = false) CategorieMenu categorie) {

        List<MenuItem> items;
        if (categorie != null) {
            items = menuItemService.findByRestaurantAndCategorie(restaurantId, categorie);
        } else {
            items = menuItemService.findByRestaurantId(restaurantId);
        }
        return ResponseEntity.ok(items);
    }

    @GetMapping("/restaurants/{restaurantId}/menu/signatures")
    public ResponseEntity<List<MenuItem>> getSignatures(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(menuItemService.findSignatureItems(restaurantId));
    }

    @PostMapping("/restaurants/{restaurantId}/menu")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<MenuItem> addMenuItem(
            @PathVariable Long restaurantId,
            @Valid @RequestBody MenuItem menuItem) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(menuItemService.addToRestaurant(restaurantId, menuItem));
    }

    @PutMapping("/menu-items/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<MenuItem> update(@PathVariable Long id, @Valid @RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemService.update(id, menuItem));
    }

    @DeleteMapping("/menu-items/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        menuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
