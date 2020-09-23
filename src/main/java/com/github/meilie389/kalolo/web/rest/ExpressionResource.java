package com.github.meilie389.kalolo.web.rest;

import com.github.meilie389.kalolo.domain.Expression;
import com.github.meilie389.kalolo.repository.ExpressionRepository;
import com.github.meilie389.kalolo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.github.meilie389.kalolo.domain.Expression}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExpressionResource {

    private final Logger log = LoggerFactory.getLogger(ExpressionResource.class);

    private static final String ENTITY_NAME = "expression";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpressionRepository expressionRepository;

    public ExpressionResource(ExpressionRepository expressionRepository) {
        this.expressionRepository = expressionRepository;
    }

    /**
     * {@code POST  /expressions} : Create a new expression.
     *
     * @param expression the expression to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expression, or with status {@code 400 (Bad Request)} if the expression has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/expressions")
    public ResponseEntity<Expression> createExpression(@RequestBody Expression expression) throws URISyntaxException {
        log.debug("REST request to save Expression : {}", expression);
        if (expression.getId() != null) {
            throw new BadRequestAlertException("A new expression cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expression result = expressionRepository.save(expression);
        return ResponseEntity.created(new URI("/api/expressions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /expressions} : Updates an existing expression.
     *
     * @param expression the expression to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expression,
     * or with status {@code 400 (Bad Request)} if the expression is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expression couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/expressions")
    public ResponseEntity<Expression> updateExpression(@RequestBody Expression expression) throws URISyntaxException {
        log.debug("REST request to update Expression : {}", expression);
        if (expression.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expression result = expressionRepository.save(expression);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expression.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /expressions} : get all the expressions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expressions in body.
     */
    @GetMapping("/expressions")
    public List<Expression> getAllExpressions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Expressions");
        return expressionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /expressions/:id} : get the "id" expression.
     *
     * @param libelle the id of the expression to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expression, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expressions/tag/{libelle}")
    public List<Expression> getExpressionsTag(@PathVariable String libelle) {
        log.debug("REST request to get Expression : {}", libelle);
        return expressionRepository.findAllWithRelationships(libelle);
    }

    /**
     * {@code GET  /expressions/:id} : get the "id" expression.
     *
     * @param id the id of the expression to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expression, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expressions/{id}")
    public ResponseEntity<Expression> getExpression(@PathVariable Long id) {
        log.debug("REST request to get Expression : {}", id);
        Optional<Expression> expression = expressionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(expression);
    }

    /**
     * {@code DELETE  /expressions/:id} : delete the "id" expression.
     *
     * @param id the id of the expression to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/expressions/{id}")
    public ResponseEntity<Void> deleteExpression(@PathVariable Long id) {
        log.debug("REST request to delete Expression : {}", id);
        expressionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
