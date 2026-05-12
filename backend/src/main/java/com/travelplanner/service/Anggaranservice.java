package com.travelplanner.service;

import com.travelplanner.dto.response.BudgetSummaryResponse;
import com.travelplanner.exception.ResourceNotFoundException;
import com.travelplanner.factory.AnggaranFactory;
import com.travelplanner.dto.request.AnggaranRequestDTO;
import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.model.base.Perjalanan;
import com.travelplanner.repository.AnggaranRepository;
import com.travelplanner.strategy.BudgetStrategy;
import com.travelplanner.strategy.BudgetStrategyFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnggaranService {

    private final AnggaranRepository anggaranRepository;
    private final BudgetStrategyFactory budgetStrategyFactory;
    private final PerjalananService perjalananService;

    // Constructor Injection — SOLID (Dependency Inversion)
    public AnggaranService(AnggaranRepository anggaranRepository,
                           BudgetStrategyFactory budgetStrategyFactory,
                           PerjalananService perjalananService) {
        this.anggaranRepository = anggaranRepository;
        this.budgetStrategyFactory = budgetStrategyFactory;
        this.perjalananService = perjalananService;
    }

    // ===== CRUD Operations (called by AnggaranController) =====

    public List<AnggaranItem> getAllAnggaran() {
        return anggaranRepository.findAll();
    }

    public AnggaranItem getAnggaranById(Long id) {
        return anggaranRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Anggaran dengan id " + id + " tidak ditemukan"));
    }

    public List<AnggaranItem> getAnggaranByTripId(Long tripId) {
        return anggaranRepository.findByPerjalananId(tripId);
    }

    public AnggaranItem saveAnggaran(AnggaranItem anggaranItem) {
        return anggaranRepository.save(anggaranItem);
    }

    public AnggaranItem createAnggaran(Long tripId, AnggaranRequestDTO dto) {
        Perjalanan perjalanan = perjalananService.getTripById(tripId);
        AnggaranItem item = AnggaranFactory.create(dto.getKategori(), dto);
        item.setPerjalanan(perjalanan);
        return anggaranRepository.save(item);
    }

    public AnggaranItem updateAnggaran(Long id, AnggaranItem updatedItem) {
        AnggaranItem existing = getAnggaranById(id);
        existing.setNamaItem(updatedItem.getNamaItem());
        existing.setEstimasiHarga(updatedItem.getEstimasiHarga());
        existing.setHargaAktual(updatedItem.getHargaAktual());
        existing.setSudahDibayar(updatedItem.getSudahDibayar());
        existing.setCatatan(updatedItem.getCatatan());
        return anggaranRepository.save(existing);
    }

    public void deleteAnggaran(Long id) {
        AnggaranItem existing = getAnggaranById(id);
        anggaranRepository.delete(existing);
    }

    public Double hitungTotalAnggaran() {
        return anggaranRepository.findAll().stream()
            .mapToDouble(AnggaranItem::getEstimasiHarga)
            .sum();
    }

    // ===== Strategy Pattern: Budget Summary =====

    /**
     * Generates a budget summary using the Strategy Pattern.
     * The strategy is selected based on the trip type (SOLO/GRUP/KELUARGA).
     */
    public BudgetSummaryResponse getBudgetSummary(Long tripId, String tipePerjalanan) {
        List<AnggaranItem> items = anggaranRepository.findByPerjalananId(tripId);

        // Select strategy based on trip type
        BudgetStrategy strategy = budgetStrategyFactory.selectStrategy(tipePerjalanan);

        Double totalEstimasi = strategy.hitungTotalEstimasi(items);
        Double totalAktual = strategy.hitungTotalAktual(items);
        Map<String, Double> perKategoriRaw = strategy.hitungPerKategori(items);

        // Build per-category breakdown with icons
        Map<String, BudgetSummaryResponse.CategoryBudget> perKategori = new HashMap<>();
        for (Map.Entry<String, Double> entry : perKategoriRaw.entrySet()) {
            String kategori = entry.getKey();
            Double estimasi = entry.getValue();
            Double aktual = items.stream()
                .filter(item -> item.getKategoriAnggaran().equals(kategori))
                .mapToDouble(AnggaranItem::getHargaAktual)
                .sum();
            String icon = items.stream()
                .filter(item -> item.getKategoriAnggaran().equals(kategori))
                .findFirst()
                .map(AnggaranItem::getIconAnggaran)
                .orElse("📦");

            perKategori.put(kategori, new BudgetSummaryResponse.CategoryBudget(estimasi, aktual, icon));
        }

        return new BudgetSummaryResponse(totalEstimasi, totalAktual, perKategori);
    }
}
