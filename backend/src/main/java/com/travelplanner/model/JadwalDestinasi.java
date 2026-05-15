package com.travelplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.travelplanner.model.base.Destinasi;
import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "jadwal_destinasi")
public class JadwalDestinasi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer urutan;

    private LocalTime waktuMulai;

    private LocalTime waktuSelesai;

    @Column(columnDefinition = "TEXT")
    private String catatan;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hari_id")
    private HariPerjalanan hariPerjalanan;

    // FIX: Ubah dari LAZY menjadi EAGER agar Jackson tidak crash saat parsing JSON
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destinasi_id")
    private Destinasi destinasi;

    public JadwalDestinasi() {
    }

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUrutan() {
        return urutan;
    }

    public void setUrutan(Integer urutan) {
        this.urutan = urutan;
    }

    public LocalTime getWaktuMulai() {
        return waktuMulai;
    }

    public void setWaktuMulai(LocalTime waktuMulai) {
        this.waktuMulai = waktuMulai;
    }

    public LocalTime getWaktuSelesai() {
        return waktuSelesai;
    }

    public void setWaktuSelesai(LocalTime waktuSelesai) {
        this.waktuSelesai = waktuSelesai;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public HariPerjalanan getHariPerjalanan() {
        return hariPerjalanan;
    }

    public void setHariPerjalanan(HariPerjalanan hariPerjalanan) {
        this.hariPerjalanan = hariPerjalanan;
    }

    public Destinasi getDestinasi() {
        return destinasi;
    }

    public void setDestinasi(Destinasi destinasi) {
        this.destinasi = destinasi;
    }
}
