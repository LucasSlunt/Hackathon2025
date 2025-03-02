package com.hellostar.demo.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {

    @Id
    @Column(nullable = false, unique = true) // Username is the primary key
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(columnDefinition = "TEXT") // Store as TEXT in the database
    private String profilePic;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0") // Add totalPoints with a default value of 0
    private int totalPoints;

    @Column(nullable = false) // 🔥 Ensure password is not NULL
    private String password;

    @ManyToMany
    @JoinTable(
        name = "user_friends",
        joinColumns = @JoinColumn(name = "username"), // Use username as the join column
        inverseJoinColumns = @JoinColumn(name = "friend_username") // Use friend's username as the inverse join column
    )
    private Set<User> friends = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserBadge> userBadges = new HashSet<>();

    @ElementCollection
    private Set<Long> favoriteLocationIds = new HashSet<>();

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }


    public void setPassword(String email) {
        this.email = email;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public Set<UserBadge> getUserBadges() {
        return userBadges;
    }

    public void setUserBadges(Set<UserBadge> userBadges) {
        this.userBadges = userBadges;
    }

    public Set<Long> getFavoriteLocationIds() {
        return favoriteLocationIds;
    }

    public void setFavoriteLocationIds(Set<Long> favoriteLocationIds) {
        this.favoriteLocationIds = favoriteLocationIds;
    }

    public String getPassword() {
        return password;
    }
}