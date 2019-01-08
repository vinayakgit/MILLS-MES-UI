import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomDecimalPlaceNumber]'
})
export class CustomDecimalPlaceNumberDirective{

  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d{0,2}\.?\d{0,3}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(this.el.nativeElement.value + 'eventkey' + event.key);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
     }
  }

  // @HostListener('focusout', ['$event'])
  // @HostListener('tabout', ['$event'])
  // onFocusOut(event: MouseEvent | KeyboardEvent) {
  //   const value: string = this.el.nativeElement.value;
  //   if (value && value.length >= 3 && value.indexOf('.') === -1) {
      
  //   }
  // }

  
}
