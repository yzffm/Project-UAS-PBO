package com.travelplanner.strategy;

import com.travelplanner.model.base.Perjalanan;
import com.travelplanner.model.perjalanan.PerjalananGrup;
import com.travelplanner.model.perjalanan.PerjalananKeluarga;
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

    public BudgetStrategy selectStrategy(Perjalanan perjalanan) {
        if (perjalanan == null) return standardStrategy;

        if (perjalanan instanceof PerjalananGrup) {
            return grupStrategy;
        } else if (perjalanan instanceof PerjalananKeluarga) {
            return keluargaStrategy;
        }
        return standardStrategy;
    }
}
