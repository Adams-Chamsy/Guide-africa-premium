package com.guideafrica.premium.service;

import com.guideafrica.premium.exception.ResourceNotFoundException;
import com.guideafrica.premium.model.Category;
import com.guideafrica.premium.repository.CategoryRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Cacheable("categories")
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Cacheable(value = "categories", key = "#type")
    public List<Category> findByType(String type) {
        if (type == null || type.isBlank()) {
            return categoryRepository.findAll();
        }
        return categoryRepository.findByTypeIn(Arrays.asList(type.toUpperCase(), "BOTH"));
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie", id));
    }

    @CacheEvict(value = "categories", allEntries = true)
    public Category create(Category category) {
        category.setType(category.getType().toUpperCase());
        return categoryRepository.save(category);
    }

    @CacheEvict(value = "categories", allEntries = true)
    public Category update(Long id, Category categoryDetails) {
        Category category = findById(id);
        category.setNom(categoryDetails.getNom());
        category.setDescription(categoryDetails.getDescription());
        category.setType(categoryDetails.getType().toUpperCase());
        return categoryRepository.save(category);
    }

    @CacheEvict(value = "categories", allEntries = true)
    public void delete(Long id) {
        Category category = findById(id);
        categoryRepository.delete(category);
    }
}
