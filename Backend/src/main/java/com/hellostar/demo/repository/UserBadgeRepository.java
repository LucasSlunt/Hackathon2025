package com.hellostar.demo.repository;

import com.hellostar.demo.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser_Username(String username); // Find badges by username
    List<UserBadge> findByUser_UsernameAndIsDisplayedOnProfile(String username, boolean isDisplayedOnProfile); // Find displayed badges by username
}