package com.travelplanner.service;

import com.travelplanner.dto.request.LoginRequestDTO;
import com.travelplanner.dto.request.RegisterRequestDTO;
import com.travelplanner.dto.response.AuthResponseDTO;
import com.travelplanner.exception.InvalidInputException;
import com.travelplanner.model.User;
import com.travelplanner.repository.UserRepository;
import com.travelplanner.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new InvalidInputException("Email sudah terdaftar");
        }

        User user = new User();
        user.setNama(dto.getNama());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponseDTO(token, user);
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new InvalidInputException("Email atau password salah"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InvalidInputException("Email atau password salah");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponseDTO(token, user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidInputException("User tidak ditemukan"));
    }

    public User updateProfile(User user, com.travelplanner.dto.request.UserUpdateRequestDTO dto) {
        if (dto.getNama() != null && !dto.getNama().isBlank()) {
            user.setNama(dto.getNama());
        }
        // Jika email diubah dan tidak sama dengan email lama, cek apakah sudah dipakai
        if (dto.getEmail() != null && !dto.getEmail().isBlank() && !dto.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(dto.getEmail())) {
                throw new InvalidInputException("Email sudah terdaftar oleh pengguna lain");
            }
            user.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        return userRepository.save(user);
    }
}
