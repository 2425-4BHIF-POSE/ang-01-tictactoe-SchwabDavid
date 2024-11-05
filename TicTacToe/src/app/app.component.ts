import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldComponent } from './components/field/field.component';
import { MatButton } from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldComponent, MatButton, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly winner: WritableSignal<number> = signal(0);
  protected readonly grid: WritableSignal<number[][]> = signal(this.createEmptyGrid());
  protected readonly turn: WritableSignal<number> = signal(-1);


  private createEmptyGrid(): number[][] {
    return Array(3).fill(null).map(() => Array(3).fill(0));
  }

  private swapTurn() {
    this.turn.update(turn => -turn);
  }

  protected updateGrid(row: number, col: number) {
    if (this.winner() !== 0 || this.grid()[row][col] !== 0) return;

    this.grid.update(grid => {
      grid[row][col] = this.turn();
      this.winner.set(this.determineWinner(grid));
      this.swapTurn();
      return grid;
    });
  }

  protected resetGame() {
    this.winner.set(0);
    this.grid.set(this.createEmptyGrid());
    this.turn.set(-1);
  }

  private determineWinner(grid: number[][]): number {
    for (let i = 0; i < 3; i++) {
      if (Math.abs(grid[i][0] + grid[i][1] + grid[i][2]) === 3) return grid[i][0];
      if (Math.abs(grid[0][i] + grid[1][i] + grid[2][i]) === 3) return grid[0][i];
    }

    const diag1Sum = grid[0][0] + grid[1][1] + grid[2][2];
    const diag2Sum = grid[0][2] + grid[1][1] + grid[2][0];
    if (Math.abs(diag1Sum) === 3) return grid[1][1];
    if (Math.abs(diag2Sum) === 3) return grid[1][1];

    return grid.flat().every(cell => cell !== 0) ? 404 : 0;
  }
}
