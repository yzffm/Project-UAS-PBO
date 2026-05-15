package com.travelplanner.service;

import com.travelplanner.dto.request.PerjalananRequestDTO;
import com.travelplanner.dto.response.PerjalananResponseDTO;
import com.travelplanner.dto.response.UserResponseDTO;
import com.travelplanner.exception.ResourceNotFoundException;
import com.travelplanner.factory.PerjalananFactory;
import com.travelplanner.model.User;
import com.travelplanner.model.base.Perjalanan;
import com.travelplanner.model.perjalanan.PerjalananGrup;
import com.travelplanner.model.perjalanan.PerjalananKeluarga;
import com.travelplanner.model.perjalanan.PerjalananSolo;
import com.travelplanner.repository.PerjalananRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerjalananService {

    private final PerjalananRepository perjalananRepository;

    public PerjalananService(PerjalananRepository perjalananRepository) {
        this.perjalananRepository = perjalananRepository;
    }

    // ===== PUBLIC API — return DTO (untuk Controller) =====

    public PerjalananResponseDTO createTrip(PerjalananRequestDTO dto, User user) {
        Perjalanan perjalanan = PerjalananFactory.create(dto.getTipePerjalanan(), dto);
        perjalanan.setPemilik(user);
        Perjalanan saved = perjalananRepository.save(perjalanan);
        return toDTO(saved);
    }

    public List<PerjalananResponseDTO> getTripsByUser(User user) {
        return perjalananRepository.findByPemilikId(user.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public PerjalananResponseDTO getTripById(Long id) {
        return toDTO(getTripEntityById(id));
    }

    public void deleteTrip(Long id) {
        perjalananRepository.delete(getTripEntityById(id));
    }

    // ===== INTERNAL — return raw entity (untuk Service lain) =====

    /**
     * Digunakan oleh service lain (AnggaranService, ItineraryService)
     * yang butuh entity Perjalanan untuk operasi JPA (setPerjalanan, relasi, dll).
     * Jangan expose method ini ke Controller.
     */
    public Perjalanan getTripEntityById(Long id) {
        return perjalananRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip tidak ditemukan dengan id: " + id));
    }

    // ===== MAPPER — entity to DTO =====

    public PerjalananResponseDTO toDTO(Perjalanan p) {
        PerjalananResponseDTO dto = new PerjalananResponseDTO();

        dto.setId(p.getId());
        dto.setNamaTrip(p.getNamaTrip());
        dto.setDeskripsiTrip(p.getDeskripsiTrip());
        dto.setTanggalMulai(p.getTanggalMulai());
        dto.setTanggalSelesai(p.getTanggalSelesai());
        dto.setStatus(p.getStatus() != null ? p.getStatus().name() : null);
        dto.setTipePerjalanan(p.getTipePerjalanan());
        dto.setCoverImageUrl(p.getCoverImageUrl());
        dto.setBadgeWarna(p.getBadgeWarna());
        dto.setDurasiHari(p.getDurasiHari());

        if (p.getPemilik() != null) {
            UserResponseDTO pemilikDTO = new UserResponseDTO();
            pemilikDTO.setId(p.getPemilik().getId());
            pemilikDTO.setNama(p.getPemilik().getNama());
            pemilikDTO.setEmail(p.getPemilik().getEmail());
            dto.setPemilik(pemilikDTO);
        }

        // POLYMORPHISM: map field spesifik per subclass
        if (p instanceof PerjalananSolo solo) {
            dto.setMoodPerjalanan(solo.getMoodPerjalanan());
            dto.setModeHemat(solo.getModeHemat());
        } else if (p instanceof PerjalananGrup grup) {
            dto.setJumlahPeserta(grup.getJumlahPeserta());
            dto.setNamaGrup(grup.getNamaGrup());
            dto.setTemaGrup(grup.getTemaGrup());
        } else if (p instanceof PerjalananKeluarga keluarga) {
            dto.setJumlahDewasa(keluarga.getJumlahDewasa());
            dto.setJumlahAnak(keluarga.getJumlahAnak());
            dto.setAdaLansia(keluarga.getAdaLansia());
            dto.setAdaBalita(keluarga.getAdaBalita());
        }

        return dto;
    }
}