package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.travelplanner.model.base.Perjalanan;

/**
 * Business strategy — adds 10% buffer to estimation for group trips.
 * Accounts for coordination overhead in group travel planning.
 */
@Component
public class BusinessStrategy implements BudgetStrategy {

    // 10% buffer added to group trip estimations
    private static final double GROUP_BUFFER_MULTIPLIER = 1.10;

    @Override
    public Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan) {
        double base = items.stream()
                .mapToDouble(AnggaranItem::getEstimasiHarga)
                .sum();
        return base * GROUP_BUFFER_MULTIPLIER;
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
                        Collectors.summingDouble(item -> item.getEstimasiHarga() * GROUP_BUFFER_MULTIPLIER)));
    }

    @Override
    public double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan) {
        return baseTotal * GROUP_BUFFER_MULTIPLIER;
    }
}
