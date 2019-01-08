import { CustomDecimalPlaceNumberDirective } from './CustomDecimalPlaceNumber.directive';
import { ElementRef } from '@angular/core';

describe('appCustomDecimalPlaceNumber', () => {
  const el: ElementRef = new ElementRef(HTMLDivElement);
  it('should create an instance', () => {
    const directive = new CustomDecimalPlaceNumberDirective(el);
    expect(directive).toBeTruthy();
  });
});
