import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

interface SearchResult {
  title: string,
  description: string
}

@Component({
  selector: 'uni-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements AfterViewInit {

  focused = false;

  result: any[] = [
    { title: "Heading", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
    { title: "Heading", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit." }
  ]

  ngAfterViewInit(): void {
  }

  onFocus($event: any) {
    $event.preventDefault();
    this.focused = true;
  }
  onBlur($event: any) {
    $event.preventDefault();
    this.focused = false;
  }


}
