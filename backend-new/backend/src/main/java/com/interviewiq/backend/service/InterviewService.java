package com.interviewiq.backend.service;

import com.interviewiq.backend.model.Interview;
import com.interviewiq.backend.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    public Interview createInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public Interview getInterviewById(Long id) {
        return interviewRepository.findById(id).orElse(null);
    }

    public Interview updateInterview(Long id, Interview interview) {
        interview.setId(id);
        return interviewRepository.save(interview);
    }

    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }
}