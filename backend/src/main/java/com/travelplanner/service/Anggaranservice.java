package com.travelplanner.service;

import com.travelplanner.dto.response.BudgetSummaryResponseDTO;
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

    // ===== CRUD Operations =====

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
        // FIX: pakai getTripEntityById() — return raw Perjalanan entity, bukan DTO
        Perjalanan perjalanan = perjalananService.getTripEntityById(tripId);
        AnggaranItem item = AnggaranFactory.create(dto.getKategori(), dto);
        item.setPerjalanan(perjalanan);
        return anggaranRepository.save(item);
    }

    public AnggaranItem updateAnggaran(Long id, AnggaranRequestDTO dto) { // FIX: Parameter menjadi DTO
        AnggaranItem existing = getAnggaranById(id);

        // Update field menggunakan data dari DTO
        existing.setNamaItem(dto.getNamaItem());
        existing.setEstimasiHarga(dto.getEstimasiHarga());
        existing.setHargaAktual(dto.getHargaAktual());
        existing.setSudahDibayar(dto.getSudahDibayar());
        existing.setCatatan(dto.getCatatan());

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
    public BudgetSummaryResponseDTO getBudgetSummary(Long tripId) {

        // FIX 1: Ambil objek Perjalanan dari database (MENGHILANGKAN ERROR MERAH)
        Perjalanan perjalanan = perjalananService.getTripEntityById(tripId);

        List<AnggaranItem> items = anggaranRepository.findByPerjalananId(tripId);
        
        // Pass the actual Perjalanan entity to the factory so it can use instanceof
        BudgetStrategy strategy = budgetStrategyFactory.selectStrategy(perjalanan);

        // Objek 'perjalanan' sekarang sudah ada, error merah akan hilang!
        Double totalEstimasi = strategy.hitungTotalEstimasi(items, perjalanan);
        Double totalAktual = strategy.hitungTotalAktual(items, perjalanan);
        Map<String, Double> perKategoriRaw = strategy.hitungPerKategori(items, perjalanan);

        Map<String, BudgetSummaryResponseDTO.CategoryBudget> perKategori = new HashMap<>();
        for (Map.Entry<String, Double> entry : perKategoriRaw.entrySet()) {
            String kategori = entry.getKey();
            Double estimasi = entry.getValue();

            // FIX 2: Perbaiki logika 'aktual' per kategori agar ikut terpengaruh tipe trip
            Double aktual = items.stream()
                    .filter(item -> item.getKategoriAnggaran().equals(kategori))
                    .mapToDouble(AnggaranItem::getHargaAktual)
                    .sum();

            String icon = items.stream()
                    .filter(item -> item.getKategoriAnggaran().equals(kategori))
                    .findFirst()
                    .map(AnggaranItem::getIconAnggaran)
                    .orElse("📦");

            perKategori.put(kategori, new BudgetSummaryResponseDTO.CategoryBudget(estimasi, aktual, icon));
        }

        return new BudgetSummaryResponseDTO(totalEstimasi, totalAktual, perKategori);
    }
}