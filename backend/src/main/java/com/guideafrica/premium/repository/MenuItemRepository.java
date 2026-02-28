package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.MenuItem;
import com.guideafrica.premium.model.enums.CategorieMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);
    List<MenuItem> findByRestaurantIdAndCategorie(Long restaurantId, CategorieMenu categorie);
    List<MenuItem> findByRestaurantIdAndSignatureTrue(Long restaurantId);
}
