package com.github.meilie389.kalolo.repository;

import com.github.meilie389.kalolo.domain.TypeMedia;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TypeMedia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeMediaRepository extends JpaRepository<TypeMedia, Long> {
}
