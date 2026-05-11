// 1. Deklarasi package sesuai folder di screenshot-mu
package com.travelplanner.repository;

// 2. Import class yang dibutuhkan biar gak "cannot find symbol"
import com.travelplanner.model.base.Destinasi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DestinasiRepository extends JpaRepository<Destinasi, Long> {
    
    // Fitur pencarian berdasarkan nama tempat
    List<Destinasi> findByNamaContainingIgnoreCase(String nama);
    
    // Fitur filter berdasarkan lokasi (kota)
    List<Destinasi> findByLokasiContainingIgnoreCase(String lokasi);
}