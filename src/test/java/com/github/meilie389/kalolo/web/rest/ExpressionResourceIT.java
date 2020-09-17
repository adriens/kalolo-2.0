package com.github.meilie389.kalolo.web.rest;

import com.github.meilie389.kalolo.KaloloApp;
import com.github.meilie389.kalolo.config.TestSecurityConfiguration;
import com.github.meilie389.kalolo.domain.Expression;
import com.github.meilie389.kalolo.repository.ExpressionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExpressionResource} REST controller.
 */
@SpringBootTest(classes = { KaloloApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExpressionResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final Integer DEFAULT_POINTS = 1;
    private static final Integer UPDATED_POINTS = 2;

    @Autowired
    private ExpressionRepository expressionRepository;

    @Mock
    private ExpressionRepository expressionRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExpressionMockMvc;

    private Expression expression;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expression createEntity(EntityManager em) {
        Expression expression = new Expression()
            .text(DEFAULT_TEXT)
            .points(DEFAULT_POINTS);
        return expression;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expression createUpdatedEntity(EntityManager em) {
        Expression expression = new Expression()
            .text(UPDATED_TEXT)
            .points(UPDATED_POINTS);
        return expression;
    }

    @BeforeEach
    public void initTest() {
        expression = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpression() throws Exception {
        int databaseSizeBeforeCreate = expressionRepository.findAll().size();
        // Create the Expression
        restExpressionMockMvc.perform(post("/api/expressions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expression)))
            .andExpect(status().isCreated());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeCreate + 1);
        Expression testExpression = expressionList.get(expressionList.size() - 1);
        assertThat(testExpression.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testExpression.getPoints()).isEqualTo(DEFAULT_POINTS);
    }

    @Test
    @Transactional
    public void createExpressionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expressionRepository.findAll().size();

        // Create the Expression with an existing ID
        expression.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpressionMockMvc.perform(post("/api/expressions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expression)))
            .andExpect(status().isBadRequest());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExpressions() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        // Get all the expressionList
        restExpressionMockMvc.perform(get("/api/expressions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expression.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllExpressionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(expressionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExpressionMockMvc.perform(get("/api/expressions?eagerload=true"))
            .andExpect(status().isOk());

        verify(expressionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllExpressionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(expressionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExpressionMockMvc.perform(get("/api/expressions?eagerload=true"))
            .andExpect(status().isOk());

        verify(expressionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getExpression() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        // Get the expression
        restExpressionMockMvc.perform(get("/api/expressions/{id}", expression.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(expression.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS));
    }
    @Test
    @Transactional
    public void getNonExistingExpression() throws Exception {
        // Get the expression
        restExpressionMockMvc.perform(get("/api/expressions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpression() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        int databaseSizeBeforeUpdate = expressionRepository.findAll().size();

        // Update the expression
        Expression updatedExpression = expressionRepository.findById(expression.getId()).get();
        // Disconnect from session so that the updates on updatedExpression are not directly saved in db
        em.detach(updatedExpression);
        updatedExpression
            .text(UPDATED_TEXT)
            .points(UPDATED_POINTS);

        restExpressionMockMvc.perform(put("/api/expressions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpression)))
            .andExpect(status().isOk());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeUpdate);
        Expression testExpression = expressionList.get(expressionList.size() - 1);
        assertThat(testExpression.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testExpression.getPoints()).isEqualTo(UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void updateNonExistingExpression() throws Exception {
        int databaseSizeBeforeUpdate = expressionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpressionMockMvc.perform(put("/api/expressions").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expression)))
            .andExpect(status().isBadRequest());

        // Validate the Expression in the database
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpression() throws Exception {
        // Initialize the database
        expressionRepository.saveAndFlush(expression);

        int databaseSizeBeforeDelete = expressionRepository.findAll().size();

        // Delete the expression
        restExpressionMockMvc.perform(delete("/api/expressions/{id}", expression.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expression> expressionList = expressionRepository.findAll();
        assertThat(expressionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
