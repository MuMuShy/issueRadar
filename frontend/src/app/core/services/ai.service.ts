import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = environment.apiUrl + '/api/nl_search/';
  private analyzeApiUrl = environment.apiUrl + '/api/analyze-issue';

  constructor(private http: HttpClient) {}

  /**
   * 用自然語言描述搜尋 GitHub issue
   * @param description 使用者輸入的描述
   */
  searchIssuesByNL(description: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { description });
  }

  /**
   * 針對單一 issue 進行 AI 分析
   * @param title issue 標題
   * @param body issue 內容
   */
  analyzeIssue(title: string, body: string): Observable<{ suggestion: string }> {
    return this.http.post<{ suggestion: string }>(this.analyzeApiUrl, { title, body });
  }
}