package com.travelplanner.service;

import com.travelplanner.dto.request.PerjalananRequestDTO;
import com.travelplanner.exception.ResourceNotFoundException;
import com.travelplanner.factory.PerjalananFactory;
import com.travelplanner.model.User;
import com.travelplanner.model.base.Perjalanan;
import com.travelplanner.repository.PerjalananRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerjalananService {

    private final PerjalananRepository perjalananRepository;

    public PerjalananService(PerjalananRepository perjalananRepository) {
        this.perjalananRepository = perjalananRepository;
    }

    /**
     * Membuat trip baru menggunakan Factory Pattern.
     * Factory memilih subclass yang tepat berdasarkan tipe di DTO.
     */
    public Perjalanan createTrip(PerjalananRequestDTO dto, User user) {
        Perjalanan perjalanan = PerjalananFactory.create(dto.getTipePerjalanan(), dto);
        perjalanan.setPemilik(user);
        return perjalananRepository.save(perjalanan);
    }

    public List<Perjalanan> getTripsByUser(User user) {
        return perjalananRepository.findByPemilikId(user.getId());
    }

    public Perjalanan getTripById(Long id) {
        return perjalananRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Trip tidak ditemukan dengan id: " + id));
    }

    public Perjalanan save(Perjalanan perjalanan) {
        return perjalananRepository.save(perjalanan);
    }

    public void deleteTrip(Long id) {
        Perjalanan perjalanan = getTripById(id);
        perjalananRepository.delete(perjalanan);
    }
}
