import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
    standalone: false
})
export class JobsComponent implements OnInit, AfterViewInit {

  active = 0

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  setTextAlign(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "direction:rtl;text-align: right;font-family:'Persian'";
    else
      return "";
  }
  setTextAlign1(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "direction:rtl;text-align: right;margin-right:150px;font-family:'Persian'";
    else
      return "margin-left:50px";
  }
  setTitleClass(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "section-job-title-ir";
    else
      return "e-font section-title-en";
  }
  setTextAlign2(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "direction:rtl;text-align: right;font-size:20px;font-family:'Persian'";
    else
      return "";
  }
  jobDescriptionClass(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "job-description-persian";
    else
      return "job-description-en";
  }
  private initAnimations(): void {
    const jobsSection = this.elementRef.nativeElement;

    // Animar título
    const title = jobsSection.querySelector('.about-title');
    if (title) {
      this.animationsService.observeElement(title, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    // Animar contenedor de tabs
    const tabsContainer = jobsSection.querySelector('.jobs-tabs');
    if (tabsContainer) {
      this.animationsService.observeElement(tabsContainer as HTMLElement, {
        type: 'fadeInUp',
        duration: 1200,
        delay: 300
      });
    }

    // Animar tabs individuales
    const tabs = jobsSection.querySelectorAll('li[ngbNavItem]');
    tabs.forEach((tab: HTMLElement, index: number) => {
      this.animationsService.observeElement(tab, {
        type: 'scaleIn',
        delay: 600 + (index * 150)
      });

      // Añadir efectos hover
      this.animationsService.addHoverEffects(tab, ['lift']);
    });

    // Animar contenido de trabajos (con delay para que aparezcan después de hacer click)
    setTimeout(() => {
      const jobDescriptions = jobsSection.querySelectorAll('.job-description');
      jobDescriptions.forEach((desc: HTMLElement, index: number) => {
        this.animationsService.observeElement(desc, {
          type: 'fadeInLeft',
          delay: index * 200
        });
      });
    }, 1000);
  }
}
