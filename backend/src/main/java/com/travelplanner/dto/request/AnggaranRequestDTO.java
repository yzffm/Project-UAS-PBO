package com.travelplanner.dto.request;

import java.time.LocalDate;

/**
 * DTO for creating/updating a budget item.
 * Used by AnggaranFactory to build the correct subclass.
 */
public class AnggaranRequestDTO {

    private String kategori; // "TRANSPORTASI", "AKOMODASI", "KONSUMSI", "LAINNYA"
    private String namaItem;
    private Double estimasiHarga;
    private Double hargaAktual;
    private Boolean sudahDibayar;
    private String catatan;

    // Transportasi-specific
    private String modeTransportasi;
    private String asal;
    private String tujuan;
    private LocalDate tanggalKeberangkatan;

    // Akomodasi-specific
    private String namaHotel;
    private String tipeKamar;
    private Integer jumlahMalam;
    private Double hargaPerMalam;

    // Konsumsi-specific
    private String waktuMakan;
    private Integer jumlahOrang;

    // Lainnya-specific
    private String subKategori;

    // ===== Getters & Setters =====

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public String getNamaItem() {
        return namaItem;
    }

    public void setNamaItem(String namaItem) {
        this.namaItem = namaItem;
    }

    public Double getEstimasiHarga() {
        return estimasiHarga;
    }

    public void setEstimasiHarga(Double estimasiHarga) {
        this.estimasiHarga = estimasiHarga;
    }

    public Double getHargaAktual() {
        return hargaAktual;
    }

    public void setHargaAktual(Double hargaAktual) {
        this.hargaAktual = hargaAktual;
    }

    public Boolean getSudahDibayar() {
        return sudahDibayar;
    }

    public void setSudahDibayar(Boolean sudahDibayar) {
        this.sudahDibayar = sudahDibayar;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public String getModeTransportasi() {
        return modeTransportasi;
    }

    public void setModeTransportasi(String modeTransportasi) {
        this.modeTransportasi = modeTransportasi;
    }

    public String getAsal() {
        return asal;
    }

    public void setAsal(String asal) {
        this.asal = asal;
    }

    public String getTujuan() {
        return tujuan;
    }

    public void setTujuan(String tujuan) {
        this.tujuan = tujuan;
    }

    public LocalDate getTanggalKeberangkatan() {
        return tanggalKeberangkatan;
    }

    public void setTanggalKeberangkatan(LocalDate tanggalKeberangkatan) {
        this.tanggalKeberangkatan = tanggalKeberangkatan;
    }

    public String getNamaHotel() {
        return namaHotel;
    }

    public void setNamaHotel(String namaHotel) {
        this.namaHotel = namaHotel;
    }

    public String getTipeKamar() {
        return tipeKamar;
    }

    public void setTipeKamar(String tipeKamar) {
        this.tipeKamar = tipeKamar;
    }

    public Integer getJumlahMalam() {
        return jumlahMalam;
    }

    public void setJumlahMalam(Integer jumlahMalam) {
        this.jumlahMalam = jumlahMalam;
    }

    public Double getHargaPerMalam() {
        return hargaPerMalam;
    }

    public void setHargaPerMalam(Double hargaPerMalam) {
        this.hargaPerMalam = hargaPerMalam;
    }

    public String getWaktuMakan() {
        return waktuMakan;
    }

    public void setWaktuMakan(String waktuMakan) {
        this.waktuMakan = waktuMakan;
    }

    public Integer getJumlahOrang() {
        return jumlahOrang;
    }

    public void setJumlahOrang(Integer jumlahOrang) {
        this.jumlahOrang = jumlahOrang;
    }

    public String getSubKategori() {
        return subKategori;
    }

    public void setSubKategori(String subKategori) {
        this.subKategori = subKategori;
    }
}
