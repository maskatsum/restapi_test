package com.gwidgets;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springboot.KeycloakSpringBootProperties;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationEntryPoint;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.keycloak.adapters.springsecurity.filter.AdapterStateCookieRequestMatcher;
import org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticationProcessingFilter;
import org.keycloak.adapters.springsecurity.filter.QueryParamPresenceRequestMatcher;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestHeaderRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.security.Principal;
import java.util.LinkedHashMap;


@EnableConfigurationProperties(KeycloakSpringBootProperties.class)
@KeycloakConfiguration
public class SecurityConfiguration extends KeycloakWebSecurityConfigurerAdapter {

  @Bean
  @Override
  protected KeycloakAuthenticationProcessingFilter keycloakAuthenticationProcessingFilter() throws Exception {
      RequestMatcher requestMatcher =
              new OrRequestMatcher(
                      new AntPathRequestMatcher("/dashboard/sso/login"),
                      new RequestHeaderRequestMatcher("Authorization"),
                      new QueryParamPresenceRequestMatcher("access_token"),
                      new AdapterStateCookieRequestMatcher()
                );

      return new KeycloakAuthenticationProcessingFilter(this.authenticationManagerBean(), requestMatcher);
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    super.configure(http);

    KeycloakAuthenticationEntryPoint entryPoint = (KeycloakAuthenticationEntryPoint)authenticationEntryPoint();
    entryPoint.setLoginUri("/dashboard/sso/login");

    http.authorizeRequests().antMatchers("/**").authenticated()
        .and().anonymous().disable().csrf().disable();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) {
    KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();

    SimpleAuthorityMapper grantedAuthorityMapper = new SimpleAuthorityMapper();
    grantedAuthorityMapper.setPrefix("ROLE_");
    grantedAuthorityMapper.setConvertToUpperCase(true);
    keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(grantedAuthorityMapper);
    auth.authenticationProvider(keycloakAuthenticationProvider);
  }

  @Bean
  @Override
  protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
    return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
      StrictHttpFirewall firewall = new StrictHttpFirewall();
      firewall.setAllowBackSlash(true);
      return (web) -> web.httpFirewall(firewall);
  }

  @Bean
  protected AuthenticationEntryPoint authenticationEntryPoint() throws Exception {
      KeycloakAuthenticationEntryPoint entryPoint =  new KeycloakAuthenticationEntryPoint(adapterDeploymentContext());
      entryPoint.setLoginUri("/dashboard/sso/login");
      return entryPoint;
  }

  @Bean
  @Scope(scopeName = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
  public KeycloakSecurityContext getKeycloakSecurityContext() {
    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    Principal principal = attributes.getRequest().getUserPrincipal();
    if (principal == null) {
      return null;
    }

    if (principal instanceof KeycloakAuthenticationToken) {
      principal = Principal.class.cast(KeycloakAuthenticationToken.class.cast(principal).getPrincipal());
    }

    if (principal instanceof KeycloakPrincipal) {
      return KeycloakPrincipal.class.cast(principal).getKeycloakSecurityContext();
    }

    return null;
  }
}
