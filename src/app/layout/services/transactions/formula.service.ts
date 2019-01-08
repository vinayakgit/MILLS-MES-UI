import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  constructor() { }

  calculateLength(width: number, thickness: number, weight: number, steelDensity: number) {
    return Math.round((( weight / (width * thickness * steelDensity)) * 1000000) * 1000) / 1000;
  }
}
