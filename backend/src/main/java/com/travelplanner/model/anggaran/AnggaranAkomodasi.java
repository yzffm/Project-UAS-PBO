package com.travelplanner.model.anggaran;

import com.travelplanner.model.base.AnggaranItem;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * SUBCLASS: AnggaranAkomodasi extends AnggaranItem
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("AKOMODASI")
public class AnggaranAkomodasi extends AnggaranItem {

    private String namaHotel;
    private String tipeKamar;
    private Integer jumlahMalam;
    private Double hargaPerMalam;

    public AnggaranAkomodasi() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategoriAnggaran() {
        return "Akomodasi";
    }

    @Override
    public String getIconAnggaran() {
        return "🏨";
    }

    // ===== Getters & Setters =====

    public String getNamaHotel() {
        return namaHotel;
    }

    public void setNamaHotel(String namaHotel) {
        this.namaHotel = namaHotel;
    }

    public String getTipeKamar() {
        return tipeKamar;
    }

    public void setTipeKamar(String tipeKamar) {
        this.tipeKamar = tipeKamar;
    }

    public Integer getJumlahMalam() {
        return jumlahMalam;
    }

    public void setJumlahMalam(Integer jumlahMalam) {
        this.jumlahMalam = jumlahMalam;
    }

    public Double getHargaPerMalam() {
        return hargaPerMalam;
    }

    public void setHargaPerMalam(Double hargaPerMalam) {
        this.hargaPerMalam = hargaPerMalam;
    }
}
