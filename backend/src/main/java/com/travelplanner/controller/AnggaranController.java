package com.travelplanner.controller;

import com.travelplanner.dto.request.AnggaranRequestDTO;
import com.travelplanner.dto.response.BudgetSummaryResponseDTO;
import com.travelplanner.factory.AnggaranFactory;
import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.service.AnggaranService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/budget")
@CrossOrigin("*")
public class AnggaranController {

    private final AnggaranService anggaranService;

    // SOLID: Constructor Injection
    public AnggaranController(AnggaranService anggaranService) {
        this.anggaranService = anggaranService;
    }

    @GetMapping
    public ResponseEntity<List<AnggaranItem>> getAllBudgetItems(@PathVariable Long tripId) {
        return ResponseEntity.ok(anggaranService.getAnggaranByTripId(tripId));
    }

    @PostMapping
    public ResponseEntity<AnggaranItem> addBudgetItem(
            @PathVariable Long tripId,
            @RequestBody AnggaranRequestDTO dto) {
        // Assume factory logic is partly handled in service, but we can do it here too
        // if needed.
        // Actually, the factory needs the category from the DTO (assuming DTO has
        // kategoriAnggaran or we pass it).
        // Let's rely on the service to handle the factory if possible, but
        // AnggaranFactory needs it.
        // Let's pass the DTO to a service method that uses the factory.
        return ResponseEntity.ok(anggaranService.createAnggaran(tripId, dto));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<AnggaranItem> updateBudgetItem(
            @PathVariable Long tripId,
            @PathVariable Long itemId,
            @RequestBody AnggaranRequestDTO dto) { // FIX: Gunakan DTO, bukan class abstract
        return ResponseEntity.ok(anggaranService.updateAnggaran(itemId, dto));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteBudgetItem(
            @PathVariable Long tripId,
            @PathVariable Long itemId) {
        anggaranService.deleteAnggaran(itemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<BudgetSummaryResponseDTO> getBudgetSummary(
            @PathVariable Long tripId,
            @RequestParam(defaultValue = "SOLO") String tipePerjalanan) {
        return ResponseEntity.ok(anggaranService.getBudgetSummary(tripId, tipePerjalanan));
    }
}