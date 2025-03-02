package com.hellostar.demo.service;

import com.hellostar.demo.entity.User;
import com.hellostar.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to add points to a user's totalPoints
    public User addPoints(String username, int points) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
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
        User user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendUsername).orElseThrow(() -> new RuntimeException("Friend not found"));
        user.getFriends().add(friend);
        return userRepository.save(user);
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
}