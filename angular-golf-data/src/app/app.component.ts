import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Golfer } from './interface/Golfer';
import { io, Socket } from 'socket.io-client';
import { test } from 'node:test';
import { CipherKey } from 'node:crypto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-golf-data';
  output = '0';
  golfers: Golfer[] = [];

  test() {
    const socket = io('https://mst-full-stack-dev-test.herokuapp.com/');

    socket.on('data-update', (value) => {
      const golfer = {
        firstName: value.First,
        lastName: value.Last,
        nationality: value.Nationality,
        score: value.Score,
        position: value.position,
        holesPlayed: value.holesPlayed,
      };
      this.golfers.push(golfer);
      this.golfers.sort(this.compareByPostion);
    });

    return socket;
  }

  compareByPostion(a: Golfer, b: Golfer) {
    return a.position - b.position;
  }
}
