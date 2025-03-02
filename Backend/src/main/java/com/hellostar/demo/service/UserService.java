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

    // Method to set the profile picture for a user
    public User setProfilePic(Long userId, String profilePic) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setProfilePictureURL(profilePic);
        return userRepository.save(user);
    }

    // Method to get the profile picture for a user
    public String getProfilePic(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getProfilePictureURL();
    }

    public User addFriend(Long userId, Long friendId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend not found"));
        user.getFriends().add(friend);
        return userRepository.save(user);
    }

    public Set<User> getFriends(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFriends();
    }

    public User addFavoriteLocation(Long userId, Long locationId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getFavoriteLocationIds().add(locationId);
        return userRepository.save(user);
    }

    public Set<Long> getFavoriteLocations(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFavoriteLocationIds();
    }
}