package com.travelplanner.controller;

import com.travelplanner.dto.request.PerjalananRequestDTO;
import com.travelplanner.dto.response.PerjalananResponseDTO;
import com.travelplanner.model.User;
import com.travelplanner.service.PerjalananService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class PerjalananController {

    private final PerjalananService perjalananService;

    // Dependency Injection melalui Constructor sesuai prinsip SOLID (DIP)
    public PerjalananController(PerjalananService perjalananService) {
        this.perjalananService = perjalananService;
    }

    /**
     * Membuat perjalanan baru.
     * Endpoint: POST /api/trips
     */
    @PostMapping
    public ResponseEntity<PerjalananResponseDTO> createTrip(
            @Valid @RequestBody PerjalananRequestDTO dto,
            @AuthenticationPrincipal User user) {

        PerjalananResponseDTO newTrip = perjalananService.createTrip(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTrip);
    }

    /**
     * Mendapatkan semua daftar perjalanan milik user yang sedang login.
     * Endpoint: GET /api/trips
     */
    @GetMapping
    public ResponseEntity<List<PerjalananResponseDTO>> getAllTrips(
            @AuthenticationPrincipal User user) {

        List<PerjalananResponseDTO> trips = perjalananService.getTripsByUser(user);
        return ResponseEntity.ok(trips);
    }

    /**
     * Mendapatkan detail spesifik sebuah perjalanan berdasarkan ID.
     * Endpoint: GET /api/trips/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<PerjalananResponseDTO> getTripDetail(@PathVariable Long id) {
        PerjalananResponseDTO trip = perjalananService.getTripById(id);
        return ResponseEntity.ok(trip);
    }

    /**
     * Menghapus perjalanan berdasarkan ID.
     * Endpoint: DELETE /api/trips/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        perjalananService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}