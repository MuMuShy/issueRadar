import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagRecommendationService {
  // In a real application, this would call an AI service
  // For now, we'll simulate recommendations based on interests
  recommendTags(interests: string[]): Observable<string[]> {
    const recommendations: Record<string, string[]> = {
      'frontend': ['ui', 'css', 'design', 'accessibility', 'responsive', 'mobile'],
      'backend': ['api', 'database', 'performance', 'security', 'caching'],
      'mobile': ['ios', 'android', 'react-native', 'flutter', 'mobile-responsive'],
      'devops': ['ci', 'deployment', 'docker', 'kubernetes', 'infrastructure'],
      'security': ['vulnerability', 'authentication', 'encryption', 'authorization'],
      'databases': ['sql', 'nosql', 'migration', 'data-model', 'query-optimization'],
      'learning': ['good-first-issue', 'documentation', 'beginner-friendly', 'help-wanted'],
      'performance': ['optimization', 'memory-leak', 'bottleneck', 'profiling'],
      'testing': ['unit-test', 'integration', 'qa', 'test-coverage']
    };

    let result: string[] = [];

    // Get recommendations based on provided interests
    interests.forEach(interest => {
      const lowerInterest = interest.toLowerCase();
      for (const key in recommendations) {
        if (lowerInterest.includes(key) || key.includes(lowerInterest)) {
          result = [...result, ...recommendations[key]];
        }
      }
    });

    // If no matches found, return some general recommendations
    if (result.length === 0) {
      result = ['good-first-issue', 'help-wanted', 'bug', 'enhancement', 'documentation'];
    }

    // Remove duplicates and limit to 10
    return of([...new Set(result)].slice(0, 10));
  }

  getSuggestedInterests(): Observable<string[]> {
    // Predefined list of common development interests
    return of([
      'Frontend', 
      'Backend', 
      'Mobile',
      'DevOps', 
      'Security', 
      'Databases',
      'Learning', 
      'Performance',
      'Testing'
    ]);
  }
}