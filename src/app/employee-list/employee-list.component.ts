import { Component , OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';





@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatTableModule,MatSortModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent  implements OnInit {
  displayedColumns: string[] = [
    'id',
    'age',
    'email',
    'salary',
    'address',
    'imageUrl',
    'lastName',
    'firstName',
    'contactNumber'
  ]; 
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: EmployeeService,private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      this.sortData(sortState);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      this.loadData();

    }
  }

  private sortData(sortState: Sort): void {
    // Get the data array from the current dataSource
    const currentData = this.dataSource.data.slice();
  
    // Perform sorting based on sort state
    currentData.sort((a, b) => {
      const isAsc = sortState.direction === 'asc';
      const valueA = a[sortState.active];
      const valueB = b[sortState.active];
  
      // Add your custom comparison logic here
      // This example assumes the values are strings, modify as needed
      return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
    });
  
    // Update the dataSource with the sorted data
    this.dataSource.data = currentData;
  }
}