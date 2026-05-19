package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.model.base.Perjalanan;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class EconomyStrategy implements BudgetStrategy {

    @Override
    public Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan) {
        double baseTotal = items.stream()
                .mapToDouble(AnggaranItem::getEstimasiHarga)
                .sum();

        return (baseTotal * perjalanan.getFaktorEfisiensiBiaya()) / perjalanan.getPembagiBiaya();
    }

    @Override
    public Double hitungTotalAktual(List<AnggaranItem> items, Perjalanan perjalanan) {
        double baseAktual = items.stream()
                .mapToDouble(AnggaranItem::getHargaAktual)
                .sum();

        return (baseAktual * perjalanan.getFaktorEfisiensiBiaya()) / perjalanan.getPembagiBiaya();
    }

    @Override
    public Map<String, Double> hitungPerKategori(List<AnggaranItem> items, Perjalanan perjalanan) {
        return items.stream().collect(
                Collectors.groupingBy(
                        AnggaranItem::getKategoriAnggaran,
                        Collectors
                                .summingDouble(item -> (item.getEstimasiHarga() * perjalanan.getFaktorEfisiensiBiaya())
                                        / perjalanan.getPembagiBiaya())));
    }

    @Override
    public double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan) {
        // Kelas ekonomi tidak memiliki markup buffer tambahan
        return (baseTotal * perjalanan.getFaktorEfisiensiBiaya()) / perjalanan.getPembagiBiaya();
    }
}