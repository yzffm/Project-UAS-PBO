package com.travelplanner.factory;

import com.travelplanner.dto.request.AnggaranRequestDTO;
import com.travelplanner.model.anggaran.AnggaranAkomodasi;
import com.travelplanner.model.anggaran.AnggaranKonsumsi;
import com.travelplanner.model.anggaran.AnggaranLainnya;
import com.travelplanner.model.anggaran.AnggaranTransportasi;
import com.travelplanner.model.base.AnggaranItem;

/**
 * FACTORY PATTERN: Centralizes budget item creation logic.
 * OCP: Adding a new budget category = add one case here only.
 */
public class AnggaranFactory {

    private AnggaranFactory() {
        // Utility class — prevent instantiation
    }

    /**
     * Creates the correct AnggaranItem subclass based on category.
     *
     * @param kategori "TRANSPORTASI", "AKOMODASI", "KONSUMSI", or "LAINNYA"
     * @param dto      the request DTO containing all budget fields
     * @return the built AnggaranItem subclass instance
     * @throws IllegalArgumentException if kategori is unknown
     */
    public static AnggaranItem create(String kategori, AnggaranRequestDTO dto) {
        return switch (kategori.toUpperCase()) {
            case "TRANSPORTASI" -> buildTransportasi(dto);
            case "AKOMODASI" -> buildAkomodasi(dto);
            case "KONSUMSI" -> buildKonsumsi(dto);
            case "LAINNYA" -> buildLainnya(dto);
            default -> throw new IllegalArgumentException("Kategori anggaran tidak dikenal: " + kategori);
        };
    }

    private static AnggaranTransportasi buildTransportasi(AnggaranRequestDTO dto) {
        AnggaranTransportasi item = new AnggaranTransportasi();
        setCommonFields(item, dto);
        item.setModeTransportasi(dto.getModeTransportasi());
        item.setAsal(dto.getAsal());
        item.setTujuan(dto.getTujuan());
        item.setTanggalKeberangkatan(dto.getTanggalKeberangkatan());
        return item;
    }

    private static AnggaranAkomodasi buildAkomodasi(AnggaranRequestDTO dto) {
        AnggaranAkomodasi item = new AnggaranAkomodasi();
        setCommonFields(item, dto);
        item.setNamaHotel(dto.getNamaHotel());
        item.setTipeKamar(dto.getTipeKamar());
        item.setJumlahMalam(dto.getJumlahMalam());
        item.setHargaPerMalam(dto.getHargaPerMalam());
        return item;
    }

    private static AnggaranKonsumsi buildKonsumsi(AnggaranRequestDTO dto) {
        AnggaranKonsumsi item = new AnggaranKonsumsi();
        setCommonFields(item, dto);
        item.setWaktuMakan(dto.getWaktuMakan());
        item.setJumlahOrang(dto.getJumlahOrang());
        return item;
    }

    private static AnggaranLainnya buildLainnya(AnggaranRequestDTO dto) {
        AnggaranLainnya item = new AnggaranLainnya();
        setCommonFields(item, dto);
        item.setSubKategori(dto.getSubKategori());
        return item;
    }

    /** DRY: Shared field assignment for all budget item types */
    private static void setCommonFields(AnggaranItem item, AnggaranRequestDTO dto) {
        item.setNamaItem(dto.getNamaItem());
        item.setEstimasiHarga(dto.getEstimasiHarga() != null ? dto.getEstimasiHarga() : 0.0);
        item.setHargaAktual(dto.getHargaAktual() != null ? dto.getHargaAktual() : 0.0);
        item.setSudahDibayar(dto.getSudahDibayar() != null ? dto.getSudahDibayar() : false);
        item.setCatatan(dto.getCatatan());
    }
}
