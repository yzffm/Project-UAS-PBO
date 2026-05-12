package com.travelplanner.util;

import com.travelplanner.model.base.Destinasi;
import com.travelplanner.model.destinasi.WisataAlam;
import com.travelplanner.model.destinasi.WisataBudaya;
import com.travelplanner.model.destinasi.WisataKuliner;
import com.travelplanner.repository.DestinasiRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final DestinasiRepository destinasiRepository;

    public DataSeeder(DestinasiRepository destinasiRepository) {
        this.destinasiRepository = destinasiRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (destinasiRepository.count() == 0) {
            seedDestinasi();
        }
    }

    private void seedDestinasi() {
        // 1. Wisata Alam
        WisataAlam bromo = new WisataAlam();
        bromo.setNama("Gunung Bromo");
        bromo.setDeskripsi("Gunung berapi aktif dengan pemandangan sunrise yang spektakuler.");
        bromo.setLokasi("Probolinggo, Jawa Timur");
        bromo.setAlamatLengkap("Taman Nasional Bromo Tengger Semeru");
        bromo.setEstimasiBiaya(350000.0);
        bromo.setGambarUrl("https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80");
        bromo.setDurasiRekomendasi(240); // 4 hours
        bromo.setJenisAlam("Gunung");
        bromo.setTingkatKesulitan("Sedang");
        bromo.setPerluGuide(true);
        bromo.setMusimTerbaik("Kemarau");

        WisataAlam pinkBeach = new WisataAlam();
        pinkBeach.setNama("Pink Beach Komodo");
        pinkBeach.setDeskripsi("Pantai dengan pasir berwarna merah muda yang langka di dunia.");
        pinkBeach.setLokasi("Manggarai Barat, NTT");
        pinkBeach.setAlamatLengkap("Pulau Komodo, Taman Nasional Komodo");
        pinkBeach.setEstimasiBiaya(1500000.0);
        pinkBeach.setGambarUrl("https://images.unsplash.com/photo-1590419690008-905895e8fd0d?auto=format&fit=crop&q=80");
        pinkBeach.setDurasiRekomendasi(180);
        pinkBeach.setJenisAlam("Pantai");
        pinkBeach.setTingkatKesulitan("Mudah");
        pinkBeach.setPerluGuide(true);
        pinkBeach.setMusimTerbaik("Kemarau");

        WisataAlam ijen = new WisataAlam();
        ijen.setNama("Kawah Ijen");
        ijen.setDeskripsi("Kawah vulkanik dengan fenomena api biru (blue fire) dan danau asam terbesar di dunia.");
        ijen.setLokasi("Banyuwangi, Jawa Timur");
        ijen.setAlamatLengkap("Perbatasan Kabupaten Banyuwangi dan Bondowoso");
        ijen.setEstimasiBiaya(250000.0);
        ijen.setGambarUrl("https://images.unsplash.com/photo-1627885098327-0b1a039b2b2b?auto=format&fit=crop&q=80");
        ijen.setDurasiRekomendasi(300);
        ijen.setJenisAlam("Gunung");
        ijen.setTingkatKesulitan("Sulit");
        ijen.setPerluGuide(true);
        ijen.setMusimTerbaik("Kemarau");

        WisataAlam nusaPenida = new WisataAlam();
        nusaPenida.setNama("Kelingking Beach");
        nusaPenida.setDeskripsi("Tebing karang ikonik berbentuk T-Rex dengan pantai pasir putih di bawahnya.");
        nusaPenida.setLokasi("Nusa Penida, Bali");
        nusaPenida.setAlamatLengkap("Bunga Mekar, Nusa Penida, Kabupaten Klungkung");
        nusaPenida.setEstimasiBiaya(150000.0);
        nusaPenida.setGambarUrl("https://images.unsplash.com/photo-1559628233-eb1b1a45564b?auto=format&fit=crop&q=80");
        nusaPenida.setDurasiRekomendasi(120);
        nusaPenida.setJenisAlam("Pantai");
        nusaPenida.setTingkatKesulitan("Sedang");
        nusaPenida.setPerluGuide(false);
        nusaPenida.setMusimTerbaik("Kemarau");

        WisataAlam tumpakSewu = new WisataAlam();
        tumpakSewu.setNama("Air Terjun Tumpak Sewu");
        tumpakSewu.setDeskripsi("Air terjun megah yang menyerupai tirai air raksasa di lereng Semeru.");
        tumpakSewu.setLokasi("Lumajang, Jawa Timur");
        tumpakSewu.setAlamatLengkap("Jl. Raya Dampit-Lumajang, Sidomulyo, Pronojiwo");
        tumpakSewu.setEstimasiBiaya(50000.0);
        tumpakSewu.setGambarUrl("https://images.unsplash.com/photo-1600577916048-804c9191e36c?auto=format&fit=crop&q=80");
        tumpakSewu.setDurasiRekomendasi(180);
        tumpakSewu.setJenisAlam("Air Terjun");
        tumpakSewu.setTingkatKesulitan("Sedang");
        tumpakSewu.setPerluGuide(true);
        tumpakSewu.setMusimTerbaik("Hujan");

        // 2. Wisata Budaya
        WisataBudaya borobudur = new WisataBudaya();
        borobudur.setNama("Candi Borobudur");
        borobudur.setDeskripsi("Candi Buddha terbesar di dunia peninggalan wangsa Syailendra.");
        borobudur.setLokasi("Magelang, Jawa Tengah");
        borobudur.setAlamatLengkap("Jl. Badrawati, Kw. Candi Borobudur, Borobudur");
        borobudur.setEstimasiBiaya(50000.0);
        borobudur.setGambarUrl("https://images.unsplash.com/photo-1582236528731-9f20610f443b?auto=format&fit=crop&q=80");
        borobudur.setDurasiRekomendasi(180);
        borobudur.setJenisBudaya("Candi");
        borobudur.setPeriodeBudaya("Abad ke-8");
        borobudur.setAdaPemandu(true);
        borobudur.setDresscode("Sopan (tidak celana pendek)");

        WisataBudaya prambanan = new WisataBudaya();
        prambanan.setNama("Candi Prambanan");
        prambanan.setDeskripsi("Kompleks candi Hindu terbesar di Indonesia yang didedikasikan untuk Trimurti.");
        prambanan.setLokasi("Sleman, DI Yogyakarta");
        prambanan.setAlamatLengkap("Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo");
        prambanan.setEstimasiBiaya(50000.0);
        prambanan.setGambarUrl("https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&q=80");
        prambanan.setDurasiRekomendasi(180);
        prambanan.setJenisBudaya("Candi");
        prambanan.setPeriodeBudaya("Abad ke-9");
        prambanan.setAdaPemandu(true);
        prambanan.setDresscode("Sopan");

        WisataBudaya keraton = new WisataBudaya();
        keraton.setNama("Keraton Yogyakarta");
        keraton.setDeskripsi("Istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih berfungsi.");
        keraton.setLokasi("Yogyakarta, DI Yogyakarta");
        keraton.setAlamatLengkap("Jl. Rotowijayan Blok No. 1, Panembahan, Kraton");
        keraton.setEstimasiBiaya(20000.0);
        keraton.setGambarUrl("https://images.unsplash.com/photo-1627914838580-c11df5ba14a8?auto=format&fit=crop&q=80");
        keraton.setDurasiRekomendasi(120);
        keraton.setJenisBudaya("Keraton");
        keraton.setPeriodeBudaya("Abad ke-18");
        keraton.setAdaPemandu(true);
        keraton.setDresscode("Sopan (tidak topi di dalam area)");

        WisataBudaya uluwatu = new WisataBudaya();
        uluwatu.setNama("Pura Uluwatu");
        uluwatu.setDeskripsi("Pura laut Hindu Bali yang terletak di atas tebing curam, terkenal dengan Tari Kecak saat sunset.");
        uluwatu.setLokasi("Badung, Bali");
        uluwatu.setAlamatLengkap("Pecatu, Kuta Selatan, Kabupaten Badung");
        uluwatu.setEstimasiBiaya(150000.0); // Termasuk tiket tari kecak
        uluwatu.setGambarUrl("https://images.unsplash.com/photo-1563462947-0e6b54721473?auto=format&fit=crop&q=80");
        uluwatu.setDurasiRekomendasi(150);
        uluwatu.setJenisBudaya("Pura");
        uluwatu.setPeriodeBudaya("Abad ke-11");
        uluwatu.setAdaPemandu(false);
        uluwatu.setDresscode("Memakai kain sarung adat (disediakan)");

        WisataBudaya tanaToraja = new WisataBudaya();
        tanaToraja.setNama("Kete Kesu Tana Toraja");
        tanaToraja.setDeskripsi("Desa adat dengan deretan rumah Tongkonan tradisional dan tradisi pemakaman unik.");
        tanaToraja.setLokasi("Toraja Utara, Sulawesi Selatan");
        tanaToraja.setAlamatLengkap("Kete Kesu, Kampung Bonoran, Tikala");
        tanaToraja.setEstimasiBiaya(30000.0);
        tanaToraja.setGambarUrl("https://images.unsplash.com/photo-1603503370966-231367d3cf26?auto=format&fit=crop&q=80");
        tanaToraja.setDurasiRekomendasi(180);
        tanaToraja.setJenisBudaya("Kampung Adat");
        tanaToraja.setPeriodeBudaya("Megalitik");
        tanaToraja.setAdaPemandu(true);
        tanaToraja.setDresscode("Sopan");

        // 3. Wisata Kuliner
        WisataKuliner gudeg = new WisataKuliner();
        gudeg.setNama("Gudeg Yu Djum");
        gudeg.setDeskripsi("Restoran ikonik yang menyajikan gudeg kering khas Yogyakarta resep turun temurun.");
        gudeg.setLokasi("Yogyakarta, DI Yogyakarta");
        gudeg.setAlamatLengkap("Jl. Wijilan No. 167, Panembahan, Kraton");
        gudeg.setEstimasiBiaya(45000.0);
        gudeg.setGambarUrl("https://images.unsplash.com/photo-1615967008102-1cb46db4cf3c?auto=format&fit=crop&q=80");
        gudeg.setDurasiRekomendasi(60);
        gudeg.setJenisKuliner("Restoran");
        gudeg.setMasakan("Jawa");
        gudeg.setRentangHarga("Menengah");
        gudeg.setHalalCertified(true);

        WisataKuliner sateLilit = new WisataKuliner();
        sateLilit.setNama("Warung Nasi Ayam Kedewatan Ibu Mangku");
        sateLilit.setDeskripsi("Legenda kuliner Ubud yang menyajikan nasi campur ayam khas Bali yang pedas dan gurih.");
        sateLilit.setLokasi("Gianyar, Bali");
        sateLilit.setAlamatLengkap("Jl. Raya Kedewatan No.18, Kedewatan, Ubud");
        sateLilit.setEstimasiBiaya(40000.0);
        sateLilit.setGambarUrl("https://images.unsplash.com/photo-1604505370425-4b0d01d4a0a4?auto=format&fit=crop&q=80");
        sateLilit.setDurasiRekomendasi(45);
        sateLilit.setJenisKuliner("Warung");
        sateLilit.setMasakan("Bali");
        sateLilit.setRentangHarga("Menengah");
        sateLilit.setHalalCertified(true);

        WisataKuliner rendang = new WisataKuliner();
        rendang.setNama("Rumah Makan Lamun Ombak");
        rendang.setDeskripsi("Salah satu restoran Padang paling populer di kota Padang, terkenal dengan ayam pop dan rendang.");
        rendang.setLokasi("Padang, Sumatera Barat");
        rendang.setAlamatLengkap("Jl. Khatib Sulaiman No.99, Ulak Karang Sel., Padang Utara");
        rendang.setEstimasiBiaya(60000.0);
        rendang.setGambarUrl("https://images.unsplash.com/photo-1605342416962-d2861a5b8287?auto=format&fit=crop&q=80");
        rendang.setDurasiRekomendasi(60);
        rendang.setJenisKuliner("Restoran");
        rendang.setMasakan("Padang");
        rendang.setRentangHarga("Menengah");
        rendang.setHalalCertified(true);

        WisataKuliner bebek = new WisataKuliner();
        bebek.setNama("Bebek Sinjay");
        bebek.setDeskripsi("Kuliner bebek goreng dengan sambal pencit (mangga muda) legendaris dari Madura.");
        bebek.setLokasi("Bangkalan, Jawa Timur");
        bebek.setAlamatLengkap("Jl. Raya Ketengan No.45, Ketengan, Tunjung, Burneh");
        bebek.setEstimasiBiaya(35000.0);
        bebek.setGambarUrl("https://images.unsplash.com/photo-1596700543666-512b98df0326?auto=format&fit=crop&q=80");
        bebek.setDurasiRekomendasi(45);
        bebek.setJenisKuliner("Restoran");
        bebek.setMasakan("Madura");
        bebek.setRentangHarga("Budget");
        bebek.setHalalCertified(true);

        WisataKuliner babiGuling = new WisataKuliner();
        babiGuling.setNama("Babi Guling Pak Malen");
        babiGuling.setDeskripsi("Warung babi guling populer di kawasan Seminyak, terkenal dengan kulit renyah dan sate babinya.");
        babiGuling.setLokasi("Badung, Bali");
        babiGuling.setAlamatLengkap("Jl. Sunset Road No.554, Seminyak, Kuta");
        babiGuling.setEstimasiBiaya(65000.0);
        babiGuling.setGambarUrl("https://images.unsplash.com/photo-1626081476902-143bb0cecb7d?auto=format&fit=crop&q=80");
        babiGuling.setDurasiRekomendasi(45);
        babiGuling.setJenisKuliner("Warung");
        babiGuling.setMasakan("Bali");
        babiGuling.setRentangHarga("Menengah");
        babiGuling.setHalalCertified(false);

        destinasiRepository.saveAll(List.of(
            bromo, pinkBeach, ijen, nusaPenida, tumpakSewu,
            borobudur, prambanan, keraton, uluwatu, tanaToraja,
            gudeg, sateLilit, rendang, bebek, babiGuling
        ));
    }
}
