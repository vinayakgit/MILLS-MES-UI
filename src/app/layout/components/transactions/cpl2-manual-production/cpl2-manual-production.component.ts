import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Constants } from '../../../../Constants';
import { Cpl2ManualProductionService } from '../../../services/transactions/cpl2-manual-production.service';
import { Batch, Unit } from '../../../models/models';
import { Observable } from 'rxjs';
import { FormulaService } from '../../../services/transactions/formula.service';



@Component({
  selector: 'app-cpl2-manual-production',
  templateUrl: './cpl2-manual-production.component.html',
  styleUrls: ['./cpl2-manual-production.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class Cpl2ManualProductionComponent implements OnInit {
  constructor(
    private constants: Constants,
    private cpl2ManualProductionService: Cpl2ManualProductionService,
    private routerLinkActive: ActivatedRoute,
    private formulaService: FormulaService
  ) { }

  isParting = false;
  isUnload = false;
  tableHeaders = ['Coli ID',
  'O/P Width',
  'O/P Wgt',
  'O/P Len',
  'O/P IDM', 'O/P ODM', 'St Date', 'St Time', 'End Date', 'End Time', 'Oiling', 'Oil Amt', 'Remarks', 'ID Coil'];

  units: Unit[];
  batches = [];
  data = [1, 2];
  currentScreenId: number;
  currentBatch: Batch = new Batch();
  steelDensity: number;

  showJumboSection = false;
  showPartingSection = false;

  topSelectorForm =  new FormGroup({
    batchselector: new FormControl(''),
    unitselector: new FormControl('')
  });

  topFieldForm = new FormGroup({
      batchselector: new FormControl(''),
      scheduleno: new FormControl({value: ''}),
      ipweight: new FormControl({value: ''}),
      ipwidth: new FormControl({value: ''}),
      status: new FormControl({value: ''}),
  });
  jumboForm = new FormGroup({
    jumboRadioBtn : new FormControl('')
  });
  partingForm = new FormGroup({
    partingRadioBtn: new FormControl(''),
    unloadingid: new FormControl(''),
    unloadweight: new FormControl(''),
    unloadLength: new FormControl(''),
    unloadodm: new FormControl(''),
    unloadRadioBtn: new FormControl()
  });
  

  
disableTopFieldForm() {
  this.topFieldForm.get('scheduleno').disable();
  this.topFieldForm.get('ipweight').disable();
  // this.topFieldForm.get('ipwidth').disable();
  this.topFieldForm.get('status').disable();
}

disablePartingForm() {
  this.partingForm.get('partingRadioBtn').setValue(false);
  this.partingForm.get('unloadRadioBtn').setValue(false);
}
  ngOnInit() {
    //this.disableTopFieldForm();
    this.disablePartingForm();
    this.unloadChanged();
    this.jumboForm.get('jumboRadioBtn').setValue(false);
    this.routerLinkActive.params.subscribe(param => {
        this.currentScreenId = param['screenid'];
        this.getUnits();
    });
  }

  getUnits() {
    this.cpl2ManualProductionService.getUnits().subscribe(
      response => {
        this.units = response.dataList;
        this.steelDensity = response.steelDensity;
        this.topFieldForm.reset();
      },
      error => {
        console.error(error);
      }
    );
  }


  getBatches() {
    const subunitid = this.topSelectorForm.get('unitselector').value;
    this.topFieldForm.reset();
    this.topSelectorForm.get('batchselector').reset();
    this.cpl2ManualProductionService.getBatches(subunitid, this.currentScreenId).subscribe(
      response => {
        this.batches = response;
      },
      error => {
        console.error(error);
      }
    );

    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].subUnitId === subunitid
        && this.units[i].isParting === 1
        && this.units[i].isClubbing === 1 ) {
          this.showJumboSection = true;
          this.showPartingSection = true;
          break;
      } else if (this.units[i].subUnitId === subunitid && this.units[i].isClubbing === 1 ) {
        this.showJumboSection = true;
        this.showPartingSection = false;
        break;
      } else if (this.units[i].subUnitId === subunitid && this.units[i].isParting === 1) {
        this.showJumboSection = false;
        this.showPartingSection = true;
        break;
      } else {
        this.showJumboSection = false;
        this.showPartingSection = false;
      }
    }
  }

  unloadChanged() {
    if (this.partingForm.get('unloadRadioBtn').value) {
      this.partingForm.get('unloadodm').enable();
      this.partingForm.get('unloadweight').enable();
      this.partingForm.get('unloadingid').enable();
      this.partingForm.get('unloadLength').enable();
      this.partingForm.get('unloadingid').setValue(Math.round((Math.random() * 10000000000)));
    } else {
      this.partingForm.get('unloadodm').disable();
      this.partingForm.get('unloadingid').disable();
      this.partingForm.get('unloadweight').disable();
      this.partingForm.get('unloadLength').disable();
      this.partingForm.get('unloadodm').reset();
      this.partingForm.get('unloadingid').reset();
      this.partingForm.get('unloadweight').reset();
      this.partingForm.get('unloadLength').reset();
    }
  }

  selectBatch(bref) {
    this.currentBatch =  new Batch();
    this.topFieldForm.reset();
    for (let i = 0; i < this.batches.length; i++) {
        if (this.batches[i].batchId === bref.selected.value) {
          this.currentBatch = this.batches[i];
          this.topFieldForm.controls.ipwidth.setValue(this.currentBatch.width);
          this.topFieldForm.controls.ipweight.setValue(this.currentBatch.netWeight);
          this.topFieldForm.controls.status.setValue(this.currentBatch.statusName);
          this.topFieldForm.controls.scheduleno.setValue(this.currentBatch.scheduleNo);
      }
    }
  }

  getUnloadingLength() {
    const ipwidth =  this.topFieldForm.controls.ipwidth.value;
    const ipWeight = this.partingForm.controls.unloadweight.value;
    const result = this.formulaService.calculateLength(ipwidth, this.currentBatch.thickness, ipWeight, this.steelDensity);
    this.partingForm.controls.unloadLength.setValue(result);
  }
}
