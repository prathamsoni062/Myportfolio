import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<T> implements OnInit, OnChanges {
  @Input() data: T[] = []; // Table data
  @Input() columns: string[] = []; // Column names
  @Input() actionsEnabled = true; // Enable/Disable Actions column

  @Output() edit = new EventEmitter<T>(); // Emits selected row for editing
  @Output() delete = new EventEmitter<T>(); // Emits selected row for editing

  dataSource!: MatTableDataSource<T>; 
  displayedColumns: string[] = [];
  totalRecords = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<T>([]);
  }

  ngOnInit(): void {
    this.displayedColumns = [...this.columns]; 
    if (this.actionsEnabled) {
      this.displayedColumns.push('Actions'); // Add action column dynamically
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.updateTableData(changes['data'].currentValue);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateTableData(data: T[]): void {
    this.dataSource.data = data;
    this.totalRecords = data.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(row: any) {
    this.edit.emit(row); // Emit row data for editing
  }
  
  deleteRow(row: any) {
    this.delete.emit(row); // Emit row data for editing
    // console.log("Delete:", row);
    // alert(`Deleting row: ${JSON.stringify(row)}`);
  }

  formatHeader(column: string): string {
    return column.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize words
  }
}
