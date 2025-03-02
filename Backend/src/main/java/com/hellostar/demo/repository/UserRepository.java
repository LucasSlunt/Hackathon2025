package com.hellostar.demo.repository;

import com.hellostar.demo.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);
}