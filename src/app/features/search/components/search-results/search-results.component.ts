import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Issue } from '../../../../core/models/issue.model';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { IssueCardComponent } from '../issue-card/issue-card.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    IssueCardComponent
  ]
})
export class SearchResultsComponent implements OnChanges {
  @Input() issues: Issue[] = [];
  
  displayedIssues: Issue[] = [];
  
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['issues']) {
      this.pageIndex = 0;
      this.updateDisplayedIssues();
    }
  }
  
  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateDisplayedIssues();
  }
  
  private updateDisplayedIssues(): void {
    const start = this.pageIndex * this.pageSize;
    this.displayedIssues = this.issues.slice(start, start + this.pageSize);
  }
}