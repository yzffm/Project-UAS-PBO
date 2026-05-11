import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnggaranService {

    private final AnggaranRepository anggaranRepository;

    /**
     * Method utama untuk memproses Summary Anggaran
     * @param tripId ID dari Perjalanan
     * @param tipePerjalanan "ECONOMY", "BUSINESS", atau "LUXURY"
     */
    public BudgetSummaryResponse getBudgetSummary(Long tripId, String tipePerjalanan) {
        
        // 1. Ambil semua item anggaran untuk trip ini dari Database
        List<AnggaranItem> items = anggaranRepository.findByTripId(tripId);

        // 2. Hitung Total Base (Polymorphism berjalan di sini memanggil getTaxedNominal)
        double totalBase = items.stream()
                .mapToDouble(AnggaranItem::getTaxedNominal)
                .sum();

        // 3. Tentukan Strategi menggunakan Factory Method internal
        BudgetStrategy strategy = selectStrategy(tipePerjalanan);

        // 4. Kalkulasi Estimasi Aman berdasarkan Strategi
        double finalEstimation = strategy.calculateRecommendedBudget(totalBase);

        // 5. Kelompokkan total per Kategori menggunakan Java Stream API (Untuk Frontend Chart)
        Map<String, Double> breakdown = items.stream()
                .collect(Collectors.groupingBy(
                        AnggaranItem::getKategori,
                        Collectors.summingDouble(AnggaranItem::getTaxedNominal)
                ));

        // 6. Return response
        return new BudgetSummaryResponse(totalBase, finalEstimation, breakdown);
    }

    /**
     * Method untuk memilih Strategy secara dinamis (Strategy Pattern)
     */
    private BudgetStrategy selectStrategy(String tipePerjalanan) {
        if (tipePerjalanan == null) return new EconomyStrategy();

        return switch (tipePerjalanan.toUpperCase()) {
            case "BUSINESS" -> new BusinessStrategy();
            case "LUXURY" -> new LuxuryStrategy();
            default -> new EconomyStrategy();
        };
    }
}