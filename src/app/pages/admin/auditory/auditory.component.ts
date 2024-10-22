import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuditoryService } from './service/auditory.service';
import { Audit, AuditData, AuditDataSearch } from './interface/audit.model';
import { UsersService } from '../users/service/users.service';
import { User, UserData } from '../users/interface/users.module';

@Component({
  selector: 'app-auditory',
  templateUrl: './auditory.component.html',
  styleUrls: ['./auditory.component.scss']
})
export class AuditoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'entity', 'username', 'operation', 'httpStatusCode', 'dateTime'];
  dataSource = new MatTableDataSource<Audit>();
  currentPage = 0;
  pageSize = 8;
  totalElements = 0;
  auditsData: Audit[] = [];
  usersData: User[] = [];
  totalUsers = 0;
  // Variables para los filtros
  startDate?: Date;
  endDate?: Date;
  selectedEntity: string = '';
  selectedOperation: string = '';
  selectedUser: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private auditoryService: AuditoryService,
    public userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.loadAudit();
    this.loadUsers();
  }

  loadAudit(page: number = this.currentPage, size: number = this.pageSize): void {
    this.auditoryService.getAudit(page, size).subscribe((response: AuditData) => {
      this.auditsData = response.data.content;
      this.totalElements = response.data.totalElements;
      this.dataSource.data = this.auditsData;
    });
  }

  applyFilters(): void {
    this.auditoryService.getAuditWithFilters(
      this.currentPage,
      this.pageSize,
      this.startDate,
      this.endDate,
      this.selectedEntity,
      this.selectedOperation,
      this.selectedUser
    ).subscribe((response: AuditDataSearch) => {
      this.auditsData = response.content;
      this.totalElements = response.totalElements;
      this.dataSource.data = this.auditsData;
    });
  }

  handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();  }

  loadUsers(page: number = this.currentPage, size: number = this.pageSize): void {
    this.userService.getData(page, size).subscribe((response: UserData) => {
      this.usersData = response.data.content;
      this.totalUsers = response.data.totalElements;
    });
  }
}
