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
  searchResults: Issue[] = [];
  isLoading = false;
  errorMessage = '';

  lang: 'zh' | 'en' = 'en';

  constructor(private searchService: SearchService) {}

  setLang(lang: 'zh' | 'en') {
    this.lang = lang;
  }

  onSearch(searchParams: any): void {
    console.log('searchParams', searchParams);
    this.isLoading = true;
    this.errorMessage = '';
    
    this.searchService.searchIssues(searchParams)
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = this.lang === 'zh' ? '搜尋時發生錯誤，請稍後再試。' : 'An error occurred while searching. Please try again.';
          this.isLoading = false;
          console.error('Search error:', error);
        }
      });
  }
}