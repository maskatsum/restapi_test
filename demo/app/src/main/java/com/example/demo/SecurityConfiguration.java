package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration  {
	@Value("${spring.security.oauth2.client.registration.example.client-id}")
	private String clientId;

	@Value("${spring.security.oauth2.client.provider.external.issuer-uri}")
	private String issuer;


	LogoutHandler oauth2LogoutHandler() {
		return (request, response, authentication) -> {
			try {
				response.sendRedirect(String.format(
						"%s/protocol/openid-connect/logout?client_id=%s&post_logout_redirect_uri=%s",
						issuer,
						clientId,
						getRedirectUrlAfterLogout()
				));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		};
	}

	private String getRedirectUrlAfterLogout() {
		return ServletUriComponentsBuilder.fromCurrentContextPath().build().toString();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.oauth2Login(Customizer.withDefaults());
		http.csrf(AbstractHttpConfigurer::disable);
		http.cors(AbstractHttpConfigurer::disable);

		// dashboard/* 以下だけアクセス制限を適用する
		// それ以外は、アクセスできるようにする
		http.authorizeHttpRequests(auth -> auth
			.requestMatchers("/dashboard", "/dashboard/**").fullyAuthenticated()
			.anyRequest().permitAll()
		);

		// ログアウトハンドラーの設定
		http.logout(logout -> logout
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.addLogoutHandler(oauth2LogoutHandler()));

		http.sessionManagement(session -> session
				.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));
		
		return http.build();
	}

}
