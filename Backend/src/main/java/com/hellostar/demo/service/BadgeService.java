package com.hellostar.demo.service;

import com.hellostar.demo.entity.Badge;
import com.hellostar.demo.entity.User;
import com.hellostar.demo.entity.UserBadge;
import com.hellostar.demo.repository.BadgeRepository;
import com.hellostar.demo.repository.UserBadgeRepository;
import com.hellostar.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private UserBadgeRepository userBadgeRepository;

    @Autowired
    private UserRepository userRepository;

    // Method to create a new badge
    public Badge createBadge(String name, String description) {
        Badge badge = new Badge();
        badge.setName(name);
        badge.setDescription(description);
        return badgeRepository.save(badge);
    }

    // Method to assign a badge to a user
    public UserBadge assignBadgeToUser(String username, Long badgeId) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Badge badge = badgeRepository.findById(badgeId)
                .orElseThrow(() -> new RuntimeException("Badge not found"));
        UserBadge userBadge = new UserBadge();
        userBadge.setUser(user);
        userBadge.setBadge(badge);
        userBadge.setDisplayedOnProfile(false);
        return userBadgeRepository.save(userBadge);
    }

    // Method to get all badges for a user
    public List<UserBadge> getUserBadges(String username) {
        return userBadgeRepository.findByUser_Username(username);
    }

    // Method to get badges displayed on a user's profile
    public List<UserBadge> getDisplayedBadges(String username) {
        return userBadgeRepository.findByUser_UsernameAndIsDisplayedOnProfile(username, true);
    }

    // Method to toggle whether a badge is displayed on a user's profile
    public UserBadge toggleBadgeDisplay(Long userBadgeId, boolean isDisplayed) {
        UserBadge userBadge = userBadgeRepository.findById(userBadgeId)
                .orElseThrow(() -> new RuntimeException("UserBadge not found"));
        userBadge.setDisplayedOnProfile(isDisplayed);
        return userBadgeRepository.save(userBadge);
    }
}