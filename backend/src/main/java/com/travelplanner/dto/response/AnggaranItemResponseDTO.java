package com.travelplanner.dto.response;

import java.time.LocalDate;

public class AnggaranItemResponseDTO {

    private Long id;
    private String namaItem;
    private Double estimasiHarga;
    private Double hargaAktual;
    private Boolean sudahDibayar;
    private String catatan;
    private String kategoriAnggaran; // "TRANSPORTASI", "AKOMODASI", "KONSUMSI", "LAINNYA"
    private String iconAnggaran; // from getIconAnggaran()
    private Double selisih; // from getSelisih()
    private String statusBudget; // from getStatusBudget()
    private Long tripId;

    // AnggaranTransportasi specific
    private String modeTransportasi;
    private String asal;
    private String tujuan;
    private LocalDate tanggalKeberangkatan;

    // AnggaranAkomodasi specific
    private String namaHotel;
    private String tipeKamar;
    private Integer jumlahMalam;
    private Double hargaPerMalam;

    // AnggaranKonsumsi specific
    private String waktuMakan;
    private Integer jumlahOrang;

    // AnggaranLainnya specific
    private String subKategori;

    public AnggaranItemResponseDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getKategoriAnggaran() {
        return kategoriAnggaran;
    }

    public void setKategoriAnggaran(String kategoriAnggaran) {
        this.kategoriAnggaran = kategoriAnggaran;
    }

    public String getIconAnggaran() {
        return iconAnggaran;
    }

    public void setIconAnggaran(String iconAnggaran) {
        this.iconAnggaran = iconAnggaran;
    }

    public Double getSelisih() {
        return selisih;
    }

    public void setSelisih(Double selisih) {
        this.selisih = selisih;
    }

    public String getStatusBudget() {
        return statusBudget;
    }

    public void setStatusBudget(String statusBudget) {
        this.statusBudget = statusBudget;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
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