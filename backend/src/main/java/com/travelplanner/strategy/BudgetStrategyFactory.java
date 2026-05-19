package com.travelplanner.strategy;

import org.springframework.stereotype.Component;

/**
 * Factory that selects the correct BudgetStrategy based on trip type.
 * SOLO      → StandardBudgetStrategy (standard calculation)
 * GRUP      → GrupBudgetStrategy     (divides cost by participants)
 * KELUARGA  → KeluargaBudgetStrategy (20% buffer for family needs)
 */
@Component
public class BudgetStrategyFactory {

    private final StandardBudgetStrategy standardStrategy;
    private final GrupBudgetStrategy grupStrategy;
    private final KeluargaBudgetStrategy keluargaStrategy;

    public BudgetStrategyFactory(StandardBudgetStrategy standardStrategy,
                                 GrupBudgetStrategy grupStrategy,
                                 KeluargaBudgetStrategy keluargaStrategy) {
        this.standardStrategy = standardStrategy;
        this.grupStrategy = grupStrategy;
        this.keluargaStrategy = keluargaStrategy;
    }

    public BudgetStrategy selectStrategy(String tipePerjalanan) {
        if (tipePerjalanan == null) return standardStrategy;

        return switch (tipePerjalanan.toUpperCase()) {
            case "GRUP" -> grupStrategy;
            case "KELUARGA" -> keluargaStrategy;
            default -> standardStrategy; // SOLO and any unknown type
        };
    }
}
