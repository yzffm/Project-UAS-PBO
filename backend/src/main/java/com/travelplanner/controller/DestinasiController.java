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
    @GetMapping
    public ResponseEntity<List<Destinasi>> getAll(@RequestParam(required = false) String tipe) {
        return ResponseEntity.ok(destinasiService.findAll(tipe));
    }

    // Mencari destinasi berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<Destinasi> getById(@PathVariable Long id) {
        return ResponseEntity.ok(destinasiService.findById(id));
    }

    // Fitur Search untuk pencarian nama/lokasi
    @GetMapping("/search")
    public ResponseEntity<List<Destinasi>> search(@RequestParam String q) {
        return ResponseEntity.ok(destinasiService.search(q));
    }
}