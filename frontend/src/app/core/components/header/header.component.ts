import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HeaderComponent {
  title = 'Issue Radar';
  @Input() lang: 'zh' | 'en' = 'zh';
  @Output() langChange = new EventEmitter<'zh' | 'en'>();

  setLang(lang: 'zh' | 'en') {
    this.langChange.emit(lang);
  }
}