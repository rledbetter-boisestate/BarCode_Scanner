import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  currentShelf: string = '';
  scanResult: string = '';
  shelfBooks: any[] = [];
  alertMessage: string = '';

  constructor(private http: HttpClient) {}

  onCodeResult(resultString: string) {
    this.scanResult = resultString;
    this.alertMessage = '';

    // Logic: Is this a Shelf or a Book?
    if (resultString.startsWith('SHELF-')) {
      // It is a shelf: Set context and load books
      this.currentShelf = resultString.replace('SHELF-', '');
      this.loadShelf(this.currentShelf);
    } else {
      // It is a book: Save it to the current shelf
      if (!this.currentShelf) {
        this.alertMessage = 'PLEASE SCAN A SHELF FIRST!';
        return;
      }
      this.processBook(resultString);
    }
  }

  processBook(barcode: string) {
    const payload = {
      barcode: barcode,
      call_number: 'Unknown', // In a real app, you'd fetch metadata from an external API (like Google Books)
      bookshelf_number: this.currentShelf
    };

    this.http.post<any>('http://localhost:3000/api/scan', payload).subscribe(response => {
      if (response.status === 'alert') {
        // TRIGGER WEEDING NOTIFICATION
        this.alertMessage = response.message;
        alert(response.message); // Native browser alert for emphasis
      } else {
        // Refresh shelf view to show newly added book
        this.loadShelf(this.currentShelf);
      }
    });
  }

  loadShelf(shelfId: string) {
    this.http.get<any[]>(`http://localhost:3000/api/shelf/${shelfId}`)
      .subscribe(data => this.shelfBooks = data);
  }
}