package com.hellostar.demo.service;

import com.hellostar.demo.entity.Badge;
import com.hellostar.demo.repository.BadgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    // Method to create a new badge
    public Badge createBadge(String name, String description, int level, String innerImagePath) {
        Badge badge = new Badge();
        badge.setName(name);
        badge.setDescription(description);
        badge.setLevel(level);
        badge.setInnerImagePath(innerImagePath);
        return badgeRepository.save(badge);
    }

    // Method to update a badge's level
    public Badge updateBadgeLevel(Long badgeId, int level) {
        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new RuntimeException("Badge not found"));
        badge.setLevel(level);
        return badgeRepository.save(badge);
    }

    // Method to update a badge's inner image path
    public Badge updateBadgeInnerImagePath(Long badgeId, String innerImagePath) {
        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new RuntimeException("Badge not found"));
        badge.setInnerImagePath(innerImagePath);
        return badgeRepository.save(badge);
    }

    // Method to get a badge by ID
    public Badge getBadgeById(Long badgeId) {
        return badgeRepository.findById(badgeId)
                .orElseThrow(() -> new RuntimeException("Badge not found"));
    }
}