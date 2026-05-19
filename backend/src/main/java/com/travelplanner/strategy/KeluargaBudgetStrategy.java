package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.model.base.Perjalanan;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Keluarga strategy for Family trips.
 * Calculates family estimations with a 20% family buffer.
 */
@Component
public class KeluargaBudgetStrategy implements BudgetStrategy {

    private static final double FAMILY_BUFFER_MULTIPLIER = 1.20;

    @Override
    public Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan) {
        double baseTotal = items.stream()
                .mapToDouble(AnggaranItem::getEstimasiHarga)
                .sum();
        return baseTotal * FAMILY_BUFFER_MULTIPLIER;
    }

    @Override
    public Double hitungTotalAktual(List<AnggaranItem> items, Perjalanan perjalanan) {
        double baseAktual = items.stream()
                .mapToDouble(AnggaranItem::getHargaAktual)
                .sum();
        return baseAktual;
    }

    @Override
    public Map<String, Double> hitungPerKategori(List<AnggaranItem> items, Perjalanan perjalanan) {
        return items.stream().collect(
                Collectors.groupingBy(
                        AnggaranItem::getKategoriAnggaran,
                        Collectors.summingDouble(item -> item.getEstimasiHarga() * FAMILY_BUFFER_MULTIPLIER)
                )
        );
    }

    @Override
    public double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan) {
        return baseTotal * FAMILY_BUFFER_MULTIPLIER;
    }
}
