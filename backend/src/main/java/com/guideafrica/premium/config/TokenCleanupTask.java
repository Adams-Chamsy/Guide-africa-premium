package com.guideafrica.premium.config;

import com.guideafrica.premium.repository.PasswordResetTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Component
@EnableScheduling
public class TokenCleanupTask {

    private static final Logger logger = LoggerFactory.getLogger(TokenCleanupTask.class);

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public TokenCleanupTask(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Scheduled(cron = "0 0 */6 * * *")
    @Transactional
    public void cleanExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        var expiredTokens = passwordResetTokenRepository.findAll()
                .stream()
                .filter(token -> token.getExpiresAt().isBefore(now))
                .collect(Collectors.toList());
        if (!expiredTokens.isEmpty()) {
            passwordResetTokenRepository.deleteAll(expiredTokens);
            logger.info("Nettoyage: {} tokens expires supprimes", expiredTokens.size());
        }
    }
}
