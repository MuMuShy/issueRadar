import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly githubApiUrl = 'https://api.github.com/search/issues';

  constructor(private http: HttpClient) {}

  searchIssues(searchParams: {
    query: string,
    language?: string,
    labels?: string[],
    page?: number,
    perPage?: number
  }): Observable<Issue[]> {
    let params = new HttpParams();
    
    // Build the query string
    let queryParts: string[] = [searchParams.query];
    
    if (searchParams.language) {
      queryParts.push(`language:${searchParams.language}`);
    }
    
    if (searchParams.labels && searchParams.labels.length > 0) {
      searchParams.labels.forEach(label => {
        queryParts.push(`label:${label}`);
      });
    }
    
    // Always search for open issues
    queryParts.push('is:issue');
    queryParts.push('is:open');
    
    params = params.set('q', queryParts.join(' '));
    
    // Pagination
    params = params.set('page', searchParams.page || 1);
    params = params.set('per_page', searchParams.perPage || 30);
    
    return this.http.get<any>(this.githubApiUrl, { params }).pipe(
      map(response => this.mapResponseToIssues(response)),
      catchError(error => {
        console.error('Error searching GitHub issues:', error);
        return throwError(() => new Error('Failed to search GitHub issues'));
      })
    );
  }

  private mapResponseToIssues(response: any): Issue[] {
    if (!response || !response.items) {
      return [];
    }

    return response.items.map((item: any): Issue => {
      const repoUrl = item.repository_url;
      const repoName = repoUrl ? repoUrl.split('/').slice(-2).join('/') : 'Unknown';
      
      return {
        id: item.id,
        title: item.title,
        number: item.number,
        body: item.body,
        repository: repoName,
        url: item.html_url,
        labels: item.labels ? item.labels.map((l: any) => ({ name: l.name, color: l.color })) : [],
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
        state: item.state,
        author: {
          login: item.user?.login || 'Anonymous',
          avatarUrl: item.user?.avatar_url || ''
        }
      };
    });
  }

  getPopularLanguages(): Observable<string[]> {
    // This would ideally come from an API, but for demo purposes we'll use static data
    return of([
      'JavaScript', 
      'TypeScript', 
      'Python', 
      'Java', 
      'Go', 
      'Rust', 
      'C#', 
      'C++', 
      'PHP',
      'Ruby'
    ]);
  }

  getPopularLabels(): Observable<string[]> {
    // This would ideally come from an API, but for demo purposes we'll use static data
    return of([
      'bug', 
      'enhancement', 
      'feature', 
      'documentation', 
      'help wanted', 
      'good first issue',
      'question',
      'security',
      'performance'
    ]);
  }
}