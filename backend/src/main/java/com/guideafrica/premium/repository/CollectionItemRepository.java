package com.guideafrica.premium.repository;

import com.guideafrica.premium.model.CollectionItem;
import com.guideafrica.premium.model.enums.TypeEtablissement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionItemRepository extends JpaRepository<CollectionItem, Long> {
    boolean existsByCollectionIdAndTypeAndTargetId(Long collectionId, TypeEtablissement type, Long targetId);
}
