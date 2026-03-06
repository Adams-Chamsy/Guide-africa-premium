package com.guideafrica.premium.util;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Utility class to strip HTML tags from user-supplied strings.
 * Uses a simple regex approach to remove all HTML tags.
 */
public final class HtmlSanitizer {

    private HtmlSanitizer() {
        // Utility class, not instantiable
    }

    /**
     * Strips all HTML tags from the input string.
     *
     * @param input the string to sanitize
     * @return the sanitized string with HTML tags removed, or null if input is null
     */
    public static String sanitize(String input) {
        if (input == null) {
            return null;
        }
        return input.replaceAll("<[^>]*>", "").trim();
    }

    /**
     * Sanitizes each element in the given list.
     *
     * @param inputs the list of strings to sanitize
     * @return a new list with each element sanitized, or null if input list is null
     */
    public static List<String> sanitizeList(List<String> inputs) {
        if (inputs == null) {
            return null;
        }
        return inputs.stream()
                .map(HtmlSanitizer::sanitize)
                .collect(Collectors.toList());
    }
}
