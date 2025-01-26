import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<T> implements OnInit, OnChanges {
  @Input() data: T[] = []; // Input for data
  @Input() columns: string[] = []; // Input for column names

  dataSource!: MatTableDataSource<T>; // Initialize later
  displayedColumns: string[] = [];
  totalRecords = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<T>([]);
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns;
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
}
