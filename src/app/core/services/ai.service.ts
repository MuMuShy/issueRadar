import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private openai = new OpenAI({
    apiKey: 'your-api-key', // Replace with your actual API key
    dangerouslyAllowBrowser: true
  });

  constructor() {}

  async getRecommendedLabels(description: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that recommends GitHub issue labels based on natural language descriptions. Provide relevant, commonly used GitHub labels."
          },
          {
            role: "user",
            content: `Suggest GitHub issue labels for the following description: ${description}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      const response = completion.choices[0]?.message?.content || '';
      return this.parseLabels(response);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      return [];
    }
  }

  private parseLabels(response: string): string[] {
    // Split response into individual labels and clean them up
    return response
      .split(/[,\n]/)
      .map(label => label.trim().toLowerCase())
      .filter(label => label)
      .map(label => label.replace(/['"]/g, ''))
      .filter(label => label.length > 0);
  }
}