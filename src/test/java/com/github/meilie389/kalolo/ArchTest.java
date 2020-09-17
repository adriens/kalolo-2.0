package com.github.meilie389.kalolo;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.github.meilie389.kalolo");

        noClasses()
            .that()
                .resideInAnyPackage("com.github.meilie389.kalolo.service..")
            .or()
                .resideInAnyPackage("com.github.meilie389.kalolo.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.github.meilie389.kalolo.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
