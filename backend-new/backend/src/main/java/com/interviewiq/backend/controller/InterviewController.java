package com.interviewiq.backend.controller;

import com.interviewiq.backend.model.Interview;
import com.interviewiq.backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping
    public Interview createInterview(@RequestBody Interview interview) {
        return interviewService.createInterview(interview);
    }

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/{id}")
    public Interview getInterviewById(@PathVariable Long id) {
        return interviewService.getInterviewById(id);
    }

    @PutMapping("/{id}")
    public Interview updateInterview(@PathVariable Long id, @RequestBody Interview interview) {
        return interviewService.updateInterview(id, interview);
    }

    @DeleteMapping("/{id}")
    public String deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return "Interview deleted successfully";
    }
}