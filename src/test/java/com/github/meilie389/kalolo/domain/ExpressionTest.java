package com.github.meilie389.kalolo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.github.meilie389.kalolo.web.rest.TestUtil;

public class ExpressionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expression.class);
        Expression expression1 = new Expression();
        expression1.setId(1L);
        Expression expression2 = new Expression();
        expression2.setId(expression1.getId());
        assertThat(expression1).isEqualTo(expression2);
        expression2.setId(2L);
        assertThat(expression1).isNotEqualTo(expression2);
        expression1.setId(null);
        assertThat(expression1).isNotEqualTo(expression2);
    }
}
