package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.travelplanner.model.base.Perjalanan;

/**
 * Luxury strategy — adds 20% buffer for family trips.
 * Accounts for child/elderly needs, extra comfort requirements.
 */
@Component
public class LuxuryStrategy implements BudgetStrategy {

    // 20% buffer added for family trip estimations
    private static final double FAMILY_BUFFER_MULTIPLIER = 1.20;

    @Override
    public Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan) {
        double base = items.stream()
                .mapToDouble(AnggaranItem::getEstimasiHarga)
                .sum();
        return base * FAMILY_BUFFER_MULTIPLIER;
    }

    @Override
    public Double hitungTotalAktual(List<AnggaranItem> items, Perjalanan perjalanan) {
        return items.stream()
                .mapToDouble(AnggaranItem::getHargaAktual)
                .sum();
    }

    @Override
    public Map<String, Double> hitungPerKategori(List<AnggaranItem> items, Perjalanan perjalanan) {
        return items.stream().collect(
                Collectors.groupingBy(
                        AnggaranItem::getKategoriAnggaran,
                        Collectors.summingDouble(item -> item.getEstimasiHarga() * FAMILY_BUFFER_MULTIPLIER)));
    }

    @Override
    public double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan) {
        return baseTotal * FAMILY_BUFFER_MULTIPLIER;
    }
}
