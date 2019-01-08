import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Batch {
    batchId: number;
    batchNo: string;
    netWeight: string;
    width: string;
    statusName: string;
    scheduleNo: string;
    thickness: number;
  }

  @Injectable({providedIn: 'root'})
  export class Unit {
    subUnitId: number;
    subUnitName: string;
    isClubbing: number;
    isParting: number;
  }