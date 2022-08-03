!function(){"use strict";var e={913:function(){try{self["workbox:core:6.5.3"]&&_()}catch(e){}},550:function(){try{self["workbox:expiration:6.5.3"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:6.5.3"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}},i=!0;try{e[n](r,r.exports,s),i=!1}finally{i&&delete t[n]}return r.exports}!function(){s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},r=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||r(a.precache),o=e=>e||r(a.runtime);function c(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}let h;function l(e){e.then((()=>{}))}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function f(e){return new Promise((t=>setTimeout(t,e)))}function p(e,t){const s=t();return e.waitUntil(s),s}async function g(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const a=e.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},i=s?s(r):r,o=function(){if(void 0===h){const t=new Response("");if("body"in t)try{new Response(t.body),h=!0}catch(e){h=!1}h=!1}return h}()?a.body:await a.blob();return new Response(o,i)}let m,w;const y=new WeakMap,_=new WeakMap,v=new WeakMap,b=new WeakMap,x=new WeakMap;let R={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return _.get(e);if("objectStoreNames"===t)return e.objectStoreNames||v.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return T(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function E(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(w||(w=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(k(this),t),T(y.get(this))}:function(...t){return T(e.apply(k(this),t))}:function(t,...s){const n=e.call(k(this),t,...s);return v.set(n,t.sort?t.sort():[t]),T(n)}}function C(e){return"function"===typeof e?E(e):(e instanceof IDBTransaction&&function(e){if(_.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)}));_.set(e,t)}(e),t=e,(m||(m=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,R):e);var t}function T(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",r)},a=()=>{t(T(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&y.set(t,e)})).catch((()=>{})),x.set(t,e),t}(e);if(b.has(e))return b.get(e);const t=C(e);return t!==e&&(b.set(e,t),x.set(t,e)),t}const k=e=>x.get(e);const L=["get","getKey","getAll","getAllKeys","count"],q=["put","add","delete","clear"],U=new Map;function D(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(U.get(t))return U.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=q.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!L.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,a?"readwrite":"readonly");let i=r.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[s](...t),a&&r.done]))[0]};return U.set(t,r),r}R=(e=>({...e,get:(t,s,n)=>D(t,s)||e.get(t,s,n),has:(t,s)=>!!D(t,s)||e.has(t,s)}))(R);s(550);const N="cache-entries",S=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class P{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(N,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(()=>t())),T(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=S(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(N,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(N,this._getId(e));return null===s||void 0===s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(N).store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&r>=t?a.push(n.value):r++),n=await n.continue()}const i=[];for(const o of a)await s.delete(N,o.id),i.push(o.url);return i}_getId(e){return this._cacheName+"|"+S(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(e,t),o=T(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(T(i.result),e.oldVersion,e.newVersion,T(i.transaction))})),s&&i.addEventListener("blocked",(()=>s())),o.then((e=>{r&&e.addEventListener("close",(()=>r())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class I{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new P(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,l(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class A{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);l(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(o){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){n.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===o())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new I(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}s(873);function O(e){return"string"===typeof e?new Request(e):e}class K{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let n=O(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(i){if(i instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(o){throw a&&await this.runCallbacks("fetchDidFail",{error:o,event:s,originalRequest:a.clone(),request:r.clone()}),o}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=O(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const a=O(e);await f(0);const r=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:d(r.url)});const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,n){const a=c(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const o of i)if(a===c(o.url,s))return e.match(o,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?i.clone():i)}catch(g){if(g instanceof Error)throw"QuotaExceededError"===g.name&&await async function(){for(const e of n)await e()}(),g}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:p,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=O(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class M{constructor(e={}){this.cacheName=o(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new K(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,s,n){let a;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,e),!a||"error"===a.type)throw new t("no-response",{url:s.url})}catch(r){if(r instanceof Error)for(const t of e.iterateCallbacks("handlerDidError"))if(a=await t({error:r,event:n,request:s}),a)break;if(!a)throw r}for(const t of e.iterateCallbacks("handlerWillRespond"))a=await t({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}const W={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class j extends M{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(W),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,s){const n=[];const a=[];let r;if(this._networkTimeoutSeconds){const{id:t,promise:i}=this._getTimeoutPromise({request:e,logs:n,handler:s});r=t,a.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:e,logs:n,handler:s});a.push(i);const o=await s.waitUntil((async()=>await s.waitUntil(Promise.race(a))||await i)());if(!o)throw new t("no-response",{url:e.url});return o}_getTimeoutPromise({request:e,logs:t,handler:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:n}){let a,r;try{r=await n.fetchAndCachePut(t)}catch(i){i instanceof Error&&(a=i)}return e&&clearTimeout(e),!a&&r||(r=await n.cacheMatch(t)),r}}class B extends M{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(W)}async _handle(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(n);let a,r=await s.cacheMatch(e);if(r)0;else{0;try{r=await n}catch(i){i instanceof Error&&(a=i)}}if(!r)throw new t("no-response",{url:e.url,error:a});return r}}s(80);const H=e=>e&&"object"===typeof e?e:{handle:e};class F{constructor(e,t,s="GET"){this.handler=H(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=H(e)}}class $ extends F{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class G{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return void 0;let c;try{c=i.handle({url:s,request:e,event:t,params:a})}catch(l){c=Promise.reject(l)}const h=r&&r.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async n=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:a})}catch(r){r instanceof Error&&(n=r)}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"===typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,H(e))}setCatchHandler(e){this._catchHandler=H(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let Q;const V=()=>(Q||(Q=new G,Q.addFetchListener(),Q.addCacheListener()),Q);function J(e,s,n){let a;if("string"===typeof e){const t=new URL(e,location.href);0;a=new F((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)a=new $(e,s,n);else if("function"===typeof e)a=new F(e,s,n);else{if(!(e instanceof F))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return V().registerRoute(a),a}s(977);function z(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}class X{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class Y{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null===t||void 0===t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}class Z extends M{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(Z.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let n;const a=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=a.integrity,r=e.integrity,i=!r||r===t;if(n=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,n.clone());0}}return n}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(e);if(!(await s.cachePut(e,n.clone())))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==Z.copyRedirectedCacheableResponsesPlugin&&(n===Z.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(Z.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}Z.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},Z.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await g(e):e};class ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new Z({cacheName:i(e),plugins:[...t,new Y({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const n of e){"string"===typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=z(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return p(e,(async()=>{const t=new X;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(a),n=new Request(a,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return p(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}let te;const se=()=>(te||(te=new ee),te);class ne extends F{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}function ae(e){return se().matchPrecache(e)}importScripts("https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js"),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim()));var re,ie,oe=[{'revision':'4556c45dd113b893','url':'/_next/static/chunks/framework-4556c45dd113b893.js'},{'revision':'b740a071714dac26','url':'/_next/static/chunks/main-b740a071714dac26.js'},{'revision':'bff2dbabaaf5cbf8','url':'/_next/static/chunks/pages/%5B...slug%5D-bff2dbabaaf5cbf8.js'},{'revision':'1762f2958c94df86','url':'/_next/static/chunks/pages/_app-1762f2958c94df86.js'},{'revision':'a4ba2246ff8fb532','url':'/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js'},{'revision':'a1b6a13a3b67c2d7','url':'/_next/static/chunks/pages/index-a1b6a13a3b67c2d7.js'},{'revision':'a05092f6d14c7a32','url':'/_next/static/chunks/pages/post/%5Bslug%5D-a05092f6d14c7a32.js'},{'revision':'837c0df77fd5009c9e46d446188ecfd0','url':'/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js'},{'revision':'cb7634a8b6194820','url':'/_next/static/chunks/webpack-cb7634a8b6194820.js'},{'revision':'09a6c8321e7bfbc2','url':'/_next/static/css/09a6c8321e7bfbc2.css'},{'revision':'d6ba86a622818c3a','url':'/_next/static/css/d6ba86a622818c3a.css'},{'revision':'df99db77255b540d','url':'/_next/static/css/df99db77255b540d.css'},{'revision':'652e7269','url':'/_next/static/media/revicons.652e7269.eot'},{'revision':'b96bdb22','url':'/_next/static/media/revicons.b96bdb22.ttf'},{'revision':'ff59b316','url':'/_next/static/media/revicons.ff59b316.woff'},{'revision':'872ac3305a3d2b82c48e784237255927','url':'/_next/static/uUO-Hwddunn55Ckmxjyta/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/uUO-Hwddunn55Ckmxjyta/_ssgManifest.js'},{'revision':'95baa3219d6518c002f5ff8bcfc077d7','url':'/bg.jpg'},{'revision':'cf3ee9180debcd627ca63b30090c787e','url':'/favicon.ico'},{'revision':'82d46a72252e00047348f8608f6c7004','url':'/pwa/android/android-launchericon-144-144.png'},{'revision':'71742190c5f0c7de07827711edd7d4a7','url':'/pwa/android/android-launchericon-192-192.png'},{'revision':'0933e076234561c9e36c393ec18ed912','url':'/pwa/android/android-launchericon-48-48.png'},{'revision':'9508beeebe7237b5b8f62299b385a6ce','url':'/pwa/android/android-launchericon-512-512.png'},{'revision':'82f36d5b84d8239790e2c1607a7a5e4b','url':'/pwa/android/android-launchericon-72-72.png'},{'revision':'2db5fc366f59a69e4678d140bd3dcb75','url':'/pwa/android/android-launchericon-96-96.png'},{'revision':'5dbbc3fe59816e65ba28e355a58ea45c','url':'/pwa/icons.json'},{'revision':'fbd21b83b186fed8abe3a442e1806981','url':'/pwa/ios/100.png'},{'revision':'19f3591a81b6dd8eff506d56bb814c08','url':'/pwa/ios/1024.png'},{'revision':'007033ef5d5ffad8dcd44cab51e48534','url':'/pwa/ios/114.png'},{'revision':'16714dc5c20e06476fa801d1521efc76','url':'/pwa/ios/120.png'},{'revision':'482aaac8c605659d3d4df45399a98655','url':'/pwa/ios/128.png'},{'revision':'82d46a72252e00047348f8608f6c7004','url':'/pwa/ios/144.png'},{'revision':'714b28f65c6f35e3ad113fef1f5b5c20','url':'/pwa/ios/152.png'},{'revision':'338dc6e67ebbe80620f6d1e26718afc7','url':'/pwa/ios/16.png'},{'revision':'d50aacd2b0ca8a659dfbb5cc91b59123','url':'/pwa/ios/167.png'},{'revision':'be0a55e1088b0508a011be5e029a39d5','url':'/pwa/ios/180.png'},{'revision':'71742190c5f0c7de07827711edd7d4a7','url':'/pwa/ios/192.png'},{'revision':'a8b2676037331922756181d23ba6826f','url':'/pwa/ios/20.png'},{'revision':'36e086dfbbde2069bf3cfd3fbca0d05d','url':'/pwa/ios/256.png'},{'revision':'be44c7c67037a1ffe5ed0fa54392a6cb','url':'/pwa/ios/29.png'},{'revision':'78bae9e60a7b40da7cc873b8cbe2115b','url':'/pwa/ios/32.png'},{'revision':'b6683fd1c73e98f94149acb18ea1cffc','url':'/pwa/ios/40.png'},{'revision':'62f472b12a0d524adb46bcb2d86382dd','url':'/pwa/ios/50.png'},{'revision':'9508beeebe7237b5b8f62299b385a6ce','url':'/pwa/ios/512.png'},{'revision':'a0aea72f7a2ab3006fa40da8a4688a49','url':'/pwa/ios/57.png'},{'revision':'43b856fc4d0198a83b72448385706f28','url':'/pwa/ios/58.png'},{'revision':'43678c52d4dfbbaa5b1e24f5bfe1f053','url':'/pwa/ios/60.png'},{'revision':'a6e2ebd232fd4da9613ed517e592051b','url':'/pwa/ios/64.png'},{'revision':'82f36d5b84d8239790e2c1607a7a5e4b','url':'/pwa/ios/72.png'},{'revision':'9b55aefd7c76b3438ec4a32abff6c9d6','url':'/pwa/ios/76.png'},{'revision':'40f1632d9eef51dd6210dd42ca9da01c','url':'/pwa/ios/80.png'},{'revision':'69d8db71d28efb678a24b4e5bfcb55b0','url':'/pwa/ios/87.png'},{'revision':'bcbd5c7dee1efaf7ed5d31ad5cf77aa2','url':'/pwa/manifest.json'},{'revision':'9a863baab477158732c491d50c6dd7b6','url':'/pwa/windows11/LargeTile.scale-100.png'},{'revision':'e6c9ff524d2ce40b333f340d285f025e','url':'/pwa/windows11/LargeTile.scale-125.png'},{'revision':'48ec0999cb5f957dcca7015450fb88b0','url':'/pwa/windows11/LargeTile.scale-150.png'},{'revision':'6c9b04e3a38b0596c3d1a494d5bf1226','url':'/pwa/windows11/LargeTile.scale-200.png'},{'revision':'e634f1141151d8aa2b5a92d7d5a4c193','url':'/pwa/windows11/LargeTile.scale-400.png'},{'revision':'452818a9485cb969c4a42dd4d1f71b91','url':'/pwa/windows11/SmallTile.scale-100.png'},{'revision':'c0945cc820b948a175d21a178a609ca9','url':'/pwa/windows11/SmallTile.scale-125.png'},{'revision':'59e9d5befff9c6f4f07e1ec092b11686','url':'/pwa/windows11/SmallTile.scale-150.png'},{'revision':'9c378eeff401717846ab42a92f45d52e','url':'/pwa/windows11/SmallTile.scale-200.png'},{'revision':'c5d900c5aa30144f48deec95a5dae579','url':'/pwa/windows11/SmallTile.scale-400.png'},{'revision':'db825462d089c9888b9647338bb63d9e','url':'/pwa/windows11/SplashScreen.scale-100.png'},{'revision':'5ca8ff70c69840b0d0558dd6793b8d64','url':'/pwa/windows11/SplashScreen.scale-125.png'},{'revision':'70adccc524159900354f24f5e307b815','url':'/pwa/windows11/SplashScreen.scale-150.png'},{'revision':'aff0d90cf06a08efcf07b7d144ba4307','url':'/pwa/windows11/SplashScreen.scale-200.png'},{'revision':'48b2fdbe15fc24d2f368418eb2de0f7e','url':'/pwa/windows11/SplashScreen.scale-400.png'},{'revision':'594194ec3da2ed09cacc6e34c0472770','url':'/pwa/windows11/Square150x150Logo.scale-100.png'},{'revision':'1e45e07be6ed06f59fe2716c7d407a53','url':'/pwa/windows11/Square150x150Logo.scale-125.png'},{'revision':'8f82c2000329d9b326d1e9679fc560bc','url':'/pwa/windows11/Square150x150Logo.scale-150.png'},{'revision':'f67bd6fac4d894b5d187c209afb44208','url':'/pwa/windows11/Square150x150Logo.scale-200.png'},{'revision':'20e4eb4c5767dbff8fec2383a8f018a8','url':'/pwa/windows11/Square150x150Logo.scale-400.png'},{'revision':'00f1725f8f0622c49e71a620cfca5631','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png'},{'revision':'d13472c6456eb6a3c72e67937466c31e','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png'},{'revision':'53d632d4e3d7d443a2201940bde5820c','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png'},{'revision':'e64049799c6d47373e67e3762a5e04d5','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png'},{'revision':'53c6c801be7ffa7facb5b7b713f91a40','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png'},{'revision':'1d164e288d74624bfdf919bf0cc26746','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png'},{'revision':'58294a855c8f90b6e4cbfa18f2ae1534','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png'},{'revision':'2b4f489d790f63c865d62a8434b90a70','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png'},{'revision':'b34d3fca39ad6a72f3a3e5e132c6c31a','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png'},{'revision':'cb5befac7e17a97ff8781859b40ecc65','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png'},{'revision':'f82a95d6a40cf5f0d97bec685a7173da','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png'},{'revision':'b2c709428ceed68d78980c56182ef502','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png'},{'revision':'fcb96568ba7704a9080b6558b6c34e0e','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png'},{'revision':'76b3dc18f8738d5ca935e859f8bbc531','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png'},{'revision':'6c67d054fdd688b95bf82dd3945a7b6a','url':'/pwa/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png'},{'revision':'00f1725f8f0622c49e71a620cfca5631','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-16.png'},{'revision':'d13472c6456eb6a3c72e67937466c31e','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-20.png'},{'revision':'53d632d4e3d7d443a2201940bde5820c','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-24.png'},{'revision':'e64049799c6d47373e67e3762a5e04d5','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-256.png'},{'revision':'53c6c801be7ffa7facb5b7b713f91a40','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-30.png'},{'revision':'1d164e288d74624bfdf919bf0cc26746','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-32.png'},{'revision':'58294a855c8f90b6e4cbfa18f2ae1534','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-36.png'},{'revision':'2b4f489d790f63c865d62a8434b90a70','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-40.png'},{'revision':'b34d3fca39ad6a72f3a3e5e132c6c31a','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-44.png'},{'revision':'cb5befac7e17a97ff8781859b40ecc65','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-48.png'},{'revision':'f82a95d6a40cf5f0d97bec685a7173da','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-60.png'},{'revision':'b2c709428ceed68d78980c56182ef502','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-64.png'},{'revision':'fcb96568ba7704a9080b6558b6c34e0e','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-72.png'},{'revision':'76b3dc18f8738d5ca935e859f8bbc531','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-80.png'},{'revision':'6c67d054fdd688b95bf82dd3945a7b6a','url':'/pwa/windows11/Square44x44Logo.altform-unplated_targetsize-96.png'},{'revision':'b34d3fca39ad6a72f3a3e5e132c6c31a','url':'/pwa/windows11/Square44x44Logo.scale-100.png'},{'revision':'c3cb03791cf9e662416f5ca878ac866b','url':'/pwa/windows11/Square44x44Logo.scale-125.png'},{'revision':'a675fb3a5d3fd548e040466bbc44e0e5','url':'/pwa/windows11/Square44x44Logo.scale-150.png'},{'revision':'c4aa52a841a6f66f205156443dfd7258','url':'/pwa/windows11/Square44x44Logo.scale-200.png'},{'revision':'ce4d25a120240a968a37358a579d291a','url':'/pwa/windows11/Square44x44Logo.scale-400.png'},{'revision':'00f1725f8f0622c49e71a620cfca5631','url':'/pwa/windows11/Square44x44Logo.targetsize-16.png'},{'revision':'d13472c6456eb6a3c72e67937466c31e','url':'/pwa/windows11/Square44x44Logo.targetsize-20.png'},{'revision':'53d632d4e3d7d443a2201940bde5820c','url':'/pwa/windows11/Square44x44Logo.targetsize-24.png'},{'revision':'e64049799c6d47373e67e3762a5e04d5','url':'/pwa/windows11/Square44x44Logo.targetsize-256.png'},{'revision':'53c6c801be7ffa7facb5b7b713f91a40','url':'/pwa/windows11/Square44x44Logo.targetsize-30.png'},{'revision':'1d164e288d74624bfdf919bf0cc26746','url':'/pwa/windows11/Square44x44Logo.targetsize-32.png'},{'revision':'58294a855c8f90b6e4cbfa18f2ae1534','url':'/pwa/windows11/Square44x44Logo.targetsize-36.png'},{'revision':'2b4f489d790f63c865d62a8434b90a70','url':'/pwa/windows11/Square44x44Logo.targetsize-40.png'},{'revision':'b34d3fca39ad6a72f3a3e5e132c6c31a','url':'/pwa/windows11/Square44x44Logo.targetsize-44.png'},{'revision':'cb5befac7e17a97ff8781859b40ecc65','url':'/pwa/windows11/Square44x44Logo.targetsize-48.png'},{'revision':'f82a95d6a40cf5f0d97bec685a7173da','url':'/pwa/windows11/Square44x44Logo.targetsize-60.png'},{'revision':'b2c709428ceed68d78980c56182ef502','url':'/pwa/windows11/Square44x44Logo.targetsize-64.png'},{'revision':'fcb96568ba7704a9080b6558b6c34e0e','url':'/pwa/windows11/Square44x44Logo.targetsize-72.png'},{'revision':'76b3dc18f8738d5ca935e859f8bbc531','url':'/pwa/windows11/Square44x44Logo.targetsize-80.png'},{'revision':'6c67d054fdd688b95bf82dd3945a7b6a','url':'/pwa/windows11/Square44x44Logo.targetsize-96.png'},{'revision':'62f472b12a0d524adb46bcb2d86382dd','url':'/pwa/windows11/StoreLogo.scale-100.png'},{'revision':'13d1d10459f2b5d5e15ecef324f291a7','url':'/pwa/windows11/StoreLogo.scale-125.png'},{'revision':'b36fa10d7487cd710b1d8ec537bef953','url':'/pwa/windows11/StoreLogo.scale-150.png'},{'revision':'fbd21b83b186fed8abe3a442e1806981','url':'/pwa/windows11/StoreLogo.scale-200.png'},{'revision':'358478457097473808798cac8d6a0df7','url':'/pwa/windows11/StoreLogo.scale-400.png'},{'revision':'0ebe575142a00601b38f88712e0b99be','url':'/pwa/windows11/Wide310x150Logo.scale-100.png'},{'revision':'f5ac471e9e0c24429a06da5d52b35688','url':'/pwa/windows11/Wide310x150Logo.scale-125.png'},{'revision':'9d240a78ab56a15f3e456243f9a6cc49','url':'/pwa/windows11/Wide310x150Logo.scale-150.png'},{'revision':'db825462d089c9888b9647338bb63d9e','url':'/pwa/windows11/Wide310x150Logo.scale-200.png'},{'revision':'aff0d90cf06a08efcf07b7d144ba4307','url':'/pwa/windows11/Wide310x150Logo.scale-400.png'},{'revision':'169108403c45e4d6f059291b1032d157','url':'/service-worker.js'},{'revision':'50d5ab27d3e093aeeec1ea3435176766','url':'/sw.js'},{'revision':'26bf2d0adaf1028a4d4c6ee77005e819','url':'/vercel.svg'}];oe.push({url:"/fallback",revision:"1234567890"}),function(e){se().precache(e)}(oe),function(e){const t=se();J(new ne(t,e))}(re),self.addEventListener("activate",(e=>{const t=i();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),J("/",new j({cacheName:"start-url",plugins:[new A({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),J(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new class extends M{async _handle(e,s){let n,a=await s.cacheMatch(e);if(a)0;else{0;try{a=await s.fetchAndCachePut(e)}catch(r){r instanceof Error&&(n=r)}0}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}({cacheName:"google-fonts",plugins:[new A({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),J(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new B({cacheName:"static-font-assets",plugins:[new A({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),J(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new class extends M{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,s){let n,a;try{const t=[s.fetch(e)];if(this._networkTimeoutSeconds){const e=f(1e3*this._networkTimeoutSeconds);t.push(e)}if(a=await Promise.race(t),!a)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(r){r instanceof Error&&(n=r)}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}({cacheName:"static-image-assets",plugins:[new A({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),J(/\.(?:js)$/i,new B({cacheName:"static-js-assets",plugins:[new A({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),J(/\.(?:css|less)$/i,new B({cacheName:"static-style-assets",plugins:[new A({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),J(/\.(?:json|xml|csv)$/i,new j({cacheName:"static-data-assets",plugins:[new A({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),J(/\/api\/.*$/i,new j({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new A({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),J(/.*/i,new j({cacheName:"others",networkTimeoutSeconds:10,plugins:[new A({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),ie=new B,V().setDefaultHandler(ie),function(e){V().setCatchHandler(e)}((function(e){switch(e.event.request.destination){case"document":return ae("/fallback");case"image":return ae("/static/images/fallback.png");default:return Response.error()}}))}()}();