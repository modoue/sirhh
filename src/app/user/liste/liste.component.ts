import { DataSource } from '@angular/cdk/collections';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { UserService } from 'app/service/user.service';
import { userInfo } from 'os';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { IUser, User } from '../user.model';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations

})
export class ListeComponent implements OnInit {
  dataSource: IUser[];
  displayedColumns = ['id','ref', 'firstname','lastname', 'email','username','action'];
  @Input() miseajour:boolean

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild('filter', {static: true})
  filter: ElementRef;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;
  user=new User()
  // Private
  private _unsubscribeAll: Subject<any>;
  dialogRef: any;
  //confirmDialogRef: MatDialogRef<CreateComponent>;

  /**
   * Constructor
   *
   * @param {PpmService} _ppmService
   */
  constructor(
      private _userService: UserService,
      public _matDialog: MatDialog
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {

     this.loadUser()
     
     this.user.username="modou"
     this._userService.createUser({"username":"maam"}).subscribe(
         data=>{
             console.log("user")
         },err=>{
             console.log(err)
         }
     )
  }

  loadUser(){
    this._userService.getUser().subscribe(
      (data:any)=>{
        this.dataSource=data.body
       console.log(this.dataSource)
 
      },err=>{
        console.log(err)
      },
      ()=>{
         this.dataSource.forEach(element => {
              
          });
      
      }
      
      )
    }
   
  }

  export class FilesDataSource extends DataSource<any>
  {
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');
  
    /**
     * Constructor
     *
     * @param {PpmService _ppmsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _userService: UserService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort,
        public _matDialog: MatDialog
    )
    {
        super();
  
       // this.filteredData = this._ppmService.orders;
    }
  
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
  
    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }
  
    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }
  
    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }
  
    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }
  
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._userService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];
  
        return merge(displayDataChanges).pipe(map(() => {
         
                let data = this._userService.orders.slice();
  
                data = this.filterData(data);
  
                this.filteredData = [...data];
  
                data = this.sortData(data);
  
                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );
  
    }
  
    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }
  
    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }
  
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
  
            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'reference':
                    [propertyA, propertyB] = [a.reference, b.reference];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [a.customer.firstName, b.customer.firstName];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total, b.total];
                    break;
                case 'payment':
                    [propertyA, propertyB] = [a.payment.method, b.payment.method];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status[0].name, b.status[0].name];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
            }
  
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }
  
    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
       
  }
  

     

