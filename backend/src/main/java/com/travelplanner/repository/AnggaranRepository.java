package com.travelplanner.repository;

import com.travelplanner.model.base.AnggaranItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnggaranRepository extends JpaRepository<AnggaranItem, Long> {
    List<AnggaranItem> findByPerjalananId(Long perjalananId);
}
