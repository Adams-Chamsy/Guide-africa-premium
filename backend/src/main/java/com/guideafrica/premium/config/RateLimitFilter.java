package com.guideafrica.premium.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS = 10;
    private static final long WINDOW_MS = 60_000; // 1 minute

    private final ConcurrentHashMap<String, RateLimitEntry> requestCounts = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Only rate limit auth endpoints
        if (path.contains("/api/v1/auth/login") || path.contains("/api/v1/auth/register") || path.contains("/api/v1/auth/forgot-password")) {
            String clientIp = getClientIp(request);
            String key = clientIp + ":" + path;

            RateLimitEntry entry = requestCounts.compute(key, (k, v) -> {
                long now = System.currentTimeMillis();
                if (v == null || now - v.windowStart > WINDOW_MS) {
                    return new RateLimitEntry(now, new AtomicInteger(1));
                }
                v.count.incrementAndGet();
                return v;
            });

            if (entry.count.get() > MAX_REQUESTS) {
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\":\"Trop de requêtes. Veuillez réessayer dans une minute.\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String remoteAddr = request.getRemoteAddr();
        // Only trust X-Forwarded-For if request comes from trusted proxy (localhost)
        if ("127.0.0.1".equals(remoteAddr) || "0:0:0:0:0:0:0:1".equals(remoteAddr)) {
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return xForwardedFor.split(",")[0].trim();
            }
        }
        return remoteAddr;
    }

    private static class RateLimitEntry {
        final long windowStart;
        final AtomicInteger count;

        RateLimitEntry(long windowStart, AtomicInteger count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}
