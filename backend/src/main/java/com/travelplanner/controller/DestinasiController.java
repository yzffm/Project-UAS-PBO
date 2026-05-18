package com.travelplanner.controller;

import com.travelplanner.model.base.Destinasi;
import com.travelplanner.service.DestinasiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinasi")
@CrossOrigin("*") // Penting: Biar React nggak kena blokir CORS
public class DestinasiController {

    private final DestinasiService destinasiService;

    public DestinasiController(DestinasiService destinasiService) {
        this.destinasiService = destinasiService;
    }

    // FIX: Menerima param 'tipe' dan meneruskannya ke Service
    // UBAH method getAll menjadi seperti ini:
    @GetMapping
    public ResponseEntity<List<Destinasi>> getAll(
            @RequestParam(required = false) String tipe,
            @RequestParam(required = false) String q) { // Tambahkan param q
        return ResponseEntity.ok(destinasiService.findAll(tipe, q));
    }

    // Method search() di bawahnya boleh dihapus saja karena sudah digabung ke
    // getAll

    // Mencari destinasi berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<Destinasi> getById(@PathVariable Long id) {
        return ResponseEntity.ok(destinasiService.findById(id));
    }
}