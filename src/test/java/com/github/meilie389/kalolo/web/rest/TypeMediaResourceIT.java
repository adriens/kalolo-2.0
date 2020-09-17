package com.github.meilie389.kalolo.web.rest;

import com.github.meilie389.kalolo.KaloloApp;
import com.github.meilie389.kalolo.config.TestSecurityConfiguration;
import com.github.meilie389.kalolo.domain.TypeMedia;
import com.github.meilie389.kalolo.repository.TypeMediaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TypeMediaResource} REST controller.
 */
@SpringBootTest(classes = { KaloloApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class TypeMediaResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    @Autowired
    private TypeMediaRepository typeMediaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeMediaMockMvc;

    private TypeMedia typeMedia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeMedia createEntity(EntityManager em) {
        TypeMedia typeMedia = new TypeMedia()
            .libelle(DEFAULT_LIBELLE);
        return typeMedia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeMedia createUpdatedEntity(EntityManager em) {
        TypeMedia typeMedia = new TypeMedia()
            .libelle(UPDATED_LIBELLE);
        return typeMedia;
    }

    @BeforeEach
    public void initTest() {
        typeMedia = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeMedia() throws Exception {
        int databaseSizeBeforeCreate = typeMediaRepository.findAll().size();
        // Create the TypeMedia
        restTypeMediaMockMvc.perform(post("/api/type-medias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMedia)))
            .andExpect(status().isCreated());

        // Validate the TypeMedia in the database
        List<TypeMedia> typeMediaList = typeMediaRepository.findAll();
        assertThat(typeMediaList).hasSize(databaseSizeBeforeCreate + 1);
        TypeMedia testTypeMedia = typeMediaList.get(typeMediaList.size() - 1);
        assertThat(testTypeMedia.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
    }

    @Test
    @Transactional
    public void createTypeMediaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeMediaRepository.findAll().size();

        // Create the TypeMedia with an existing ID
        typeMedia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeMediaMockMvc.perform(post("/api/type-medias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMedia)))
            .andExpect(status().isBadRequest());

        // Validate the TypeMedia in the database
        List<TypeMedia> typeMediaList = typeMediaRepository.findAll();
        assertThat(typeMediaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTypeMedias() throws Exception {
        // Initialize the database
        typeMediaRepository.saveAndFlush(typeMedia);

        // Get all the typeMediaList
        restTypeMediaMockMvc.perform(get("/api/type-medias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeMedia.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)));
    }
    
    @Test
    @Transactional
    public void getTypeMedia() throws Exception {
        // Initialize the database
        typeMediaRepository.saveAndFlush(typeMedia);

        // Get the typeMedia
        restTypeMediaMockMvc.perform(get("/api/type-medias/{id}", typeMedia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeMedia.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE));
    }
    @Test
    @Transactional
    public void getNonExistingTypeMedia() throws Exception {
        // Get the typeMedia
        restTypeMediaMockMvc.perform(get("/api/type-medias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeMedia() throws Exception {
        // Initialize the database
        typeMediaRepository.saveAndFlush(typeMedia);

        int databaseSizeBeforeUpdate = typeMediaRepository.findAll().size();

        // Update the typeMedia
        TypeMedia updatedTypeMedia = typeMediaRepository.findById(typeMedia.getId()).get();
        // Disconnect from session so that the updates on updatedTypeMedia are not directly saved in db
        em.detach(updatedTypeMedia);
        updatedTypeMedia
            .libelle(UPDATED_LIBELLE);

        restTypeMediaMockMvc.perform(put("/api/type-medias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeMedia)))
            .andExpect(status().isOk());

        // Validate the TypeMedia in the database
        List<TypeMedia> typeMediaList = typeMediaRepository.findAll();
        assertThat(typeMediaList).hasSize(databaseSizeBeforeUpdate);
        TypeMedia testTypeMedia = typeMediaList.get(typeMediaList.size() - 1);
        assertThat(testTypeMedia.getLibelle()).isEqualTo(UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeMedia() throws Exception {
        int databaseSizeBeforeUpdate = typeMediaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeMediaMockMvc.perform(put("/api/type-medias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMedia)))
            .andExpect(status().isBadRequest());

        // Validate the TypeMedia in the database
        List<TypeMedia> typeMediaList = typeMediaRepository.findAll();
        assertThat(typeMediaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeMedia() throws Exception {
        // Initialize the database
        typeMediaRepository.saveAndFlush(typeMedia);

        int databaseSizeBeforeDelete = typeMediaRepository.findAll().size();

        // Delete the typeMedia
        restTypeMediaMockMvc.perform(delete("/api/type-medias/{id}", typeMedia.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeMedia> typeMediaList = typeMediaRepository.findAll();
        assertThat(typeMediaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
