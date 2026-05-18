package com.travelplanner.service;

import com.travelplanner.model.base.Destinasi;
import com.travelplanner.model.destinasi.WisataAlam;
import com.travelplanner.model.destinasi.WisataBudaya;
import com.travelplanner.model.destinasi.WisataKuliner;
import com.travelplanner.repository.DestinasiRepository;
import com.travelplanner.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinasiService {

    private final DestinasiRepository destinasiRepository;

    public DestinasiService(DestinasiRepository destinasiRepository) {
        this.destinasiRepository = destinasiRepository;
    }

    // Method 1: Ambil semua destinasi dengan filter tipe
    // UBAH method findAll menjadi seperti ini:
    public List<Destinasi> findAll(String tipe, String query) {
        // 1. Filter berdasarkan pencarian nama dulu (jika ada)
        List<Destinasi> destinasiAwal = (query != null && !query.isBlank())
                ? destinasiRepository.findByNamaContainingIgnoreCase(query)
                : destinasiRepository.findAll();

        // 2. Jika tidak ada filter kategori, langsung kembalikan
        if (tipe == null || tipe.isBlank() || tipe.equalsIgnoreCase("Semua")) {
            return destinasiAwal;
        }

        // 3. Filter list berdasarkan subclass (Polymorphism)
        return destinasiAwal.stream()
                .filter(destinasi -> {
                    if (tipe.equalsIgnoreCase("ALAM"))
                        return destinasi instanceof WisataAlam;
                    if (tipe.equalsIgnoreCase("BUDAYA"))
                        return destinasi instanceof WisataBudaya;
                    if (tipe.equalsIgnoreCase("KULINER"))
                        return destinasi instanceof WisataKuliner;
                    return false;
                })
                .collect(Collectors.toList());
    }

    // Method 2: Cari berdasarkan ID (Yang tadi nggak sengaja kehapus)
    public Destinasi findById(Long id) {
        return destinasiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destinasi ID " + id + " tidak ketemu, Beb!"));
    }

    // Method 3: Fitur Pencarian (Yang tadi nggak sengaja kehapus)
    public List<Destinasi> search(String query) {
        return destinasiRepository.findByNamaContainingIgnoreCase(query);
    }
}