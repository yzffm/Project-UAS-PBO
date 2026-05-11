package com.travelplanner.repository;

import com.travelplanner.model.HariPerjalanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HariPerjalananRepository extends JpaRepository<HariPerjalanan, Long> {
    // Custom query untuk mengambil hari berdasarkan ID Trip, diurutkan dari hari pertama
    List<HariPerjalanan> findByPerjalananIdOrderByUrutanHariAsc(Long perjalananId);
}
