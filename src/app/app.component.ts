import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './core/services/search.service';
import { Issue } from './core/models/issue.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SearchFormComponent } from './features/search/components/search-form/search-form.component';
import { SearchResultsComponent } from './features/search/components/search-results/search-results.component';
import { TagRecommendationComponent } from './features/tags/components/tag-recommendation/tag-recommendation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    SearchResultsComponent,
    TagRecommendationComponent
  ]
})
export class AppComponent {
  title = 'GitHub Issue Search';
  searchResults: Issue[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private searchService: SearchService) {}

  onSearch(searchParams: any): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.searchService.searchIssues(searchParams)
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while searching. Please try again.';
          this.isLoading = false;
          console.error('Search error:', error);
        }
      });
  }
}