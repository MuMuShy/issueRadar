import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AIService } from '../../../../core/services/ai.service';

@Component({
  selector: 'app-tag-recommendation',
  templateUrl: './tag-recommendation.component.html',
  styleUrls: ['./tag-recommendation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class TagRecommendationComponent implements OnInit {
  descriptionForm!: FormGroup;
  recommendedTags: string[] = [];
  isLoading = false;
  @Output() searchParamsGenerated = new EventEmitter<{query: string, labels: string[], language: string}>();
  lastQuery: string = '';
  lastLanguage: string = '';
  selectedTags: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private aiService: AIService
  ) {}
  
  ngOnInit(): void {
    this.createForm();
  }
  
  onSubmit(): void {
    const description = this.descriptionForm.get('description')?.value;
    if (description && description.length > 10) {
      this.isLoading = true;
      this.aiService.searchIssuesByNL(description).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res && res.query) {
            this.recommendedTags = Array.isArray(res.labels) ? res.labels : (res.labels ? [res.labels] : []);
            this.lastQuery = res.query;
            this.lastLanguage = res.language;
            this.searchParamsGenerated.emit({query: res.query, labels: this.recommendedTags, language: res.language});
          } else {
            this.recommendedTags = [];
            this.lastQuery = '';
            this.lastLanguage = '';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.recommendedTags = [];
          this.lastQuery = '';
          this.lastLanguage = '';
        }
      });
    } else {
      this.recommendedTags = [];
      this.lastQuery = '';
      this.lastLanguage = '';
    }
  }
  
  createForm(): void {
    this.descriptionForm = this.fb.group({
      description: ['']
    });
  }

  onEnter(event: any): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!(keyboardEvent.ctrlKey || keyboardEvent.metaKey)) {
      keyboardEvent.preventDefault();
      this.onSubmit();
    }
    // ctrl+enter 或 cmd+enter 則不送出，保留換行
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  toggleTag(tag: string): void {
    if (this.isTagSelected(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags = [...this.selectedTags, tag];
    }
    // 你可以在這裡 emit 或同步到搜尋表單
  }
}