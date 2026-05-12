package com.travelplanner.controller;

import com.travelplanner.model.base.AnggaranItem;
import com.travelplanner.service.AnggaranService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anggaran")
@CrossOrigin("*")
public class AnggaranController {

    @Autowired
    private AnggaranService anggaranService;

    @GetMapping
    public List<AnggaranItem> getAllAnggaran() {
        return anggaranService.getAllAnggaran();
    }

    @GetMapping("/{id}")
    public AnggaranItem getAnggaranById(@PathVariable Long id) {
        return anggaranService.getAnggaranById(id);
    }

    @PostMapping
    public AnggaranItem createAnggaran(@RequestBody AnggaranItem anggaranItem) {
        return anggaranService.saveAnggaran(anggaranItem);
    }

    @PutMapping("/{id}")
    public AnggaranItem updateAnggaran(
            @PathVariable Long id,
            @RequestBody AnggaranItem anggaranItem) {

        return anggaranService.updateAnggaran(id, anggaranItem);
    }

    @DeleteMapping("/{id}")
    public String deleteAnggaran(@PathVariable Long id) {

        anggaranService.deleteAnggaran(id);

        return "Data anggaran berhasil dihapus";
    }

    @GetMapping("/summary")
    public Double getTotalAnggaran() {
        return anggaranService.hitungTotalAnggaran();
    }
}