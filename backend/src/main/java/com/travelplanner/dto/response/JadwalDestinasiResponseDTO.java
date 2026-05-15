package com.travelplanner.dto.response;

import java.time.LocalTime;

public class JadwalDestinasiResponseDTO {

    private Long id;
    private LocalTime jamMulai;
    private LocalTime jamSelesai;
    private String catatan;
    private Long hariId;
    private DestinasiResponseDTO destinasi;

    public JadwalDestinasiResponseDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getJamMulai() {
        return jamMulai;
    }

    public void setJamMulai(LocalTime jamMulai) {
        this.jamMulai = jamMulai;
    }

    public LocalTime getJamSelesai() {
        return jamSelesai;
    }

    public void setJamSelesai(LocalTime jamSelesai) {
        this.jamSelesai = jamSelesai;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public Long getHariId() {
        return hariId;
    }

    public void setHariId(Long hariId) {
        this.hariId = hariId;
    }

    public DestinasiResponseDTO getDestinasi() {
        return destinasi;
    }

    public void setDestinasi(DestinasiResponseDTO destinasi) {
        this.destinasi = destinasi;
    }
}