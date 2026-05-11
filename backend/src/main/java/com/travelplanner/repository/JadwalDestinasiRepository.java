package com.travelplanner.repository;

import com.travelplanner.model.JadwalDestinasi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JadwalDestinasiRepository extends JpaRepository<JadwalDestinasi, Long> {
    // Query bawaan JpaRepository sudah cukup untuk CRUD dasar
}