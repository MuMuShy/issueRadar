import { Component, Input } from '@angular/core';
import { Issue } from '../../../../core/models/issue.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AIService } from '../../../../core/services/ai.service';

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
  
  // AI 分析相關
  analyzing = false;
  aiSuggestion: string | null = null;
  aiError: string | null = null;

  constructor(private aiService: AIService) {}

  get aiSuggestionLines(): string[] {
    if (!this.aiSuggestion) return [];
    // 分行，去除前綴符號（如 -、*、數字. 等）
    return this.aiSuggestion
      .split('\n')
      .map(line => line.trim().replace(/^[-*\d.\s]+/, ''))
      .filter(line => line.length > 0);
  }

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

  analyzeIssue(event: MouseEvent): void {
    event.stopPropagation();
    if (this.analyzing) return;
    this.analyzing = true;
    this.aiSuggestion = null;
    this.aiError = null;
    this.aiService.analyzeIssue(this.issue.title, this.issue.body || '').subscribe({
      next: (res) => {
        this.aiSuggestion = res.suggestion;
        this.analyzing = false;
      },
      error: (err) => {
        this.aiError = 'AI 分析失敗，請稍後再試';
        this.analyzing = false;
      }
    });
  }

  forkRepo(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.issue.repository) return;
    const url = `https://github.com/${this.issue.repository}/fork`;
    window.open(url, '_blank');
  }
}