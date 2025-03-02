package com.hellostar.demo.repository;
import com.hellostar.demo.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
    Badge findByName(String name);
}
