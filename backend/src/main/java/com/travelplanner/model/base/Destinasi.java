package com.travelplanner.model.base;

import com.travelplanner.model.Kategorisasi;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * ABSTRACT SUPERCLASS: Destinasi
 * Demonstrates: Inheritance, Polymorphism, Encapsulation, ISP (Kategorisasi).
 *
 * Uses SINGLE_TABLE inheritance — all destination types share one table
 * with a discriminator column 'tipe_destinasi'.
 */
@Entity
@Table(name = "destinasi")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipe_destinasi", discriminatorType = DiscriminatorType.STRING)
public abstract class Destinasi implements Kategorisasi {

    // ENCAPSULATION: all fields private
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama destinasi tidak boleh kosong")
    private String nama;

    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    private String lokasi;

    private String alamatLengkap;

    @DecimalMin(value = "0.0", message = "Estimasi biaya tidak boleh negatif")
    private Double estimasiBiaya = 0.0;

    private String gambarUrl;

    @Min(value = 1, message = "Durasi minimal 1 menit")
    private Integer durasiRekomendasi = 60;

    // ===== Constructors =====

    protected Destinasi() {
    }

    // ===== POLYMORPHISM: abstract methods — each subclass implements differently =====

    @Override
    public abstract String getKategori();

    @Override
    public abstract String getIconKategori();

    public abstract String getTipsKunjungan();

    // ===== Concrete method — inherited by all subclasses =====

    public String getRingkasan() {
        return String.format("[%s] %s — Est. Rp%.0f", getKategori(), nama, estimasiBiaya);
    }

    // ===== Getters & Setters (Encapsulation with validation) =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public String getLokasi() {
        return lokasi;
    }

    public void setLokasi(String lokasi) {
        this.lokasi = lokasi;
    }

    public String getAlamatLengkap() {
        return alamatLengkap;
    }

    public void setAlamatLengkap(String alamatLengkap) {
        this.alamatLengkap = alamatLengkap;
    }

    public Double getEstimasiBiaya() {
        return estimasiBiaya;
    }

    public void setEstimasiBiaya(Double estimasiBiaya) {
        if (estimasiBiaya != null && estimasiBiaya < 0) {
            throw new IllegalArgumentException("Estimasi biaya tidak boleh negatif");
        }
        this.estimasiBiaya = estimasiBiaya;
    }

    public String getGambarUrl() {
        return gambarUrl;
    }

    public void setGambarUrl(String gambarUrl) {
        this.gambarUrl = gambarUrl;
    }

    public Integer getDurasiRekomendasi() {
        return durasiRekomendasi;
    }

    public void setDurasiRekomendasi(Integer durasiRekomendasi) {
        if (durasiRekomendasi != null && durasiRekomendasi < 1) {
            throw new IllegalArgumentException("Durasi minimal 1 menit");
        }
        this.durasiRekomendasi = durasiRekomendasi;
    }
}
