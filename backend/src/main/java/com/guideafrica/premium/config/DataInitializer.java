package com.guideafrica.premium.config;

import com.guideafrica.premium.model.*;
import com.guideafrica.premium.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;
    private final ReviewRepository reviewRepository;

    public DataInitializer(CategoryRepository categoryRepository,
                           RestaurantRepository restaurantRepository,
                           HotelRepository hotelRepository,
                           ReviewRepository reviewRepository) {
        this.categoryRepository = categoryRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) {
        // ===== Categories =====
        Category gastronomique = categoryRepository.save(new Category("Gastronomique", "Cuisine haut de gamme et raffinée", "RESTAURANT"));
        Category streetFood = categoryRepository.save(new Category("Street Food", "Cuisine de rue populaire et authentique", "RESTAURANT"));
        Category traditionnel = categoryRepository.save(new Category("Traditionnel", "Cuisine traditionnelle africaine", "RESTAURANT"));
        Category luxe = categoryRepository.save(new Category("Luxe", "Établissement haut de gamme 5 étoiles", "HOTEL"));
        Category budget = categoryRepository.save(new Category("Budget", "Bon rapport qualité-prix", "HOTEL"));
        Category familial = categoryRepository.save(new Category("Familial", "Adapté aux familles avec enfants", "BOTH"));
        Category affaires = categoryRepository.save(new Category("Affaires", "Idéal pour les voyages d'affaires", "BOTH"));

        // ===== Restaurants =====

        // Restaurant 1 - Sénégal
        Restaurant r1 = new Restaurant();
        r1.setNom("Le Djolof");
        r1.setDescription("Restaurant sénégalais authentique proposant les meilleures spécialités de la cuisine ouest-africaine. Le Thiéboudienne, plat national, y est préparé selon la recette traditionnelle de Saint-Louis.");
        r1.setAdresse("12 Rue de la Corniche, Dakar, Sénégal");
        r1.setCuisine("Sénégalaise");
        r1.setNote(4.5);
        r1.setImage("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800");
        r1.setCoordonneesGps(new GpsCoordinates(14.6937, -17.4441));
        r1.setTelephone("+221 33 823 45 67");
        r1.setEmail("contact@ledjolof.sn");
        r1.setHoraires("Lun-Sam: 11h-23h, Dim: 12h-22h");
        r1.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600"
        ));
        r1.setCategories(new HashSet<>(Set.of(gastronomique, traditionnel)));
        r1 = restaurantRepository.save(r1);

        // Restaurant 2 - Maroc
        Restaurant r2 = new Restaurant();
        r2.setNom("Dar Zellij");
        r2.setDescription("Niché au cœur de la médina de Marrakech, Dar Zellij offre une expérience culinaire marocaine inoubliable dans un cadre somptueux. Tajines, couscous et pastillas préparés avec des épices du souk.");
        r2.setAdresse("1 Derb El Arsa, Riad Zitoun, Marrakech, Maroc");
        r2.setCuisine("Marocaine");
        r2.setNote(4.7);
        r2.setImage("https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800");
        r2.setCoordonneesGps(new GpsCoordinates(31.6295, -7.9811));
        r2.setTelephone("+212 524 38 26 27");
        r2.setEmail("reservation@darzellij.ma");
        r2.setHoraires("Tous les jours: 12h-15h, 19h-23h");
        r2.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1540914124281-342587941389?w=600",
                "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=600"
        ));
        r2.setCategories(new HashSet<>(Set.of(gastronomique)));
        r2 = restaurantRepository.save(r2);

        // Restaurant 3 - Côte d'Ivoire
        Restaurant r3 = new Restaurant();
        r3.setNom("Chez Tantine Awa");
        r3.setDescription("Le meilleur maquis d'Abidjan ! Attiéké poisson, alloco, kédjénou de poulet... Une cuisine ivoirienne généreuse et savoureuse dans une ambiance conviviale.");
        r3.setAdresse("Boulevard de Marseille, Treichville, Abidjan, Côte d'Ivoire");
        r3.setCuisine("Ivoirienne");
        r3.setNote(4.2);
        r3.setImage("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800");
        r3.setCoordonneesGps(new GpsCoordinates(5.3160, -4.0026));
        r3.setTelephone("+225 27 21 35 78 90");
        r3.setEmail("tantineawa@gmail.com");
        r3.setHoraires("Lun-Dim: 10h-22h");
        r3.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
                "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600"
        ));
        r3.setCategories(new HashSet<>(Set.of(streetFood, traditionnel, familial)));
        r3 = restaurantRepository.save(r3);

        // Restaurant 4 - Afrique du Sud
        Restaurant r4 = new Restaurant();
        r4.setNom("Mama Africa");
        r4.setDescription("Institution du Cap, Mama Africa célèbre la diversité culinaire du continent avec des plats de toute l'Afrique, accompagnés de musique live et d'une atmosphère vibrante.");
        r4.setAdresse("178 Long Street, Cape Town, Afrique du Sud");
        r4.setCuisine("Pan-africaine");
        r4.setNote(4.4);
        r4.setImage("https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800");
        r4.setCoordonneesGps(new GpsCoordinates(-33.9249, 18.4241));
        r4.setTelephone("+27 21 426 1017");
        r4.setEmail("info@mamaafricarestaurant.co.za");
        r4.setHoraires("Lun-Dim: 18h-00h");
        r4.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600"
        ));
        r4.setCategories(new HashSet<>(Set.of(gastronomique, familial)));
        r4 = restaurantRepository.save(r4);

        // ===== Hotels =====

        // Hotel 1 - Kenya
        Hotel h1 = new Hotel();
        h1.setNom("Serena Hotel Nairobi");
        h1.setDescription("Hôtel 5 étoiles au cœur de Nairobi, offrant un mélange unique de luxe moderne et d'architecture africaine traditionnelle. Piscine, spa, et vue imprenable sur les jardins.");
        h1.setAdresse("Kenyatta Avenue, Nairobi, Kenya");
        h1.setEtoiles(5);
        h1.setPrixParNuit(250.0);
        h1.setImage("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800");
        h1.setCoordonneesGps(new GpsCoordinates(-1.2921, 36.8219));
        h1.setTelephone("+254 20 282 2000");
        h1.setEmail("nairobi@serenahotels.com");
        h1.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600"
        ));
        h1.setCategories(new HashSet<>(Set.of(luxe, affaires)));
        h1 = hotelRepository.save(h1);

        // Hotel 2 - Maroc
        Hotel h2 = new Hotel();
        h2.setNom("La Mamounia");
        h2.setDescription("Palace légendaire de Marrakech, La Mamounia est un joyau de l'hôtellerie de luxe mondiale. Jardins centenaires, hammam traditionnel et gastronomie d'exception.");
        h2.setAdresse("Avenue Bab Jdid, Marrakech, Maroc");
        h2.setEtoiles(5);
        h2.setPrixParNuit(450.0);
        h2.setImage("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800");
        h2.setCoordonneesGps(new GpsCoordinates(31.6225, -8.0109));
        h2.setTelephone("+212 524 38 86 00");
        h2.setEmail("reservation@mamounia.com");
        h2.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600",
                "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600"
        ));
        h2.setCategories(new HashSet<>(Set.of(luxe)));
        h2 = hotelRepository.save(h2);

        // Hotel 3 - Côte d'Ivoire
        Hotel h3 = new Hotel();
        h3.setNom("Hôtel Ivoire Sofitel");
        h3.setDescription("Emblème d'Abidjan, l'Hôtel Ivoire domine le lagon avec ses installations modernes : patinoire, bowling, casino et piscine olympique. Un complexe hôtelier unique en Afrique de l'Ouest.");
        h3.setAdresse("Boulevard Hassan II, Cocody, Abidjan, Côte d'Ivoire");
        h3.setEtoiles(5);
        h3.setPrixParNuit(180.0);
        h3.setImage("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800");
        h3.setCoordonneesGps(new GpsCoordinates(5.3364, -3.9625));
        h3.setTelephone("+225 27 22 48 26 26");
        h3.setEmail("reservation@hotelivoire.ci");
        h3.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600",
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"
        ));
        h3.setCategories(new HashSet<>(Set.of(luxe, affaires, familial)));
        h3 = hotelRepository.save(h3);

        // Hotel 4 - Tanzania
        Hotel h4 = new Hotel();
        h4.setNom("Zanzibar Beach Resort");
        h4.setDescription("Resort de charme sur la plage de Nungwi à Zanzibar. Bungalows pieds dans l'eau, plongée sous-marine et excursions dans les plantations d'épices.");
        h4.setAdresse("Nungwi Beach, Zanzibar, Tanzanie");
        h4.setEtoiles(4);
        h4.setPrixParNuit(120.0);
        h4.setImage("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800");
        h4.setCoordonneesGps(new GpsCoordinates(-5.7264, 39.2988));
        h4.setTelephone("+255 24 224 0162");
        h4.setEmail("info@zanzibeachresort.tz");
        h4.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
                "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600"
        ));
        h4.setCategories(new HashSet<>(Set.of(budget, familial)));
        h4 = hotelRepository.save(h4);

        // ===== Reviews =====

        // Reviews for Restaurant 1
        Review rev1 = new Review("Aminata D.", 5, "Le meilleur Thiéboudienne de tout Dakar ! Service impeccable et cadre magnifique.");
        rev1.setRestaurant(r1);
        reviewRepository.save(rev1);

        Review rev2 = new Review("Pierre M.", 4, "Très bonne cuisine sénégalaise. Le yassa poulet est excellent. Ambiance agréable.");
        rev2.setRestaurant(r1);
        reviewRepository.save(rev2);

        // Reviews for Restaurant 2
        Review rev3 = new Review("Sophie L.", 5, "Une expérience magique dans un cadre sublime. Le tajine d'agneau aux pruneaux est divin.");
        rev3.setRestaurant(r2);
        reviewRepository.save(rev3);

        Review rev4 = new Review("Hassan K.", 4, "Cadre authentique et cuisine de qualité. Un peu cher mais ça vaut le détour.");
        rev4.setRestaurant(r2);
        reviewRepository.save(rev4);

        // Reviews for Restaurant 3
        Review rev5 = new Review("Kouamé J.", 5, "Comme chez maman ! L'attiéké poisson frais est incroyable. Prix très abordables.");
        rev5.setRestaurant(r3);
        reviewRepository.save(rev5);

        // Reviews for Restaurant 4
        Review rev6 = new Review("John S.", 4, "Great live music and authentic African dishes. The bobotie was delicious!");
        rev6.setRestaurant(r4);
        reviewRepository.save(rev6);

        // Reviews for Hotels
        Review rev7 = new Review("David W.", 5, "Luxurious hotel with excellent service. The pool area is stunning.");
        rev7.setHotel(h1);
        reviewRepository.save(rev7);

        Review rev8 = new Review("Fatima Z.", 5, "Le plus bel hôtel du Maroc. Le jardin est magnifique et le hammam exceptionnel.");
        rev8.setHotel(h2);
        reviewRepository.save(rev8);

        Review rev9 = new Review("Ibrahim C.", 4, "Superbe hôtel avec vue sur le lagon. La piscine est immense. Bon rapport qualité-prix.");
        rev9.setHotel(h3);
        reviewRepository.save(rev9);

        Review rev10 = new Review("Emma T.", 5, "Paradise on earth! The beach is amazing and the staff is wonderful.");
        rev10.setHotel(h4);
        reviewRepository.save(rev10);

        System.out.println("=== Données d'exemple chargées avec succès ===");
        System.out.println("  - " + categoryRepository.count() + " catégories");
        System.out.println("  - " + restaurantRepository.count() + " restaurants");
        System.out.println("  - " + hotelRepository.count() + " hôtels");
        System.out.println("  - " + reviewRepository.count() + " avis");
    }
}
