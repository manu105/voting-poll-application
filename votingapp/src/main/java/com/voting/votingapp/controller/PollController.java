package com.voting.votingapp.controller;


import com.voting.votingapp.model.Poll;
import com.voting.votingapp.repositories.PollRepository;
import com.voting.votingapp.request.Vote;
import com.voting.votingapp.services.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.voting.votingapp.repositories.PollRepository.*;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "http://localhost:4200")
public class PollController {
    private final PollService pollService;
    public PollController(PollService pollService) {
        this.pollService = pollService;
    }
    @PostMapping
    public ResponseEntity<Poll> createPoll(@RequestBody Poll poll) {
        System.out.println("Incoming poll: " + poll);
        Poll savedPoll = pollService.createPoll(poll);
        System.out.println("Incoming poll: " + savedPoll);
        return ResponseEntity.ok(savedPoll);
    }

    @GetMapping
    public List<Poll> getAllPolls() {
        return pollService.getAllPolls();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPoll(@PathVariable Long id) {
        return pollService.getPollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/vote")
    public void vote(@RequestBody Vote vote){
        pollService.vote(vote.getPollId(), vote.getOptionIndex());
    }
}
