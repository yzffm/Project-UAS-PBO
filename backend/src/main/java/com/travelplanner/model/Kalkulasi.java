package com.travelplanner.model;

/**
 * ISP: Interface for budget calculation behavior.
 * Implemented by AnggaranItem to provide budget status.
 */
public interface Kalkulasi {
    Double getSelisih();
    String getStatusBudget();
}
