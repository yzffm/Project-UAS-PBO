package com.travelplanner.dto.response;

import java.time.LocalDate;
import java.util.List;

public class HariPerjalananResponseDTO {

    private Long id;
    private Integer nomorHari;
    private LocalDate tanggal;
    private String judulHari;
    private String catatan;
    private Long tripId;
    private List<JadwalDestinasiResponseDTO> jadwalList;

    public HariPerjalananResponseDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNomorHari() {
        return nomorHari;
    }

    public void setNomorHari(Integer nomorHari) {
        this.nomorHari = nomorHari;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public String getJudulHari() {
        return judulHari;
    }

    public void setJudulHari(String judulHari) {
        this.judulHari = judulHari;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public List<JadwalDestinasiResponseDTO> getJadwalList() {
        return jadwalList;
    }

    public void setJadwalList(List<JadwalDestinasiResponseDTO> jadwalList) {
        this.jadwalList = jadwalList;
    }
}