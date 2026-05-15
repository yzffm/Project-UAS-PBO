package com.travelplanner.dto.response;

import java.time.LocalDate;

public class PerjalananResponseDTO {

    private Long id;
    private String namaTrip;
    private String deskripsiTrip;
    private LocalDate tanggalMulai;
    private LocalDate tanggalSelesai;
    private String status;
    private String tipePerjalanan;
    private String coverImageUrl;
    private String badgeWarna;
    private Long durasiHari;
    private UserResponseDTO pemilik;

    // PerjalananSolo fields
    private String moodPerjalanan;
    private Boolean modeHemat;

    // PerjalananGrup fields
    private Integer jumlahPeserta;
    private String namaGrup;
    private String temaGrup;

    // PerjalananKeluarga fields
    private Integer jumlahDewasa;
    private Integer jumlahAnak;
    private Boolean adaLansia;
    private Boolean adaBalita;

    public PerjalananResponseDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTipePerjalanan() {
        return tipePerjalanan;
    }

    public void setTipePerjalanan(String tipePerjalanan) {
        this.tipePerjalanan = tipePerjalanan;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getBadgeWarna() {
        return badgeWarna;
    }

    public void setBadgeWarna(String badgeWarna) {
        this.badgeWarna = badgeWarna;
    }

    public Long getDurasiHari() {
        return durasiHari;
    }

    public void setDurasiHari(Long durasiHari) {
        this.durasiHari = durasiHari;
    }

    public UserResponseDTO getPemilik() {
        return pemilik;
    }

    public void setPemilik(UserResponseDTO pemilik) {
        this.pemilik = pemilik;
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