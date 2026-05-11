package com.travelplanner.service;

import com.travelplanner.model.base.Destinasi;
import com.travelplanner.repository.DestinasiRepository;
import com.travelplanner.exception.ResourceNotFoundException; // Sekarang ini harusnya udah nggak merah!
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DestinasiService {

    private final DestinasiRepository destinasiRepository;

    // Pakai Constructor Injection biar sesuai SOLID (Dependency Inversion)
    public DestinasiService(DestinasiRepository destinasiRepository) {
        this.destinasiRepository = destinasiRepository;
    }

    public List<Destinasi> findAll() {
        return destinasiRepository.findAll();
    }

    public Destinasi findById(Long id) {
        return destinasiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destinasi ID " + id + " tidak ketemu, Beb!"));
    }

    public List<Destinasi> search(String query) {
        return destinasiRepository.findByNamaContainingIgnoreCase(query);
    }
}