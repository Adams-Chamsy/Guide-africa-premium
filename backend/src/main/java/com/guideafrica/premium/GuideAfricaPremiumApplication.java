package com.guideafrica.premium;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class GuideAfricaPremiumApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuideAfricaPremiumApplication.class, args);
    }
}
