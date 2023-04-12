import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, HostListener, Inject, Input, OnInit } from "@angular/core";

@Directive({
  'selector': "[hovered]"
})
export class HoverDirective implements OnInit {

  @Input() border = "2px solid blue";

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) {
    console.log(element);
  }


  ngOnInit(): void { console.log("Element: ", this.element.nativeElement) };

  @HostListener('focus') onHover() {
    // console.log(this.element.nativeElement);
    this.element.nativeElement.parentElement.style.border = this.border;
  }
  @HostListener('blur') onBlur() {
    // console.log(this.element.nativeElement);
    this.element.nativeElement.parentElement.style.border = "";

  }
}