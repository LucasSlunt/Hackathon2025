package com.hellostar.demo.repository;

import com.hellostar.demo.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser_Id(Long userId);
    List<UserBadge> findByUser_IdAndIsDisplayedOnProfile(Long userId, boolean isDisplayedOnProfile);
}
