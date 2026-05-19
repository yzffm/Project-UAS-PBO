package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.model.base.Perjalanan;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Grup strategy for Group trips.
 * Calculates per-person costs by dividing the total estimation
 * by the number of participants.
 */
@Component
public class GrupBudgetStrategy implements BudgetStrategy {

    @Override
    public Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan) {
        return items.stream()
                .mapToDouble(AnggaranItem::getEstimasiHarga)
                .sum();
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
                        Collectors.summingDouble(AnggaranItem::getEstimasiHarga)
                )
        );
    }

    @Override
    public double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan) {
        return baseTotal;
    }
}
