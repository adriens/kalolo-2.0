package com.github.meilie389.kalolo.web.rest;

import com.github.meilie389.kalolo.domain.TypeMedia;
import com.github.meilie389.kalolo.repository.TypeMediaRepository;
import com.github.meilie389.kalolo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.github.meilie389.kalolo.domain.TypeMedia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeMediaResource {

    private final Logger log = LoggerFactory.getLogger(TypeMediaResource.class);

    private static final String ENTITY_NAME = "typeMedia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeMediaRepository typeMediaRepository;

    public TypeMediaResource(TypeMediaRepository typeMediaRepository) {
        this.typeMediaRepository = typeMediaRepository;
    }

    /**
     * {@code POST  /type-medias} : Create a new typeMedia.
     *
     * @param typeMedia the typeMedia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeMedia, or with status {@code 400 (Bad Request)} if the typeMedia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-medias")
    public ResponseEntity<TypeMedia> createTypeMedia(@RequestBody TypeMedia typeMedia) throws URISyntaxException {
        log.debug("REST request to save TypeMedia : {}", typeMedia);
        if (typeMedia.getId() != null) {
            throw new BadRequestAlertException("A new typeMedia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeMedia result = typeMediaRepository.save(typeMedia);
        return ResponseEntity.created(new URI("/api/type-medias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-medias} : Updates an existing typeMedia.
     *
     * @param typeMedia the typeMedia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeMedia,
     * or with status {@code 400 (Bad Request)} if the typeMedia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeMedia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-medias")
    public ResponseEntity<TypeMedia> updateTypeMedia(@RequestBody TypeMedia typeMedia) throws URISyntaxException {
        log.debug("REST request to update TypeMedia : {}", typeMedia);
        if (typeMedia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeMedia result = typeMediaRepository.save(typeMedia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeMedia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /type-medias} : get all the typeMedias.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeMedias in body.
     */
    @GetMapping("/type-medias")
    public ResponseEntity<List<TypeMedia>> getAllTypeMedias(Pageable pageable) {
        log.debug("REST request to get a page of TypeMedias");
        Page<TypeMedia> page = typeMediaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /type-medias/:id} : get the "id" typeMedia.
     *
     * @param id the id of the typeMedia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeMedia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-medias/{id}")
    public ResponseEntity<TypeMedia> getTypeMedia(@PathVariable Long id) {
        log.debug("REST request to get TypeMedia : {}", id);
        Optional<TypeMedia> typeMedia = typeMediaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeMedia);
    }

    /**
     * {@code DELETE  /type-medias/:id} : delete the "id" typeMedia.
     *
     * @param id the id of the typeMedia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-medias/{id}")
    public ResponseEntity<Void> deleteTypeMedia(@PathVariable Long id) {
        log.debug("REST request to delete TypeMedia : {}", id);
        typeMediaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
