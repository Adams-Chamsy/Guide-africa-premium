package com.guideafrica.premium.config;

import com.guideafrica.premium.model.*;
import com.guideafrica.premium.model.enums.*;
import com.guideafrica.premium.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
@Profile("dev")
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;
    private final ReviewRepository reviewRepository;
    private final CityRepository cityRepository;
    private final ChefRepository chefRepository;
    private final MenuItemRepository menuItemRepository;
    private final DistinctionRepository distinctionRepository;
    private final AmenityRepository amenityRepository;
    private final RegionalCuisineRepository regionalCuisineRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final FavoriRepository favoriRepository;
    private final ActiviteRepository activiteRepository;
    private final VoitureLocationRepository voitureLocationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(CategoryRepository categoryRepository,
                           RestaurantRepository restaurantRepository,
                           HotelRepository hotelRepository,
                           ReviewRepository reviewRepository,
                           CityRepository cityRepository,
                           ChefRepository chefRepository,
                           MenuItemRepository menuItemRepository,
                           DistinctionRepository distinctionRepository,
                           AmenityRepository amenityRepository,
                           RegionalCuisineRepository regionalCuisineRepository,
                           UtilisateurRepository utilisateurRepository,
                           FavoriRepository favoriRepository,
                           ActiviteRepository activiteRepository,
                           VoitureLocationRepository voitureLocationRepository,
                           PasswordEncoder passwordEncoder) {
        this.categoryRepository = categoryRepository;
        this.restaurantRepository = restaurantRepository;
        this.hotelRepository = hotelRepository;
        this.reviewRepository = reviewRepository;
        this.cityRepository = cityRepository;
        this.chefRepository = chefRepository;
        this.menuItemRepository = menuItemRepository;
        this.distinctionRepository = distinctionRepository;
        this.amenityRepository = amenityRepository;
        this.regionalCuisineRepository = regionalCuisineRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.favoriRepository = favoriRepository;
        this.activiteRepository = activiteRepository;
        this.voitureLocationRepository = voitureLocationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        // ===== Cities =====
        City dakar = cityRepository.save(new City("Dakar", "Sénégal", "Afrique de l'Ouest",
                "Capitale vibrante du Sénégal, connue pour sa scène culinaire dynamique et ses plages.",
                "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800", 14.6937, -17.4441));

        City marrakech = cityRepository.save(new City("Marrakech", "Maroc", "Afrique du Nord",
                "La ville ocre, joyau du Maroc avec sa médina classée UNESCO et sa gastronomie légendaire.",
                "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800", 31.6295, -7.9811));

        City abidjan = cityRepository.save(new City("Abidjan", "Côte d'Ivoire", "Afrique de l'Ouest",
                "Capitale économique ivoirienne, métropole cosmopolite avec une scène gastronomique riche.",
                "https://images.unsplash.com/photo-1572883454114-efb3f5e3b8ee?w=800", 5.3160, -4.0026));

        City capeTown = cityRepository.save(new City("Le Cap", "Afrique du Sud", "Afrique Australe",
                "Ville emblématique au pied de la Montagne de la Table, capitale culinaire du continent.",
                "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800", -33.9249, 18.4241));

        City nairobi = cityRepository.save(new City("Nairobi", "Kenya", "Afrique de l'Est",
                "Métropole dynamique, porte d'entrée des safaris et hub gastronomique est-africain.",
                "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800", -1.2921, 36.8219));

        City zanzibar = cityRepository.save(new City("Zanzibar", "Tanzanie", "Afrique de l'Est",
                "Île aux épices, paradis tropical avec une cuisine swahilie unique mêlant influences arabes et indiennes.",
                "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800", -6.1659, 39.1989));

        City lagos = cityRepository.save(new City("Lagos", "Nigéria", "Afrique de l'Ouest",
                "Plus grande ville d'Afrique, bouillonnante d'énergie avec une scène food en pleine explosion.",
                "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=800", 6.5244, 3.3792));

        City addisAbeba = cityRepository.save(new City("Addis-Abeba", "Éthiopie", "Afrique de l'Est",
                "Capitale de l'Éthiopie et siège de l'Union Africaine, berceau du café et de l'injera.",
                "https://images.unsplash.com/photo-1573416264828-04e92bed3367?w=800", 9.0192, 38.7525));

        City casablanca = cityRepository.save(new City("Casablanca", "Maroc", "Afrique du Nord",
                "Capitale économique du Maroc et plus grande ville du Maghreb. Casablanca allie modernité et tradition avec sa célèbre mosquée Hassan II en bord d'océan.",
                "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800", 33.5731, -7.5898));

        City tunis = cityRepository.save(new City("Tunis", "Tunisie", "Afrique du Nord",
                "Capitale de la Tunisie, ville millénaire où la médina classée UNESCO côtoie les quartiers modernes. Carrefour entre Orient et Occident méditerranéen.",
                "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800", 36.8065, 10.1815));

        City accra = cityRepository.save(new City("Accra", "Ghana", "Afrique de l'Ouest",
                "Capitale dynamique du Ghana, connue pour ses marchés colorés, sa scène artistique florissante et sa cuisine street food vibrante. Porte d'entrée de l'Afrique de l'Ouest anglophone.",
                "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=800", 5.6037, -0.1870));

        City kigali = cityRepository.save(new City("Kigali", "Rwanda", "Afrique de l'Est",
                "Capitale du Rwanda, souvent surnommée la ville la plus propre d'Afrique. Kigali impressionne par sa modernité, ses collines verdoyantes et sa proximité avec les gorilles des montagnes.",
                "https://images.unsplash.com/photo-1580746738099-04a87be231a1?w=800", -1.9403, 29.8739));

        City darEsSalaam = cityRepository.save(new City("Dar es Salaam", "Tanzanie", "Afrique de l'Est",
                "Plus grande ville de Tanzanie et principal port de l'Afrique de l'Est. Dar es Salaam mélange influences swahilies, arabes et indiennes dans une atmosphère tropicale animée.",
                "https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=800", -6.7924, 39.2083));

        City luanda = cityRepository.save(new City("Luanda", "Angola", "Afrique Centrale",
                "Capitale de l'Angola, métropole en pleine transformation bordée par l'océan Atlantique. Luanda séduit par son mélange de culture portugaise et de traditions africaines.",
                "https://images.unsplash.com/photo-1591127233115-3e4fe6c61c91?w=800", -8.8390, 13.2894));

        City cairo = cityRepository.save(new City("Le Caire", "Égypte", "Afrique du Nord",
                "Plus grande ville d'Afrique et du monde arabe, Le Caire est la gardienne des pyramides de Gizeh. Ville fascinante où cinq mille ans d'histoire se vivent au quotidien.",
                "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800", 30.0444, 31.2357));

        City maputo = cityRepository.save(new City("Maputo", "Mozambique", "Afrique Australe",
                "Capitale du Mozambique, ville côtière au charme colonial portugais. Maputo enchante par ses marchés de fruits de mer, son architecture Art Déco et ses plages de l'océan Indien.",
                "https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=800", -25.9692, 32.5732));

        // ===== Amenities =====
        Amenity wifiAmenity = amenityRepository.save(new Amenity("Wi-Fi gratuit", "wifi", "BOTH"));
        Amenity parkingAmenity = amenityRepository.save(new Amenity("Parking", "local_parking", "BOTH"));
        Amenity terrasseAmenity = amenityRepository.save(new Amenity("Terrasse", "deck", "RESTAURANT"));
        Amenity climatisationAmenity = amenityRepository.save(new Amenity("Climatisation", "ac_unit", "BOTH"));
        Amenity sallePriveeAmenity = amenityRepository.save(new Amenity("Salle privée", "meeting_room", "RESTAURANT"));
        Amenity musiqueLiveAmenity = amenityRepository.save(new Amenity("Musique live", "music_note", "RESTAURANT"));
        Amenity piscineAmenity = amenityRepository.save(new Amenity("Piscine", "pool", "HOTEL"));
        Amenity spaAmenity = amenityRepository.save(new Amenity("Spa & Bien-être", "spa", "HOTEL"));
        Amenity salleSportAmenity = amenityRepository.save(new Amenity("Salle de sport", "fitness_center", "HOTEL"));
        Amenity navetteAmenity = amenityRepository.save(new Amenity("Navette aéroport", "airport_shuttle", "HOTEL"));
        Amenity petitDejAmenity = amenityRepository.save(new Amenity("Petit-déjeuner inclus", "free_breakfast", "HOTEL"));
        Amenity roomServiceAmenity = amenityRepository.save(new Amenity("Room service", "room_service", "HOTEL"));
        Amenity barAmenity = amenityRepository.save(new Amenity("Bar", "local_bar", "BOTH"));
        Amenity accessibleAmenity = amenityRepository.save(new Amenity("Accès handicapé", "accessible", "BOTH"));

        // ===== Categories =====
        Category gastronomique = categoryRepository.save(new Category("Gastronomique", "Cuisine haut de gamme et raffinée", "RESTAURANT"));
        Category streetFood = categoryRepository.save(new Category("Street Food", "Cuisine de rue populaire et authentique", "RESTAURANT"));
        Category traditionnel = categoryRepository.save(new Category("Traditionnel", "Cuisine traditionnelle africaine", "RESTAURANT"));
        Category fusion = categoryRepository.save(new Category("Fusion", "Mélange créatif de cuisines africaines et internationales", "RESTAURANT"));
        Category luxe = categoryRepository.save(new Category("Luxe", "Établissement haut de gamme 5 étoiles", "HOTEL"));
        Category budget = categoryRepository.save(new Category("Budget", "Bon rapport qualité-prix", "HOTEL"));
        Category familial = categoryRepository.save(new Category("Familial", "Adapté aux familles avec enfants", "BOTH"));
        Category affaires = categoryRepository.save(new Category("Affaires", "Idéal pour les voyages d'affaires", "BOTH"));
        Category boutique = categoryRepository.save(new Category("Boutique", "Hôtel de charme avec caractère unique", "HOTEL"));
        Category resort = categoryRepository.save(new Category("Resort", "Complexe tout inclus avec activités", "HOTEL"));

        // ===== Restaurants =====

        // Restaurant 1 - Sénégal
        Restaurant r1 = new Restaurant();
        r1.setNom("Le Djolof");
        r1.setDescription("Restaurant sénégalais authentique proposant les meilleures spécialités de la cuisine ouest-africaine. Le Thiéboudienne, plat national, y est préparé selon la recette traditionnelle de Saint-Louis. Cadre élégant mêlant décoration contemporaine et artisanat local.");
        r1.setAdresse("12 Rue de la Corniche, Dakar, Sénégal");
        r1.setCuisine("Sénégalaise");
        r1.setNote(4.5);
        r1.setImage("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800");
        r1.setCoordonneesGps(new GpsCoordinates(14.6937, -17.4441));
        r1.setTelephone("+221 33 823 45 67");
        r1.setEmail("contact@ledjolof.sn");
        r1.setHoraires("Lun-Sam: 11h-23h, Dim: 12h-22h");
        r1.setVille(dakar);
        r1.setFourchettePrix(3);
        r1.setStatut(StatutEtablissement.OUVERT);
        r1.setHalal(true);
        r1.setVegetarienFriendly(true);
        r1.setTerrasse(true);
        r1.setWifi(true);
        r1.setParking(true);
        r1.setClimatisation(true);
        r1.setSallePrivee(true);
        r1.setCapacite(80);
        r1.setSiteWeb("https://ledjolof.sn");
        r1.setInstagram("@ledjolof_dakar");
        r1.setModesPayement(Arrays.asList("Espèces", "Carte bancaire", "Orange Money"));
        r1.setLanguesParlees(Arrays.asList("Français", "Wolof", "Anglais"));
        r1.setCodeVestimentaire("Smart casual");
        r1.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600"
        ));
        r1.setCategories(new HashSet<>(Set.of(gastronomique, traditionnel)));
        r1.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, terrasseAmenity, climatisationAmenity, sallePriveeAmenity)));
        r1 = restaurantRepository.save(r1);

        // Restaurant 2 - Maroc
        Restaurant r2 = new Restaurant();
        r2.setNom("Dar Zellij");
        r2.setDescription("Niché au cœur de la médina de Marrakech, Dar Zellij offre une expérience culinaire marocaine inoubliable dans un cadre somptueux. Tajines, couscous et pastillas préparés avec des épices du souk. Architecture hispano-mauresque authentique.");
        r2.setAdresse("1 Derb El Arsa, Riad Zitoun, Marrakech, Maroc");
        r2.setCuisine("Marocaine");
        r2.setNote(4.7);
        r2.setImage("https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800");
        r2.setCoordonneesGps(new GpsCoordinates(31.6295, -7.9811));
        r2.setTelephone("+212 524 38 26 27");
        r2.setEmail("reservation@darzellij.ma");
        r2.setHoraires("Tous les jours: 12h-15h, 19h-23h");
        r2.setVille(marrakech);
        r2.setFourchettePrix(4);
        r2.setStatut(StatutEtablissement.OUVERT);
        r2.setHalal(true);
        r2.setVegetarienFriendly(true);
        r2.setOptionsVegan(true);
        r2.setClimatisation(true);
        r2.setSallePrivee(true);
        r2.setMusiqueLive(true);
        r2.setCapacite(60);
        r2.setSiteWeb("https://darzellij.ma");
        r2.setInstagram("@darzellij");
        r2.setModesPayement(Arrays.asList("Espèces", "Carte bancaire", "Virement"));
        r2.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais", "Espagnol"));
        r2.setCodeVestimentaire("Élégant");
        r2.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1540914124281-342587941389?w=600",
                "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=600"
        ));
        r2.setCategories(new HashSet<>(Set.of(gastronomique)));
        r2.setAmenities(new HashSet<>(Set.of(climatisationAmenity, sallePriveeAmenity, musiqueLiveAmenity, barAmenity)));
        r2 = restaurantRepository.save(r2);

        // Restaurant 3 - Côte d'Ivoire
        Restaurant r3 = new Restaurant();
        r3.setNom("Chez Tantine Awa");
        r3.setDescription("Le meilleur maquis d'Abidjan ! Attiéké poisson, alloco, kédjénou de poulet... Une cuisine ivoirienne généreuse et savoureuse dans une ambiance conviviale. L'authenticité à l'état pur.");
        r3.setAdresse("Boulevard de Marseille, Treichville, Abidjan, Côte d'Ivoire");
        r3.setCuisine("Ivoirienne");
        r3.setNote(4.2);
        r3.setImage("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800");
        r3.setCoordonneesGps(new GpsCoordinates(5.3160, -4.0026));
        r3.setTelephone("+225 27 21 35 78 90");
        r3.setEmail("tantineawa@gmail.com");
        r3.setHoraires("Lun-Dim: 10h-22h");
        r3.setVille(abidjan);
        r3.setFourchettePrix(1);
        r3.setStatut(StatutEtablissement.OUVERT);
        r3.setHalal(true);
        r3.setTerrasse(true);
        r3.setCapacite(120);
        r3.setModesPayement(Arrays.asList("Espèces", "Mobile Money", "Wave"));
        r3.setLanguesParlees(Arrays.asList("Français", "Dioula", "Baoulé"));
        r3.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
                "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600"
        ));
        r3.setCategories(new HashSet<>(Set.of(streetFood, traditionnel, familial)));
        r3.setAmenities(new HashSet<>(Set.of(terrasseAmenity, parkingAmenity)));
        r3 = restaurantRepository.save(r3);

        // Restaurant 4 - Afrique du Sud
        Restaurant r4 = new Restaurant();
        r4.setNom("The Test Kitchen");
        r4.setDescription("Restaurant gastronomique du Cap dirigé par le chef Luke Dale-Roberts. Cuisine créative d'inspiration africaine avec des techniques modernes. Considéré comme l'un des meilleurs restaurants du continent.");
        r4.setAdresse("375 Albert Road, Woodstock, Cape Town, Afrique du Sud");
        r4.setCuisine("Afro-fusion");
        r4.setNote(4.8);
        r4.setImage("https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800");
        r4.setCoordonneesGps(new GpsCoordinates(-33.9249, 18.4241));
        r4.setTelephone("+27 21 447 2337");
        r4.setEmail("info@thetestkitchen.co.za");
        r4.setHoraires("Mar-Sam: 18h30-22h");
        r4.setVille(capeTown);
        r4.setFourchettePrix(4);
        r4.setStatut(StatutEtablissement.OUVERT);
        r4.setVegetarienFriendly(true);
        r4.setOptionsVegan(true);
        r4.setSansGluten(true);
        r4.setClimatisation(true);
        r4.setCapacite(45);
        r4.setSiteWeb("https://thetestkitchen.co.za");
        r4.setInstagram("@thetestkitchenct");
        r4.setModesPayement(Arrays.asList("Carte bancaire", "Espèces"));
        r4.setLanguesParlees(Arrays.asList("Anglais", "Afrikaans"));
        r4.setCodeVestimentaire("Smart casual");
        r4.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600"
        ));
        r4.setCategories(new HashSet<>(Set.of(gastronomique, fusion)));
        r4.setAmenities(new HashSet<>(Set.of(climatisationAmenity, barAmenity, accessibleAmenity)));
        r4 = restaurantRepository.save(r4);

        // Restaurant 5 - Éthiopie
        Restaurant r5 = new Restaurant();
        r5.setNom("Yod Abyssinia");
        r5.setDescription("Le temple de la cuisine éthiopienne à Addis-Abeba. Spectacle traditionnel avec danses et musiques des différentes régions d'Éthiopie pendant le dîner. Injera et wots préparés avec des épices ancestrales.");
        r5.setAdresse("Bole Road, Addis-Abeba, Éthiopie");
        r5.setCuisine("Éthiopienne");
        r5.setNote(4.4);
        r5.setImage("https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800");
        r5.setCoordonneesGps(new GpsCoordinates(9.0192, 38.7525));
        r5.setTelephone("+251 11 661 2985");
        r5.setEmail("info@yodethiopia.com");
        r5.setHoraires("Lun-Dim: 12h-23h");
        r5.setVille(addisAbeba);
        r5.setFourchettePrix(2);
        r5.setStatut(StatutEtablissement.OUVERT);
        r5.setVegetarienFriendly(true);
        r5.setOptionsVegan(true);
        r5.setSansGluten(true);
        r5.setMusiqueLive(true);
        r5.setTerrasse(true);
        r5.setCapacite(200);
        r5.setModesPayement(Arrays.asList("Espèces", "Carte bancaire"));
        r5.setLanguesParlees(Arrays.asList("Amharique", "Anglais", "Français"));
        r5.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600"
        ));
        r5.setCategories(new HashSet<>(Set.of(traditionnel, familial)));
        r5.setAmenities(new HashSet<>(Set.of(terrasseAmenity, musiqueLiveAmenity, parkingAmenity)));
        r5 = restaurantRepository.save(r5);

        // Restaurant 6 - Nigeria
        Restaurant r6 = new Restaurant();
        r6.setNom("NOK by Alara");
        r6.setDescription("Restaurant contemporain au cœur de Lagos célébrant la diversité culinaire du Nigeria. Jollof rice revisité, suya grillé, egusi soup déconstruit. Design afrofuturiste spectaculaire.");
        r6.setAdresse("12A Akin Olugbade Street, Victoria Island, Lagos, Nigéria");
        r6.setCuisine("Nigériane contemporaine");
        r6.setNote(4.6);
        r6.setImage("https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800");
        r6.setCoordonneesGps(new GpsCoordinates(6.5244, 3.3792));
        r6.setTelephone("+234 1 295 7540");
        r6.setEmail("reservations@nokbyalara.com");
        r6.setHoraires("Mar-Dim: 12h-22h");
        r6.setVille(lagos);
        r6.setFourchettePrix(3);
        r6.setStatut(StatutEtablissement.OUVERT);
        r6.setHalal(true);
        r6.setVegetarienFriendly(true);
        r6.setWifi(true);
        r6.setClimatisation(true);
        r6.setCapacite(65);
        r6.setSiteWeb("https://nokbyalara.com");
        r6.setInstagram("@nokbyalara");
        r6.setModesPayement(Arrays.asList("Carte bancaire", "Transfert bancaire"));
        r6.setLanguesParlees(Arrays.asList("Anglais", "Yoruba", "Igbo"));
        r6.setCodeVestimentaire("Smart casual");
        r6.setCategories(new HashSet<>(Set.of(gastronomique, fusion)));
        r6.setAmenities(new HashSet<>(Set.of(wifiAmenity, climatisationAmenity, barAmenity)));
        r6 = restaurantRepository.save(r6);

        // Restaurant 7 - Casablanca, Maroc
        Restaurant r7 = new Restaurant();
        r7.setNom("La Sqala");
        r7.setDescription("Restaurant marocain niché dans un ancien bastion portugais du XVIIIe siècle à Casablanca. Cadre enchanteur avec jardins fleuris, fontaines et terrasse ombragée. Cuisine marocaine traditionnelle et brunchs légendaires le week-end.");
        r7.setAdresse("Boulevard des Almohades, Ancienne Médina, Casablanca, Maroc");
        r7.setCuisine("Marocaine");
        r7.setNote(4.3);
        r7.setImage("https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop");
        r7.setCoordonneesGps(new GpsCoordinates(33.5985, -7.6120));
        r7.setTelephone("+212 522 26 09 60");
        r7.setEmail("contact@lasqala.ma");
        r7.setHoraires("Tous les jours: 8h-23h");
        r7.setVille(casablanca);
        r7.setFourchettePrix(2);
        r7.setStatut(StatutEtablissement.OUVERT);
        r7.setHalal(true);
        r7.setVegetarienFriendly(true);
        r7.setTerrasse(true);
        r7.setWifi(true);
        r7.setParking(true);
        r7.setClimatisation(true);
        r7.setCapacite(150);
        r7.setModesPayement(Arrays.asList("Espèces", "Carte bancaire"));
        r7.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais"));
        r7.setCategories(new HashSet<>(Set.of(traditionnel, familial)));
        r7.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, terrasseAmenity, climatisationAmenity)));
        r7 = restaurantRepository.save(r7);

        // Restaurant 8 - Tunis, Tunisie
        Restaurant r8 = new Restaurant();
        r8.setNom("Dar El Jeld");
        r8.setDescription("Restaurant gastronomique installé dans un somptueux palais du XVIIe siècle au coeur de la médina de Tunis. Cuisine tunisienne raffinée, mosaïques anciennes et plafonds sculptés. Une expérience culinaire et patrimoniale unique.");
        r8.setAdresse("5-10 Rue Dar El Jeld, Médina de Tunis, Tunisie");
        r8.setCuisine("Tunisienne");
        r8.setNote(4.6);
        r8.setImage("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop");
        r8.setCoordonneesGps(new GpsCoordinates(36.7992, 10.1710));
        r8.setTelephone("+216 71 56 09 16");
        r8.setEmail("reservation@dareljeld.tn");
        r8.setHoraires("Mar-Dim: 12h30-15h, 19h30-23h");
        r8.setVille(tunis);
        r8.setFourchettePrix(4);
        r8.setStatut(StatutEtablissement.OUVERT);
        r8.setHalal(true);
        r8.setVegetarienFriendly(true);
        r8.setClimatisation(true);
        r8.setSallePrivee(true);
        r8.setCapacite(50);
        r8.setSiteWeb("https://dareljeld.tn");
        r8.setModesPayement(Arrays.asList("Espèces", "Carte bancaire", "Virement"));
        r8.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais", "Italien"));
        r8.setCodeVestimentaire("Élégant");
        r8.setCategories(new HashSet<>(Set.of(gastronomique)));
        r8.setAmenities(new HashSet<>(Set.of(climatisationAmenity, sallePriveeAmenity)));
        r8 = restaurantRepository.save(r8);

        // Restaurant 9 - Accra, Ghana
        Restaurant r9 = new Restaurant();
        r9.setNom("Buka Restaurant");
        r9.setDescription("Le rendez-vous incontournable de la cuisine ghanéenne à Accra. Banku, fufu, jollof rice et kelewele dans une ambiance chaleureuse et colorée. Musique live les vendredis et samedis soirs.");
        r9.setAdresse("15 Lagos Avenue, Airport Residential Area, Accra, Ghana");
        r9.setCuisine("Ghanéenne");
        r9.setNote(4.4);
        r9.setImage("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop");
        r9.setCoordonneesGps(new GpsCoordinates(5.6050, -0.1720));
        r9.setTelephone("+233 30 277 1234");
        r9.setEmail("info@bukarestaurant.gh");
        r9.setHoraires("Lun-Dim: 11h-22h30");
        r9.setVille(accra);
        r9.setFourchettePrix(2);
        r9.setStatut(StatutEtablissement.OUVERT);
        r9.setHalal(false);
        r9.setVegetarienFriendly(true);
        r9.setTerrasse(true);
        r9.setWifi(true);
        r9.setMusiqueLive(true);
        r9.setParking(true);
        r9.setCapacite(100);
        r9.setModesPayement(Arrays.asList("Espèces", "Carte bancaire", "Mobile Money"));
        r9.setLanguesParlees(Arrays.asList("Anglais", "Twi", "Ga"));
        r9.setCategories(new HashSet<>(Set.of(traditionnel, familial)));
        r9.setAmenities(new HashSet<>(Set.of(wifiAmenity, terrasseAmenity, musiqueLiveAmenity, parkingAmenity)));
        r9 = restaurantRepository.save(r9);

        // Restaurant 10 - Kigali, Rwanda
        Restaurant r10 = new Restaurant();
        r10.setNom("Heaven Restaurant");
        r10.setDescription("Perché sur une colline de Kigali avec une vue panoramique époustouflante, Heaven propose une cuisine rwandaise contemporaine utilisant des ingrédients locaux et biologiques. Terrasse spectaculaire au coucher du soleil.");
        r10.setAdresse("No. 1 KN 29 Street, Kiyovu, Kigali, Rwanda");
        r10.setCuisine("Rwandaise");
        r10.setNote(4.5);
        r10.setImage("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop");
        r10.setCoordonneesGps(new GpsCoordinates(-1.9530, 29.8728));
        r10.setTelephone("+250 788 386 007");
        r10.setEmail("info@heavenrwanda.com");
        r10.setHoraires("Lun-Dim: 7h-22h");
        r10.setVille(kigali);
        r10.setFourchettePrix(3);
        r10.setStatut(StatutEtablissement.OUVERT);
        r10.setVegetarienFriendly(true);
        r10.setOptionsVegan(true);
        r10.setTerrasse(true);
        r10.setWifi(true);
        r10.setParking(true);
        r10.setClimatisation(true);
        r10.setCapacite(70);
        r10.setSiteWeb("https://heavenrwanda.com");
        r10.setInstagram("@heavenrwanda");
        r10.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "Mobile Money"));
        r10.setLanguesParlees(Arrays.asList("Anglais", "Français", "Kinyarwanda"));
        r10.setCodeVestimentaire("Smart casual");
        r10.setCategories(new HashSet<>(Set.of(gastronomique, fusion)));
        r10.setAmenities(new HashSet<>(Set.of(wifiAmenity, terrasseAmenity, parkingAmenity, climatisationAmenity, barAmenity)));
        r10 = restaurantRepository.save(r10);

        // Restaurant 11 - Dar es Salaam, Tanzanie
        Restaurant r11 = new Restaurant();
        r11.setNom("The Waterfront");
        r11.setDescription("Restaurant de fruits de mer au bord de l'océan Indien à Dar es Salaam. Poissons grillés, crevettes piri-piri et spécialités swahilies dans un cadre tropical face à la mer. Couchers de soleil mémorables.");
        r11.setAdresse("Toure Drive, Masaki Peninsula, Dar es Salaam, Tanzanie");
        r11.setCuisine("Swahilie");
        r11.setNote(4.3);
        r11.setImage("https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop");
        r11.setCoordonneesGps(new GpsCoordinates(-6.7590, 39.2700));
        r11.setTelephone("+255 22 260 0893");
        r11.setEmail("info@waterfrontdar.tz");
        r11.setHoraires("Lun-Dim: 11h-23h");
        r11.setVille(darEsSalaam);
        r11.setFourchettePrix(3);
        r11.setStatut(StatutEtablissement.OUVERT);
        r11.setHalal(true);
        r11.setTerrasse(true);
        r11.setWifi(true);
        r11.setParking(true);
        r11.setCapacite(90);
        r11.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "M-Pesa"));
        r11.setLanguesParlees(Arrays.asList("Anglais", "Swahili"));
        r11.setCategories(new HashSet<>(Set.of(gastronomique)));
        r11.setAmenities(new HashSet<>(Set.of(wifiAmenity, terrasseAmenity, parkingAmenity, barAmenity)));
        r11 = restaurantRepository.save(r11);

        // Restaurant 12 - Le Caire, Égypte
        Restaurant r12 = new Restaurant();
        r12.setNom("Abou El Sid");
        r12.setDescription("Institution de la cuisine égyptienne traditionnelle au Caire. Décor somptueux de style oriental avec lanternes, boiseries et cuivres. Koshari, molokhia, kebab et mezze dans une ambiance des Mille et Une Nuits.");
        r12.setAdresse("157 26th July Street, Zamalek, Le Caire, Égypte");
        r12.setCuisine("Égyptienne");
        r12.setNote(4.5);
        r12.setImage("https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=800&h=600&fit=crop");
        r12.setCoordonneesGps(new GpsCoordinates(30.0601, 31.2194));
        r12.setTelephone("+20 2 2735 9640");
        r12.setEmail("info@abouelsid.com");
        r12.setHoraires("Tous les jours: 13h-01h");
        r12.setVille(cairo);
        r12.setFourchettePrix(3);
        r12.setStatut(StatutEtablissement.OUVERT);
        r12.setHalal(true);
        r12.setVegetarienFriendly(true);
        r12.setClimatisation(true);
        r12.setSallePrivee(true);
        r12.setCapacite(80);
        r12.setSiteWeb("https://abouelsid.com");
        r12.setInstagram("@abouelsid");
        r12.setModesPayement(Arrays.asList("Espèces", "Carte bancaire"));
        r12.setLanguesParlees(Arrays.asList("Arabe", "Anglais", "Français"));
        r12.setCodeVestimentaire("Smart casual");
        r12.setCategories(new HashSet<>(Set.of(traditionnel, gastronomique)));
        r12.setAmenities(new HashSet<>(Set.of(climatisationAmenity, sallePriveeAmenity, barAmenity)));
        r12 = restaurantRepository.save(r12);

        // Restaurant 13 - Maputo, Mozambique
        Restaurant r13 = new Restaurant();
        r13.setNom("Restaurante Costa do Sol");
        r13.setDescription("Légende de Maputo depuis 1938, ce restaurant en bord de plage est célèbre pour ses crevettes géantes grillées au piri-piri. Ambiance décontractée pieds dans le sable avec vue sur l'océan Indien.");
        r13.setAdresse("Avenida Marginal, Costa do Sol, Maputo, Mozambique");
        r13.setCuisine("Mozambicaine");
        r13.setNote(4.2);
        r13.setImage("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop");
        r13.setCoordonneesGps(new GpsCoordinates(-25.9335, 32.6126));
        r13.setTelephone("+258 21 45 01 15");
        r13.setEmail("info@costadosol.mz");
        r13.setHoraires("Lun-Dim: 10h-22h");
        r13.setVille(maputo);
        r13.setFourchettePrix(2);
        r13.setStatut(StatutEtablissement.OUVERT);
        r13.setHalal(false);
        r13.setTerrasse(true);
        r13.setParking(true);
        r13.setCapacite(200);
        r13.setModesPayement(Arrays.asList("Espèces", "Carte bancaire"));
        r13.setLanguesParlees(Arrays.asList("Portugais", "Anglais"));
        r13.setCategories(new HashSet<>(Set.of(traditionnel, familial)));
        r13.setAmenities(new HashSet<>(Set.of(terrasseAmenity, parkingAmenity)));
        r13 = restaurantRepository.save(r13);

        // Restaurant 14 - Luanda, Angola
        Restaurant r14 = new Restaurant();
        r14.setNom("Lookal Restaurante");
        r14.setDescription("Restaurant contemporain de Luanda célébrant la cuisine angolaise revisitée. Muamba de galinha, calulu et funge préparés avec des techniques modernes. Vue spectaculaire sur la baie de Luanda.");
        r14.setAdresse("Ilha de Luanda, Rua Major Kanhangulo, Luanda, Angola");
        r14.setCuisine("Angolaise");
        r14.setNote(4.4);
        r14.setImage("https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop");
        r14.setCoordonneesGps(new GpsCoordinates(-8.8130, 13.2328));
        r14.setTelephone("+244 222 309 876");
        r14.setEmail("reserva@lookal.ao");
        r14.setHoraires("Mar-Dim: 12h-23h");
        r14.setVille(luanda);
        r14.setFourchettePrix(3);
        r14.setStatut(StatutEtablissement.OUVERT);
        r14.setVegetarienFriendly(true);
        r14.setTerrasse(true);
        r14.setWifi(true);
        r14.setClimatisation(true);
        r14.setParking(true);
        r14.setCapacite(75);
        r14.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "Multicaixa"));
        r14.setLanguesParlees(Arrays.asList("Portugais", "Anglais", "Français"));
        r14.setCodeVestimentaire("Smart casual");
        r14.setCategories(new HashSet<>(Set.of(fusion, gastronomique)));
        r14.setAmenities(new HashSet<>(Set.of(wifiAmenity, terrasseAmenity, parkingAmenity, climatisationAmenity, barAmenity)));
        r14 = restaurantRepository.save(r14);

        // Restaurant 15 - Zanzibar
        Restaurant r15 = new Restaurant();
        r15.setNom("Forodhani Night Market");
        r15.setDescription("Le célèbre marché nocturne de Stone Town, Zanzibar. Brochettes de fruits de mer, pizza zanzibarite, jus de canne à sucre frais et épices locales dans une ambiance festive en bord de mer.");
        r15.setAdresse("Forodhani Gardens, Stone Town, Zanzibar, Tanzanie");
        r15.setCuisine("Zanzibarite");
        r15.setNote(4.1);
        r15.setImage("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop");
        r15.setCoordonneesGps(new GpsCoordinates(-6.1612, 39.1875));
        r15.setTelephone("+255 777 234 567");
        r15.setEmail("info@forodhanimarket.tz");
        r15.setHoraires("Tous les jours: 17h-23h");
        r15.setVille(zanzibar);
        r15.setFourchettePrix(1);
        r15.setStatut(StatutEtablissement.OUVERT);
        r15.setHalal(true);
        r15.setTerrasse(true);
        r15.setCapacite(300);
        r15.setModesPayement(Arrays.asList("Espèces"));
        r15.setLanguesParlees(Arrays.asList("Swahili", "Anglais"));
        r15.setCategories(new HashSet<>(Set.of(streetFood)));
        r15.setAmenities(new HashSet<>(Set.of(terrasseAmenity)));
        r15 = restaurantRepository.save(r15);

        // Restaurant 16 - Nairobi
        Restaurant r16 = new Restaurant();
        r16.setNom("Carnivore Restaurant");
        r16.setDescription("Le légendaire restaurant Carnivore de Nairobi, souvent qualifié de meilleur restaurant d'Afrique. Concept unique de brochettes rôties sur une immense fosse de braise, servies à volonté. Viandes exotiques et ambiance safari.");
        r16.setAdresse("Langata Road, Nairobi, Kenya");
        r16.setCuisine("Kenyane");
        r16.setNote(4.5);
        r16.setImage("https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop");
        r16.setCoordonneesGps(new GpsCoordinates(-1.3312, 36.7589));
        r16.setTelephone("+254 20 602 3408");
        r16.setEmail("reservations@tamarind.co.ke");
        r16.setHoraires("Lun-Dim: 12h-14h30, 19h-22h30");
        r16.setVille(nairobi);
        r16.setFourchettePrix(3);
        r16.setStatut(StatutEtablissement.OUVERT);
        r16.setHalal(false);
        r16.setVegetarienFriendly(true);
        r16.setTerrasse(true);
        r16.setWifi(true);
        r16.setParking(true);
        r16.setMusiqueLive(true);
        r16.setCapacite(350);
        r16.setSiteWeb("https://tamarind.co.ke/carnivore");
        r16.setInstagram("@carnivore_nairobi");
        r16.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "M-Pesa"));
        r16.setLanguesParlees(Arrays.asList("Anglais", "Swahili"));
        r16.setCategories(new HashSet<>(Set.of(traditionnel, familial)));
        r16.setAmenities(new HashSet<>(Set.of(wifiAmenity, terrasseAmenity, parkingAmenity, musiqueLiveAmenity, barAmenity)));
        r16 = restaurantRepository.save(r16);

        // Restaurant 17 - Casablanca
        Restaurant r17 = new Restaurant();
        r17.setNom("Rick's Café");
        r17.setDescription("Inspiré du film mythique Casablanca, ce restaurant-piano bar propose une cuisine maroco-internationale dans un décor Art Déco sublime. Ambiance jazz, cocktails raffinés et terrasse avec vue sur la médina.");
        r17.setAdresse("248 Boulevard Sour Jdid, Place du Jardin Public, Casablanca, Maroc");
        r17.setCuisine("Marocaine");
        r17.setNote(4.2);
        r17.setImage("https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop");
        r17.setCoordonneesGps(new GpsCoordinates(33.5930, -7.6138));
        r17.setTelephone("+212 522 27 42 07");
        r17.setEmail("info@rickscafe.ma");
        r17.setHoraires("Lun-Sam: 12h-01h");
        r17.setVille(casablanca);
        r17.setFourchettePrix(3);
        r17.setStatut(StatutEtablissement.OUVERT);
        r17.setHalal(true);
        r17.setClimatisation(true);
        r17.setMusiqueLive(true);
        r17.setCapacite(60);
        r17.setSiteWeb("https://rickscafe.ma");
        r17.setInstagram("@rickscafe_casa");
        r17.setModesPayement(Arrays.asList("Carte bancaire", "Espèces"));
        r17.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais"));
        r17.setCodeVestimentaire("Smart casual");
        r17.setCategories(new HashSet<>(Set.of(fusion, gastronomique)));
        r17.setAmenities(new HashSet<>(Set.of(climatisationAmenity, musiqueLiveAmenity, barAmenity)));
        r17 = restaurantRepository.save(r17);

        // Restaurant 18 - Le Caire
        Restaurant r18 = new Restaurant();
        r18.setNom("Naguib Mahfouz Café");
        r18.setDescription("Café-restaurant emblématique situé dans le Khan el-Khalili, le plus ancien souk du Caire. Nommé en hommage au Prix Nobel de littérature, il sert une cuisine égyptienne classique dans un décor traditionnel avec chicha et thé à la menthe.");
        r18.setAdresse("5 El Badestan Lane, Khan el-Khalili, Le Caire, Égypte");
        r18.setCuisine("Égyptienne");
        r18.setNote(4.1);
        r18.setImage("https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop");
        r18.setCoordonneesGps(new GpsCoordinates(30.0474, 31.2624));
        r18.setTelephone("+20 2 2590 3788");
        r18.setEmail("info@nagmahcafe.eg");
        r18.setHoraires("Tous les jours: 10h-02h");
        r18.setVille(cairo);
        r18.setFourchettePrix(2);
        r18.setStatut(StatutEtablissement.OUVERT);
        r18.setHalal(true);
        r18.setVegetarienFriendly(true);
        r18.setTerrasse(true);
        r18.setClimatisation(true);
        r18.setCapacite(120);
        r18.setModesPayement(Arrays.asList("Espèces", "Carte bancaire"));
        r18.setLanguesParlees(Arrays.asList("Arabe", "Anglais", "Français"));
        r18.setCategories(new HashSet<>(Set.of(traditionnel, streetFood)));
        r18.setAmenities(new HashSet<>(Set.of(terrasseAmenity, climatisationAmenity)));
        r18 = restaurantRepository.save(r18);

        // Restaurant 19 - Accra, Ghana
        Restaurant r19 = new Restaurant();
        r19.setNom("Azmera Restaurant");
        r19.setDescription("Restaurant éthiopien haut de gamme à Accra, un pont culinaire entre l'Afrique de l'Ouest et la Corne de l'Afrique. Injera fraîche, doro wot et cérémonie du café éthiopien dans un espace élégant.");
        r19.setAdresse("21 Dr. Isert Road, North Ridge, Accra, Ghana");
        r19.setCuisine("Éthiopienne");
        r19.setNote(4.3);
        r19.setImage("https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop");
        r19.setCoordonneesGps(new GpsCoordinates(5.5665, -0.2028));
        r19.setTelephone("+233 20 812 3456");
        r19.setEmail("info@azmera.gh");
        r19.setHoraires("Lun-Dim: 11h30-22h");
        r19.setVille(accra);
        r19.setFourchettePrix(2);
        r19.setStatut(StatutEtablissement.OUVERT);
        r19.setVegetarienFriendly(true);
        r19.setOptionsVegan(true);
        r19.setSansGluten(true);
        r19.setWifi(true);
        r19.setClimatisation(true);
        r19.setCapacite(55);
        r19.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "Mobile Money"));
        r19.setLanguesParlees(Arrays.asList("Anglais", "Amharique"));
        r19.setCategories(new HashSet<>(Set.of(traditionnel)));
        r19.setAmenities(new HashSet<>(Set.of(wifiAmenity, climatisationAmenity)));
        r19 = restaurantRepository.save(r19);

        // Restaurant 20 - Tunis
        Restaurant r20 = new Restaurant();
        r20.setNom("El Ali");
        r20.setDescription("Restaurant familial au coeur de la Marsa, banlieue chic de Tunis. Couscous au mérou, brik à l'oeuf, ojja aux crevettes et pâtisseries tunisiennes maison. Terrasse ombragée par des bougainvilliers.");
        r20.setAdresse("25 Rue du Maroc, La Marsa, Tunis, Tunisie");
        r20.setCuisine("Tunisienne");
        r20.setNote(4.4);
        r20.setImage("https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop");
        r20.setCoordonneesGps(new GpsCoordinates(36.8784, 10.3247));
        r20.setTelephone("+216 71 74 82 30");
        r20.setEmail("contact@elali.tn");
        r20.setHoraires("Lun-Dim: 12h-15h, 19h-23h");
        r20.setVille(tunis);
        r20.setFourchettePrix(2);
        r20.setStatut(StatutEtablissement.OUVERT);
        r20.setHalal(true);
        r20.setVegetarienFriendly(true);
        r20.setTerrasse(true);
        r20.setParking(true);
        r20.setCapacite(80);
        r20.setModesPayement(Arrays.asList("Espèces", "Carte bancaire"));
        r20.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais"));
        r20.setCategories(new HashSet<>(Set.of(traditionnel, familial)));
        r20.setAmenities(new HashSet<>(Set.of(terrasseAmenity, parkingAmenity)));
        r20 = restaurantRepository.save(r20);

        // Restaurant 21 - Lagos
        Restaurant r21 = new Restaurant();
        r21.setNom("Terra Kulture");
        r21.setDescription("Espace culturel et restaurant nigérian à Victoria Island, Lagos. Cuisine nigériane authentique accompagnée de spectacles de théâtre, d'expositions d'art et de musique live. Le jollof rice et l'asun y sont exceptionnels.");
        r21.setAdresse("1376 Tiamiyu Savage Street, Victoria Island, Lagos, Nigéria");
        r21.setCuisine("Nigériane");
        r21.setNote(4.3);
        r21.setImage("https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop");
        r21.setCoordonneesGps(new GpsCoordinates(6.4304, 3.4218));
        r21.setTelephone("+234 1 454 2972");
        r21.setEmail("info@terrakulture.com");
        r21.setHoraires("Lun-Dim: 10h-22h");
        r21.setVille(lagos);
        r21.setFourchettePrix(2);
        r21.setStatut(StatutEtablissement.OUVERT);
        r21.setHalal(true);
        r21.setVegetarienFriendly(true);
        r21.setWifi(true);
        r21.setClimatisation(true);
        r21.setMusiqueLive(true);
        r21.setCapacite(100);
        r21.setSiteWeb("https://terrakulture.com");
        r21.setInstagram("@terrakulture");
        r21.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "Transfert bancaire"));
        r21.setLanguesParlees(Arrays.asList("Anglais", "Yoruba", "Pidgin"));
        r21.setCategories(new HashSet<>(Set.of(traditionnel, fusion)));
        r21.setAmenities(new HashSet<>(Set.of(wifiAmenity, climatisationAmenity, musiqueLiveAmenity)));
        r21 = restaurantRepository.save(r21);

        // Restaurant 22 - Dakar
        Restaurant r22 = new Restaurant();
        r22.setNom("Lagon 1");
        r22.setDescription("Restaurant franco-sénégalais installé sur pilotis au-dessus de l'océan Atlantique à la Corniche de Dakar. Poissons et fruits de mer ultra-frais, vue à 180 degrés sur l'océan. Le lieu le plus romantique de Dakar.");
        r22.setAdresse("Route de la Corniche Ouest, Dakar, Sénégal");
        r22.setCuisine("Sénégalaise");
        r22.setNote(4.4);
        r22.setImage("https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop");
        r22.setCoordonneesGps(new GpsCoordinates(14.7142, -17.4775));
        r22.setTelephone("+221 33 823 85 22");
        r22.setEmail("info@lagon1.sn");
        r22.setHoraires("Lun-Dim: 12h-15h, 19h-23h30");
        r22.setVille(dakar);
        r22.setFourchettePrix(3);
        r22.setStatut(StatutEtablissement.OUVERT);
        r22.setHalal(true);
        r22.setVegetarienFriendly(true);
        r22.setTerrasse(true);
        r22.setWifi(true);
        r22.setParking(true);
        r22.setClimatisation(true);
        r22.setCapacite(90);
        r22.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "Orange Money"));
        r22.setLanguesParlees(Arrays.asList("Français", "Wolof", "Anglais"));
        r22.setCodeVestimentaire("Smart casual");
        r22.setCategories(new HashSet<>(Set.of(gastronomique)));
        r22.setAmenities(new HashSet<>(Set.of(wifiAmenity, terrasseAmenity, parkingAmenity, climatisationAmenity, barAmenity)));
        r22 = restaurantRepository.save(r22);

        // ===== Chefs =====
        Chef chef1 = new Chef("Ibrahima Diallo", "Chef étoilé sénégalais, formé à Paris chez Alain Ducasse. Il revisite la cuisine ouest-africaine avec une touche gastronomique contemporaine. Ambassadeur de la cuisine sénégalaise à travers le monde.", "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400", "Cuisine sénégalaise moderne", "Sénégalaise", 18);
        chef1.setRestaurant(r1);
        chefRepository.save(chef1);

        Chef chef2 = new Chef("Fatima El Mansouri", "Cheffe marocaine de renommée internationale. Spécialiste de la cuisine du palais marrakchi, elle perpétue les traditions culinaires séculaires du Maroc tout en y apportant une touche de modernité.", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", "Cuisine marocaine palatiale", "Marocaine", 25);
        chef2.setRestaurant(r2);
        chefRepository.save(chef2);

        Chef chef3 = new Chef("Luke Dale-Roberts", "Chef sud-africain multi-récompensé, pionnier de la cuisine afro-fusion. Son approche innovante mêle les techniques européennes aux ingrédients du continent africain.", "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400", "Afro-fusion gastronomique", "Sud-Africaine", 22);
        chef3.setRestaurant(r4);
        chefRepository.save(chef3);

        Chef chef4 = new Chef("Yohanis Gebreyesus", "Ambassadeur de la cuisine éthiopienne dans le monde. Auteur culinaire et chef de télévision, il fait découvrir les trésors gastronomiques de la Corne de l'Afrique.", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", "Cuisine éthiopienne traditionnelle", "Éthiopienne", 15);
        chef4.setRestaurant(r5);
        chefRepository.save(chef4);

        // ===== Menu Items =====
        // Restaurant 1 - Le Djolof
        menuItemRepository.save(createMenuItem("Thiéboudienne Royal", "Le plat national sénégalais : riz au poisson avec légumes frais et sauce tomate", 18.0, CategorieMenu.PLAT, true, r1));
        menuItemRepository.save(createMenuItem("Yassa Poulet", "Poulet mariné aux oignons et citron, servi avec riz blanc", 15.0, CategorieMenu.PLAT, false, r1));
        menuItemRepository.save(createMenuItem("Mafé d'Agneau", "Ragoût d'agneau à la sauce d'arachide avec riz", 20.0, CategorieMenu.PLAT, false, r1));
        menuItemRepository.save(createMenuItem("Pastels Farcis", "Beignets fourrés au poisson épicé", 8.0, CategorieMenu.ENTREE, false, r1));
        menuItemRepository.save(createMenuItem("Thiakry", "Dessert sénégalais au couscous de mil, crème et raisins secs", 7.0, CategorieMenu.DESSERT, false, r1));
        menuItemRepository.save(createMenuItem("Bissap Frais", "Jus d'hibiscus glacé fait maison", 4.0, CategorieMenu.BOISSON, false, r1));
        menuItemRepository.save(createMenuItem("Menu Découverte", "5 plats signature avec accord boissons locales", 55.0, CategorieMenu.MENU_DEGUSTATION, true, r1));

        // Restaurant 2 - Dar Zellij
        menuItemRepository.save(createMenuItem("Pastilla au Pigeon", "Feuilleté croustillant au pigeon, amandes et cannelle", 22.0, CategorieMenu.ENTREE, true, r2));
        menuItemRepository.save(createMenuItem("Tajine d'Agneau aux Pruneaux", "Agneau mijoté aux pruneaux, amandes et épices", 28.0, CategorieMenu.PLAT, true, r2));
        menuItemRepository.save(createMenuItem("Couscous Royal", "Couscous sept légumes avec agneau, poulet et merguez", 32.0, CategorieMenu.PLAT, false, r2));
        menuItemRepository.save(createMenuItem("Cornes de Gazelle", "Pâtisseries aux amandes parfumées à la fleur d'oranger", 12.0, CategorieMenu.DESSERT, false, r2));
        menuItemRepository.save(createMenuItem("Thé à la Menthe Cérémonie", "Thé vert à la menthe fraîche servi en cérémonie", 6.0, CategorieMenu.BOISSON, false, r2));

        // Restaurant 4 - The Test Kitchen
        menuItemRepository.save(createMenuItem("Springbok Carpaccio", "Carpaccio de springbok, gel de baies sauvages, micro-herbes du Cap", 24.0, CategorieMenu.ENTREE, false, r4));
        menuItemRepository.save(createMenuItem("Cape Malay Curry Revisité", "Curry du Cap revisité, poisson du jour, riz basmati au safran", 35.0, CategorieMenu.PLAT, true, r4));
        menuItemRepository.save(createMenuItem("Menu Dégustation 8 Services", "Voyage culinaire à travers l'Afrique en 8 étapes", 120.0, CategorieMenu.MENU_DEGUSTATION, true, r4));

        // Restaurant 5 - Yod Abyssinia
        menuItemRepository.save(createMenuItem("Beyaynetu", "Assortiment végétarien de wots sur injera, 6 variétés", 14.0, CategorieMenu.PLAT, true, r5));
        menuItemRepository.save(createMenuItem("Doro Wot", "Ragoût de poulet épicé aux oignons et berbéré, œuf dur", 16.0, CategorieMenu.PLAT, true, r5));
        menuItemRepository.save(createMenuItem("Kitfo", "Tartare de bœuf éthiopien au mitmita et beurre clarifié", 18.0, CategorieMenu.PLAT, false, r5));
        menuItemRepository.save(createMenuItem("Cérémonie du Café", "Café éthiopien torréfié et préparé en cérémonie traditionnelle", 8.0, CategorieMenu.BOISSON, true, r5));

        // ===== Distinctions =====
        Distinction d1 = new Distinction(TypeDistinction.UNE_ETOILE, LocalDate.of(2024, 3, 15), "Première étoile africaine décernée pour l'excellence de la cuisine sénégalaise revisitée");
        d1.setRestaurant(r1);
        distinctionRepository.save(d1);

        Distinction d2 = new Distinction(TypeDistinction.DEUX_ETOILES, LocalDate.of(2023, 11, 20), "Reconnue pour sa cuisine marocaine d'exception et son cadre architectural unique");
        d2.setRestaurant(r2);
        distinctionRepository.save(d2);

        Distinction d2bis = new Distinction(TypeDistinction.ETOILE_VERTE, LocalDate.of(2024, 6, 1), "Engagement exemplaire pour la durabilité et les produits locaux");
        d2bis.setRestaurant(r2);
        distinctionRepository.save(d2bis);

        Distinction d3 = new Distinction(TypeDistinction.BIB_GOURMAND, LocalDate.of(2024, 1, 10), "Meilleur rapport qualité-prix pour une cuisine ivoirienne authentique");
        d3.setRestaurant(r3);
        distinctionRepository.save(d3);

        Distinction d4 = new Distinction(TypeDistinction.TROIS_ETOILES, LocalDate.of(2023, 6, 1), "Table d'exception, vaut le voyage. Cuisine afro-fusion de niveau mondial");
        d4.setRestaurant(r4);
        distinctionRepository.save(d4);

        Distinction d5 = new Distinction(TypeDistinction.SELECTIONNE, LocalDate.of(2024, 9, 1), "Sélectionné pour l'authenticité et la qualité de la cuisine éthiopienne");
        d5.setRestaurant(r5);
        distinctionRepository.save(d5);

        Distinction d6 = new Distinction(TypeDistinction.UNE_ETOILE, LocalDate.of(2024, 5, 12), "Cuisine nigériane contemporaine exceptionnelle dans un cadre afrofuturiste");
        d6.setRestaurant(r6);
        distinctionRepository.save(d6);

        // ===== Hotels =====

        // Hotel 1 - Kenya
        Hotel h1 = new Hotel();
        h1.setNom("Serena Hotel Nairobi");
        h1.setDescription("Hôtel 5 étoiles au cœur de Nairobi, offrant un mélange unique de luxe moderne et d'architecture africaine traditionnelle. Piscine, spa, et vue imprenable sur les jardins.");
        h1.setAdresse("Kenyatta Avenue, Nairobi, Kenya");
        h1.setEtoiles(5);
        h1.setPrixParNuit(250.0);
        h1.setNote(4.6);
        h1.setImage("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800");
        h1.setCoordonneesGps(new GpsCoordinates(-1.2921, 36.8219));
        h1.setTelephone("+254 20 282 2000");
        h1.setEmail("nairobi@serenahotels.com");
        h1.setVille(nairobi);
        h1.setStatut(StatutEtablissement.OUVERT);
        h1.setWifi(true);
        h1.setParking(true);
        h1.setPiscine(true);
        h1.setSpa(true);
        h1.setRestaurantSurPlace(true);
        h1.setSalleSport(true);
        h1.setNavette(true);
        h1.setPetitDejeunerInclus(true);
        h1.setClimatisation(true);
        h1.setRoomService(true);
        h1.setConciergerie(true);
        h1.setCheckIn("14:00");
        h1.setCheckOut("11:00");
        h1.setNombreChambres(199);
        h1.setSiteWeb("https://serenahotels.com/nairobi");
        h1.setInstagram("@serenahotels");
        h1.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "M-Pesa"));
        h1.setLanguesParlees(Arrays.asList("Anglais", "Swahili", "Français"));
        h1.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600"
        ));
        h1.setCategories(new HashSet<>(Set.of(luxe, affaires)));
        h1.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity)));
        h1 = hotelRepository.save(h1);

        // Hotel 2 - Maroc
        Hotel h2 = new Hotel();
        h2.setNom("La Mamounia");
        h2.setDescription("Palace légendaire de Marrakech, La Mamounia est un joyau de l'hôtellerie de luxe mondiale. Jardins centenaires, hammam traditionnel et gastronomie d'exception.");
        h2.setAdresse("Avenue Bab Jdid, Marrakech, Maroc");
        h2.setEtoiles(5);
        h2.setPrixParNuit(450.0);
        h2.setNote(4.9);
        h2.setImage("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800");
        h2.setCoordonneesGps(new GpsCoordinates(31.6225, -8.0109));
        h2.setTelephone("+212 524 38 86 00");
        h2.setEmail("reservation@mamounia.com");
        h2.setVille(marrakech);
        h2.setStatut(StatutEtablissement.OUVERT);
        h2.setWifi(true);
        h2.setParking(true);
        h2.setPiscine(true);
        h2.setSpa(true);
        h2.setRestaurantSurPlace(true);
        h2.setSalleSport(true);
        h2.setNavette(true);
        h2.setPetitDejeunerInclus(true);
        h2.setClimatisation(true);
        h2.setRoomService(true);
        h2.setConciergerie(true);
        h2.setCheckIn("15:00");
        h2.setCheckOut("12:00");
        h2.setNombreChambres(209);
        h2.setSiteWeb("https://mamounia.com");
        h2.setInstagram("@lamamounia");
        h2.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Espèces"));
        h2.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais", "Espagnol", "Italien"));
        h2.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600",
                "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600"
        ));
        h2.setCategories(new HashSet<>(Set.of(luxe)));
        h2.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity)));
        h2 = hotelRepository.save(h2);

        // Hotel 3 - Côte d'Ivoire
        Hotel h3 = new Hotel();
        h3.setNom("Sofitel Abidjan Hôtel Ivoire");
        h3.setDescription("Emblème d'Abidjan, l'Hôtel Ivoire domine le lagon avec ses installations modernes : patinoire, bowling, casino et piscine olympique. Un complexe hôtelier unique en Afrique de l'Ouest.");
        h3.setAdresse("Boulevard Hassan II, Cocody, Abidjan, Côte d'Ivoire");
        h3.setEtoiles(5);
        h3.setPrixParNuit(180.0);
        h3.setNote(4.3);
        h3.setImage("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800");
        h3.setCoordonneesGps(new GpsCoordinates(5.3364, -3.9625));
        h3.setTelephone("+225 27 22 48 26 26");
        h3.setEmail("reservation@hotelivoire.ci");
        h3.setVille(abidjan);
        h3.setStatut(StatutEtablissement.OUVERT);
        h3.setWifi(true);
        h3.setParking(true);
        h3.setPiscine(true);
        h3.setSpa(true);
        h3.setRestaurantSurPlace(true);
        h3.setSalleSport(true);
        h3.setNavette(true);
        h3.setClimatisation(true);
        h3.setRoomService(true);
        h3.setCheckIn("14:00");
        h3.setCheckOut("12:00");
        h3.setNombreChambres(356);
        h3.setModesPayement(Arrays.asList("Carte bancaire", "Espèces", "Orange Money"));
        h3.setLanguesParlees(Arrays.asList("Français", "Anglais"));
        h3.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600",
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"
        ));
        h3.setCategories(new HashSet<>(Set.of(luxe, affaires, familial)));
        h3.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, roomServiceAmenity)));
        h3 = hotelRepository.save(h3);

        // Hotel 4 - Zanzibar
        Hotel h4 = new Hotel();
        h4.setNom("Zanzibar Beach Resort");
        h4.setDescription("Resort de charme sur la plage de Nungwi à Zanzibar. Bungalows pieds dans l'eau, plongée sous-marine et excursions dans les plantations d'épices.");
        h4.setAdresse("Nungwi Beach, Zanzibar, Tanzanie");
        h4.setEtoiles(4);
        h4.setPrixParNuit(120.0);
        h4.setNote(4.5);
        h4.setImage("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800");
        h4.setCoordonneesGps(new GpsCoordinates(-5.7264, 39.2988));
        h4.setTelephone("+255 24 224 0162");
        h4.setEmail("info@zanzibeachresort.tz");
        h4.setVille(zanzibar);
        h4.setStatut(StatutEtablissement.OUVERT);
        h4.setWifi(true);
        h4.setPiscine(true);
        h4.setRestaurantSurPlace(true);
        h4.setPetitDejeunerInclus(true);
        h4.setAnimauxAcceptes(false);
        h4.setCheckIn("14:00");
        h4.setCheckOut("11:00");
        h4.setNombreChambres(45);
        h4.setModesPayement(Arrays.asList("Carte bancaire", "Espèces USD"));
        h4.setLanguesParlees(Arrays.asList("Anglais", "Swahili"));
        h4.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
                "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600"
        ));
        h4.setCategories(new HashSet<>(Set.of(resort, familial)));
        h4.setAmenities(new HashSet<>(Set.of(wifiAmenity, piscineAmenity, petitDejAmenity, barAmenity)));
        h4 = hotelRepository.save(h4);

        // Hotel 5 - Cap
        Hotel h5 = new Hotel();
        h5.setNom("One&Only Cape Town");
        h5.setDescription("Hôtel ultra-luxueux sur le Victoria & Alfred Waterfront avec vue sur la Montagne de la Table. Spa primé, restaurant Nobu et marina privée.");
        h5.setAdresse("Dock Road, V&A Waterfront, Cape Town, Afrique du Sud");
        h5.setEtoiles(5);
        h5.setPrixParNuit(520.0);
        h5.setNote(4.8);
        h5.setImage("https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800");
        h5.setCoordonneesGps(new GpsCoordinates(-33.9036, 18.4187));
        h5.setTelephone("+27 21 431 5888");
        h5.setEmail("reservations@oneandonlycapetown.com");
        h5.setVille(capeTown);
        h5.setStatut(StatutEtablissement.OUVERT);
        h5.setWifi(true);
        h5.setParking(true);
        h5.setPiscine(true);
        h5.setSpa(true);
        h5.setRestaurantSurPlace(true);
        h5.setSalleSport(true);
        h5.setNavette(true);
        h5.setClimatisation(true);
        h5.setRoomService(true);
        h5.setConciergerie(true);
        h5.setCheckIn("15:00");
        h5.setCheckOut("11:00");
        h5.setNombreChambres(131);
        h5.setSiteWeb("https://oneandonlyresorts.com/cape-town");
        h5.setInstagram("@oaborescapetown");
        h5.setModesPayement(Arrays.asList("Carte bancaire", "Virement"));
        h5.setLanguesParlees(Arrays.asList("Anglais", "Afrikaans", "Français"));
        h5.setCategories(new HashSet<>(Set.of(luxe, boutique)));
        h5.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, roomServiceAmenity, barAmenity, accessibleAmenity)));
        h5 = hotelRepository.save(h5);

        // Hotel 6 - Casablanca
        Hotel h6 = new Hotel();
        h6.setNom("Four Seasons Hotel Casablanca");
        h6.setDescription("Hôtel de luxe en bord d'océan Atlantique, le Four Seasons Casablanca offre un service irréprochable, des jardins mauresques et une vue imprenable sur la mosquée Hassan II. Spa, piscine et gastronomie d'exception.");
        h6.setAdresse("Anfa Place Living Resort, Boulevard de la Corniche, Casablanca, Maroc");
        h6.setEtoiles(5);
        h6.setPrixParNuit(380.0);
        h6.setNote(4.8);
        h6.setImage("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop");
        h6.setCoordonneesGps(new GpsCoordinates(33.5890, -7.6550));
        h6.setTelephone("+212 529 07 30 00");
        h6.setEmail("reservation.casablanca@fourseasons.com");
        h6.setVille(casablanca);
        h6.setStatut(StatutEtablissement.OUVERT);
        h6.setWifi(true);
        h6.setParking(true);
        h6.setPiscine(true);
        h6.setSpa(true);
        h6.setRestaurantSurPlace(true);
        h6.setSalleSport(true);
        h6.setNavette(true);
        h6.setPetitDejeunerInclus(true);
        h6.setClimatisation(true);
        h6.setRoomService(true);
        h6.setConciergerie(true);
        h6.setCheckIn("15:00");
        h6.setCheckOut("12:00");
        h6.setNombreChambres(186);
        h6.setSiteWeb("https://fourseasons.com/casablanca");
        h6.setInstagram("@fscasablanca");
        h6.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Espèces"));
        h6.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais", "Espagnol"));
        h6.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600",
                "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600"
        ));
        h6.setCategories(new HashSet<>(Set.of(luxe, affaires)));
        h6.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity)));
        h6 = hotelRepository.save(h6);

        // Hotel 7 - Tunis
        Hotel h7 = new Hotel();
        h7.setNom("Dar El Marsa");
        h7.setDescription("Boutique-hôtel de charme installé dans une demeure traditionnelle tunisienne à La Marsa. Patios arborés, chambres décorées avec art et proximité immédiate de la plage. Un havre de paix méditerranéen.");
        h7.setAdresse("8 Rue El Moez, La Marsa, Tunis, Tunisie");
        h7.setEtoiles(4);
        h7.setPrixParNuit(95.0);
        h7.setNote(4.5);
        h7.setImage("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop");
        h7.setCoordonneesGps(new GpsCoordinates(36.8782, 10.3245));
        h7.setTelephone("+216 71 74 06 88");
        h7.setEmail("contact@darelmarsa.tn");
        h7.setVille(tunis);
        h7.setStatut(StatutEtablissement.OUVERT);
        h7.setWifi(true);
        h7.setRestaurantSurPlace(true);
        h7.setPetitDejeunerInclus(true);
        h7.setClimatisation(true);
        h7.setRoomService(true);
        h7.setCheckIn("14:00");
        h7.setCheckOut("12:00");
        h7.setNombreChambres(18);
        h7.setModesPayement(Arrays.asList("Carte bancaire", "Espèces"));
        h7.setLanguesParlees(Arrays.asList("Français", "Arabe", "Anglais"));
        h7.setCategories(new HashSet<>(Set.of(boutique)));
        h7.setAmenities(new HashSet<>(Set.of(wifiAmenity, petitDejAmenity, roomServiceAmenity)));
        h7 = hotelRepository.save(h7);

        // Hotel 8 - Accra
        Hotel h8 = new Hotel();
        h8.setNom("Kempinski Hotel Gold Coast City");
        h8.setDescription("Gratte-ciel de luxe dominant le skyline d'Accra, le Kempinski offre un service cinq étoiles avec piscine panoramique, spa et restaurants gastronomiques. Centre de conférence et vue sur le golfe de Guinée.");
        h8.setAdresse("Gamel Abdul Nasser Avenue, Ridge, Accra, Ghana");
        h8.setEtoiles(5);
        h8.setPrixParNuit(280.0);
        h8.setNote(4.6);
        h8.setImage("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop");
        h8.setCoordonneesGps(new GpsCoordinates(5.5700, -0.1880));
        h8.setTelephone("+233 24 243 1000");
        h8.setEmail("reservations.accra@kempinski.com");
        h8.setVille(accra);
        h8.setStatut(StatutEtablissement.OUVERT);
        h8.setWifi(true);
        h8.setParking(true);
        h8.setPiscine(true);
        h8.setSpa(true);
        h8.setRestaurantSurPlace(true);
        h8.setSalleSport(true);
        h8.setNavette(true);
        h8.setPetitDejeunerInclus(true);
        h8.setClimatisation(true);
        h8.setRoomService(true);
        h8.setConciergerie(true);
        h8.setCheckIn("14:00");
        h8.setCheckOut("12:00");
        h8.setNombreChambres(269);
        h8.setSiteWeb("https://kempinski.com/accra");
        h8.setInstagram("@kempinskiaccra");
        h8.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Mobile Money"));
        h8.setLanguesParlees(Arrays.asList("Anglais", "Français"));
        h8.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600"
        ));
        h8.setCategories(new HashSet<>(Set.of(luxe, affaires)));
        h8.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity, accessibleAmenity)));
        h8 = hotelRepository.save(h8);

        // Hotel 9 - Kigali
        Hotel h9 = new Hotel();
        h9.setNom("Radisson Blu Hotel & Convention Centre Kigali");
        h9.setDescription("Hôtel moderne au coeur de Kigali avec un centre de conférence de classe mondiale. Chambres spacieuses, piscine extérieure et vue sur les collines de la capitale rwandaise.");
        h9.setAdresse("KN 3 Avenue, Kigali, Rwanda");
        h9.setEtoiles(4);
        h9.setPrixParNuit(160.0);
        h9.setNote(4.4);
        h9.setImage("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop");
        h9.setCoordonneesGps(new GpsCoordinates(-1.9500, 29.8700));
        h9.setTelephone("+250 252 252 252");
        h9.setEmail("info.kigali@radissonblu.com");
        h9.setVille(kigali);
        h9.setStatut(StatutEtablissement.OUVERT);
        h9.setWifi(true);
        h9.setParking(true);
        h9.setPiscine(true);
        h9.setSpa(true);
        h9.setRestaurantSurPlace(true);
        h9.setSalleSport(true);
        h9.setClimatisation(true);
        h9.setRoomService(true);
        h9.setConciergerie(true);
        h9.setCheckIn("14:00");
        h9.setCheckOut("12:00");
        h9.setNombreChambres(291);
        h9.setSiteWeb("https://radissonblu.com/kigali");
        h9.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Mobile Money"));
        h9.setLanguesParlees(Arrays.asList("Anglais", "Français", "Kinyarwanda"));
        h9.setCategories(new HashSet<>(Set.of(affaires, luxe)));
        h9.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, roomServiceAmenity, barAmenity)));
        h9 = hotelRepository.save(h9);

        // Hotel 10 - Dar es Salaam
        Hotel h10 = new Hotel();
        h10.setNom("Hyatt Regency Dar es Salaam");
        h10.setDescription("Hôtel de luxe en front de mer à Dar es Salaam, le Hyatt Regency offre un accès direct à la plage, un spa de classe mondiale et une cuisine internationale. Point de départ idéal pour explorer Zanzibar.");
        h10.setAdresse("Kivukoni Front, Dar es Salaam, Tanzanie");
        h10.setEtoiles(5);
        h10.setPrixParNuit(220.0);
        h10.setNote(4.5);
        h10.setImage("https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop");
        h10.setCoordonneesGps(new GpsCoordinates(-6.8183, 39.2889));
        h10.setTelephone("+255 22 211 1234");
        h10.setEmail("daressalaam.regency@hyatt.com");
        h10.setVille(darEsSalaam);
        h10.setStatut(StatutEtablissement.OUVERT);
        h10.setWifi(true);
        h10.setParking(true);
        h10.setPiscine(true);
        h10.setSpa(true);
        h10.setRestaurantSurPlace(true);
        h10.setSalleSport(true);
        h10.setNavette(true);
        h10.setPetitDejeunerInclus(true);
        h10.setClimatisation(true);
        h10.setRoomService(true);
        h10.setConciergerie(true);
        h10.setCheckIn("14:00");
        h10.setCheckOut("12:00");
        h10.setNombreChambres(180);
        h10.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "M-Pesa"));
        h10.setLanguesParlees(Arrays.asList("Anglais", "Swahili", "Français"));
        h10.setCategories(new HashSet<>(Set.of(luxe, affaires)));
        h10.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity)));
        h10 = hotelRepository.save(h10);

        // Hotel 11 - Le Caire
        Hotel h11 = new Hotel();
        h11.setNom("Marriott Mena House Cairo");
        h11.setDescription("Hôtel historique au pied des pyramides de Gizeh, le Mena House est un palace légendaire où Churchill et Roosevelt ont séjourné. Jardins luxuriants, piscine avec vue sur les pyramides et décor oriental somptueux.");
        h11.setAdresse("6 Pyramids Road, Giza, Le Caire, Égypte");
        h11.setEtoiles(5);
        h11.setPrixParNuit(300.0);
        h11.setNote(4.7);
        h11.setImage("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop");
        h11.setCoordonneesGps(new GpsCoordinates(29.9789, 31.1332));
        h11.setTelephone("+20 2 3377 3222");
        h11.setEmail("mena.house@marriott.com");
        h11.setVille(cairo);
        h11.setStatut(StatutEtablissement.OUVERT);
        h11.setWifi(true);
        h11.setParking(true);
        h11.setPiscine(true);
        h11.setSpa(true);
        h11.setRestaurantSurPlace(true);
        h11.setSalleSport(true);
        h11.setNavette(true);
        h11.setPetitDejeunerInclus(true);
        h11.setClimatisation(true);
        h11.setRoomService(true);
        h11.setConciergerie(true);
        h11.setCheckIn("15:00");
        h11.setCheckOut("12:00");
        h11.setNombreChambres(331);
        h11.setSiteWeb("https://marriott.com/menahouse");
        h11.setInstagram("@menahousecairo");
        h11.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Espèces"));
        h11.setLanguesParlees(Arrays.asList("Arabe", "Anglais", "Français", "Allemand"));
        h11.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600",
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600"
        ));
        h11.setCategories(new HashSet<>(Set.of(luxe)));
        h11.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity, accessibleAmenity)));
        h11 = hotelRepository.save(h11);

        // Hotel 12 - Luanda
        Hotel h12 = new Hotel();
        h12.setNom("EPIC SANA Luanda Hotel");
        h12.setDescription("Hôtel cinq étoiles à Luanda combinant modernité et confort. Piscine sur le toit, spa complet et restaurants gastronomiques. Situé dans le quartier des affaires avec vue panoramique sur la ville et la baie.");
        h12.setAdresse("Largo 4 de Fevereiro, Luanda, Angola");
        h12.setEtoiles(5);
        h12.setPrixParNuit(260.0);
        h12.setNote(4.5);
        h12.setImage("https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop");
        h12.setCoordonneesGps(new GpsCoordinates(-8.8147, 13.2302));
        h12.setTelephone("+244 222 643 000");
        h12.setEmail("luanda@epic.sanahotels.com");
        h12.setVille(luanda);
        h12.setStatut(StatutEtablissement.OUVERT);
        h12.setWifi(true);
        h12.setParking(true);
        h12.setPiscine(true);
        h12.setSpa(true);
        h12.setRestaurantSurPlace(true);
        h12.setSalleSport(true);
        h12.setNavette(true);
        h12.setClimatisation(true);
        h12.setRoomService(true);
        h12.setConciergerie(true);
        h12.setCheckIn("14:00");
        h12.setCheckOut("12:00");
        h12.setNombreChambres(232);
        h12.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Multicaixa"));
        h12.setLanguesParlees(Arrays.asList("Portugais", "Anglais", "Français"));
        h12.setCategories(new HashSet<>(Set.of(luxe, affaires)));
        h12.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, roomServiceAmenity, barAmenity)));
        h12 = hotelRepository.save(h12);

        // Hotel 13 - Maputo
        Hotel h13 = new Hotel();
        h13.setNom("Polana Serena Hotel");
        h13.setDescription("Palace historique de Maputo construit en 1922, le Polana est un monument national du Mozambique. Élégance coloniale, jardins tropicaux, piscine face à l'océan Indien et cuisine luso-mozambicaine raffinée.");
        h13.setAdresse("Avenida Julius Nyerere, 1380, Maputo, Mozambique");
        h13.setEtoiles(5);
        h13.setPrixParNuit(200.0);
        h13.setNote(4.6);
        h13.setImage("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop");
        h13.setCoordonneesGps(new GpsCoordinates(-25.9630, 32.5845));
        h13.setTelephone("+258 21 49 10 01");
        h13.setEmail("maputo@serenahotels.com");
        h13.setVille(maputo);
        h13.setStatut(StatutEtablissement.OUVERT);
        h13.setWifi(true);
        h13.setParking(true);
        h13.setPiscine(true);
        h13.setSpa(true);
        h13.setRestaurantSurPlace(true);
        h13.setSalleSport(true);
        h13.setNavette(true);
        h13.setPetitDejeunerInclus(true);
        h13.setClimatisation(true);
        h13.setRoomService(true);
        h13.setConciergerie(true);
        h13.setCheckIn("14:00");
        h13.setCheckOut("11:00");
        h13.setNombreChambres(154);
        h13.setSiteWeb("https://serenahotels.com/polana");
        h13.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Espèces"));
        h13.setLanguesParlees(Arrays.asList("Portugais", "Anglais", "Français"));
        h13.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
        ));
        h13.setCategories(new HashSet<>(Set.of(luxe)));
        h13.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity)));
        h13 = hotelRepository.save(h13);

        // Hotel 14 - Lagos
        Hotel h14 = new Hotel();
        h14.setNom("Eko Hotel & Suites");
        h14.setDescription("Le plus grand hôtel de Lagos, complexe emblématique sur Victoria Island face à l'océan Atlantique. Centre de conférence, casino, plage privée et multiples restaurants. Le coeur de la vie sociale de Lagos.");
        h14.setAdresse("1415 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigéria");
        h14.setEtoiles(4);
        h14.setPrixParNuit(170.0);
        h14.setNote(4.2);
        h14.setImage("https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop");
        h14.setCoordonneesGps(new GpsCoordinates(6.4243, 3.4258));
        h14.setTelephone("+234 1 277 1000");
        h14.setEmail("reservations@ekohotels.com");
        h14.setVille(lagos);
        h14.setStatut(StatutEtablissement.OUVERT);
        h14.setWifi(true);
        h14.setParking(true);
        h14.setPiscine(true);
        h14.setSpa(true);
        h14.setRestaurantSurPlace(true);
        h14.setSalleSport(true);
        h14.setNavette(true);
        h14.setClimatisation(true);
        h14.setRoomService(true);
        h14.setCheckIn("14:00");
        h14.setCheckOut("12:00");
        h14.setNombreChambres(824);
        h14.setSiteWeb("https://ekohotels.com");
        h14.setInstagram("@ekohotels");
        h14.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Espèces"));
        h14.setLanguesParlees(Arrays.asList("Anglais", "Yoruba"));
        h14.setCategories(new HashSet<>(Set.of(affaires, familial)));
        h14.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, roomServiceAmenity, barAmenity)));
        h14 = hotelRepository.save(h14);

        // Hotel 15 - Addis-Abeba
        Hotel h15 = new Hotel();
        h15.setNom("Sheraton Addis");
        h15.setDescription("Palace mythique d'Addis-Abeba, le Sheraton est souvent considéré comme le plus bel hôtel d'Afrique de l'Est. Jardins luxuriants, suites somptueuses, spa de classe mondiale et six restaurants. Le lieu de réception des chefs d'État.");
        h15.setAdresse("Taitu Street, Addis-Abeba, Éthiopie");
        h15.setEtoiles(5);
        h15.setPrixParNuit(320.0);
        h15.setNote(4.7);
        h15.setImage("https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop");
        h15.setCoordonneesGps(new GpsCoordinates(9.0137, 38.7614));
        h15.setTelephone("+251 11 517 1717");
        h15.setEmail("reservations@sheratonaddis.com");
        h15.setVille(addisAbeba);
        h15.setStatut(StatutEtablissement.OUVERT);
        h15.setWifi(true);
        h15.setParking(true);
        h15.setPiscine(true);
        h15.setSpa(true);
        h15.setRestaurantSurPlace(true);
        h15.setSalleSport(true);
        h15.setNavette(true);
        h15.setPetitDejeunerInclus(true);
        h15.setClimatisation(true);
        h15.setRoomService(true);
        h15.setConciergerie(true);
        h15.setCheckIn("14:00");
        h15.setCheckOut("12:00");
        h15.setNombreChambres(294);
        h15.setSiteWeb("https://sheratonaddis.com");
        h15.setInstagram("@sheratonaddis");
        h15.setModesPayement(Arrays.asList("Carte bancaire", "Virement", "Espèces"));
        h15.setLanguesParlees(Arrays.asList("Amharique", "Anglais", "Français"));
        h15.setGaleriePhotos(Arrays.asList(
                "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600",
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600"
        ));
        h15.setCategories(new HashSet<>(Set.of(luxe)));
        h15.setAmenities(new HashSet<>(Set.of(wifiAmenity, parkingAmenity, piscineAmenity, spaAmenity, salleSportAmenity, navetteAmenity, petitDejAmenity, roomServiceAmenity, barAmenity, accessibleAmenity)));
        h15 = hotelRepository.save(h15);

        // ===== Regional Cuisines =====
        RegionalCuisine rc1 = new RegionalCuisine("Cuisine Sénégalaise", "Afrique de l'Ouest", "Sénégal",
                "La cuisine sénégalaise est réputée pour ses plats riches en saveurs, utilisant le poisson frais, les arachides et les épices locales. Le Thiéboudienne est classé au patrimoine immatériel de l'UNESCO.",
                "Thiéboudienne", Arrays.asList("Riz", "Poisson", "Tomate", "Oignons", "Légumes", "Piment", "Tamarin"),
                "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600");
        regionalCuisineRepository.save(rc1);

        RegionalCuisine rc2 = new RegionalCuisine("Cuisine Marocaine", "Afrique du Nord", "Maroc",
                "Mélange raffiné d'épices, de fruits secs et de viandes mijotées. La cuisine marocaine est considérée comme l'une des plus diversifiées au monde avec ses tajines, couscous et pastillas.",
                "Tajine", Arrays.asList("Safran", "Cumin", "Cannelle", "Amandes", "Pruneaux", "Olives", "Citron confit"),
                "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600");
        regionalCuisineRepository.save(rc2);

        RegionalCuisine rc3 = new RegionalCuisine("Cuisine Éthiopienne", "Corne de l'Afrique", "Éthiopie",
                "Unique en Afrique avec son pain injera et ses ragoûts épicés (wots). La cuisine éthiopienne est principalement consommée avec les mains et se partage en groupe autour d'un grand plateau.",
                "Injera aux Wots", Arrays.asList("Teff", "Berbéré", "Niter kibbeh", "Lentilles", "Pois chiches", "Oignons"),
                "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600");
        regionalCuisineRepository.save(rc3);

        RegionalCuisine rc4 = new RegionalCuisine("Cuisine Ivoirienne", "Afrique de l'Ouest", "Côte d'Ivoire",
                "Cuisine généreuse et conviviale centrée sur l'attiéké (semoule de manioc), les sauces épaisses et les grillades. Le maquis (restaurant populaire) est une institution culturelle.",
                "Attiéké Poisson", Arrays.asList("Manioc", "Plantain", "Piment", "Aubergines", "Tomate", "Poisson"),
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600");
        regionalCuisineRepository.save(rc4);

        RegionalCuisine rc5 = new RegionalCuisine("Cuisine Sud-Africaine", "Afrique Australe", "Afrique du Sud",
                "Cuisine arc-en-ciel reflétant la diversité du pays : braai (barbecue), bobotie (plat cap-malais), biltong, et une scène viticole de classe mondiale dans les vignobles du Cap.",
                "Bobotie", Arrays.asList("Bœuf", "Épices Cape Malay", "Chutney", "Raisins secs", "Curcuma", "Lait", "Œufs"),
                "https://images.unsplash.com/photo-1544025162-d76694265947?w=600");
        regionalCuisineRepository.save(rc5);

        RegionalCuisine rc6 = new RegionalCuisine("Cuisine Nigériane", "Afrique de l'Ouest", "Nigéria",
                "Cuisine la plus peuplée d'Afrique, riche et épicée. Le Jollof Rice fait l'objet d'une rivalité amicale avec le Ghana. Les soupes (egusi, ogbono) et les grillades suya sont emblématiques.",
                "Jollof Rice", Arrays.asList("Riz", "Tomate", "Piment scotch bonnet", "Oignons", "Poivron", "Épices locales"),
                "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600");
        regionalCuisineRepository.save(rc6);

        // ===== Reviews enrichis =====

        // Reviews for Restaurant 1
        Review rev1 = new Review("Aminata D.", 5, "Le meilleur Thiéboudienne de tout Dakar ! Service impeccable et cadre magnifique.");
        rev1.setRestaurant(r1);
        rev1.setTitre("Une expérience inoubliable");
        rev1.setNoteCuisine(5);
        rev1.setNoteService(5);
        rev1.setNoteAmbiance(4);
        rev1.setNoteRapportQualitePrix(4);
        rev1.setTypeVoyageur(TypeVoyageur.COUPLE);
        reviewRepository.save(rev1);

        Review rev2 = new Review("Pierre M.", 4, "Très bonne cuisine sénégalaise. Le yassa poulet est excellent. Ambiance agréable.");
        rev2.setRestaurant(r1);
        rev2.setTitre("Cuisine authentique");
        rev2.setNoteCuisine(5);
        rev2.setNoteService(4);
        rev2.setNoteAmbiance(4);
        rev2.setNoteRapportQualitePrix(3);
        rev2.setTypeVoyageur(TypeVoyageur.AMIS);
        reviewRepository.save(rev2);

        Review rev2b = new Review("Marie L.", 5, "Nous avons adoré le menu dégustation. Chaque plat était une découverte. Le chef est venu nous saluer en fin de repas.");
        rev2b.setRestaurant(r1);
        rev2b.setTitre("Menu dégustation exceptionnel");
        rev2b.setNoteCuisine(5);
        rev2b.setNoteService(5);
        rev2b.setNoteAmbiance(5);
        rev2b.setNoteRapportQualitePrix(4);
        rev2b.setTypeVoyageur(TypeVoyageur.COUPLE);
        rev2b.setReponseProprietaire("Merci Marie ! Le Chef Ibrahima est toujours ravi de rencontrer nos clients. Au plaisir de vous revoir.");
        reviewRepository.save(rev2b);

        // Reviews for Restaurant 2
        Review rev3 = new Review("Sophie L.", 5, "Une expérience magique dans un cadre sublime. Le tajine d'agneau aux pruneaux est divin.");
        rev3.setRestaurant(r2);
        rev3.setTitre("Magie marocaine");
        rev3.setNoteCuisine(5);
        rev3.setNoteService(5);
        rev3.setNoteAmbiance(5);
        rev3.setNoteRapportQualitePrix(3);
        rev3.setTypeVoyageur(TypeVoyageur.COUPLE);
        reviewRepository.save(rev3);

        Review rev4 = new Review("Hassan K.", 4, "Cadre authentique et cuisine de qualité. Un peu cher mais ça vaut le détour.");
        rev4.setRestaurant(r2);
        rev4.setTitre("Ça vaut le prix");
        rev4.setNoteCuisine(4);
        rev4.setNoteService(5);
        rev4.setNoteAmbiance(5);
        rev4.setNoteRapportQualitePrix(3);
        rev4.setTypeVoyageur(TypeVoyageur.FAMILLE);
        reviewRepository.save(rev4);

        // Reviews for Restaurant 3
        Review rev5 = new Review("Kouamé J.", 5, "Comme chez maman ! L'attiéké poisson frais est incroyable. Prix très abordables.");
        rev5.setRestaurant(r3);
        rev5.setTitre("Authentique et pas cher");
        rev5.setNoteCuisine(5);
        rev5.setNoteService(4);
        rev5.setNoteAmbiance(3);
        rev5.setNoteRapportQualitePrix(5);
        rev5.setTypeVoyageur(TypeVoyageur.SOLO);
        reviewRepository.save(rev5);

        // Reviews for Restaurant 4
        Review rev6 = new Review("John S.", 5, "Absolutely outstanding tasting menu. Each course was a journey through Africa's flavors.");
        rev6.setRestaurant(r4);
        rev6.setTitre("World-class dining in Africa");
        rev6.setNoteCuisine(5);
        rev6.setNoteService(5);
        rev6.setNoteAmbiance(5);
        rev6.setNoteRapportQualitePrix(4);
        rev6.setTypeVoyageur(TypeVoyageur.AFFAIRES);
        reviewRepository.save(rev6);

        // Reviews for Hotels
        Review rev7 = new Review("David W.", 5, "Luxurious hotel with excellent service. The pool area is stunning.");
        rev7.setHotel(h1);
        rev7.setTitre("Best hotel in Nairobi");
        rev7.setNoteService(5);
        rev7.setNoteAmbiance(5);
        rev7.setNoteRapportQualitePrix(4);
        rev7.setTypeVoyageur(TypeVoyageur.AFFAIRES);
        reviewRepository.save(rev7);

        Review rev8 = new Review("Fatima Z.", 5, "Le plus bel hôtel du Maroc. Le jardin est magnifique et le hammam exceptionnel.");
        rev8.setHotel(h2);
        rev8.setTitre("Palace d'exception");
        rev8.setNoteService(5);
        rev8.setNoteAmbiance(5);
        rev8.setNoteRapportQualitePrix(4);
        rev8.setTypeVoyageur(TypeVoyageur.COUPLE);
        reviewRepository.save(rev8);

        Review rev9 = new Review("Ibrahim C.", 4, "Superbe hôtel avec vue sur le lagon. La piscine est immense. Bon rapport qualité-prix.");
        rev9.setHotel(h3);
        rev9.setTitre("Vue imprenable sur le lagon");
        rev9.setNoteService(4);
        rev9.setNoteAmbiance(4);
        rev9.setNoteRapportQualitePrix(4);
        rev9.setTypeVoyageur(TypeVoyageur.FAMILLE);
        reviewRepository.save(rev9);

        Review rev10 = new Review("Emma T.", 5, "Paradise on earth! The beach is amazing and the staff is wonderful.");
        rev10.setHotel(h4);
        rev10.setTitre("Zanzibar paradise");
        rev10.setNoteService(5);
        rev10.setNoteAmbiance(5);
        rev10.setNoteRapportQualitePrix(5);
        rev10.setTypeVoyageur(TypeVoyageur.COUPLE);
        reviewRepository.save(rev10);

        Review rev11 = new Review("Alexandra P.", 5, "Le One&Only est à la hauteur de sa réputation. Chaque détail est parfait.");
        rev11.setHotel(h5);
        rev11.setTitre("Luxe absolu au Cap");
        rev11.setNoteService(5);
        rev11.setNoteAmbiance(5);
        rev11.setNoteRapportQualitePrix(3);
        rev11.setTypeVoyageur(TypeVoyageur.COUPLE);
        reviewRepository.save(rev11);

        // ===== Utilisateurs =====
        // DEV ONLY - These demo accounts with weak passwords must NEVER be used in production.
        // This entire class is @Profile("dev") so it will not run in production.
        Utilisateur admin = new Utilisateur();
        admin.setNom("Admin");
        admin.setPrenom("Guide Africa");
        admin.setEmail("admin@guideafrica.com");
        admin.setMotDePasse(passwordEncoder.encode("admin123")); // DEV ONLY - weak password
        admin.setRole(RoleUtilisateur.ADMIN);
        admin.setAvatar("https://ui-avatars.com/api/?name=Admin+GA&background=C9A84C&color=0A0A0A");
        utilisateurRepository.save(admin);

        Utilisateur user = new Utilisateur();
        user.setNom("Diallo");
        user.setPrenom("Aminata");
        user.setEmail("aminata@example.com");
        user.setMotDePasse(passwordEncoder.encode("password123")); // DEV ONLY - weak password
        user.setRole(RoleUtilisateur.USER);
        user.setAvatar("https://ui-avatars.com/api/?name=Aminata+Diallo&background=1B6B4A&color=F5F0E8");
        user = utilisateurRepository.save(user);

        // Favoris pour l'utilisateur test
        Favori fav1 = new Favori();
        fav1.setUtilisateur(user);
        fav1.setType(TypeEtablissement.RESTAURANT);
        fav1.setTargetId(r1.getId());
        favoriRepository.save(fav1);

        Favori fav2 = new Favori();
        fav2.setUtilisateur(user);
        fav2.setType(TypeEtablissement.HOTEL);
        fav2.setTargetId(h2.getId());
        favoriRepository.save(fav2);

        Favori fav3 = new Favori();
        fav3.setUtilisateur(user);
        fav3.setType(TypeEtablissement.RESTAURANT);
        fav3.setTargetId(r3.getId());
        favoriRepository.save(fav3);

        System.out.println("=== Donn\u00e9es d'exemple charg\u00e9es avec succ\u00e8s ===");
        System.out.println("  - " + cityRepository.count() + " villes");
        System.out.println("  - " + categoryRepository.count() + " cat\u00e9gories");
        // ====== ACTIVITES ======
        Activite act1 = new Activite();
        act1.setTitre("Safari Masai Mara");
        act1.setDescription("Decouvrez la reserve nationale du Masai Mara, l'une des plus belles reserves au monde. Observez les Big Five dans leur habitat naturel.");
        act1.setImageCouverture("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800");
        act1.setLieu("Reserve nationale du Masai Mara");
        act1.setAdresse("Masai Mara, Narok County");
        act1.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Nairobi")).findFirst().orElse(null));
        act1.setPrix(new BigDecimal("350000"));
        act1.setDuree("3 jours");
        act1.setCategorie(CategorieActivite.SAFARI);
        act1.setDifficulte(DifficulteActivite.MOYEN);
        act1.setPlacesMax(12);
        act1.setNote(4.8);
        act1.setTelephone("+254 700 123 456");
        act1.setLanguesDisponibles(Arrays.asList("Francais", "Anglais", "Swahili"));
        act1.setInclus(Arrays.asList("Transport 4x4", "Guide expert", "Hebergement lodge", "Repas complets", "Eau minerale"));
        act1.setNonInclus(Arrays.asList("Vols internationaux", "Visa", "Pourboires", "Assurance voyage"));
        activiteRepository.save(act1);

        Activite act2 = new Activite();
        act2.setTitre("Tour culturel Marrakech");
        act2.setDescription("Explorez les souks, la place Jemaa el-Fna et les riads secrets de la ville rouge. Une immersion complete dans la culture marocaine.");
        act2.setImageCouverture("https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800");
        act2.setLieu("Medina de Marrakech");
        act2.setAdresse("Place Jemaa el-Fna, Marrakech");
        act2.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Casablanca") || c.getNom().contains("Marrakech")).findFirst().orElse(null));
        act2.setPrix(new BigDecimal("25000"));
        act2.setDuree("4 heures");
        act2.setCategorie(CategorieActivite.CULTURE);
        act2.setDifficulte(DifficulteActivite.FACILE);
        act2.setPlacesMax(20);
        act2.setNote(4.6);
        act2.setTelephone("+212 600 123 456");
        act2.setLanguesDisponibles(Arrays.asList("Francais", "Anglais", "Arabe"));
        act2.setInclus(Arrays.asList("Guide local certifie", "Degustation the a la menthe", "Entree monuments"));
        act2.setNonInclus(Arrays.asList("Repas", "Transport hotel", "Achats personnels"));
        activiteRepository.save(act2);

        Activite act3 = new Activite();
        act3.setTitre("Cours de cuisine senegalaise");
        act3.setDescription("Apprenez a preparer le thieboudienne, le yassa et d'autres classiques de la cuisine senegalaise avec un chef local.");
        act3.setImageCouverture("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800");
        act3.setLieu("Atelier culinaire de Dakar");
        act3.setAdresse("Rue Mohamed V, Plateau, Dakar");
        act3.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Dakar")).findFirst().orElse(null));
        act3.setPrix(new BigDecimal("35000"));
        act3.setDuree("3 heures");
        act3.setCategorie(CategorieActivite.GASTRONOMIE);
        act3.setDifficulte(DifficulteActivite.FACILE);
        act3.setPlacesMax(8);
        act3.setNote(4.9);
        act3.setTelephone("+221 77 123 45 67");
        act3.setLanguesDisponibles(Arrays.asList("Francais", "Wolof"));
        act3.setInclus(Arrays.asList("Ingredients frais", "Tablier", "Recettes a emporter", "Degustation"));
        act3.setNonInclus(Arrays.asList("Transport", "Boissons alcoolisees"));
        activiteRepository.save(act3);

        Activite act4 = new Activite();
        act4.setTitre("Plongee sous-marine Zanzibar");
        act4.setDescription("Explorez les recifs coralliens de l'ocean Indien et nagez avec les dauphins au large de Zanzibar.");
        act4.setImageCouverture("https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800");
        act4.setLieu("Cote nord de Zanzibar");
        act4.setPrix(new BigDecimal("85000"));
        act4.setDuree("Journee complete");
        act4.setCategorie(CategorieActivite.AVENTURE);
        act4.setDifficulte(DifficulteActivite.MOYEN);
        act4.setPlacesMax(6);
        act4.setNote(4.7);
        act4.setLanguesDisponibles(Arrays.asList("Francais", "Anglais"));
        act4.setInclus(Arrays.asList("Equipement complet", "Moniteur certifie", "Dejeuner", "Photos sous-marines"));
        act4.setNonInclus(Arrays.asList("Transfert hotel", "Pourboires"));
        activiteRepository.save(act4);

        Activite act5 = new Activite();
        act5.setTitre("Randonnee Atlas marocain");
        act5.setDescription("Trekking dans le Haut Atlas avec vues spectaculaires sur le mont Toubkal. Nuit chez l'habitant dans un village berbere.");
        act5.setImageCouverture("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800");
        act5.setLieu("Haut Atlas, Imlil");
        act5.setPrix(new BigDecimal("120000"));
        act5.setDuree("2 jours");
        act5.setCategorie(CategorieActivite.SPORT);
        act5.setDifficulte(DifficulteActivite.DIFFICILE);
        act5.setPlacesMax(10);
        act5.setNote(4.5);
        act5.setLanguesDisponibles(Arrays.asList("Francais", "Anglais", "Berbere"));
        act5.setInclus(Arrays.asList("Guide montagne", "Mule portage", "Nuit chez l'habitant", "Repas"));
        act5.setNonInclus(Arrays.asList("Equipement personnel", "Transport Marrakech-Imlil"));
        activiteRepository.save(act5);

        Activite act6 = new Activite();
        act6.setTitre("Atelier artisanat Abidjan");
        act6.setDescription("Initiez-vous a la fabrication de tissus traditionnels et de bijoux avec des artisans ivoiriens.");
        act6.setImageCouverture("https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=800");
        act6.setLieu("Village artisanal de Cocody");
        act6.setAdresse("Boulevard de France, Cocody, Abidjan");
        act6.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Abidjan")).findFirst().orElse(null));
        act6.setPrix(new BigDecimal("15000"));
        act6.setDuree("2 heures");
        act6.setCategorie(CategorieActivite.ARTISANAT);
        act6.setDifficulte(DifficulteActivite.FACILE);
        act6.setPlacesMax(15);
        act6.setNote(4.4);
        act6.setTelephone("+225 07 12 34 56");
        act6.setLanguesDisponibles(Arrays.asList("Francais"));
        act6.setInclus(Arrays.asList("Materiaux", "Encadrement artisan", "Creation a emporter"));
        act6.setNonInclus(Arrays.asList("Transport", "Rafraichissements"));
        activiteRepository.save(act6);

        // Activite 7 - Trekking Gorilles Rwanda
        Activite act7 = new Activite();
        act7.setTitre("Trek des gorilles de montagne");
        act7.setDescription("Randonnée inoubliable dans le parc national des Volcans au Rwanda à la rencontre des gorilles de montagne. Une expérience unique au monde, encadrée par des guides experts et des pisteurs locaux.");
        act7.setImageCouverture("https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=800&h=600&fit=crop");
        act7.setLieu("Parc National des Volcans");
        act7.setAdresse("Kinigi, Musanze, Rwanda");
        act7.setVille(kigali);
        act7.setCoordonneesGps(new GpsCoordinates(-1.4830, 29.5350));
        act7.setPrix(new BigDecimal("1500000"));
        act7.setDuree("Journée complète");
        act7.setCategorie(CategorieActivite.AVENTURE);
        act7.setDifficulte(DifficulteActivite.DIFFICILE);
        act7.setPlacesMax(8);
        act7.setNote(4.9);
        act7.setTelephone("+250 788 500 123");
        act7.setEmail("gorillas@visitrwanda.rw");
        act7.setLanguesDisponibles(Arrays.asList("Anglais", "Français", "Kinyarwanda"));
        act7.setInclus(Arrays.asList("Permis gorilles", "Guide certifié", "Pisteurs", "Déjeuner pique-nique", "Certificat de trek"));
        act7.setNonInclus(Arrays.asList("Transport Kigali-Musanze", "Hébergement", "Pourboires", "Équipement de randonnée"));
        activiteRepository.save(act7);

        // Activite 8 - Excursion Désert Maroc
        Activite act8 = new Activite();
        act8.setTitre("Excursion désert de Merzouga");
        act8.setDescription("Traversée des dunes de l'erg Chebbi à dos de dromadaire au coucher du soleil. Nuit sous les étoiles dans un camp de luxe berbère au coeur du Sahara marocain.");
        act8.setImageCouverture("https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop");
        act8.setLieu("Erg Chebbi, Merzouga");
        act8.setAdresse("Merzouga, Errachidia, Maroc");
        act8.setVille(marrakech);
        act8.setCoordonneesGps(new GpsCoordinates(31.0982, -4.0130));
        act8.setPrix(new BigDecimal("180000"));
        act8.setDuree("2 jours / 1 nuit");
        act8.setCategorie(CategorieActivite.EXCURSION);
        act8.setDifficulte(DifficulteActivite.MOYEN);
        act8.setPlacesMax(16);
        act8.setNote(4.7);
        act8.setTelephone("+212 667 890 123");
        act8.setEmail("desert@saharaadventures.ma");
        act8.setLanguesDisponibles(Arrays.asList("Français", "Anglais", "Arabe", "Espagnol"));
        act8.setInclus(Arrays.asList("Transport 4x4", "Balade dromadaire", "Nuit camp luxe", "Dîner et petit-déjeuner", "Musique gnaoua"));
        act8.setNonInclus(Arrays.asList("Transport Marrakech-Merzouga", "Boissons alcoolisées", "Assurance voyage"));
        activiteRepository.save(act8);

        // Activite 9 - Food Tour Le Caire
        Activite act9 = new Activite();
        act9.setTitre("Food tour dans Le Caire historique");
        act9.setDescription("Découverte des saveurs du Caire à travers ses quartiers historiques. Dégustez le koshari, le foul, les kebabs et les pâtisseries égyptiennes dans les échoppes et restaurants les plus authentiques de la ville.");
        act9.setImageCouverture("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop");
        act9.setLieu("Vieux Caire et Khan el-Khalili");
        act9.setAdresse("Khan el-Khalili, Le Caire, Égypte");
        act9.setVille(cairo);
        act9.setCoordonneesGps(new GpsCoordinates(30.0474, 31.2624));
        act9.setPrix(new BigDecimal("45000"));
        act9.setDuree("4 heures");
        act9.setCategorie(CategorieActivite.GASTRONOMIE);
        act9.setDifficulte(DifficulteActivite.FACILE);
        act9.setPlacesMax(12);
        act9.setNote(4.6);
        act9.setTelephone("+20 100 234 5678");
        act9.setEmail("foodtour@cairobites.eg");
        act9.setLanguesDisponibles(Arrays.asList("Anglais", "Français", "Arabe"));
        act9.setInclus(Arrays.asList("Guide gastronomique", "8 dégustations", "Boissons locales", "Transport entre les arrêts"));
        act9.setNonInclus(Arrays.asList("Transport hôtel", "Pourboires", "Achats personnels"));
        activiteRepository.save(act9);

        // Activite 10 - Safari Serengeti
        Activite act10 = new Activite();
        act10.setTitre("Safari grande migration Serengeti");
        act10.setDescription("Assistez au spectacle de la grande migration dans le parc national du Serengeti. Des millions de gnous et zèbres traversent les plaines infinies sous l'oeil des prédateurs. Hébergement en lodge de charme.");
        act10.setImageCouverture("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop");
        act10.setLieu("Parc National du Serengeti");
        act10.setAdresse("Serengeti, Tanzanie");
        act10.setVille(darEsSalaam);
        act10.setCoordonneesGps(new GpsCoordinates(-2.3333, 34.8333));
        act10.setPrix(new BigDecimal("500000"));
        act10.setDuree("4 jours / 3 nuits");
        act10.setCategorie(CategorieActivite.SAFARI);
        act10.setDifficulte(DifficulteActivite.MOYEN);
        act10.setPlacesMax(8);
        act10.setNote(4.9);
        act10.setTelephone("+255 754 321 987");
        act10.setEmail("safari@serengetiadventures.tz");
        act10.setLanguesDisponibles(Arrays.asList("Anglais", "Français", "Swahili"));
        act10.setInclus(Arrays.asList("Vol intérieur", "Game drives en 4x4", "Lodge tout inclus", "Guide naturaliste", "Jumelles"));
        act10.setNonInclus(Arrays.asList("Vols internationaux", "Visa Tanzanie", "Pourboires", "Assurance voyage"));
        activiteRepository.save(act10);

        // Activite 11 - Visite Île de Gorée
        Activite act11 = new Activite();
        act11.setTitre("Visite historique de l'Île de Gorée");
        act11.setDescription("Traversée en ferry vers l'Île de Gorée, site classé UNESCO et lieu de mémoire de la traite négrière. Visite de la Maison des Esclaves, du musée historique et des ruelles colorées de l'île.");
        act11.setImageCouverture("https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&h=600&fit=crop");
        act11.setLieu("Île de Gorée");
        act11.setAdresse("Port de Dakar, Sénégal");
        act11.setVille(dakar);
        act11.setCoordonneesGps(new GpsCoordinates(14.6667, -17.3972));
        act11.setPrix(new BigDecimal("20000"));
        act11.setDuree("Demi-journée");
        act11.setCategorie(CategorieActivite.CULTURE);
        act11.setDifficulte(DifficulteActivite.FACILE);
        act11.setPlacesMax(20);
        act11.setNote(4.7);
        act11.setTelephone("+221 77 456 78 90");
        act11.setEmail("visites@goree-island.sn");
        act11.setLanguesDisponibles(Arrays.asList("Français", "Anglais", "Wolof"));
        act11.setInclus(Arrays.asList("Ferry aller-retour", "Guide historien", "Entrée Maison des Esclaves", "Entrée musée"));
        act11.setNonInclus(Arrays.asList("Repas", "Transport hôtel-port", "Achats souvenirs"));
        activiteRepository.save(act11);

        // Activite 12 - Visite Pyramides
        Activite act12 = new Activite();
        act12.setTitre("Pyramides de Gizeh et Sphinx");
        act12.setDescription("Visite guidée des pyramides de Gizeh et du Grand Sphinx, merveilles du monde antique. Explorez l'intérieur de la Grande Pyramide et découvrez les secrets des pharaons avec un égyptologue passionné.");
        act12.setImageCouverture("https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop");
        act12.setLieu("Plateau de Gizeh");
        act12.setAdresse("Al Haram, Giza, Égypte");
        act12.setVille(cairo);
        act12.setCoordonneesGps(new GpsCoordinates(29.9792, 31.1342));
        act12.setPrix(new BigDecimal("60000"));
        act12.setDuree("5 heures");
        act12.setCategorie(CategorieActivite.CULTURE);
        act12.setDifficulte(DifficulteActivite.FACILE);
        act12.setPlacesMax(15);
        act12.setNote(4.8);
        act12.setTelephone("+20 100 567 8901");
        act12.setEmail("tours@egyptwonders.eg");
        act12.setLanguesDisponibles(Arrays.asList("Anglais", "Français", "Arabe", "Espagnol", "Allemand"));
        act12.setInclus(Arrays.asList("Guide égyptologue", "Entrée pyramides", "Entrée Sphinx", "Transport climatisé", "Eau minérale"));
        act12.setNonInclus(Arrays.asList("Repas", "Pourboires", "Photos intérieures"));
        activiteRepository.save(act12);

        // ====== VOITURES LOCATION ======
        Utilisateur demoUser = utilisateurRepository.findByEmail("demo@guideafrica.com").orElse(null);

        VoitureLocation v1 = new VoitureLocation();
        v1.setMarque("Toyota");
        v1.setModele("Land Cruiser");
        v1.setAnnee(2022);
        v1.setDescription("Toyota Land Cruiser parfait pour les safaris et les longs trajets. Tres bien entretenu, climatisation performante.");
        v1.setImagePrincipale("https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800");
        v1.setPrixParJour(new BigDecimal("75000"));
        v1.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Nairobi")).findFirst().orElse(null));
        v1.setAdresse("Westlands, Nairobi");
        v1.setCategorie(CategorieVoiture.SUV);
        v1.setCarburant(TypeCarburant.DIESEL);
        v1.setTransmission(TypeTransmission.AUTOMATIQUE);
        v1.setNombrePlaces(7);
        v1.setNombrePortes(5);
        v1.setClimatisation(true);
        v1.setGps(true);
        v1.setBluetooth(true);
        v1.setSiegesBebe(false);
        v1.setProprietaire(demoUser);
        v1.setTelephone("+254 712 345 678");
        v1.setWhatsapp("+254712345678");
        v1.setKilometrageInclus("200 km/jour");
        v1.setConditions("Permis de conduire international requis. Caution de 200 000 FCFA. Age minimum 25 ans.");
        v1.setNote(4.7);
        voitureLocationRepository.save(v1);

        VoitureLocation v2 = new VoitureLocation();
        v2.setMarque("Mercedes");
        v2.setModele("Classe C");
        v2.setAnnee(2023);
        v2.setDescription("Mercedes Classe C elegante et confortable. Ideale pour vos deplacements professionnels.");
        v2.setImagePrincipale("https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800");
        v2.setPrixParJour(new BigDecimal("95000"));
        v2.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Casablanca") || c.getNom().contains("Marrakech")).findFirst().orElse(null));
        v2.setAdresse("Quartier Maarif, Casablanca");
        v2.setCategorie(CategorieVoiture.BERLINE);
        v2.setCarburant(TypeCarburant.ESSENCE);
        v2.setTransmission(TypeTransmission.AUTOMATIQUE);
        v2.setNombrePlaces(5);
        v2.setNombrePortes(4);
        v2.setClimatisation(true);
        v2.setGps(true);
        v2.setBluetooth(true);
        v2.setSiegesBebe(true);
        v2.setProprietaire(demoUser);
        v2.setTelephone("+212 661 234 567");
        v2.setWhatsapp("+212661234567");
        v2.setKilometrageInclus("Illimite");
        v2.setConditions("Permis valide requis. Caution de 150 000 FCFA. Assurance tous risques incluse.");
        v2.setNote(4.9);
        voitureLocationRepository.save(v2);

        VoitureLocation v3 = new VoitureLocation();
        v3.setMarque("Peugeot");
        v3.setModele("208");
        v3.setAnnee(2021);
        v3.setDescription("Citadine economique et maniable, parfaite pour les deplacements en ville a Dakar.");
        v3.setImagePrincipale("https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800");
        v3.setPrixParJour(new BigDecimal("25000"));
        v3.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Dakar")).findFirst().orElse(null));
        v3.setAdresse("Plateau, Dakar");
        v3.setCategorie(CategorieVoiture.CITADINE);
        v3.setCarburant(TypeCarburant.ESSENCE);
        v3.setTransmission(TypeTransmission.MANUELLE);
        v3.setNombrePlaces(5);
        v3.setNombrePortes(5);
        v3.setClimatisation(true);
        v3.setGps(false);
        v3.setBluetooth(true);
        v3.setSiegesBebe(false);
        v3.setProprietaire(demoUser);
        v3.setTelephone("+221 77 234 56 78");
        v3.setWhatsapp("+22177234567");
        v3.setKilometrageInclus("150 km/jour");
        v3.setConditions("Permis de conduire valide. Caution de 50 000 FCFA.");
        v3.setNote(4.3);
        voitureLocationRepository.save(v3);

        VoitureLocation v4 = new VoitureLocation();
        v4.setMarque("Range Rover");
        v4.setModele("Sport");
        v4.setAnnee(2024);
        v4.setDescription("Range Rover Sport haut de gamme pour une experience de conduite premium a Lagos.");
        v4.setImagePrincipale("https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800");
        v4.setPrixParJour(new BigDecimal("150000"));
        v4.setVille(cityRepository.findAll().stream().filter(c -> c.getNom().contains("Lagos")).findFirst().orElse(null));
        v4.setAdresse("Victoria Island, Lagos");
        v4.setCategorie(CategorieVoiture.LUXE);
        v4.setCarburant(TypeCarburant.DIESEL);
        v4.setTransmission(TypeTransmission.AUTOMATIQUE);
        v4.setNombrePlaces(5);
        v4.setNombrePortes(5);
        v4.setClimatisation(true);
        v4.setGps(true);
        v4.setBluetooth(true);
        v4.setSiegesBebe(true);
        v4.setProprietaire(demoUser);
        v4.setTelephone("+234 801 234 5678");
        v4.setWhatsapp("+2348012345678");
        v4.setKilometrageInclus("Illimite");
        v4.setConditions("Age minimum 30 ans. Permis international. Caution de 500 000 FCFA. Chauffeur disponible en option.");
        v4.setNote(4.8);
        voitureLocationRepository.save(v4);

        // Voiture 5 - Accra, Ghana
        VoitureLocation v5 = new VoitureLocation();
        v5.setMarque("Toyota");
        v5.setModele("RAV4");
        v5.setAnnee(2023);
        v5.setDescription("Toyota RAV4 fiable et confortable, idéale pour explorer Accra et ses environs. Parfaite pour les familles et les voyages vers Cape Coast.");
        v5.setImagePrincipale("https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop");
        v5.setPrixParJour(new BigDecimal("45000"));
        v5.setVille(accra);
        v5.setAdresse("Airport City, Accra");
        v5.setCategorie(CategorieVoiture.SUV);
        v5.setCarburant(TypeCarburant.ESSENCE);
        v5.setTransmission(TypeTransmission.AUTOMATIQUE);
        v5.setNombrePlaces(5);
        v5.setNombrePortes(5);
        v5.setClimatisation(true);
        v5.setGps(true);
        v5.setBluetooth(true);
        v5.setSiegesBebe(true);
        v5.setProprietaire(demoUser);
        v5.setTelephone("+233 20 345 6789");
        v5.setWhatsapp("+233203456789");
        v5.setKilometrageInclus("200 km/jour");
        v5.setConditions("Permis de conduire valide. Caution de 100 000 FCFA. Age minimum 23 ans.");
        v5.setNote(4.5);
        voitureLocationRepository.save(v5);

        // Voiture 6 - Le Caire, Égypte
        VoitureLocation v6 = new VoitureLocation();
        v6.setMarque("Hyundai");
        v6.setModele("Tucson");
        v6.setAnnee(2024);
        v6.setDescription("Hyundai Tucson moderne et spacieux, parfait pour découvrir Le Caire et les sites antiques de la vallée du Nil en tout confort.");
        v6.setImagePrincipale("https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop");
        v6.setPrixParJour(new BigDecimal("55000"));
        v6.setVille(cairo);
        v6.setAdresse("Zamalek, Le Caire");
        v6.setCategorie(CategorieVoiture.SUV);
        v6.setCarburant(TypeCarburant.ESSENCE);
        v6.setTransmission(TypeTransmission.AUTOMATIQUE);
        v6.setNombrePlaces(5);
        v6.setNombrePortes(5);
        v6.setClimatisation(true);
        v6.setGps(true);
        v6.setBluetooth(true);
        v6.setSiegesBebe(false);
        v6.setProprietaire(demoUser);
        v6.setTelephone("+20 100 987 6543");
        v6.setWhatsapp("+201009876543");
        v6.setKilometrageInclus("250 km/jour");
        v6.setConditions("Permis international requis. Caution de 150 000 FCFA. Assurance tous risques incluse.");
        v6.setNote(4.4);
        voitureLocationRepository.save(v6);

        // Voiture 7 - Kigali, Rwanda
        VoitureLocation v7 = new VoitureLocation();
        v7.setMarque("Toyota");
        v7.setModele("Hilux");
        v7.setAnnee(2022);
        v7.setDescription("Toyota Hilux robuste et fiable, indispensable pour les routes de montagne du Rwanda. Idéal pour rejoindre les parcs nationaux et les gorilles.");
        v7.setImagePrincipale("https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop");
        v7.setPrixParJour(new BigDecimal("65000"));
        v7.setVille(kigali);
        v7.setAdresse("Centre-ville, Kigali");
        v7.setCategorie(CategorieVoiture.PICKUP);
        v7.setCarburant(TypeCarburant.DIESEL);
        v7.setTransmission(TypeTransmission.MANUELLE);
        v7.setNombrePlaces(5);
        v7.setNombrePortes(4);
        v7.setClimatisation(true);
        v7.setGps(true);
        v7.setBluetooth(true);
        v7.setSiegesBebe(false);
        v7.setProprietaire(demoUser);
        v7.setTelephone("+250 788 765 432");
        v7.setWhatsapp("+250788765432");
        v7.setKilometrageInclus("Illimité");
        v7.setConditions("Permis international requis. Caution de 200 000 FCFA. Chauffeur disponible sur demande.");
        v7.setNote(4.6);
        voitureLocationRepository.save(v7);

        // Voiture 8 - Tunis, Tunisie
        VoitureLocation v8 = new VoitureLocation();
        v8.setMarque("Volkswagen");
        v8.setModele("Golf");
        v8.setAnnee(2023);
        v8.setDescription("Volkswagen Golf compacte et agile, idéale pour circuler dans Tunis et explorer les sites archéologiques de Carthage et Sidi Bou Said.");
        v8.setImagePrincipale("https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop");
        v8.setPrixParJour(new BigDecimal("30000"));
        v8.setVille(tunis);
        v8.setAdresse("Lac 2, Tunis");
        v8.setCategorie(CategorieVoiture.CITADINE);
        v8.setCarburant(TypeCarburant.ESSENCE);
        v8.setTransmission(TypeTransmission.MANUELLE);
        v8.setNombrePlaces(5);
        v8.setNombrePortes(5);
        v8.setClimatisation(true);
        v8.setGps(false);
        v8.setBluetooth(true);
        v8.setSiegesBebe(false);
        v8.setProprietaire(demoUser);
        v8.setTelephone("+216 55 678 901");
        v8.setWhatsapp("+21655678901");
        v8.setKilometrageInclus("200 km/jour");
        v8.setConditions("Permis de conduire valide. Caution de 80 000 FCFA. Age minimum 21 ans.");
        v8.setNote(4.3);
        voitureLocationRepository.save(v8);

        System.out.println("  - " + activiteRepository.count() + " activites");
        System.out.println("  - " + voitureLocationRepository.count() + " voitures en location");
        System.out.println("  - " + amenityRepository.count() + " amenities");
        System.out.println("  - " + restaurantRepository.count() + " restaurants");
        System.out.println("  - " + chefRepository.count() + " chefs");
        System.out.println("  - " + menuItemRepository.count() + " items de menu");
        System.out.println("  - " + distinctionRepository.count() + " distinctions");
        System.out.println("  - " + hotelRepository.count() + " h\u00f4tels");
        System.out.println("  - " + reviewRepository.count() + " avis");
        System.out.println("  - " + regionalCuisineRepository.count() + " cuisines r\u00e9gionales");
        System.out.println("  - " + utilisateurRepository.count() + " utilisateurs");
        System.out.println("  - " + favoriRepository.count() + " favoris");
    }

    private MenuItem createMenuItem(String nom, String description, Double prix, CategorieMenu categorie, boolean signature, Restaurant restaurant) {
        MenuItem item = new MenuItem(nom, description, prix, categorie, signature);
        item.setRestaurant(restaurant);
        return item;
    }
}
