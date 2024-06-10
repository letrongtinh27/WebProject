package com.edu.hcmuaf.springserver.config;

import com.edu.hcmuaf.springserver.auth.AuthenticationSuccessHandler;
import com.edu.hcmuaf.springserver.controller.AuthenticationController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Map;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req

                                .requestMatchers("/login/oauth2/code/google")
                                .permitAll()
                                .requestMatchers("/api/theatres/**")
                                .permitAll()
                                .requestMatchers("/api/auth/login_admin/**")
                                .permitAll()
                                .requestMatchers("/api/auth/reset-password")
                                .permitAll()
                                .requestMatchers("/api/auth/login")
                                .permitAll()
                                .requestMatchers("/api/shows/get**")
                                .permitAll()
                                .requestMatchers("/api/category/**")
                                .permitAll()
                                .requestMatchers("/api/movies/search")
                                .permitAll()
                                .requestMatchers("/api/movies/{id}")
                                .permitAll()
                                .requestMatchers("/api/theatres/**")
                                .permitAll()
                                .requestMatchers("/api/shows/get**")
                                .permitAll()
//
//                                .requestMatchers("/api/shows/all")
//                                .permitAll()
//                                .requestMatchers("/api/shows/**")
//                                .permitAll()
//                                .requestMatchers("/api/users/**")
//                                .permitAll()
//                                .requestMatchers("/api/movie_category/**")
//                                .permitAll()
//                                .requestMatchers("/api/tickets/**")
//                                .permitAll()
                                .requestMatchers("/api/auth/login/**", "/api/auth/register/**", "/api/auth/login-google")
                                .permitAll()

                                .requestMatchers("/api/**").hasAnyAuthority("admin")

                                .requestMatchers("/api/users/**").hasAnyAuthority("user")
                                .requestMatchers("/api/shows/**").hasAnyAuthority("user")
                                .requestMatchers("/api/auth/**").hasAnyAuthority("user")
                                .requestMatchers("/api/seats/**").hasAnyAuthority("user")
                                .requestMatchers("/api/payment/**").hasAnyAuthority("user")
                                .requestMatchers("/api/tickets/**").hasAnyAuthority("user")

//                                .requestMatchers("/api/**").hasAnyAuthority("user")

                                .anyRequest()
                                .authenticated()


                )


                .oauth2Login(o -> o
                        .successHandler(new AuthenticationSuccessHandler())
                )

                .sessionManagement(session -> session
                        .sessionCreationPolicy(STATELESS))

                .authenticationProvider(authenticationProvider)

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                .build();
    }
}