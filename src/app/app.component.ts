import {Component, HostListener, OnInit} from '@angular/core';
import { ApiService } from './api-service/api-service.service';
import { Word } from './shared/word.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})

export class AppComponent implements OnInit {

  word: Word;
  wordToGuess: string;
  missedLetters: string[];
  guessedLetters: string[];
  currentMissedSelection: string;
  currentGuessedSelection: string;
  errorMessage: any;

  constructor (private apiService: ApiService) {}

  ngOnInit() {this.getWord()}

  getWord () {
    this.apiService.getWord()
      .subscribe(word => {
        this.word = word;
        this.missedLetters = [];
        this.guessedLetters = [];
        this.wordToGuess = this.word.getWord();
        console.log(this.word);
      },
      error => this.errorMessage = <any>error
      );
  }

  @HostListener('window:keydown', ['$event'])
  handleKyeboardInput(event: KeyboardEvent) {
    if (event.keyCode > 64 && event.keyCode < 91) {
      let selectedLetter = event.key;
      let letterIndexes = [...this.word.getLetterIndexes(selectedLetter)];

      if (!letterIndexes.length && this.missedLetters.indexOf(selectedLetter) < 0) {
        this.currentMissedSelection = selectedLetter;
        this.missedLetters.push(selectedLetter);

      } else if (letterIndexes.length && this.guessedLetters.indexOf(selectedLetter) < 0) {
        this.guessedLetters.push(selectedLetter);
        this.currentGuessedSelection = selectedLetter;
      }
    }
  }
}
