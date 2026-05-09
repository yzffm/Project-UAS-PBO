package com.travelplanner.model.destinasi;

import com.travelplanner.model.base.Destinasi;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * SUBCLASS: WisataBudaya extends Destinasi
 * Demonstrates: Inheritance, Polymorphism (overrides abstract methods).
 */
@Entity
@DiscriminatorValue("BUDAYA")
public class WisataBudaya extends Destinasi {

    private String jenisBudaya;    // "Museum", "Candi", "Keraton", "Kampung Adat"
    private String periodeBudaya;
    private Boolean adaPemandu;
    private String dresscode;

    public WisataBudaya() {
        super();
    }

    // ===== POLYMORPHISM: override abstract methods =====

    @Override
    public String getKategori() {
        return "Wisata Budaya";
    }

    @Override
    public String getIconKategori() {
        return "🏛️";
    }

    @Override
    public String getTipsKunjungan() {
        return "Patuhi aturan berpakaian. Jaga ketenangan. Hormati ritual setempat.";
    }

    // ===== Getters & Setters =====

    public String getJenisBudaya() {
        return jenisBudaya;
    }

    public void setJenisBudaya(String jenisBudaya) {
        this.jenisBudaya = jenisBudaya;
    }

    public String getPeriodeBudaya() {
        return periodeBudaya;
    }

    public void setPeriodeBudaya(String periodeBudaya) {
        this.periodeBudaya = periodeBudaya;
    }

    public Boolean getAdaPemandu() {
        return adaPemandu;
    }

    public void setAdaPemandu(Boolean adaPemandu) {
        this.adaPemandu = adaPemandu;
    }

    public String getDresscode() {
        return dresscode;
    }

    public void setDresscode(String dresscode) {
        this.dresscode = dresscode;
    }
}
