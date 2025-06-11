import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightToday]',
  standalone: true
})
export class HighlightTodayDirective implements OnInit {
  @Input('appHighlightToday') eventDate!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const today = new Date();
    const istToday = new Date(today.getTime() + (5.5 * 60 * 60 * 1000)).toISOString().split('T')[0];
    if (this.eventDate === istToday) {
      this.el.nativeElement.style.border = '2px solid green';
      this.el.nativeElement.style.backgroundColor = '#e6ffe6';
    }
  }
}
