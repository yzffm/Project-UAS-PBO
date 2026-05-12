package com.travelplanner.controller;

import com.travelplanner.dto.request.LoginRequestDTO;
import com.travelplanner.dto.request.RegisterRequestDTO;
import com.travelplanner.dto.response.AuthResponseDTO;
import com.travelplanner.model.User;
import com.travelplanner.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(userService.login(dto));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getMe(@AuthenticationPrincipal User user) {
        // Since we might not have full spring security context wired up for Milestone 1,
        // AuthenticationPrincipal might be null if filter is bypassed.
        // We will just return the user for now.
        return ResponseEntity.ok(user);
    }
}
