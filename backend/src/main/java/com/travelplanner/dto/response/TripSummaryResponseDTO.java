package com.travelplanner.dto.response;

public class TripSummaryResponseDTO {

    private Long tripId;
    private String namaTrip;
    private String tipePerjalanan;
    private String status;
    private Long totalHari;
    private Integer totalDestinasi;
    private Double totalEstimasiBudget;
    private Double totalAktualBudget;
    private Double selisihBudget;
    private String statusBudget; // "UNDER_BUDGET", "ON_TRACK", "OVER_BUDGET"

    public TripSummaryResponseDTO() {
    }

    public TripSummaryResponseDTO(Long tripId, String namaTrip, String tipePerjalanan,
            String status, Long totalHari, Integer totalDestinasi,
            Double totalEstimasiBudget, Double totalAktualBudget) {
        this.tripId = tripId;
        this.namaTrip = namaTrip;
        this.tipePerjalanan = tipePerjalanan;
        this.status = status;
        this.totalHari = totalHari;
        this.totalDestinasi = totalDestinasi;
        this.totalEstimasiBudget = totalEstimasiBudget;
        this.totalAktualBudget = totalAktualBudget;
        this.selisihBudget = totalAktualBudget - totalEstimasiBudget;
        this.statusBudget = selisihBudget > 0 ? "OVER_BUDGET"
                : selisihBudget < 0 ? "UNDER_BUDGET"
                        : "ON_TRACK";
    }

    // Getters and Setters
    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getNamaTrip() {
        return namaTrip;
    }

    public void setNamaTrip(String namaTrip) {
        this.namaTrip = namaTrip;
    }

    public String getTipePerjalanan() {
        return tipePerjalanan;
    }

    public void setTipePerjalanan(String tipePerjalanan) {
        this.tipePerjalanan = tipePerjalanan;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getTotalHari() {
        return totalHari;
    }

    public void setTotalHari(Long totalHari) {
        this.totalHari = totalHari;
    }

    public Integer getTotalDestinasi() {
        return totalDestinasi;
    }

    public void setTotalDestinasi(Integer totalDestinasi) {
        this.totalDestinasi = totalDestinasi;
    }

    public Double getTotalEstimasiBudget() {
        return totalEstimasiBudget;
    }

    public void setTotalEstimasiBudget(Double totalEstimasiBudget) {
        this.totalEstimasiBudget = totalEstimasiBudget;
    }

    public Double getTotalAktualBudget() {
        return totalAktualBudget;
    }

    public void setTotalAktualBudget(Double totalAktualBudget) {
        this.totalAktualBudget = totalAktualBudget;
    }

    public Double getSelisihBudget() {
        return selisihBudget;
    }

    public void setSelisihBudget(Double selisihBudget) {
        this.selisihBudget = selisihBudget;
    }

    public String getStatusBudget() {
        return statusBudget;
    }

    public void setStatusBudget(String statusBudget) {
        this.statusBudget = statusBudget;
    }
}