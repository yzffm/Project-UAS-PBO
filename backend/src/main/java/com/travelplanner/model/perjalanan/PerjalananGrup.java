package com.travelplanner.model.perjalanan;

import com.travelplanner.model.base.Perjalanan;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

/**
 * SUBCLASS: PerjalananGrup extends Perjalanan
 * Demonstrates: Inheritance, Polymorphism, Builder Pattern.
 */
@Entity
@DiscriminatorValue("GRUP")
public class PerjalananGrup extends Perjalanan {

    private static final int MINIMUM_PESERTA_GRUP = 2;

    private Integer jumlahPeserta;
    private String namaGrup;
    private String temaGrup;

    // Public no-arg constructor for JPA
    public PerjalananGrup() {
        super();
    }

    // Private constructor for Builder
    private PerjalananGrup(Builder builder) {
        this.setNamaTrip(builder.namaTrip);
        this.setDeskripsiTrip(builder.deskripsiTrip);
        this.setTanggalMulai(builder.tanggalMulai);
        this.setTanggalSelesai(builder.tanggalSelesai);
        this.jumlahPeserta = builder.jumlahPeserta;
        this.namaGrup = builder.namaGrup;
        this.temaGrup = builder.temaGrup;
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getTipePerjalanan() {
        return "Group Trip";
    }

    @Override
    public Integer getMaxPeserta() {
        return jumlahPeserta;
    }

    @Override
    public String getBadgeWarna() {
        return "green";
    }

    @Override
    public double hitungBiayaPerOrang(double totalBiaya) {
        // Group trip: Biaya dibagi rata sesuai jumlah peserta
        if (jumlahPeserta == null || jumlahPeserta <= 0)
            return totalBiaya; // Safety check
        return totalBiaya / jumlahPeserta;
    }

    // ===== Getters & Setters =====

    public Integer getJumlahPeserta() {
        return jumlahPeserta;
    }

    public void setJumlahPeserta(Integer jumlahPeserta) {
        this.jumlahPeserta = jumlahPeserta;
    }

    public String getNamaGrup() {
        return namaGrup;
    }

    public void setNamaGrup(String namaGrup) {
        this.namaGrup = namaGrup;
    }

    public String getTemaGrup() {
        return temaGrup;
    }

    public void setTemaGrup(String temaGrup) {
        this.temaGrup = temaGrup;
    }

    // ===== BUILDER PATTERN =====

    public static class Builder {
        private String namaTrip;
        private String deskripsiTrip;
        private LocalDate tanggalMulai;
        private LocalDate tanggalSelesai;
        private Integer jumlahPeserta;
        private String namaGrup;
        private String temaGrup;

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

        public Builder jumlahPeserta(Integer jumlahPeserta) {
            this.jumlahPeserta = jumlahPeserta;
            return this;
        }

        public Builder namaGrup(String namaGrup) {
            this.namaGrup = namaGrup;
            return this;
        }

        public Builder temaGrup(String temaGrup) {
            this.temaGrup = temaGrup;
            return this;
        }

        public PerjalananGrup build() {
            if (namaTrip == null || namaTrip.isBlank()) {
                throw new IllegalStateException("Nama trip wajib diisi");
            }
            if (tanggalMulai == null || tanggalSelesai == null) {
                throw new IllegalStateException("Tanggal mulai dan selesai wajib diisi");
            }
            if (tanggalSelesai.isBefore(tanggalMulai)) {
                throw new IllegalStateException("Tanggal selesai harus setelah tanggal mulai");
            }
            if (jumlahPeserta == null || jumlahPeserta < MINIMUM_PESERTA_GRUP) {
                throw new IllegalStateException("Jumlah peserta grup minimal " + MINIMUM_PESERTA_GRUP + " orang");
            }
            return new PerjalananGrup(this);
        }
    }
}
