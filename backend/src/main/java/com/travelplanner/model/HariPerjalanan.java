package com.travelplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.travelplanner.model.base.Perjalanan;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hari_perjalanan")
public class HariPerjalanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 1, message = "Hari ke- minimal 1")
    private Integer hariKe;

    private Integer urutanHari;

    @NotNull(message = "Tanggal wajib diisi")
    private LocalDate tanggal;

    private String catatan;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Perjalanan perjalanan;

    // FIX: Tambahkan fetch = FetchType.EAGER di sini
    @OneToMany(mappedBy = "hariPerjalanan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
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

    public Integer getUrutanHari() {
        return urutanHari;
    }

    public void setUrutanHari(Integer urutanHari) {
        this.urutanHari = urutanHari;
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
