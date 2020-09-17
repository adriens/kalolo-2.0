package com.github.meilie389.kalolo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.github.meilie389.kalolo.web.rest.TestUtil;

public class TypeMediaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeMedia.class);
        TypeMedia typeMedia1 = new TypeMedia();
        typeMedia1.setId(1L);
        TypeMedia typeMedia2 = new TypeMedia();
        typeMedia2.setId(typeMedia1.getId());
        assertThat(typeMedia1).isEqualTo(typeMedia2);
        typeMedia2.setId(2L);
        assertThat(typeMedia1).isNotEqualTo(typeMedia2);
        typeMedia1.setId(null);
        assertThat(typeMedia1).isNotEqualTo(typeMedia2);
    }
}
