package com.travelplanner.model;

import com.travelplanner.model.base.Perjalanan;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * HariPerjalanan — represents one day in a trip's itinerary.
 * Each trip can have multiple days, each day can have multiple scheduled destinations.
 */
@Entity
@Table(name = "hari_perjalanan")
public class HariPerjalanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1, message = "Hari ke- minimal 1")
    private Integer hariKe;

    @NotNull(message = "Tanggal wajib diisi")
    private LocalDate tanggal;

    private String catatan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Perjalanan perjalanan;

    @OneToMany(mappedBy = "hariPerjalanan", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("urutan ASC")
    private List<JadwalDestinasi> jadwalList = new ArrayList<>();

    public HariPerjalanan() {
    }

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getHariKe() {
        return hariKe;
    }

    public void setHariKe(Integer hariKe) {
        this.hariKe = hariKe;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
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

    public List<JadwalDestinasi> getJadwalList() {
        return jadwalList;
    }

    public void setJadwalList(List<JadwalDestinasi> jadwalList) {
        this.jadwalList = jadwalList;
    }
}
