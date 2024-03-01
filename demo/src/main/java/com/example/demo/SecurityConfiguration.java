package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration  {
    
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.oauth2Client().and()
			.oauth2Login()
			.tokenEndpoint().and()
			.userInfoEndpoint();
		
		http.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(auth -> auth
					.requestMatchers("/unauthenticated", "/oauth2/**", "/login/**", "/welcome").permitAll()
					.anyRequest().fullyAuthenticated()
			)
			.logout(logout -> logout
					.logoutSuccessUrl("http://localhost:8080/welcome")
			);
		
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));
		
		return http.build();
	}
}
