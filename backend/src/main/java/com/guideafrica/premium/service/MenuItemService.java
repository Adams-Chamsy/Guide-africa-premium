package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.MenuItem;
import com.guideafrica.premium.model.Restaurant;
import com.guideafrica.premium.model.enums.CategorieMenu;
import com.guideafrica.premium.repository.MenuItemRepository;
import com.guideafrica.premium.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    public MenuItemService(MenuItemRepository menuItemRepository, RestaurantRepository restaurantRepository) {
        this.menuItemRepository = menuItemRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<MenuItem> findByRestaurantId(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    public List<MenuItem> findByRestaurantAndCategorie(Long restaurantId, CategorieMenu categorie) {
        return menuItemRepository.findByRestaurantIdAndCategorie(restaurantId, categorie);
    }

    public List<MenuItem> findSignatureItems(Long restaurantId) {
        return menuItemRepository.findByRestaurantIdAndSignatureTrue(restaurantId);
    }

    public MenuItem findById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MenuItem", id));
    }

    public MenuItem addToRestaurant(Long restaurantId, MenuItem menuItem) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));
        menuItem.setRestaurant(restaurant);
        return menuItemRepository.save(menuItem);
    }

    public MenuItem update(Long id, MenuItem details) {
        MenuItem item = findById(id);
        item.setNom(details.getNom());
        item.setDescription(details.getDescription());
        item.setPrix(details.getPrix());
        item.setCategorie(details.getCategorie());
        item.setSignature(details.isSignature());
        item.setImage(details.getImage());
        return menuItemRepository.save(item);
    }

    public void delete(Long id) {
        MenuItem item = findById(id);
        menuItemRepository.delete(item);
    }
}
