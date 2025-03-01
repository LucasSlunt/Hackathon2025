package com.hellostar.demo.controller;

import com.hellostar.demo.entity.User;
import com.hellostar.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to set the profile picture for a user
    @PutMapping("/{userId}/profile-pic")
    public User setProfilePic(@PathVariable Long userId, @RequestParam String profilePic) {
        return userService.setProfilePic(userId, profilePic);
    }

    // Endpoint to get the profile picture for a user
    @GetMapping("/{userId}/profile-pic")
    public String getProfilePic(@PathVariable Long userId) {
        return userService.getProfilePic(userId);
    }

    // Existing endpoints for friends and favorite locations
    @PostMapping("/{userId}/friends/{friendId}")
    public User addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        return userService.addFriend(userId, friendId);
    }

    @GetMapping("/{userId}/friends")
    public Set<User> getFriends(@PathVariable Long userId) {
        return userService.getFriends(userId);
    }

    @PostMapping("/{userId}/favorite-locations/{locationId}")
    public User addFavoriteLocation(@PathVariable Long userId, @PathVariable Long locationId) {
        return userService.addFavoriteLocation(userId, locationId);
    }

    @GetMapping("/{userId}/favorite-locations")
    public Set<Long> getFavoriteLocations(@PathVariable Long userId) {
        return userService.getFavoriteLocations(userId);
    }
}