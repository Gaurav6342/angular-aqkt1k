import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  seats: any[][] = [];
  seatsToBook: number = 0;
  errorMessage: string = '';

  ngOnInit() {
    this.generateSeats();
  }

  generateSeats() {
    const totalRows = 10; // Total rows excluding the last row
    const seatsInNormalRows = 7; // Seats in each normal row
    const seatsInLastRow = 3; // Seats in the last row

    for (let i = 0; i < totalRows; i++) {
      const row: any[] = [];
      for (let j = 0; j < seatsInNormalRows; j++) {
        row.push({
          name: `Seat ${i * seatsInNormalRows + j + 1}`,
          available: true,
        });
      }
      this.seats.push(row);
    }

    const lastRow: any[] = [];
    for (let i = 0; i < seatsInLastRow; i++) {
      lastRow.push({
        name: `Seat ${totalRows * seatsInNormalRows + i + 1}`,
        available: true,
      });
    }
    this.seats.push(lastRow);
  }

  bookSeats() {
    if (this.seatsToBook <= 0 || this.seatsToBook > 7) {
      this.errorMessage = 'Please enter a valid number of seats (1-7)';
      return;
    }

    let seatsBooked = 0;

    for (let i = 0; i < this.seats.length - 1; i++) {
      for (let j = 0; j < this.seats[i].length; j++) {
        if (this.seats[i][j].available) {
          this.seats[i][j].available = false;
          seatsBooked++;
          if (seatsBooked === this.seatsToBook) {
            this.errorMessage = '';
            return;
          }
        }
      }
    }

    if (seatsBooked < this.seatsToBook) {
      for (let j = 0; j < this.seats[this.seats.length - 1].length; j++) {
        if (this.seats[this.seats.length - 1][j].available) {
          this.seats[this.seats.length - 1][j].available = false;
          seatsBooked++;
          if (seatsBooked === this.seatsToBook) {
            this.errorMessage = '';
            return;
          }
        }
      }
    }

    this.errorMessage = 'Requested seats are not available';
  }
}
