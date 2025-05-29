import { Component, Input } from '@angular/core';
import { Issue } from '../../../../core/models/issue.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class IssueCardComponent {
  @Input() issue!: Issue;
  
  showFullDescription = false;
  
  get issueDescription(): string {
    if (!this.issue.body) {
      return 'No description provided';
    }
    
    const maxLength = 160;
    const description = this.issue.body.replace(/\r?\n|\r/g, ' ').trim();
    
    if (!this.showFullDescription && description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    
    return description;
  }
  
  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
  
  openIssue(): void {
    window.open(this.issue.url, '_blank');
  }
}