package com.travelplanner.dto.response;

import java.util.Map;

/**
 * Response DTO for budget summary endpoint.
 * Shape matches the user rule: totalEstimasi, totalAktual, selisih,
 * statusBudget, perKategori.
 */
public class BudgetSummaryResponseDTO {

    private Double totalEstimasi;
    private Double totalAktual;
    private Double selisih;
    private String statusBudget; // "UNDER_BUDGET", "ON_TRACK", "OVER_BUDGET"
    private Map<String, CategoryBudget> perKategori;

    public BudgetSummaryResponseDTO() {
    }

    public BudgetSummaryResponseDTO(Double totalEstimasi, Double totalAktual,
            Map<String, CategoryBudget> perKategori) {
        this.totalEstimasi = totalEstimasi;
        this.totalAktual = totalAktual;
        this.selisih = totalAktual - totalEstimasi;
        this.statusBudget = selisih > 0 ? "OVER_BUDGET" : selisih < 0 ? "UNDER_BUDGET" : "ON_TRACK";
        this.perKategori = perKategori;
    }

    // ===== Getters & Setters =====

    public Double getTotalEstimasi() {
        return totalEstimasi;
    }

    public void setTotalEstimasi(Double totalEstimasi) {
        this.totalEstimasi = totalEstimasi;
    }

    public Double getTotalAktual() {
        return totalAktual;
    }

    public void setTotalAktual(Double totalAktual) {
        this.totalAktual = totalAktual;
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

    public Map<String, CategoryBudget> getPerKategori() {
        return perKategori;
    }

    public void setPerKategori(Map<String, CategoryBudget> perKategori) {
        this.perKategori = perKategori;
    }

    /**
     * Inner class for per-category budget breakdown.
     */
    public static class CategoryBudget {
        private Double estimasi;
        private Double aktual;
        private String icon;

        public CategoryBudget(Double estimasi, Double aktual, String icon) {
            this.estimasi = estimasi;
            this.aktual = aktual;
            this.icon = icon;
        }

        public Double getEstimasi() {
            return estimasi;
        }

        public void setEstimasi(Double estimasi) {
            this.estimasi = estimasi;
        }

        public Double getAktual() {
            return aktual;
        }

        public void setAktual(Double aktual) {
            this.aktual = aktual;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }
    }
}
