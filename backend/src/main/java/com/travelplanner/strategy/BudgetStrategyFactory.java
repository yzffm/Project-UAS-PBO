package com.travelplanner.strategy;

import org.springframework.stereotype.Component;

/**
 * Factory that selects the correct BudgetStrategy based on trip type.
 * SOLO      → EconomyStrategy  (standard, no markup)
 * GRUP      → BusinessStrategy (10% buffer for group coordination)
 * KELUARGA  → LuxuryStrategy   (20% buffer for family needs)
 */
@Component
public class BudgetStrategyFactory {

    private final EconomyStrategy economyStrategy;
    private final BusinessStrategy businessStrategy;
    private final LuxuryStrategy luxuryStrategy;

    public BudgetStrategyFactory(EconomyStrategy economyStrategy,
                                  BusinessStrategy businessStrategy,
                                  LuxuryStrategy luxuryStrategy) {
        this.economyStrategy = economyStrategy;
        this.businessStrategy = businessStrategy;
        this.luxuryStrategy = luxuryStrategy;
    }

    public BudgetStrategy selectStrategy(String tipePerjalanan) {
        if (tipePerjalanan == null) return economyStrategy;

        return switch (tipePerjalanan.toUpperCase()) {
            case "GRUP", "BUSINESS" -> businessStrategy;
            case "KELUARGA", "LUXURY" -> luxuryStrategy;
            default -> economyStrategy; // SOLO, ECONOMY, and any unknown type
        };
    }
}
