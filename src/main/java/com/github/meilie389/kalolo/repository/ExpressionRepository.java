package com.github.meilie389.kalolo.repository;

import com.github.meilie389.kalolo.domain.Expression;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Expression entity.
 */
@Repository
public interface ExpressionRepository extends JpaRepository<Expression, Long> {

    @Query(value = "select distinct expression from Expression expression left join fetch expression.tags",
        countQuery = "select count(distinct expression) from Expression expression")
    Page<Expression> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct expression from Expression expression left join fetch expression.tags")
    List<Expression> findAllWithEagerRelationships();

    @Query("select expression from Expression expression left join fetch expression.tags where expression.id =:id")
    Optional<Expression> findOneWithEagerRelationships(@Param("id") Long id);
}
