package com.travelplanner.model.anggaran;

import com.travelplanner.model.base.AnggaranItem;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * SUBCLASS: AnggaranKonsumsi extends AnggaranItem
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("KONSUMSI")
public class AnggaranKonsumsi extends AnggaranItem {

    private String waktuMakan; // "Sarapan", "Makan Siang", "Makan Malam", "Snack"
    private Integer jumlahOrang;

    public AnggaranKonsumsi() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategoriAnggaran() {
        return "Konsumsi";
    }

    @Override
    public String getIconAnggaran() {
        return "🍽️";
    }

    // ===== Getters & Setters =====

    public String getWaktuMakan() {
        return waktuMakan;
    }

    public void setWaktuMakan(String waktuMakan) {
        this.waktuMakan = waktuMakan;
    }

    public Integer getJumlahOrang() {
        return jumlahOrang;
    }

    public void setJumlahOrang(Integer jumlahOrang) {
        this.jumlahOrang = jumlahOrang;
    }
}
