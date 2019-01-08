import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

export class CustomPaginationDataSource implements DataSource<any> {

  private paginationSubject = new BehaviorSubject<any[]>([]);


  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.paginationSubject.asObservable();
  }

  constructor(private service: any, private paginator: MatPaginator) {}

  disconnect(collectionViewer: CollectionViewer): void {
    this.paginationSubject.complete();
  }

  loadUsers(filter: string = '', sortBy: string, sortDirection: string = 'asc', pageIndex: number= 0, pageSize: number = 5) {
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
      //catchError(() => of[] )
      //finalize(() => this.lessonSubject.next(false))
    ).subscribe(response => {
        this.paginator.length = response.totalCount;
        this.paginationSubject.next(response.data);
      }
    );
  }
  //isLoading=true;
  loadLookups(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
    // console.log(JSON.stringify(filter));
  //  alert(isLoading);
     this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
    
     ).subscribe(response => {
        this.paginator.length = response.totalCount;
         for(let i=0; i<response.data.length;i++){
           response.data[i].isChecked = response.data[i].lookupStatus == 1 ? true : false;
          
         }         
         this.paginationSubject.next(response.data);
        // this.isLoading = false;       
 
       }
     );
   }

   loadLocations(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
     this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
    
     ).subscribe(response => {
        this.paginator.length = response.totalCount;
         for(let i=0; i<response.data.length;i++){
           response.data[i].isChecked = response.data[i].status == 1 ? true : false;
          
         }         
         this.paginationSubject.next(response.data);
 
       }
     );
   }


   loadOilings(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
   
    ).subscribe(response => {
       this.paginator.length = response.totalCount;
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].isChecked = response.data[i].status == 1 ? true : false;
        }         
        this.paginationSubject.next(response.data);
       // console.log(JSON.stringify(response.data));
      }
    );
  }
 
  loadPlants(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
   
    ).subscribe(response => {
       this.paginator.length = response.totalCount;
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].isChecked = response.data[i].recordStatus == 1 ? true : false;
         
        }         
        this.paginationSubject.next(response.data);
        console.log(JSON.stringify(response.data));
      }
    );
  }

  loadChars(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
   
    ).subscribe(response => {
       this.paginator.length = response.totalCount;
        for(let i=0; i<response.data.length;i++){
          response.data[i].isChecked = response.data[i].recordStatus == 1 ? true : false;
         
        }         
        this.paginationSubject.next(response.data);
      }
    );
  }

  loadDefects(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
   
    ).subscribe(response => {
       this.paginator.length = response.totalCount;
        for(let i=0; i<response.data.length;i++){
          response.data[i].isChecked = response.data[i].recordStatus == 1 ? true : false;
         
        }         
        this.paginationSubject.next(response.data);
      }
    );
  }

  loadPackings(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
   
    ).subscribe(response => {
       this.paginator.length = response.totalCount;
        for(let i=0; i<response.data.length;i++){
          response.data[i].isChecked = response.data[i].recordStatus == 1 ? true : false;
         
        }         
        this.paginationSubject.next(response.data);
      }
    );
  }


  loadUnits(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 5) {
  
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
   
    ).subscribe(response => {
       this.paginator.length = response.totalCount;
        for(let i=0; i<response.data.length;i++){
          response.data[i].isChecked = response.data[i].recordStatus == 1 ? true : false;
         
        }         
        this.paginationSubject.next(response.data);
      }
    );
  }
   
  loadGrades(filter: string, sortBy: string, sortDirection: string = 'desc', pageIndex: number= 0, pageSize: number = 1) {
    this.service.getData(filter, sortBy, sortDirection, pageIndex, pageSize).pipe(
    ).subscribe(response => {
      //console.log(JSON.stringify(response));
      this.paginationSubject.next(response);
      }
    );
  }



}
