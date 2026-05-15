package com.travelplanner.config;

import com.travelplanner.model.User;
import com.travelplanner.repository.UserRepository;
import com.travelplanner.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections; // ← TAMBAHAN IMPORT

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil JwtUtil;
    private final UserRepository userRepository;

    public JwtFilter(JwtUtil JwtUtil, UserRepository userRepository) {
        this.JwtUtil = JwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (JwtUtil.validateToken(token)) {
                String email = JwtUtil.getEmailFromToken(token);

                User user = userRepository.findByEmail(email).orElse(null);

                if (user != null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, Collections.emptyList()); // ← FIX: emptyList() bukan null

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}