package com.travelplanner.controller;

import com.travelplanner.model.HariPerjalanan;
import com.travelplanner.model.JadwalDestinasi;
import com.travelplanner.service.ItineraryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/trips/{tripId}/days")
@CrossOrigin("*")
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @GetMapping
    public ResponseEntity<List<HariPerjalanan>> getAllDays(@PathVariable Long tripId) {
        return ResponseEntity.ok(itineraryService.getDaysByTrip(tripId));
    }

    @PostMapping
    public ResponseEntity<HariPerjalanan> addDay(
            @PathVariable Long tripId,
            @RequestBody Map<String, Object> body) {
        LocalDate tanggal = LocalDate.parse(body.get("tanggal").toString());
        Integer urutanHari = Integer.parseInt(body.get("urutanHari").toString());
        return ResponseEntity.ok(itineraryService.addDayToTrip(tripId, tanggal, urutanHari));
    }

    @PutMapping("/{dayId}")
    public ResponseEntity<HariPerjalanan> updateDay(
            @PathVariable Long tripId,
            @PathVariable Long dayId,
            @RequestBody Map<String, Object> body) {
        LocalDate tanggal = body.containsKey("tanggal") ? LocalDate.parse(body.get("tanggal").toString()) : null;
        Integer urutanHari = body.containsKey("urutanHari") ? Integer.parseInt(body.get("urutanHari").toString()) : null;
        String catatan = body.containsKey("catatan") ? body.get("catatan").toString() : null;
        return ResponseEntity.ok(itineraryService.updateDay(dayId, tanggal, urutanHari, catatan));
    }

    @DeleteMapping("/{dayId}")
    public ResponseEntity<Void> deleteDay(
            @PathVariable Long tripId,
            @PathVariable Long dayId) {
        itineraryService.deleteDay(dayId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{dayId}/schedule")
    public ResponseEntity<JadwalDestinasi> addSchedule(
            @PathVariable Long tripId,
            @PathVariable Long dayId,
            @RequestBody Map<String, Object> body) {
        Long destinasiId = Long.parseLong(body.get("destinasiId").toString());
        Integer urutan = Integer.parseInt(body.get("urutan").toString());
        LocalTime mulai = LocalTime.parse(body.get("waktuMulai").toString());
        LocalTime selesai = LocalTime.parse(body.get("waktuSelesai").toString());
        String catatan = body.containsKey("catatan") ? body.get("catatan").toString() : null;
        
        return ResponseEntity.ok(itineraryService.addSchedule(dayId, destinasiId, urutan, mulai, selesai, catatan));
    }

    @DeleteMapping("/{dayId}/schedule/{schedId}")
    public ResponseEntity<Void> removeSchedule(
            @PathVariable Long tripId,
            @PathVariable Long dayId,
            @PathVariable Long schedId) {
        itineraryService.removeSchedule(schedId);
        return ResponseEntity.noContent().build();
    }
}
