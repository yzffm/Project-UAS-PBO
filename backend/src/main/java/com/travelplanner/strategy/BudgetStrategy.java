package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.model.base.Perjalanan;

import java.util.List;
import java.util.Map;

/**
 * STRATEGY PATTERN: Interface for budget calculation algorithms.
 * Each trip type gets a different strategy with different calculations.
 */
public interface BudgetStrategy {
    Double hitungTotalEstimasi(List<AnggaranItem> items, Perjalanan perjalanan);

    Double hitungTotalAktual(List<AnggaranItem> items, Perjalanan perjalanan);

    Map<String, Double> hitungPerKategori(List<AnggaranItem> items, Perjalanan perjalanan);

    double calculateRecommendedBudget(double baseTotal, Perjalanan perjalanan);
}