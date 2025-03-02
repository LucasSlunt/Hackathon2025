package com.hellostar.demo.controller;

import com.hellostar.demo.entity.Badge;
import com.hellostar.demo.entity.UserBadge;
import com.hellostar.demo.service.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    // Endpoint to create a new badge
    @PostMapping
    public Badge createBadge(@RequestParam String name, @RequestParam String description) {
        return badgeService.createBadge(name, description);
    }

    // Endpoint to assign a badge to a user
    @PostMapping("/assign")
    public UserBadge assignBadgeToUser(@RequestParam String username, @RequestParam Long badgeId) {
        return badgeService.assignBadgeToUser(username, badgeId);
    }

    // Endpoint to get all badges for a user
    @GetMapping("/user/{username}")
    public List<UserBadge> getUserBadges(@PathVariable String username) {
        return badgeService.getUserBadges(username);
    }

    // Endpoint to get badges displayed on a user's profile
    @GetMapping("/user/{username}/displayed")
    public List<UserBadge> getDisplayedBadges(@PathVariable String username) {
        return badgeService.getDisplayedBadges(username);
    }

    // Endpoint to toggle whether a badge is displayed on a user's profile
    @PutMapping("/{userBadgeId}/display")
    public UserBadge toggleBadgeDisplay(@PathVariable Long userBadgeId, @RequestParam boolean isDisplayed) {
        return badgeService.toggleBadgeDisplay(userBadgeId, isDisplayed);
    }
}