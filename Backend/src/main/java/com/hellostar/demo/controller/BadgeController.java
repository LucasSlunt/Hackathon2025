package com.hellostar.demo.controller;

import com.hellostar.demo.entity.Badge;
import com.hellostar.demo.service.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    // Endpoint to create a new badge
    @PostMapping
    public Badge createBadge(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam int level,
            @RequestParam String innerImagePath) {
        return badgeService.createBadge(name, description, level, innerImagePath);
    }

    // Endpoint to update a badge's level
    @PutMapping("/{badgeId}/level")
    public Badge updateBadgeLevel(@PathVariable Long badgeId, @RequestParam int level) {
        return badgeService.updateBadgeLevel(badgeId, level);
    }

    // Endpoint to update a badge's inner image path
    @PutMapping("/{badgeId}/inner-image")
    public Badge updateBadgeInnerImagePath(@PathVariable Long badgeId, @RequestParam String innerImagePath) {
        return badgeService.updateBadgeInnerImagePath(badgeId, innerImagePath);
    }

    // Endpoint to get a badge by ID
    @GetMapping("/{badgeId}")
    public Badge getBadgeById(@PathVariable Long badgeId) {
        return badgeService.getBadgeById(badgeId);
    }
}