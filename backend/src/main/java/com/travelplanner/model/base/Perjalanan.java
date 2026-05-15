package com.travelplanner.model.base;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.travelplanner.model.User;
import com.travelplanner.model.enums.StatusTrip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * ABSTRACT SUPERCLASS: Perjalanan
 * Demonstrates: Inheritance, Polymorphism, Encapsulation.
 *
 * Uses SINGLE_TABLE inheritance — all trip types share one table
 * with a discriminator column 'tipe_perjalanan'.
 */
@Entity
@Table(name = "trips")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipe_perjalanan", discriminatorType = DiscriminatorType.STRING)
public abstract class Perjalanan {

    // ENCAPSULATION: all fields private
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama trip tidak boleh kosong")
    private String namaTrip;

    @Column(columnDefinition = "TEXT")
    private String deskripsiTrip;

    @NotNull(message = "Tanggal mulai wajib diisi")
    private LocalDate tanggalMulai;

    @NotNull(message = "Tanggal selesai wajib diisi")
    private LocalDate tanggalSelesai;

    @Enumerated(EnumType.STRING)
    private StatusTrip status = StatusTrip.DRAFT;

    private String coverImageUrl;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User pemilik;

    // ===== Constructors =====

    protected Perjalanan() {
    }

    // ===== POLYMORPHISM: abstract methods =====

    public abstract String getTipePerjalanan();

    public abstract Integer getMaxPeserta();

    /** Returns CSS color class for UI badge */
    public abstract String getBadgeWarna();

    // ===== Concrete method — inherited by all subclasses =====

    public long getDurasiHari() {
        if (tanggalMulai == null || tanggalSelesai == null) {
            return 0;
        }
        return ChronoUnit.DAYS.between(tanggalMulai, tanggalSelesai) + 1;
    }

    // ===== Getters & Setters (Encapsulation with validation) =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaTrip() {
        return namaTrip;
    }

    public void setNamaTrip(String namaTrip) {
        this.namaTrip = namaTrip;
    }

    public String getDeskripsiTrip() {
        return deskripsiTrip;
    }

    public void setDeskripsiTrip(String deskripsiTrip) {
        this.deskripsiTrip = deskripsiTrip;
    }

    public LocalDate getTanggalMulai() {
        return tanggalMulai;
    }

    public void setTanggalMulai(LocalDate tanggalMulai) {
        this.tanggalMulai = tanggalMulai;
    }

    public LocalDate getTanggalSelesai() {
        return tanggalSelesai;
    }

    public void setTanggalSelesai(LocalDate tanggalSelesai) {
        if (tanggalSelesai != null && tanggalMulai != null && tanggalSelesai.isBefore(tanggalMulai)) {
            throw new IllegalArgumentException("Tanggal selesai harus setelah tanggal mulai");
        }
        this.tanggalSelesai = tanggalSelesai;
    }

    public StatusTrip getStatus() {
        return status;
    }

    public void setStatus(StatusTrip status) {
        this.status = status;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public User getPemilik() {
        return pemilik;
    }

    public void setPemilik(User pemilik) {
        this.pemilik = pemilik;
    }
}
