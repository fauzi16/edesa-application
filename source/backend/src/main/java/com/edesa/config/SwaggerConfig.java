package com.edesa.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SwaggerConfig {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private ApiKey apiKey(){
        return new ApiKey("JWT", AUTHORIZATION_HEADER, "header");
    }

    @Bean
    public Docket authApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Authentication Related Controller")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.swantik.controller.standard.auth"))
                .build()
                .apiInfo(metaInfo());
    }

    @Bean
    public Docket masterApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Direct CRUD Master Related Controller")
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.swantik.controller.standard.dtpl.master"))
                .build()
                .apiInfo(metaInfo());
    }


    @Bean
    public Docket transactionApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Direct CRUD Transaction Related Controller")
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.swantik.controller.standard.dtpl.transaction"))
                .build()
                .apiInfo(metaInfo());
    }
    
    private ApiInfo metaInfo() {
        ApiInfo apiInfo = new ApiInfo(
                "EDesa Backend API",
                "EDesa Backend API Documentation",
                "1.0",
                "Terms of Service",
                new Contact("edesa.com", "https://www.edesa.com",
                        "tech@edesa.com"),
                "Apache License Version 2.0",
                "https://www.apache.org/licesen.html", new ArrayList<>());

        return apiInfo;
    }

    private SecurityContext securityContext(){
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth(){
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }

}
