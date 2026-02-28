package com.guideafrica.premium.config;

import com.guideafrica.premium.model.*;
import com.guideafrica.premium.model.enums.*;
import com.guideafrica.premium.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
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

    public DataInitializer(CategoryRepository categoryRepository,
                           RestaurantRepository restaurantRepository,
                           HotelRepository hotelRepository,
                           ReviewRepository reviewRepository,
                           CityRepository cityRepository,
                           ChefRepository chefRepository,
                           MenuItemRepository menuItemRepository,
                           DistinctionRepository distinctionRepository,
                           AmenityRepository amenityRepository,
                           RegionalCuisineRepository regionalCuisineRepository) {
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

        System.out.println("=== Données d'exemple chargées avec succès ===");
        System.out.println("  - " + cityRepository.count() + " villes");
        System.out.println("  - " + categoryRepository.count() + " catégories");
        System.out.println("  - " + amenityRepository.count() + " amenities");
        System.out.println("  - " + restaurantRepository.count() + " restaurants");
        System.out.println("  - " + chefRepository.count() + " chefs");
        System.out.println("  - " + menuItemRepository.count() + " items de menu");
        System.out.println("  - " + distinctionRepository.count() + " distinctions");
        System.out.println("  - " + hotelRepository.count() + " hôtels");
        System.out.println("  - " + reviewRepository.count() + " avis");
        System.out.println("  - " + regionalCuisineRepository.count() + " cuisines régionales");
    }

    private MenuItem createMenuItem(String nom, String description, Double prix, CategorieMenu categorie, boolean signature, Restaurant restaurant) {
        MenuItem item = new MenuItem(nom, description, prix, categorie, signature);
        item.setRestaurant(restaurant);
        return item;
    }
}
