package com.travelplanner.model.destinasi;

import com.travelplanner.model.base.Destinasi;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * SUBCLASS: WisataAlam extends Destinasi
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("ALAM")
public class WisataAlam extends Destinasi {

    private String jenisAlam;        // "Pantai", "Gunung", "Air Terjun", "Danau"
    private String tingkatKesulitan; // "Mudah", "Sedang", "Sulit"
    private Boolean perluGuide;
    private String musimTerbaik;     // "Kemarau", "Hujan", "Sepanjang Tahun"

    public WisataAlam() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategori() {
        return "Wisata Alam";
    }

    @Override
    public String getIconKategori() {
        return "🏔️";
    }

    @Override
    public String getTipsKunjungan() {
        return "Gunakan alas kaki nyaman. Bawa air minum cukup. Cek cuaca sebelum berangkat.";
    }

    // ===== Getters & Setters =====

    public String getJenisAlam() {
        return jenisAlam;
    }

    public void setJenisAlam(String jenisAlam) {
        this.jenisAlam = jenisAlam;
    }

    public String getTingkatKesulitan() {
        return tingkatKesulitan;
    }

    public void setTingkatKesulitan(String tingkatKesulitan) {
        this.tingkatKesulitan = tingkatKesulitan;
    }

    public Boolean getPerluGuide() {
        return perluGuide;
    }

    public void setPerluGuide(Boolean perluGuide) {
        this.perluGuide = perluGuide;
    }

    public String getMusimTerbaik() {
        return musimTerbaik;
    }

    public void setMusimTerbaik(String musimTerbaik) {
        this.musimTerbaik = musimTerbaik;
    }
}
