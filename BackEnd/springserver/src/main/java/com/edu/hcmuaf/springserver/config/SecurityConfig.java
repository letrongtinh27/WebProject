package com.edu.hcmuaf.springserver.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req
                                .requestMatchers("/api/movies/**")
                                .permitAll()
                                .requestMatchers("/api/theatres/**")
                                .permitAll()

                                .requestMatchers("/api/payment/**")
                                .permitAll()

                                .requestMatchers("/api/auth/login_admin/**")
                                .permitAll()
                                .requestMatchers("/api/show_time/**")
                                .permitAll()
                                .requestMatchers("/api/tickets/**")
                                .permitAll()
//                                .requestMatchers("/api/users/**")
//                                .permitAll()
                                .requestMatchers("/api/shows/**")
                                .permitAll()
                                .requestMatchers("/api/auth/login/**", "/api/auth/register/**")
                                .permitAll()
                                .requestMatchers("/api/users/**").hasAnyAuthority("user")
                                .requestMatchers("/api/auth/**").hasAnyAuthority("user")
                                .requestMatchers("/api/seats/**").hasAnyAuthority("user")
//                                .requestMatchers("/api/payment/**").hasAnyAuthority("user")
                                .requestMatchers("/api/**").hasAnyAuthority("admin")
                                .requestMatchers("/api/**").hasAnyAuthority("user")

                                .anyRequest()
                                .authenticated()
                ).sessionManagement(session -> session
                        .sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}
