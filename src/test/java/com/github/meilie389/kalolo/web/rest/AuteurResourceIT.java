package com.github.meilie389.kalolo.web.rest;

import com.github.meilie389.kalolo.KaloloApp;
import com.github.meilie389.kalolo.config.TestSecurityConfiguration;
import com.github.meilie389.kalolo.domain.Auteur;
import com.github.meilie389.kalolo.repository.AuteurRepository;

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
 * Integration tests for the {@link AuteurResource} REST controller.
 */
@SpringBootTest(classes = { KaloloApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class AuteurResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_CLE_AUTEUR = "AAAAAAAAAA";
    private static final String UPDATED_CLE_AUTEUR = "BBBBBBBBBB";

    private static final String DEFAULT_URL_WEB = "AAAAAAAAAA";
    private static final String UPDATED_URL_WEB = "BBBBBBBBBB";

    private static final String DEFAULT_URL_FB = "AAAAAAAAAA";
    private static final String UPDATED_URL_FB = "BBBBBBBBBB";

    private static final String DEFAULT_URL_INSTA = "AAAAAAAAAA";
    private static final String UPDATED_URL_INSTA = "BBBBBBBBBB";

    private static final String DEFAULT_URL_YT = "AAAAAAAAAA";
    private static final String UPDATED_URL_YT = "BBBBBBBBBB";

    private static final String DEFAULT_URL_TWIT = "AAAAAAAAAA";
    private static final String UPDATED_URL_TWIT = "BBBBBBBBBB";

    @Autowired
    private AuteurRepository auteurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAuteurMockMvc;

    private Auteur auteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auteur createEntity(EntityManager em) {
        Auteur auteur = new Auteur()
            .nom(DEFAULT_NOM)
            .cleAuteur(DEFAULT_CLE_AUTEUR)
            .urlWeb(DEFAULT_URL_WEB)
            .urlFb(DEFAULT_URL_FB)
            .urlInsta(DEFAULT_URL_INSTA)
            .urlYt(DEFAULT_URL_YT)
            .urlTwit(DEFAULT_URL_TWIT);
        return auteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auteur createUpdatedEntity(EntityManager em) {
        Auteur auteur = new Auteur()
            .nom(UPDATED_NOM)
            .cleAuteur(UPDATED_CLE_AUTEUR)
            .urlWeb(UPDATED_URL_WEB)
            .urlFb(UPDATED_URL_FB)
            .urlInsta(UPDATED_URL_INSTA)
            .urlYt(UPDATED_URL_YT)
            .urlTwit(UPDATED_URL_TWIT);
        return auteur;
    }

    @BeforeEach
    public void initTest() {
        auteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuteur() throws Exception {
        int databaseSizeBeforeCreate = auteurRepository.findAll().size();
        // Create the Auteur
        restAuteurMockMvc.perform(post("/api/auteurs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isCreated());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeCreate + 1);
        Auteur testAuteur = auteurList.get(auteurList.size() - 1);
        assertThat(testAuteur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAuteur.getCleAuteur()).isEqualTo(DEFAULT_CLE_AUTEUR);
        assertThat(testAuteur.getUrlWeb()).isEqualTo(DEFAULT_URL_WEB);
        assertThat(testAuteur.getUrlFb()).isEqualTo(DEFAULT_URL_FB);
        assertThat(testAuteur.getUrlInsta()).isEqualTo(DEFAULT_URL_INSTA);
        assertThat(testAuteur.getUrlYt()).isEqualTo(DEFAULT_URL_YT);
        assertThat(testAuteur.getUrlTwit()).isEqualTo(DEFAULT_URL_TWIT);
    }

    @Test
    @Transactional
    public void createAuteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auteurRepository.findAll().size();

        // Create the Auteur with an existing ID
        auteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuteurMockMvc.perform(post("/api/auteurs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isBadRequest());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAuteurs() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        // Get all the auteurList
        restAuteurMockMvc.perform(get("/api/auteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].cleAuteur").value(hasItem(DEFAULT_CLE_AUTEUR)))
            .andExpect(jsonPath("$.[*].urlWeb").value(hasItem(DEFAULT_URL_WEB)))
            .andExpect(jsonPath("$.[*].urlFb").value(hasItem(DEFAULT_URL_FB)))
            .andExpect(jsonPath("$.[*].urlInsta").value(hasItem(DEFAULT_URL_INSTA)))
            .andExpect(jsonPath("$.[*].urlYt").value(hasItem(DEFAULT_URL_YT)))
            .andExpect(jsonPath("$.[*].urlTwit").value(hasItem(DEFAULT_URL_TWIT)));
    }
    
    @Test
    @Transactional
    public void getAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        // Get the auteur
        restAuteurMockMvc.perform(get("/api/auteurs/{id}", auteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(auteur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.cleAuteur").value(DEFAULT_CLE_AUTEUR))
            .andExpect(jsonPath("$.urlWeb").value(DEFAULT_URL_WEB))
            .andExpect(jsonPath("$.urlFb").value(DEFAULT_URL_FB))
            .andExpect(jsonPath("$.urlInsta").value(DEFAULT_URL_INSTA))
            .andExpect(jsonPath("$.urlYt").value(DEFAULT_URL_YT))
            .andExpect(jsonPath("$.urlTwit").value(DEFAULT_URL_TWIT));
    }
    @Test
    @Transactional
    public void getNonExistingAuteur() throws Exception {
        // Get the auteur
        restAuteurMockMvc.perform(get("/api/auteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        int databaseSizeBeforeUpdate = auteurRepository.findAll().size();

        // Update the auteur
        Auteur updatedAuteur = auteurRepository.findById(auteur.getId()).get();
        // Disconnect from session so that the updates on updatedAuteur are not directly saved in db
        em.detach(updatedAuteur);
        updatedAuteur
            .nom(UPDATED_NOM)
            .cleAuteur(UPDATED_CLE_AUTEUR)
            .urlWeb(UPDATED_URL_WEB)
            .urlFb(UPDATED_URL_FB)
            .urlInsta(UPDATED_URL_INSTA)
            .urlYt(UPDATED_URL_YT)
            .urlTwit(UPDATED_URL_TWIT);

        restAuteurMockMvc.perform(put("/api/auteurs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuteur)))
            .andExpect(status().isOk());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeUpdate);
        Auteur testAuteur = auteurList.get(auteurList.size() - 1);
        assertThat(testAuteur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAuteur.getCleAuteur()).isEqualTo(UPDATED_CLE_AUTEUR);
        assertThat(testAuteur.getUrlWeb()).isEqualTo(UPDATED_URL_WEB);
        assertThat(testAuteur.getUrlFb()).isEqualTo(UPDATED_URL_FB);
        assertThat(testAuteur.getUrlInsta()).isEqualTo(UPDATED_URL_INSTA);
        assertThat(testAuteur.getUrlYt()).isEqualTo(UPDATED_URL_YT);
        assertThat(testAuteur.getUrlTwit()).isEqualTo(UPDATED_URL_TWIT);
    }

    @Test
    @Transactional
    public void updateNonExistingAuteur() throws Exception {
        int databaseSizeBeforeUpdate = auteurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuteurMockMvc.perform(put("/api/auteurs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isBadRequest());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        int databaseSizeBeforeDelete = auteurRepository.findAll().size();

        // Delete the auteur
        restAuteurMockMvc.perform(delete("/api/auteurs/{id}", auteur.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
