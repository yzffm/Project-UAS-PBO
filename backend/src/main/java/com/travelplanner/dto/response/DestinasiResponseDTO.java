package com.travelplanner.dto.response;

public class DestinasiResponseDTO {

    private Long id;
    private String nama;
    private String deskripsi;
    private String lokasi;
    private String alamatLengkap;
    private Double estimasiBiaya;
    private String gambarUrl;
    private Integer durasiRekomendasi;

    // Polymorphic fields (from abstract methods)
    private String tipeDestinasi; // "ALAM", "BUDAYA", "KULINER"
    private String kategori; // from getKategori()
    private String iconKategori; // from getIconKategori()
    private String tipsKunjungan; // from getTipsKunjungan()
    private String ringkasan; // from getRingkasan()

    // WisataAlam specific
    private String jenisAlam;
    private String tingkatKesulitan;
    private Boolean perluGuide;
    private String musimTerbaik;

    // WisataBudaya specific
    private String jenisBudaya;
    private String periodeBudaya;
    private Boolean adaPemandu;
    private String dresscode;

    // WisataKuliner specific
    private String jenisKuliner;
    private String masakan;
    private String rentangHarga;
    private Boolean halalCertified;

    public DestinasiResponseDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public String getLokasi() {
        return lokasi;
    }

    public void setLokasi(String lokasi) {
        this.lokasi = lokasi;
    }

    public String getAlamatLengkap() {
        return alamatLengkap;
    }

    public void setAlamatLengkap(String alamatLengkap) {
        this.alamatLengkap = alamatLengkap;
    }

    public Double getEstimasiBiaya() {
        return estimasiBiaya;
    }

    public void setEstimasiBiaya(Double estimasiBiaya) {
        this.estimasiBiaya = estimasiBiaya;
    }

    public String getGambarUrl() {
        return gambarUrl;
    }

    public void setGambarUrl(String gambarUrl) {
        this.gambarUrl = gambarUrl;
    }

    public Integer getDurasiRekomendasi() {
        return durasiRekomendasi;
    }

    public void setDurasiRekomendasi(Integer durasiRekomendasi) {
        this.durasiRekomendasi = durasiRekomendasi;
    }

    public String getTipeDestinasi() {
        return tipeDestinasi;
    }

    public void setTipeDestinasi(String tipeDestinasi) {
        this.tipeDestinasi = tipeDestinasi;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public String getIconKategori() {
        return iconKategori;
    }

    public void setIconKategori(String iconKategori) {
        this.iconKategori = iconKategori;
    }

    public String getTipsKunjungan() {
        return tipsKunjungan;
    }

    public void setTipsKunjungan(String tipsKunjungan) {
        this.tipsKunjungan = tipsKunjungan;
    }

    public String getRingkasan() {
        return ringkasan;
    }

    public void setRingkasan(String ringkasan) {
        this.ringkasan = ringkasan;
    }

    public String getJenisAlam() {
        return jenisAlam;
    }

    public void setJenisAlam(String jenisAlam) {
        this.jenisAlam = jenisAlam;
    }

    public String getTingkatKesulitan() {
        return tingkatKesulitan;
    }

    public void setTingkatKesulitan(String tingkatKesulitan) {
        this.tingkatKesulitan = tingkatKesulitan;
    }

    public Boolean getPerluGuide() {
        return perluGuide;
    }

    public void setPerluGuide(Boolean perluGuide) {
        this.perluGuide = perluGuide;
    }

    public String getMusimTerbaik() {
        return musimTerbaik;
    }

    public void setMusimTerbaik(String musimTerbaik) {
        this.musimTerbaik = musimTerbaik;
    }

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

    public String getJenisKuliner() {
        return jenisKuliner;
    }

    public void setJenisKuliner(String jenisKuliner) {
        this.jenisKuliner = jenisKuliner;
    }

    public String getMasakan() {
        return masakan;
    }

    public void setMasakan(String masakan) {
        this.masakan = masakan;
    }

    public String getRentangHarga() {
        return rentangHarga;
    }

    public void setRentangHarga(String rentangHarga) {
        this.rentangHarga = rentangHarga;
    }

    public Boolean getHalalCertified() {
        return halalCertified;
    }

    public void setHalalCertified(Boolean halalCertified) {
        this.halalCertified = halalCertified;
    }
}