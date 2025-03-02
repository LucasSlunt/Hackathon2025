package com.hellostar.demo.controller;

import com.hellostar.demo.entity.User;
import com.hellostar.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;
    // Endpoint to add points to a user's totalPoints
    @PutMapping("/{username}/add-points")
    public User addPoints(@PathVariable String username, @RequestParam int points) {
        return userService.addPoints(username, points);
    }

    // Endpoint to get a user's totalPoints
    @GetMapping("/{username}/total-points")
    public int getTotalPoints(@PathVariable String username) {
        return userService.getTotalPoints(username);
    }

    // Existing endpoints for profile picture, friends, and favorite locations
    @PutMapping("/{username}/profile-pic")
    public User setProfilePic(@PathVariable String username, @RequestParam String profilePic) {
        return userService.setProfilePic(username, profilePic);
    }

    @GetMapping("/{username}/profile-pic")
    public String getProfilePic(@PathVariable String username) {
        return userService.getProfilePic(username);
    }

    @PostMapping("/{username}/friends/{friendUsername}")
    public User addFriend(@PathVariable String username, @PathVariable String friendUsername) {
        return userService.addFriend(username, friendUsername);
    }

    @GetMapping("/{username}/friends")
    public Set<User> getFriends(@PathVariable String username) {
        return userService.getFriends(username);
    }

    @PostMapping("/{username}/favorite-locations/{locationId}")
    public User addFavoriteLocation(@PathVariable String username, @PathVariable Long locationId) {
        return userService.addFavoriteLocation(username, locationId);
    }

    @GetMapping("/{username}/favorite-locations")
    public Set<Long> getFavoriteLocations(@PathVariable String username) {
        return userService.getFavoriteLocations(username);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = Optional.ofNullable(userService.getUserByUsername(username));
        
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get()); // ✅ Return user details if login is correct
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}