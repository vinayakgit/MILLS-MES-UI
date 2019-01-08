import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
// import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../authServices/auth.service';
import {Router} from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import {MatTableDataSource, MatSnackBar, MatPaginator, MatSort, Sort} from '@angular/material';
import { Observable } from 'rxjs';
import { CustomPaginationDataSource } from '../CustomPaginationDataSource';
import { tap } from 'rxjs/operators';


export class Person {
  pkId: number;
  userName: string;
  empCode: string;
  contact: string;
  constructor(fnm: string, emp: string, contact: string, id: number) {
    this.pkId = id;
    this.userName = fnm;
    this.empCode = emp;
    this.contact = contact;
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  events: string[] = [];
  opened: boolean;

  person: Person = { userName: '', empCode: '', contact: '', pkId: 0 };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['isEdited', 'userName', 'empCode', 'contactNo', 'userEmailId'];
  dataSource: CustomPaginationDataSource;

  editedUserDetails = [];

  isEdited = false;

  constructor(private service: AuthService, private snakbar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new CustomPaginationDataSource(this.service, this.paginator);
    this.dataSource.loadUsers('', '', 'asc', this.paginator.pageIndex, this.paginator.pageSize);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0 );
    this.paginator.page.pipe(
      tap(() => {
        this.loadUsersPage();
      })
    ).subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
      '',
      'userName',
      '',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onSubmit (fm: FormData) {
    this.service.saveData(this.person).subscribe(
      data => {
        this.loadUsersPage();
        this.snakbar.open('Successfully saved', 'OK', {
          duration: 3000
        });
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  getData() {
    this.loadUsersPage();
  }

  changedData(elem) {
    let isRecordExist: boolean = false;
    this.editedUserDetails.forEach((el, index) => {
      if (el.appUserID === elem.appUserID) {
        this.editedUserDetails[index] = elem;
        isRecordExist = true;
      }
    });
    if (!isRecordExist) {
      this.editedUserDetails.push(elem);
    }
  }

  sortData(sort: Sort) {
    this.dataSource.loadUsers(
      '',
      sort.active,
      sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  updateData() {
    let persons: Array<Person> = [];
    this.editedUserDetails.forEach(a => {
      persons.push(new Person(a.userName, a.empCode, a.contact, a.appUserID));
    });
    this.service.update(persons).subscribe(data => {
      this.snakbar.open('Successfully saved', 'OK', {
        duration: 3000
      });
    });
  }
}




