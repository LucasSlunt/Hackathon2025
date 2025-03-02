package com.hellostar.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 🔥 Apply to API endpoints
                        .allowedOrigins("*") // 🔥 Replace with your frontend URL
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(false);
                        // "*" need to allow messages that look like "/**" in the options
            }
        };
    }
}
