import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, HostListener, Inject, Input, OnInit } from "@angular/core";

@Directive({
  'selector': "[hovered]",
})
export class HoverDirective implements OnInit {

  @Input() border = "2px solid blue";

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void { };

  @HostListener('focus') onHover() {
    this.element.nativeElement.parentElement.style.border = this.border;
  }

  @HostListener('blur') onBlur() {
    this.element.nativeElement.parentElement.style.border = "";
  }
}