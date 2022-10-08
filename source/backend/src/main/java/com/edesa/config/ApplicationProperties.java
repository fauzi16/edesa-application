package com.edesa.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class ApplicationProperties {
    
    @Value("${location.static.image}")
    private String staticImageLocation;

    public String getStaticImageLocation() {
        return staticImageLocation;
    }

    public void setStaticImageLocation(String staticImageLocation) {
        this.staticImageLocation = staticImageLocation;
    }

}
