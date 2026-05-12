package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Economy strategy — standard calculation, no markup.
 * Used for Solo trips and budget-conscious planning.
 */
@Component
public class EconomyStrategy implements BudgetStrategy {

    @Override
    public Double hitungTotalEstimasi(List<AnggaranItem> items) {
        return items.stream()
            .mapToDouble(AnggaranItem::getEstimasiHarga)
            .sum();
    }

    @Override
    public Double hitungTotalAktual(List<AnggaranItem> items) {
        return items.stream()
            .mapToDouble(AnggaranItem::getHargaAktual)
            .sum();
    }

    @Override
    public Map<String, Double> hitungPerKategori(List<AnggaranItem> items) {
        return items.stream().collect(
            Collectors.groupingBy(
                AnggaranItem::getKategoriAnggaran,
                Collectors.summingDouble(AnggaranItem::getEstimasiHarga)
            )
        );
    }

    @Override
    public double calculateRecommendedBudget(double baseTotal) {
        // No markup for economy/solo — return as-is
        return baseTotal;
    }
}
