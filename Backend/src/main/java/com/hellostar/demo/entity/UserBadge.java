package com.hellostar.demo.entity;

import jakarta.persistence.*;

@Entity
public class UserBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false) // Use username as the foreign key
    private User user;

    @ManyToOne
    @JoinColumn(name = "badge_id", nullable = false)
    private Badge badge;

    @Column(nullable = false)
    private boolean isDisplayedOnProfile;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Badge getBadge() {
        return badge;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
    }

    public boolean isDisplayedOnProfile() {
        return isDisplayedOnProfile;
    }

    public void setDisplayedOnProfile(boolean displayedOnProfile) {
        isDisplayedOnProfile = displayedOnProfile;
    }
}