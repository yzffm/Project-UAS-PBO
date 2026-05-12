package com.travelplanner.model;

import com.travelplanner.model.base.Perjalanan;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hari_perjalanan")
public class HariPerjalanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate tanggal;

    @Column(nullable = false)
    private Integer urutanHari;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perjalanan_id", nullable = false)
    private Perjalanan perjalanan;

    // mappedBy harus "hariPerjalanan" sesuai dengan field di JadwalDestinasi.java
    @OneToMany(mappedBy = "hariPerjalanan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JadwalDestinasi> jadwalDestinasiList = new ArrayList<>();

    public HariPerjalanan() {
    }

    // ===== Getters & Setters dengan Validasi (Encapsulation) =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        if (tanggal == null) {
            throw new IllegalArgumentException("Tanggal tidak boleh kosong");
        }
        this.tanggal = tanggal;
    }

    public Integer getUrutanHari() {
        return urutanHari;
    }

    public void setUrutanHari(Integer urutanHari) {
        if (urutanHari == null || urutanHari < 1) {
            throw new IllegalArgumentException("Urutan hari minimal 1");
        }
        this.urutanHari = urutanHari;
    }

    public Perjalanan getPerjalanan() {
        return perjalanan;
    }

    public void setPerjalanan(Perjalanan perjalanan) {
        this.perjalanan = perjalanan;
    }

    public List<JadwalDestinasi> getJadwalDestinasiList() {
        return jadwalDestinasiList;
    }

    public void setJadwalDestinasiList(List<JadwalDestinasi> jadwalDestinasiList) {
        this.jadwalDestinasiList = jadwalDestinasiList;
    }

    /**
     * Helper method untuk menambahkan jadwal ke hari ini.
     * Memastikan sinkronisasi dua arah antara Hari dan Jadwal.
     */
    public void addJadwal(JadwalDestinasi jadwal) {
        jadwalDestinasiList.add(jadwal);
        jadwal.setHariPerjalanan(this);
    }

    /**
     * Helper method untuk menghapus jadwal.
     */
    public void removeJadwal(JadwalDestinasi jadwal) {
        jadwalDestinasiList.remove(jadwal);
        jadwal.setHariPerjalanan(null);
    }
}