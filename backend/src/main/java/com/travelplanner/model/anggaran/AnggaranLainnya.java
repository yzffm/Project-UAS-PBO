package com.travelplanner.model.anggaran;

import com.travelplanner.model.base.AnggaranItem;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * SUBCLASS: AnggaranLainnya extends AnggaranItem
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("LAINNYA")
public class AnggaranLainnya extends AnggaranItem {

    private String subKategori; // "Tiket Masuk", "Oleh-oleh", "Darurat"

    public AnggaranLainnya() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategoriAnggaran() {
        return "Lainnya";
    }

    @Override
    public String getIconAnggaran() {
        return "📦";
    }

    // ===== Getters & Setters =====

    public String getSubKategori() {
        return subKategori;
    }

    public void setSubKategori(String subKategori) {
        this.subKategori = subKategori;
    }
}
