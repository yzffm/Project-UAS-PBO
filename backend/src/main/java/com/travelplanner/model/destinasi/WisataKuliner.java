package com.travelplanner.model.destinasi;

import com.travelplanner.model.base.Destinasi;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * SUBCLASS: WisataKuliner extends Destinasi
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("KULINER")
public class WisataKuliner extends Destinasi {

    private String jenisKuliner;   // "Restoran", "Warung", "Kafe", "Street Food"
    private String masakan;        // "Jawa", "Sunda", "Padang", "Western"
    private String rentangHarga;   // "Budget", "Menengah", "Premium"
    private Boolean halalCertified;

    public WisataKuliner() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategori() {
        return "Wisata Kuliner";
    }

    @Override
    public String getIconKategori() {
        return "🍜";
    }

    @Override
    public String getTipsKunjungan() {
        return "Datang saat tidak ramai. Cek jam buka. Siapkan uang tunai.";
    }

    // ===== Getters & Setters =====

    public String getJenisKuliner() {
        return jenisKuliner;
    }

    public void setJenisKuliner(String jenisKuliner) {
        this.jenisKuliner = jenisKuliner;
    }

    public String getMasakan() {
        return masakan;
    }

    public void setMasakan(String masakan) {
        this.masakan = masakan;
    }

    public String getRentangHarga() {
        return rentangHarga;
    }

    public void setRentangHarga(String rentangHarga) {
        this.rentangHarga = rentangHarga;
    }

    public Boolean getHalalCertified() {
        return halalCertified;
    }

    public void setHalalCertified(Boolean halalCertified) {
        this.halalCertified = halalCertified;
    }
}
