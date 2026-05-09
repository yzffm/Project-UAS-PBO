package com.travelplanner.dto.request;

import java.time.LocalDate;

/**
 * DTO for creating/updating a trip.
 * Used by PerjalananFactory to build the correct subclass.
 */
public class PerjalananRequestDTO {

    private String tipePerjalanan; // "SOLO", "GRUP", "KELUARGA"
    private String namaTrip;
    private String deskripsiTrip;
    private LocalDate tanggalMulai;
    private LocalDate tanggalSelesai;
    private String coverImageUrl;

    // Solo-specific
    private String moodPerjalanan;
    private Boolean modeHemat;

    // Grup-specific
    private Integer jumlahPeserta;
    private String namaGrup;
    private String temaGrup;

    // Keluarga-specific
    private Integer jumlahDewasa;
    private Integer jumlahAnak;
    private Boolean adaLansia;
    private Boolean adaBalita;

    // ===== Getters & Setters =====

    public String getTipePerjalanan() {
        return tipePerjalanan;
    }

    public void setTipePerjalanan(String tipePerjalanan) {
        this.tipePerjalanan = tipePerjalanan;
    }

    public String getNamaTrip() {
        return namaTrip;
    }

    public void setNamaTrip(String namaTrip) {
        this.namaTrip = namaTrip;
    }

    public String getDeskripsiTrip() {
        return deskripsiTrip;
    }

    public void setDeskripsiTrip(String deskripsiTrip) {
        this.deskripsiTrip = deskripsiTrip;
    }

    public LocalDate getTanggalMulai() {
        return tanggalMulai;
    }

    public void setTanggalMulai(LocalDate tanggalMulai) {
        this.tanggalMulai = tanggalMulai;
    }

    public LocalDate getTanggalSelesai() {
        return tanggalSelesai;
    }

    public void setTanggalSelesai(LocalDate tanggalSelesai) {
        this.tanggalSelesai = tanggalSelesai;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getMoodPerjalanan() {
        return moodPerjalanan;
    }

    public void setMoodPerjalanan(String moodPerjalanan) {
        this.moodPerjalanan = moodPerjalanan;
    }

    public Boolean getModeHemat() {
        return modeHemat;
    }

    public void setModeHemat(Boolean modeHemat) {
        this.modeHemat = modeHemat;
    }

    public Integer getJumlahPeserta() {
        return jumlahPeserta;
    }

    public void setJumlahPeserta(Integer jumlahPeserta) {
        this.jumlahPeserta = jumlahPeserta;
    }

    public String getNamaGrup() {
        return namaGrup;
    }

    public void setNamaGrup(String namaGrup) {
        this.namaGrup = namaGrup;
    }

    public String getTemaGrup() {
        return temaGrup;
    }

    public void setTemaGrup(String temaGrup) {
        this.temaGrup = temaGrup;
    }

    public Integer getJumlahDewasa() {
        return jumlahDewasa;
    }

    public void setJumlahDewasa(Integer jumlahDewasa) {
        this.jumlahDewasa = jumlahDewasa;
    }

    public Integer getJumlahAnak() {
        return jumlahAnak;
    }

    public void setJumlahAnak(Integer jumlahAnak) {
        this.jumlahAnak = jumlahAnak;
    }

    public Boolean getAdaLansia() {
        return adaLansia;
    }

    public void setAdaLansia(Boolean adaLansia) {
        this.adaLansia = adaLansia;
    }

    public Boolean getAdaBalita() {
        return adaBalita;
    }

    public void setAdaBalita(Boolean adaBalita) {
        this.adaBalita = adaBalita;
    }
}
