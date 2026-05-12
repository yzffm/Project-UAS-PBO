package com.travelplanner.strategy;

import com.travelplanner.model.base.AnggaranItem;
import java.util.List;

public interface BudgetStrategy {

    Double hitungTotal(List<AnggaranItem> items);
}

class SoloBudgetStrategy implements BudgetStrategy {

    @Override
    public Double hitungTotal(List<AnggaranItem> items) {

        double total = 0.0;

        for (AnggaranItem item : items) {

            if (item.getHargaAktual() != null) {
                total += item.getHargaAktual();
            }

        }

        return total;
    }
}

class GroupBudgetStrategy implements BudgetStrategy {

    private int jumlahAnggota;

    public GroupBudgetStrategy(int jumlahAnggota) {
        this.jumlahAnggota = jumlahAnggota;
    }

    @Override
    public Double hitungTotal(List<AnggaranItem> items) {

        double total = 0.0;

        for (AnggaranItem item : items) {

            if (item.getHargaAktual() != null) {
                total += item.getHargaAktual();
            }

        }

        if (jumlahAnggota <= 0) {
            return total;
        }

        return total / jumlahAnggota;
    }
}

class FamilyBudgetStrategy implements BudgetStrategy {

    private double tambahanBiayaKeluarga;

    public FamilyBudgetStrategy(double tambahanBiayaKeluarga) {
        this.tambahanBiayaKeluarga = tambahanBiayaKeluarga;
    }

    @Override
    public Double hitungTotal(List<AnggaranItem> items) {

        double total = 0.0;

        for (AnggaranItem item : items) {

            if (item.getHargaAktual() != null) {
                total += item.getHargaAktual();
            }

        }

        return total + tambahanBiayaKeluarga;
    }
}