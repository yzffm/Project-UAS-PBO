package com.travelplanner.controller;

import com.travelplanner.dto.request.UserUpdateRequestDTO;
import com.travelplanner.model.User;
import com.travelplanner.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody UserUpdateRequestDTO dto) {
        return ResponseEntity.ok(userService.updateProfile(user, dto));
    }
}