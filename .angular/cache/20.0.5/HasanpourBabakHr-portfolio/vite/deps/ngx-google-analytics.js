import {
  NavigationEnd,
  Router
} from "./chunk-DXIQ5EHS.js";
import "./chunk-NYUHSDYX.js";
import "./chunk-32QJK7EJ.js";
import "./chunk-VG4ST33D.js";
import {
  CommonModule,
  isPlatformBrowser
} from "./chunk-ZKDRZ5MD.js";
import "./chunk-5KK3G4LL.js";
import {
  APP_BOOTSTRAP_LISTENER,
  APP_INITIALIZER,
  DOCUMENT,
  Directive,
  ElementRef,
  Host,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  PLATFORM_ID,
  inject,
  isDevMode,
  skip,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-BNWR4UDY.js";
import {
  filter,
  fromEvent
} from "./chunk-QPFOVOFK.js";
import "./chunk-WDMUDEB6.js";

// node_modules/tslib/tslib.es6.mjs
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

// node_modules/ngx-google-analytics/fesm2015/ngx-google-analytics.js
var GaEventCategoryDirective = class {
  constructor() {
  }
};
GaEventCategoryDirective.decorators = [
  { type: Directive, args: [{
    selector: `[gaEvent][gaCategory],
             [gaCategory]`,
    exportAs: "gaCategory"
  }] }
];
GaEventCategoryDirective.ctorParameters = () => [];
GaEventCategoryDirective.propDecorators = {
  gaCategory: [{ type: Input }]
};
var NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN = new InjectionToken("ngx-google-analytics-settings", {
  factory: () => ({ trackingCode: "", enableTracing: false })
});
function getWindow(platformId) {
  return isPlatformBrowser(platformId) ? window : null;
}
var NGX_WINDOW = new InjectionToken("ngx-window", {
  providedIn: "root",
  factory: () => getWindow(inject(PLATFORM_ID))
});
function getDataLayerFn(window2) {
  return window2 ? window2["dataLayer"] = window2["dataLayer"] || [] : null;
}
var NGX_DATA_LAYER = new InjectionToken("ngx-data-layer", {
  providedIn: "root",
  factory: () => getDataLayerFn(inject(NGX_WINDOW))
});
function getGtagFn(window2, dataLayer) {
  return window2 ? window2["gtag"] = window2["gtag"] || function() {
    dataLayer.push(arguments);
  } : null;
}
var NGX_GTAG_FN = new InjectionToken("ngx-gtag-fn", {
  providedIn: "root",
  factory: () => getGtagFn(inject(NGX_WINDOW), inject(NGX_DATA_LAYER))
});
var GoogleAnalyticsService = class {
  constructor(settings, _document, _gtag) {
    this.settings = settings;
    this._document = _document;
    this._gtag = _gtag;
  }
  get document() {
    return this._document;
  }
  throw(err) {
    if ((this.settings.enableTracing || isDevMode()) && console && console.error) {
      console.error(err);
    }
  }
  /** @todo Change this to `Object.fromEntity()` in the future... */
  toKeyValue(map) {
    return map.size > 0 ? Array.from(map).reduce((obj, [key, value]) => Object.defineProperty(obj, key, { value, enumerable: true }), {}) : void 0;
  }
  /**
   * Call native GA Tag
   */
  gtag(...args) {
    try {
      this._gtag(...args.filter((x) => x !== void 0));
    } catch (err) {
      this.throw(err);
    }
  }
  /**
   * Send an event trigger to GA. It is the same as call:
   * ```js
   * gtag('event', 'video_auto_play_start', {
   *   'event_label': 'My promotional video',
   *   'event_category': 'video_auto_play'
   * });
   * ```
   *
   * @param action 'video_auto_play_start'
   * @param category 'video_auto_play'
   * @param label 'My promotional video'
   * @param value An value to measure something
   */
  event(action, category, label, value, interaction) {
    try {
      const opt = /* @__PURE__ */ new Map();
      if (category) {
        opt.set("event_category", category);
      }
      if (label) {
        opt.set("event_label", label);
      }
      if (value) {
        opt.set("value", value);
      }
      if (interaction !== void 0) {
        opt.set("interaction", interaction);
      }
      const params = this.toKeyValue(opt);
      if (params) {
        this.gtag("event", action, params);
      } else {
        this.gtag("event", action);
      }
    } catch (error) {
      this.throw(error);
    }
  }
  /**
   * Send an page view event. This is the same as
   *
   * ```js
   * gtag('config', 'GA_TRACKING_ID', {
   *   'page_title' : 'Homepage',
   *   'page_path': '/home'
   * });
   * ```
   *
   * The tracking ID is injected automatically by Inject Token NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN
   *
   * @param path /home
   * @param title Homepage
   * @param location '{ page_location }'
   * @param options '{ ... custom dimentions }'
   */
  pageView(path, title, location, options) {
    try {
      const opt = /* @__PURE__ */ new Map([["page_path", path]]);
      if (title) {
        opt.set("page_title", title);
      }
      if (location || this.document) {
        opt.set("page_location", location || this.document.location.href);
      }
      if (options) {
        Object.entries(options).map(([key, value]) => opt.set(key, value));
      }
      this.gtag("config", this.settings.trackingCode, this.toKeyValue(opt));
    } catch (error) {
      this.throw(error);
    }
  }
  /**
   * Send an event to report a App Page View. It is the same as
   *
   * ```js
   * gtag('event', 'screen_view', {
   *   'app_name': 'myAppName',
   *   'screen_name' : 'Home'
   * });
   *
   * ```
   *
   * @param screen 'screen_name'
   * @param appName 'app_name'
   * @param appId 'app_id'
   * @param appVersion 'app_version'
   * @param installerId 'app_installer_id'
   */
  appView(screen, appName, appId, appVersion, installerId) {
    try {
      const opt = /* @__PURE__ */ new Map([["screen_name", screen], ["app_name", appName]]);
      if (appId) {
        opt.set("app_id", appId);
      }
      if (appVersion) {
        opt.set("app_version", appVersion);
      }
      if (installerId) {
        opt.set("app_installer_id", installerId);
      }
      this.gtag("event", "screen_view", this.toKeyValue(opt));
    } catch (error) {
      this.throw(error);
    }
  }
  /**
   * Defines persistent values on GoogleAnalytics
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/setting-values
   *
   * ```js
   * gtag('set', {
   *   'currency': 'USD',
   *   'country': 'US'
   * });
   * ```
   */
  set(...options) {
    try {
      this._gtag("set", ...options);
    } catch (err) {
      this.throw(err);
    }
  }
  /**
   * Send an event to GA to report an application error. It is the same as
   *
   * ```js
   * gtag('event', 'exception', {
   *   'description': 'error_description',
   *   'fatal': false   // set to true if the error is fatal
   * });
   * ```
   *
   * @param description 'error_description'
   * @param fatal set to true if the error is fatal
   */
  exception(description, fatal) {
    try {
      const opt = /* @__PURE__ */ new Map();
      if (description) {
        opt.set("description", description);
      }
      if (fatal) {
        opt.set("fatal", fatal);
      }
      const params = this.toKeyValue(opt);
      if (params) {
        this.gtag("event", "exception", this.toKeyValue(opt));
      } else {
        this.gtag("event", "exception");
      }
    } catch (error) {
      this.throw(error);
    }
  }
};
GoogleAnalyticsService.ɵprov = ɵɵdefineInjectable({ factory: function GoogleAnalyticsService_Factory() {
  return new GoogleAnalyticsService(ɵɵinject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN), ɵɵinject(DOCUMENT), ɵɵinject(NGX_GTAG_FN));
}, token: GoogleAnalyticsService, providedIn: "root" });
GoogleAnalyticsService.decorators = [
  { type: Injectable, args: [{
    providedIn: "root"
  }] }
];
GoogleAnalyticsService.ctorParameters = () => [
  { type: void 0, decorators: [{ type: Inject, args: [NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN] }] },
  { type: void 0, decorators: [{ type: Inject, args: [DOCUMENT] }] },
  { type: void 0, decorators: [{ type: Inject, args: [NGX_GTAG_FN] }] }
];
var GaEventDirective = class {
  constructor(gaCategoryDirective, gaService, settings, el) {
    this.gaCategoryDirective = gaCategoryDirective;
    this.gaService = gaService;
    this.settings = settings;
    this.el = el;
    this.gaBind = "click";
  }
  set gaBind(gaBind) {
    if (this.bindSubscription) {
      this.bindSubscription.unsubscribe();
    }
    this._gaBind = gaBind;
    this.bindSubscription = fromEvent(this.el.nativeElement, gaBind).subscribe(() => this.trigger());
  }
  get gaBind() {
    return this._gaBind;
  }
  ngOnDestroy() {
    if (this.bindSubscription) {
      this.bindSubscription.unsubscribe();
    }
  }
  trigger() {
    try {
      if (!this.gaAction && !this.gaEvent) {
        throw new Error("You must provide a gaAction attribute to identify this event.");
      }
      this.gaService.event(this.gaAction || this.gaEvent, this.gaCategoryDirective ? this.gaCategoryDirective.gaCategory : void 0, this.gaLabel || this.label, this.gaValue, this.gaInteraction);
    } catch (err) {
      this.throw(err);
    }
  }
  throw(err) {
    if ((isDevMode() || this.settings.enableTracing) && console && console.warn) {
      console.warn(err);
    }
  }
};
GaEventDirective.decorators = [
  { type: Directive, args: [{
    selector: `[gaEvent]`,
    exportAs: "gaEvent"
  }] }
];
GaEventDirective.ctorParameters = () => [
  { type: GaEventCategoryDirective, decorators: [{ type: Optional }] },
  { type: GoogleAnalyticsService },
  { type: void 0, decorators: [{ type: Inject, args: [NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN] }] },
  { type: ElementRef }
];
GaEventDirective.propDecorators = {
  gaAction: [{ type: Input }],
  gaLabel: [{ type: Input }],
  label: [{ type: Input }],
  gaValue: [{ type: Input }],
  gaInteraction: [{ type: Input }],
  gaEvent: [{ type: Input }],
  gaBind: [{ type: Input }]
};
var GaEventFormInputDirective = class {
  constructor(gaEvent) {
    this.gaEvent = gaEvent;
    this.gaBind = "focus";
  }
  set gaBind(bind) {
    if (this.gaEvent) {
      this.gaEvent.gaBind = bind;
    }
  }
};
GaEventFormInputDirective.decorators = [
  { type: Directive, args: [{
    selector: `input[gaEvent],
             select[gaEvent],
             textarea[gaEvent]`
  }] }
];
GaEventFormInputDirective.ctorParameters = () => [
  { type: GaEventDirective, decorators: [{ type: Host }, { type: Optional }] }
];
GaEventFormInputDirective.propDecorators = {
  gaBind: [{ type: Input }]
};
var GaActionEnum;
(function(GaActionEnum2) {
  GaActionEnum2["ADD_PAYMENT_INFO"] = "add_payment_info";
  GaActionEnum2["ADD_TO_CART"] = "add_to_cart";
  GaActionEnum2["ADD_TO_WISHLIST"] = "add_to_wishlist";
  GaActionEnum2["BEGIN_CHECKOUT"] = "begin_checkout";
  GaActionEnum2["CHECKOUT_PROGRESS"] = "checkout_progress";
  GaActionEnum2["GENERATE_LEAD"] = "generate_lead";
  GaActionEnum2["LOGIN"] = "login";
  GaActionEnum2["PURCHASE"] = "purchase";
  GaActionEnum2["REFUND"] = "refund";
  GaActionEnum2["REMOVE_FROM_CART"] = "remove_from_cart";
  GaActionEnum2["SEARCH"] = "search";
  GaActionEnum2["SELECT_CONTENT"] = "select_content";
  GaActionEnum2["SET_CHECKOUT_OPTION"] = "set_checkout_option";
  GaActionEnum2["SHARE"] = "share";
  GaActionEnum2["SIGN_UP"] = "sign_up";
  GaActionEnum2["VIEW_ITEM"] = "view_item";
  GaActionEnum2["VIEW_ITEM_LIST"] = "view_item_list";
  GaActionEnum2["VIEW_PROMOTION"] = "view_promotion";
  GaActionEnum2["VIEW_SEARCH_RESULT"] = "view_search_results";
  GaActionEnum2["VIEW_SEARCH_RESULTS"] = "view_search_results";
})(GaActionEnum || (GaActionEnum = {}));
var NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: GoogleAnalyticsInitializer,
  deps: [
    NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
    NGX_GTAG_FN,
    DOCUMENT
  ]
};
function GoogleAnalyticsInitializer(settings, gtag, document) {
  return () => __awaiter(this, void 0, void 0, function* () {
    var _a;
    if (!settings.trackingCode) {
      if (!isDevMode()) {
        console.error("Empty tracking code for Google Analytics. Make sure to provide one when initializing NgxGoogleAnalyticsModule.");
      }
      return;
    }
    if (!gtag) {
      if (!isDevMode()) {
        console.error("Was not possible create or read gtag() fn. Make sure this module is running on a Browser w/ access to Window interface.");
      }
      return;
    }
    if (!document) {
      if (!isDevMode()) {
        console.error("Was not possible to access Document interface. Make sure this module is running on a Browser w/ access do Document interface.");
      }
    }
    settings.uri = settings.uri || `https://www.googletagmanager.com/gtag/js?id=${settings.trackingCode}`;
    settings.initCommands = (_a = settings === null || settings === void 0 ? void 0 : settings.initCommands) !== null && _a !== void 0 ? _a : [];
    if (!settings.initCommands.find((x) => x.command === "config")) {
      settings.initCommands.unshift({ command: "config", values: [settings.trackingCode] });
    }
    if (!settings.initCommands.find((x) => x.command === "js")) {
      settings.initCommands.unshift({ command: "js", values: [/* @__PURE__ */ new Date()] });
    }
    for (const command of settings.initCommands) {
      gtag(command.command, ...command.values);
    }
    const s = document.createElement("script");
    s.async = true;
    s.src = settings.uri;
    if (settings.nonce) {
      s.setAttribute("nonce", settings.nonce);
    }
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(s);
  });
}
var NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN = new InjectionToken("ngx-google-analytics-routing-settings", {
  factory: () => ({})
});
var NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: GoogleAnalyticsRouterInitializer,
  deps: [
    NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN,
    GoogleAnalyticsService
  ]
};
function GoogleAnalyticsRouterInitializer(settings, gaService) {
  return (c) => __awaiter(this, void 0, void 0, function* () {
    const router = c.injector.get(Router);
    const { include = [], exclude = [] } = settings !== null && settings !== void 0 ? settings : {};
    const includeRules = normalizePathRules(include);
    const excludeRules = normalizePathRules(exclude);
    const subs = router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      skip(1),
      // Prevend double views on the first tigger (because GA Already send one ping on setup)
      filter((event) => includeRules.length > 0 ? includeRules.some((rule) => rule.test(event.urlAfterRedirects)) : true),
      filter((event) => excludeRules.length > 0 ? !excludeRules.some((rule) => rule.test(event.urlAfterRedirects)) : true)
    ).subscribe((event) => gaService.pageView(event.urlAfterRedirects, void 0));
    c.onDestroy(() => subs.unsubscribe());
  });
}
function normalizePathRules(rules) {
  return rules.map((rule) => rule instanceof RegExp ? rule : new RegExp(`^${rule.replace("*", ".*")}$`, "i"));
}
var NgxGoogleAnalyticsModule = class _NgxGoogleAnalyticsModule {
  /**
   * You should provide a valid Google TrackingCode. This code will be provided to the entire application by
   * `NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN` token. You can inject this code in you components if you like by
   * use the following injection code `@Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) gaConfig: IGoogleAnalyticsSettings`
   *
   * @param trackingCode The Google Tracking Code
   * @param initCommands When placed, it will run any GA Commands in sequence after setup GA environment.
   * @param uri When placed, it will change the default js URI to the provided one.
   * @param enableTracing When true, trace GA tracking errors on production mode.
   * @param nonce When placed, nonce will be added to script tag.
   */
  static forRoot(trackingCode, initCommands = [], uri, enableTracing, nonce) {
    return {
      ngModule: _NgxGoogleAnalyticsModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
          useValue: {
            trackingCode,
            initCommands,
            uri,
            enableTracing,
            nonce
          }
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER
      ]
    };
  }
};
NgxGoogleAnalyticsModule.decorators = [
  { type: NgModule, args: [{
    imports: [],
    declarations: [
      GaEventDirective,
      GaEventCategoryDirective,
      GaEventFormInputDirective
    ],
    exports: [
      GaEventDirective,
      GaEventCategoryDirective,
      GaEventFormInputDirective
    ]
  }] }
];
var NgxGoogleAnalyticsRouterModule = class _NgxGoogleAnalyticsRouterModule {
  static forRoot(settings) {
    return {
      ngModule: _NgxGoogleAnalyticsRouterModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN,
          useValue: settings !== null && settings !== void 0 ? settings : {}
        }
      ]
    };
  }
};
NgxGoogleAnalyticsRouterModule.decorators = [
  { type: NgModule, args: [{
    imports: [
      CommonModule,
      NgxGoogleAnalyticsModule
    ],
    providers: [
      NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER
    ],
    declarations: []
  }] }
];
export {
  GaActionEnum,
  GaEventCategoryDirective,
  GaEventDirective,
  GaEventFormInputDirective,
  GoogleAnalyticsInitializer,
  GoogleAnalyticsRouterInitializer,
  GoogleAnalyticsService,
  NGX_DATA_LAYER,
  NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER,
  NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER,
  NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN,
  NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
  NGX_GTAG_FN,
  NGX_WINDOW,
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
  getDataLayerFn,
  getGtagFn,
  getWindow
};
//# sourceMappingURL=ngx-google-analytics.js.map
