package com.travelplanner.model.perjalanan;

import com.travelplanner.model.base.Perjalanan;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

/**
 * SUBCLASS: PerjalananKeluarga extends Perjalanan
 * Demonstrates: Inheritance, Polymorphism, Builder Pattern.
 */
@Entity
@DiscriminatorValue("KELUARGA")
public class PerjalananKeluarga extends Perjalanan {

    private Integer jumlahDewasa;
    private Integer jumlahAnak;
    private Boolean adaLansia;
    private Boolean adaBalita;

    // Public no-arg constructor for JPA
    public PerjalananKeluarga() {
        super();
    }

    // Private constructor for Builder
    private PerjalananKeluarga(Builder builder) {
        this.setNamaTrip(builder.namaTrip);
        this.setDeskripsiTrip(builder.deskripsiTrip);
        this.setTanggalMulai(builder.tanggalMulai);
        this.setTanggalSelesai(builder.tanggalSelesai);
        this.jumlahDewasa = builder.jumlahDewasa;
        this.jumlahAnak = builder.jumlahAnak;
        this.adaLansia = builder.adaLansia;
        this.adaBalita = builder.adaBalita;
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getTipePerjalanan() {
        return "Family Trip";
    }

    @Override
    public Integer getMaxPeserta() {
        int dewasa = (jumlahDewasa != null) ? jumlahDewasa : 0;
        int anak = (jumlahAnak != null) ? jumlahAnak : 0;
        return dewasa + anak;
    }

    @Override
    public String getBadgeWarna() {
        return "orange";
    }

    @Override
    public double hitungBiayaPerOrang(double totalBiaya) {
        int totalKeluarga = getMaxPeserta();
        if (totalKeluarga <= 0)
            return totalBiaya;
        double totalSetelahEfisiensi = totalBiaya * 0.90;
        return totalSetelahEfisiensi / totalKeluarga;
    }

    // ===== Getters & Setters =====

    public Integer getJumlahDewasa() {
        return jumlahDewasa;
    }

    public void setJumlahDewasa(Integer jumlahDewasa) {
        this.jumlahDewasa = jumlahDewasa;
    }

    public Integer getJumlahAnak() {
        return jumlahAnak;
    }

    public void setJumlahAnak(Integer jumlahAnak) {
        this.jumlahAnak = jumlahAnak;
    }

    public Boolean getAdaLansia() {
        return adaLansia;
    }

    public void setAdaLansia(Boolean adaLansia) {
        this.adaLansia = adaLansia;
    }

    public Boolean getAdaBalita() {
        return adaBalita;
    }

    public void setAdaBalita(Boolean adaBalita) {
        this.adaBalita = adaBalita;
    }

    // ===== BUILDER PATTERN =====

    public static class Builder {
        private String namaTrip;
        private String deskripsiTrip;
        private LocalDate tanggalMulai;
        private LocalDate tanggalSelesai;
        private Integer jumlahDewasa;
        private Integer jumlahAnak;
        private Boolean adaLansia;
        private Boolean adaBalita;

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

        public Builder jumlahDewasa(Integer jumlahDewasa) {
            this.jumlahDewasa = jumlahDewasa;
            return this;
        }

        public Builder jumlahAnak(Integer jumlahAnak) {
            this.jumlahAnak = jumlahAnak;
            return this;
        }

        public Builder adaLansia(Boolean adaLansia) {
            this.adaLansia = adaLansia;
            return this;
        }

        public Builder adaBalita(Boolean adaBalita) {
            this.adaBalita = adaBalita;
            return this;
        }

        public PerjalananKeluarga build() {
            if (namaTrip == null || namaTrip.isBlank()) {
                throw new IllegalStateException("Nama trip wajib diisi");
            }
            if (tanggalMulai == null || tanggalSelesai == null) {
                throw new IllegalStateException("Tanggal mulai dan selesai wajib diisi");
            }
            if (tanggalSelesai.isBefore(tanggalMulai)) {
                throw new IllegalStateException("Tanggal selesai harus setelah tanggal mulai");
            }
            if (jumlahDewasa == null || jumlahDewasa < 1) {
                throw new IllegalStateException("Minimal 1 orang dewasa dalam perjalanan keluarga");
            }
            return new PerjalananKeluarga(this);
        }
    }
}
