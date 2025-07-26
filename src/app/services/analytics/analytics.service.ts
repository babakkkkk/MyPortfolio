import { HostListener, Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
public CurrentMenue = '';
  constructor(
    private $gaService: GoogleAnalyticsService
  ) { }

  sendAnalyticEvent(action: string, category: string, label){
    this.CurrentMenue = action;
    this.$gaService.event(action, category, label)
  }

  sendAnalyticPageView(path: string, title: string){
    this.$gaService.pageView(path, title)
  }

}
