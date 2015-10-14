/// <reference path="../../../../typings/tsd.d.ts" />

module MyCordovaApp1.Core.Services {
    "use strict";

    var module = angular.module("MyCordovaApp1.Core.Services", []);

    export interface ICordovaService {
        off(eventName: string, code: string): ICordovaService;

        on(eventName: string, callback: Function, code?: string): ICordovaService;
        on(eventName: string, callback: any[], code?: string): ICordovaService;

        ready(callback: Function): ICordovaService;
        ready(callback: any[]): ICordovaService;

        onPause(callback: Function, code?: string): ICordovaService;
        onPause(params: any[], code?: string): ICordovaService;
        
        onResume(callback: Function, code?: string): ICordovaService;
        onResume(params: any[], code?: string): ICordovaService;
        
        onBackButton(callback: Function, code?: string): ICordovaService;
        onBackButton(params: any[], code?: string): ICordovaService;

        onMenuButton(callback: Function, code: string): ICordovaService;
        onMenuButton(params: any[], code: string): ICordovaService;

        onSearchButton(callback: Function, code: string): ICordovaService;
        onSearchButton(params: any[], code: string): ICordovaService;

        onStartCallButton(callback: Function, code: string): ICordovaService;
        onStartCallButton(params: any[], code: string): ICordovaService;

        onEndCallButton(callback: Function, code: string): ICordovaService;
        onEndCallButton(params: any[], code: string): ICordovaService;

        onVolumeDownButton(callback: Function, code: string): ICordovaService;
        onVolumeDownButton(params: any[], code: string): ICordovaService;

        onVolumeUpButton(callback: Function, code: string): ICordovaService;
        onVolumeUpButton(params: any[], code: string): ICordovaService;

    }

    class CordovaService implements ICordovaService {
        private $q: ng.IQService;
        private $injector: ng.auto.IInjectorService;
        private $rootScope: ng.IScope;
        private events: Array<any>;
        private readyEventDefer;
        private whenReady: ng.IPromise<void>;

        constructor($q: ng.IQService, $injector: ng.auto.IInjectorService, $rootScope: ng.IScope) {
            this.events = new Array();

            this.$q = $q;
            this.$injector = $injector;
            this.$rootScope = $rootScope;

            this.readyEventDefer = this.$q.defer();
            this.whenReady = this.readyEventDefer.promise;

            return this;
        }

        public on(eventName: string, callback: any, code: string): ICordovaService {
            return this._on(eventName, callback, code);
        }

        public off(eventName: string, code: string): ICordovaService {
            if (!code)
                return;

            var filter = this.events.filter(function (event) { return event.code == code; });

            if (!filter.length)
                return;

            var item = filter[0];

            this.events.splice(this.events.indexOf(item), 1);

            document.removeEventListener(eventName, item.event);
        }

        public ready(callback: any): ICordovaService {
            return this._ready(callback);
        }

        public onPause(callback: any, code: string): ICordovaService {
            return this._on("pause", callback, code);
        }

        public onResume(callback: any, code: string): ICordovaService {
            return this._on("resume", callback, code);
        }

        public onBackButton(callback: any, code: string): ICordovaService {
            return this._on("backbutton", callback, code);
        }

        public onMenuButton(callback: any, code: string): ICordovaService {
            return this._on("menubutton", callback, code);
        }

        public onSearchButton(callback: any, code: string): ICordovaService {
            return this._on("searchbutton", callback, code);
        }

        public onStartCallButton(callback: any, code: string): ICordovaService {
            return this._on("startcallbutton", callback, code);
        }

        public onEndCallButton(callback: any, code: string): ICordovaService {
            return this._on("endcallbutton", callback, code);
        }

        public onVolumeDownButton(callback: any, code: string): ICordovaService {
            return this._on("volumedownbutton", callback, code);
        }

        public onVolumeUpButton(callback: any, code: string): ICordovaService {
            return this._on("volumeupbutton", callback, code);
        }

        private _on(eventName: string, callback:any, code: string): ICordovaService {
            var $this = this;

            $this.whenReady = $this.whenReady
                .then(function () {
                $this.off(eventName, code);

                var item = {
                    code: code,
                    eventName: eventName,
                    event: $this.applyFunction(callback, eventName)
                };

                if (code)
                    $this.events.push(item);

                document.addEventListener(eventName, item.event, false);
            });

            return $this;
        }

        private _ready(callback: any): ICordovaService {
            var $this = this;

            document.addEventListener("deviceready", function () {
                $this.applyFunction(callback, 'deviceready')();
                $this.readyEventDefer.resolve();
            });

            return $this;
        }


        private applyFunction(callback: any, eventName: string): () => void {
            var $this = this;
            return function () {
                $this.$injector.invoke(callback);
            }
        }
    }

    module.factory("$cordova", ["$q", "$injector", "$rootScope", ($q, $injector, $rootScope) => new CordovaService($q, $injector, $rootScope)]);
}