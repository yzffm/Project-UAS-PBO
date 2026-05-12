package com.travelplanner.service;

import com.travelplanner.exception.ResourceNotFoundException;
import com.travelplanner.model.HariPerjalanan;
import com.travelplanner.model.JadwalDestinasi;
import com.travelplanner.model.base.Destinasi;
import com.travelplanner.model.base.Perjalanan;
import com.travelplanner.repository.DestinasiRepository;
import com.travelplanner.repository.HariPerjalananRepository;
import com.travelplanner.repository.JadwalDestinasiRepository;
import com.travelplanner.repository.PerjalananRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ItineraryService {

    private final HariPerjalananRepository hariPerjalananRepository;
    private final PerjalananRepository perjalananRepository;
    private final JadwalDestinasiRepository jadwalDestinasiRepository;
    private final DestinasiRepository destinasiRepository;

    public ItineraryService(HariPerjalananRepository hariPerjalananRepository,
                            PerjalananRepository perjalananRepository,
                            JadwalDestinasiRepository jadwalDestinasiRepository,
                            DestinasiRepository destinasiRepository) {
        this.hariPerjalananRepository = hariPerjalananRepository;
        this.perjalananRepository = perjalananRepository;
        this.jadwalDestinasiRepository = jadwalDestinasiRepository;
        this.destinasiRepository = destinasiRepository;
    }

    public List<HariPerjalanan> getDaysByTrip(Long tripId) {
        return hariPerjalananRepository.findByPerjalananIdOrderByUrutanHariAsc(tripId);
    }

    @Transactional
    public HariPerjalanan addDayToTrip(Long tripId, LocalDate tanggal, Integer urutanHari) {
        Perjalanan perjalanan = perjalananRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip tidak ditemukan"));

        HariPerjalanan hari = new HariPerjalanan();
        hari.setPerjalanan(perjalanan);
        hari.setTanggal(tanggal);
        hari.setUrutanHari(urutanHari);

        return hariPerjalananRepository.save(hari);
    }

    @Transactional
    public HariPerjalanan updateDay(Long dayId, LocalDate tanggal, Integer urutanHari, String catatan) {
        HariPerjalanan hari = hariPerjalananRepository.findById(dayId)
                .orElseThrow(() -> new ResourceNotFoundException("Hari perjalanan tidak ditemukan"));
        if (tanggal != null) hari.setTanggal(tanggal);
        if (urutanHari != null) hari.setUrutanHari(urutanHari);
        if (catatan != null) hari.setCatatan(catatan);
        return hariPerjalananRepository.save(hari);
    }

    @Transactional
    public void deleteDay(Long dayId) {
        if (!hariPerjalananRepository.existsById(dayId)) {
            throw new ResourceNotFoundException("Hari perjalanan tidak ditemukan");
        }
        hariPerjalananRepository.deleteById(dayId);
    }

    // UPDATE: Tambah parameter "urutan" dan sesuaikan setter waktu
    @Transactional
    public JadwalDestinasi addSchedule(Long dayId, Long destinasiId, Integer urutan, LocalTime mulai, LocalTime selesai, String catatan) {
        HariPerjalanan hari = hariPerjalananRepository.findById(dayId)
                .orElseThrow(() -> new ResourceNotFoundException("Hari perjalanan tidak ditemukan"));
        
        Destinasi destinasi = destinasiRepository.findById(destinasiId)
                .orElseThrow(() -> new ResourceNotFoundException("Destinasi tidak ditemukan"));

        JadwalDestinasi jadwal = new JadwalDestinasi();
        jadwal.setHariPerjalanan(hari);
        jadwal.setDestinasi(destinasi);
        
        // Penyesuaian dengan setter di JadwalDestinasi buatan lu
        jadwal.setUrutan(urutan); 
        jadwal.setWaktuMulai(mulai); 
        jadwal.setWaktuSelesai(selesai);
        jadwal.setCatatan(catatan);

        return jadwalDestinasiRepository.save(jadwal);
    }

    @Transactional
    public void removeSchedule(Long scheduleId) {
        if (!jadwalDestinasiRepository.existsById(scheduleId)) {
            throw new ResourceNotFoundException("Jadwal tidak ditemukan");
        }
        jadwalDestinasiRepository.deleteById(scheduleId);
    }
}