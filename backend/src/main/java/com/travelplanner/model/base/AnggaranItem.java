package com.travelplanner.model.base;

import com.travelplanner.model.Kalkulasi;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

/**
 * ABSTRACT SUPERCLASS: AnggaranItem
 * Demonstrates: Inheritance, Polymorphism, Encapsulation, ISP (Kalkulasi).
 *
 * Uses SINGLE_TABLE inheritance — all budget item types share one table
 * with a discriminator column 'kategori_anggaran'.
 */
@Entity
@Table(name = "anggaran_item")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "kategori_anggaran")
public abstract class AnggaranItem implements Kalkulasi {

    private static final double ZERO_THRESHOLD = 0.0;

    // ENCAPSULATION: all fields private
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nama item tidak boleh kosong")
    private String namaItem;

    @DecimalMin("0.0")
    private Double estimasiHarga = 0.0;

    @DecimalMin("0.0")
    private Double hargaAktual = 0.0;

    private Boolean sudahDibayar = false;

    @Column(columnDefinition = "TEXT")
    private String catatan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Perjalanan perjalanan;

    // ===== Constructors =====

    protected AnggaranItem() {
    }

    // ===== POLYMORPHISM: abstract methods =====

    public abstract String getKategoriAnggaran();

    public abstract String getIconAnggaran();

    // ===== Concrete methods (Kalkulasi interface) =====

    /** Positive = over budget, negative = under budget */
    @Override
    public Double getSelisih() {
        return hargaAktual - estimasiHarga;
    }

    @Override
    public String getStatusBudget() {
        double selisih = getSelisih();
        if (selisih > ZERO_THRESHOLD) {
            return "OVER";
        }
        if (selisih < ZERO_THRESHOLD) {
            return "UNDER";
        }
        return "ON_TRACK";
    }

    // ===== Getters & Setters (Encapsulation with validation) =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaItem() {
        return namaItem;
    }

    public void setNamaItem(String namaItem) {
        this.namaItem = namaItem;
    }

    public Double getEstimasiHarga() {
        return estimasiHarga;
    }

    public void setEstimasiHarga(Double estimasiHarga) {
        if (estimasiHarga != null && estimasiHarga < 0) {
            throw new IllegalArgumentException("Estimasi harga tidak boleh negatif");
        }
        this.estimasiHarga = estimasiHarga;
    }

    public Double getHargaAktual() {
        return hargaAktual;
    }

    public void setHargaAktual(Double hargaAktual) {
        if (hargaAktual != null && hargaAktual < 0) {
            throw new IllegalArgumentException("Harga aktual tidak boleh negatif");
        }
        this.hargaAktual = hargaAktual;
    }

    public Boolean getSudahDibayar() {
        return sudahDibayar;
    }

    public void setSudahDibayar(Boolean sudahDibayar) {
        this.sudahDibayar = sudahDibayar;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public Perjalanan getPerjalanan() {
        return perjalanan;
    }

    public void setPerjalanan(Perjalanan perjalanan) {
        this.perjalanan = perjalanan;
    }
}
