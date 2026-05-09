package com.travelplanner.factory;

import com.travelplanner.dto.request.PerjalananRequestDTO;
import com.travelplanner.model.base.Perjalanan;
import com.travelplanner.model.perjalanan.PerjalananGrup;
import com.travelplanner.model.perjalanan.PerjalananKeluarga;
import com.travelplanner.model.perjalanan.PerjalananSolo;

/**
 * FACTORY PATTERN: Centralizes trip creation logic.
 * OCP: Adding a new trip type = add one case here only, no other code changes.
 *
 * Combines Factory + Builder pattern — each trip type is built via its Builder.
 */
public class PerjalananFactory {

    private PerjalananFactory() {
        // Utility class — prevent instantiation
    }

    /**
     * Creates the correct Perjalanan subclass based on trip type.
     *
     * @param tipe "SOLO", "GRUP", or "KELUARGA"
     * @param dto  the request DTO containing all trip fields
     * @return the built Perjalanan subclass instance
     * @throws IllegalArgumentException if tipe is unknown
     */
    public static Perjalanan create(String tipe, PerjalananRequestDTO dto) {
        return switch (tipe.toUpperCase()) {
            case "SOLO" -> buildSolo(dto);
            case "GRUP" -> buildGrup(dto);
            case "KELUARGA" -> buildKeluarga(dto);
            default -> throw new IllegalArgumentException("Tipe perjalanan tidak dikenal: " + tipe);
        };
    }

    private static PerjalananSolo buildSolo(PerjalananRequestDTO dto) {
        return new PerjalananSolo.Builder()
                .namaTrip(dto.getNamaTrip())
                .deskripsiTrip(dto.getDeskripsiTrip())
                .tanggalMulai(dto.getTanggalMulai())
                .tanggalSelesai(dto.getTanggalSelesai())
                .moodPerjalanan(dto.getMoodPerjalanan())
                .modeHemat(dto.getModeHemat())
                .build();
    }

    private static PerjalananGrup buildGrup(PerjalananRequestDTO dto) {
        return new PerjalananGrup.Builder()
                .namaTrip(dto.getNamaTrip())
                .deskripsiTrip(dto.getDeskripsiTrip())
                .tanggalMulai(dto.getTanggalMulai())
                .tanggalSelesai(dto.getTanggalSelesai())
                .jumlahPeserta(dto.getJumlahPeserta())
                .namaGrup(dto.getNamaGrup())
                .temaGrup(dto.getTemaGrup())
                .build();
    }

    private static PerjalananKeluarga buildKeluarga(PerjalananRequestDTO dto) {
        return new PerjalananKeluarga.Builder()
                .namaTrip(dto.getNamaTrip())
                .deskripsiTrip(dto.getDeskripsiTrip())
                .tanggalMulai(dto.getTanggalMulai())
                .tanggalSelesai(dto.getTanggalSelesai())
                .jumlahDewasa(dto.getJumlahDewasa())
                .jumlahAnak(dto.getJumlahAnak())
                .adaLansia(dto.getAdaLansia())
                .adaBalita(dto.getAdaBalita())
                .build();
    }
}
