package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.model.base.Perjalanan;

import java.util.List;
import java.util.Map;

public interface BudgetStrategy {
    // Ditambahkan parameter Perjalanan perjalanan agar strategi tahu jenis trip-nya
    Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan);

    Double hitungTotalAktual(List<AnggaranItem> items, Perjalanan perjalanan);

    Map<String, Double> hitungPerKategori(List<AnggaranItem> items, Perjalanan perjalanan);

    double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan);
}