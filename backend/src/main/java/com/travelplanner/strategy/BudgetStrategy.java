package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;

import java.util.List;
import java.util.Map;

/**
 * STRATEGY PATTERN: Interface for budget calculation algorithms.
 * Each trip type gets a different strategy with different buffer calculations.
 */
public interface BudgetStrategy {
    Double hitungTotalEstimasi(List<AnggaranItem> items);
    Double hitungTotalAktual(List<AnggaranItem> items);
    Map<String, Double> hitungPerKategori(List<AnggaranItem> items);

    /**
     * Calculates recommended budget based on a base total.
     * Each strategy applies its own buffer/multiplier.
     */
    double calculateRecommendedBudget(double baseTotal);
}