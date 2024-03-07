package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final String[] guardedUrls = new String[]{
        "/dashboard/**",
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		
//		http.oauth2Client().and()
//			.oauth2Login()
//			.tokenEndpoint().and()
//			.userInfoEndpoint();

        http.oauth2Login(Customizer.withDefaults());

        http.logout(logout -> logout.logoutSuccessUrl("/"));

        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(
                // guardedUrls[] 以下は、アクセス制限
                auth -> auth.requestMatchers(guardedUrls).fullyAuthenticated()
                    .anyRequest().permitAll() // その他のURLは、アクセス制限なし
            );

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));

        return http.build();
    }
}
