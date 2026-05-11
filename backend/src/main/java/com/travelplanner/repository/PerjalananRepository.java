package com.travelplanner.repository;

import com.travelplanner.model.base.Perjalanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerjalananRepository extends JpaRepository<Perjalanan, Long> {
    
    // Custom query method otomatis dari Spring Data JPA
    // Berfungsi untuk mengambil semua trip yang dibuat oleh user yang sedang login
    List<Perjalanan> findByPemilikId(Long pemilikId);
    
}