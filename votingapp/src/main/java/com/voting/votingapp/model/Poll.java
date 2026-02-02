package com.voting.votingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.annotation.processing.Generated;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name="poll")
@NoArgsConstructor
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;
    @ElementCollection
    @CollectionTable(
            name = "poll_options",
            joinColumns = @JoinColumn(name = "poll_id")
    )
    private List<OptionVote> options = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name="poll_votes",
            joinColumns = @JoinColumn(name="poll_id")
    )
    private List<Long> votes = new ArrayList<>();

}
