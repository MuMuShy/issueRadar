import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../../../core/services/search.service';
import { SearchParams } from '../../../../core/models/issue.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SearchFormComponent implements OnInit {
  @Output() search = new EventEmitter<SearchParams>();
  
  searchForm!: FormGroup;
  languages: string[] = [];
  availableLabels: string[] = [];
  isLoadingOptions = false;
  
  constructor(
    private fb: FormBuilder, 
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadFilterOptions();
    
    this.searchForm.get('query')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.searchForm.get('query')?.value && this.searchForm.valid) {
          this.onSubmit();
        }
      });
  }

  createForm(): void {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(2)]],
      language: [''],
      labels: [[]]
    });
  }

  loadFilterOptions(): void {
    this.isLoadingOptions = true;
    
    this.searchService.getPopularLanguages().subscribe(languages => {
      this.languages = languages;
      this.isLoadingOptions = false;
    });
    
    this.searchService.getPopularLabels().subscribe(labels => {
      this.availableLabels = labels;
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    
    const searchParams: SearchParams = {
      query: this.searchForm.value.query,
      language: this.searchForm.value.language,
      labels: this.searchForm.value.labels
    };
    
    this.search.emit(searchParams);
  }

  clearForm(): void {
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
  }
}