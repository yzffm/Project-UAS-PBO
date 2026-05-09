package com.travelplanner.model.anggaran;

import com.travelplanner.model.base.AnggaranItem;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

/**
 * SUBCLASS: AnggaranTransportasi extends AnggaranItem
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("TRANSPORTASI")
public class AnggaranTransportasi extends AnggaranItem {

    private String modeTransportasi; // "Pesawat", "Kereta", "Bus", "Mobil"
    private String asal;
    private String tujuan;
    private LocalDate tanggalKeberangkatan;

    public AnggaranTransportasi() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategoriAnggaran() {
        return "Transportasi";
    }

    @Override
    public String getIconAnggaran() {
        return "🚗";
    }

    // ===== Getters & Setters =====

    public String getModeTransportasi() {
        return modeTransportasi;
    }

    public void setModeTransportasi(String modeTransportasi) {
        this.modeTransportasi = modeTransportasi;
    }

    public String getAsal() {
        return asal;
    }

    public void setAsal(String asal) {
        this.asal = asal;
    }

    public String getTujuan() {
        return tujuan;
    }

    public void setTujuan(String tujuan) {
        this.tujuan = tujuan;
    }

    public LocalDate getTanggalKeberangkatan() {
        return tanggalKeberangkatan;
    }

    public void setTanggalKeberangkatan(LocalDate tanggalKeberangkatan) {
        this.tanggalKeberangkatan = tanggalKeberangkatan;
    }
}
