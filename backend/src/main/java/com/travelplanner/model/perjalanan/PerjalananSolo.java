package com.travelplanner.model.perjalanan;

import com.travelplanner.model.base.Perjalanan;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

/**
 * SUBCLASS: PerjalananSolo extends Perjalanan
 * Demonstrates: Inheritance, Polymorphism, Builder Pattern.
 */
@Entity
@DiscriminatorValue("SOLO")
public class PerjalananSolo extends Perjalanan {

    private String moodPerjalanan; // "Healing", "Petualangan", "Eksplorasi"
    private Boolean modeHemat;

    // Public no-arg constructor for JPA
    public PerjalananSolo() {
        super();
    }

    // Private constructor for Builder
    private PerjalananSolo(Builder builder) {
        this.setNamaTrip(builder.namaTrip);
        this.setDeskripsiTrip(builder.deskripsiTrip);
        this.setTanggalMulai(builder.tanggalMulai);
        this.setTanggalSelesai(builder.tanggalSelesai);
        this.moodPerjalanan = builder.moodPerjalanan;
        this.modeHemat = builder.modeHemat;
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getTipePerjalanan() {
        return "Solo Trip";
    }

    @Override
    public Integer getMaxPeserta() {
        return 1;
    }

    @Override
    public String getBadgeWarna() {
        return "blue";
    }

    // ===== Getters & Setters =====

    public String getMoodPerjalanan() {
        return moodPerjalanan;
    }

    public void setMoodPerjalanan(String moodPerjalanan) {
        this.moodPerjalanan = moodPerjalanan;
    }

    public Boolean getModeHemat() {
        return modeHemat;
    }

    public void setModeHemat(Boolean modeHemat) {
        this.modeHemat = modeHemat;
    }

    // ===== BUILDER PATTERN =====

    public static class Builder {
        private String namaTrip;
        private String deskripsiTrip;
        private LocalDate tanggalMulai;
        private LocalDate tanggalSelesai;
        private String moodPerjalanan;
        private Boolean modeHemat;

        public Builder namaTrip(String namaTrip) {
            this.namaTrip = namaTrip;
            return this;
        }

        public Builder deskripsiTrip(String deskripsiTrip) {
            this.deskripsiTrip = deskripsiTrip;
            return this;
        }

        public Builder tanggalMulai(LocalDate tanggalMulai) {
            this.tanggalMulai = tanggalMulai;
            return this;
        }

        public Builder tanggalSelesai(LocalDate tanggalSelesai) {
            this.tanggalSelesai = tanggalSelesai;
            return this;
        }

        public Builder moodPerjalanan(String moodPerjalanan) {
            this.moodPerjalanan = moodPerjalanan;
            return this;
        }

        public Builder modeHemat(Boolean modeHemat) {
            this.modeHemat = modeHemat;
            return this;
        }

        public PerjalananSolo build() {
            if (namaTrip == null || namaTrip.isBlank()) {
                throw new IllegalStateException("Nama trip wajib diisi");
            }
            if (tanggalMulai == null || tanggalSelesai == null) {
                throw new IllegalStateException("Tanggal mulai dan selesai wajib diisi");
            }
            if (tanggalSelesai.isBefore(tanggalMulai)) {
                throw new IllegalStateException("Tanggal selesai harus setelah tanggal mulai");
            }
            return new PerjalananSolo(this);
        }
    }
}
