package com.hellostar.demo.service;

import com.hellostar.demo.entity.User;
import com.hellostar.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    

    // Method to add points to a user's totalPoints
    public User addPoints(String username, int points) {
        User user = userRepository.findByUsername(username);
            //.orElseThrow(() -> new RuntimeException("User not found"));
        user.setTotalPoints(user.getTotalPoints() + points);
        return userRepository.save(user);
    }

    // Method to get a user's totalPoints
    public int getTotalPoints(String username) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getTotalPoints();
    }

    // Existing methods for profile picture, friends, and favorite locations
    public User setProfilePic(String username, String profilePic) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setProfilePic(profilePic);
        return userRepository.save(user);
    }

    public String getProfilePic(String username) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getProfilePic();
    }

    public User addFriend(String username, String friendUsername) {
        System.out.println("🔍 Checking if user exists: " + username);
        User user = userRepository.findByUsername(username);
        if (user == null) {
            System.err.println("❌ User not found: " + username);
            throw new RuntimeException("User not found: " + username);
        }

        System.out.println("✅ Found user: " + user.getUsername());

        System.out.println("🔍 Checking if friend exists: " + friendUsername);
        User friend = userRepository.findByUsername(friendUsername);
        if (friend == null) {
            System.err.println("❌ Friend not found: " + friendUsername);
            throw new RuntimeException("Friend not found: " + friendUsername);
        }

        System.out.println("✅ Found friend: " + friend.getUsername());

        // ✅ Ensure the user's friends list is not null
        if (user.getFriends() == null) {
            user.setFriends(new HashSet<>());
        }

        // ✅ Check if the friend is already added
        if (user.getFriends().contains(friend)) {
            System.out.println("⚠️ [LOG] User " + username + " already has " + friendUsername + " as a friend.");
            return user; // ✅ Return the user without throwing an error
        }

        // ✅ Add the friend and save
        System.out.println("📌 Adding friend: " + friendUsername + " to " + username + "'s friend list.");
        user.getFriends().add(friend);
        userRepository.save(user);
        System.out.println("🎉 Friend added successfully!");

        return user;
    }

    public Set<User> getFriends(String username) {
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFriends();
    }

    public User addFavoriteLocation(String username, Long locationId) {
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        user.getFavoriteLocationIds().add(locationId);
        return userRepository.save(user);
    }

    public Set<Long> getFavoriteLocations(String username) {
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFavoriteLocationIds();
    }


    public List<User> getAllUsers() {
        return userRepository.findAll(); // Fetch users from DB
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}