import { Component, OnInit } from '@angular/core';
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
  
  constructor(
    private fb: FormBuilder,
    private aiService: AIService
  ) {}
  
  ngOnInit(): void {
    this.createForm();
    
    this.descriptionForm.get('description')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(async description => {
      if (description && description.length > 10) {
        this.isLoading = true;
        try {
          this.recommendedTags = await this.aiService.getRecommendedLabels(description);
        } catch (error) {
          console.error('Error getting recommendations:', error);
          this.recommendedTags = [];
        } finally {
          this.isLoading = false;
        }
      } else {
        this.recommendedTags = [];
      }
    });
  }
  
  createForm(): void {
    this.descriptionForm = this.fb.group({
      description: ['']
    });
  }
}