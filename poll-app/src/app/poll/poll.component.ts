import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Poll } from '../poll.models';



@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent implements OnInit{
    newPoll: Poll = {
        id: '' as unknown as number,
        question: '',
        options: [
          {optionText: '', voteCount: 0},
          {optionText: '', voteCount: 0}
        ],
        votes: []
    };
    polls :Poll[] =[];
    constructor(private readonly pollService : PollService){
    }
    ngOnInit(): void {
        this.loadPolls();
    }
    loadPolls() {
      this.pollService.getPolls().subscribe ({
        next:(data) =>{
          this.polls = data;
        },
        error: (error) => {
          console.error("Error fetching polls: ", error);
        }
      });
    }
    addOption() {
      this.newPoll.options.push({ optionText: '', voteCount: 0 });
    }
    createPoll() {
      console.log("Creating poll: ", this.newPoll);

      this.pollService.createPoll(this.newPoll).subscribe({
        next: () => {
         console.log("Poll created successfully: ", this.newPoll);
         this.polls.push(this.newPoll);
          this.resetPoll();
        },
        error: (error) => {
          console.error("Poll creation failed: ", error);
        }
      });
    }
    resetPoll(){
      this.newPoll = {
         id: 0,
        question: '',
        options: [
          {optionText: '', voteCount: 0},
          {optionText: '', voteCount: 0}
        ],
        votes: [],
      }
    }
    vote(pollId: number, optionIndex: number) {
      this.pollService.vote(pollId, optionIndex).subscribe({
        next: () => {
          const poll = this.polls.find(p => p.id === pollId);
          if (poll) {
            poll.options[optionIndex].voteCount++;
          }
        },
        error: (error) => {
          console.error("Error voting on a poll: ", error);
        }
      });
    }
    trackByIndex(index: number): number {
      return index;
  }
  
}

