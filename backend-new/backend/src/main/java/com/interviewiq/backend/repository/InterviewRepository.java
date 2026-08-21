package com.interviewiq.backend.repository;

import com.interviewiq.backend.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
}