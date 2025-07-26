import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations'
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger("animateMenu", [
            transition(":enter", [
                query("*", [
                    style({ opacity: 0, transform: "translateY(-50%)" }),
                    stagger(50, [
                        animate("250ms cubic-bezier(0.35, 0, 0.25, 1)", style({ opacity: 1, transform: "none" }))
                    ])
                ])
            ])
        ])
    ],
    standalone: false
})



export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) 

  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  languageFormControl: UntypedFormControl= new UntypedFormControl();
  cvName: string = "";

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {

    this.languageFormControl.valueChanges.subscribe(val => this.languageService.changeLanguage(val))

    this.languageFormControl.setValue(this.languageService.language)

  }

  scroll(el) {
    if(document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigate(['/home']).then(()=> document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible=false;
  }
  
  setTextAlign(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "direction:rtl;text-align: right;font-family: 'Persian'; font-size: 22px;";
    else
      return "";
  }
  setMenuButtonClass(menu: string, beginScroll: number, endScroll: number)
  {
    if(menu == 'click_about')
      var g = 0;
    if(/*(this.analyticsService.CurrentMenue == menu && window.pageYOffset != 0) || */( window.pageYOffset > beginScroll && window.pageYOffset < endScroll))
      return "main-btn cv-btn";
    else return "";
  }
  setTextAlign1(text: string)
  {    
    var p = /[\u0600-\u06FF]/;
    if (p.test(text))
      return "direction:rtl;text-align: right;font-family: 'Persian'; font-size: 22px;margin-right: 50px;";
    else
      return "margin-right: 50px;";
  }

  downloadCV(){
    // this.languageService.translateService.get("Header.cvName").subscribe(val => {
    //   this.cvName = val
    //   console.log(val)
    //   // app url
    //   let url = window.location.href;

    //   // Open a new window with the CV
    //   window.open(url + "/../assets/cv/" + this.cvName, "_blank");
    // })

      console.log("Scroll Event", window.pageYOffset );
  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event) {
        this.pageYPosition=window.pageYOffset
    }

    changeLanguage(language: string) {
      this.languageFormControl.setValue(language);
    }
}
