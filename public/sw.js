if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>i(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"5883b1da0a3ae140f4a6f0de23c139a9"},{url:"/_next/static/chunks/108-68a7dd2afb5f7fba.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/13-9790302435435806.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/132-cc22d1d8c1695fe2.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/350-6f1756360bf262d4.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/575-1de299745a05064c.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/579-d977650196a6475f.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/57f4b427-71f35bffb8c51460.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/586-49fb433a988a1ed9.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/629-d1699c5086cfa191.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/698-db8547bc86edfc63.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/751-1427a99c7aae929c.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/884-cb0d802098676861.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/89-fc048e339647711e.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/about/page-10391dac884c0e24.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/auth/login/page-d27b84b486cbdd91.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/auth/logout/page-afe96773cd3a19bb.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/auth/register/page-e7f82540a0d95ed9.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/bookmarks/page-af3e3c561395a739.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/home/page-0a7d9e743aaddee3.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/layout-14fadea059fcd045.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/list/%5Bidx%5D/page-394fc3e72f33c6f8.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/list/page-978d6228f2aad5f4.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/page-4156069b6c9ebb2b.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/r/%5Bsub%5D/comments/%5Bid%5D/%5Btopic%5D/page-9ebb497654de57b3.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/r/%5Bsub%5D/page-2ca681b00c85494a.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/r/%5Bsub%5D/search/page-f66d9a7562710553.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/app/s/page-b7edeaa8cc1100b0.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/bce60fc1-539315254733b9f9.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/main-2719855e162d74c6.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/main-app-c87c8063e6e4503d.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-565d23ff708639cc.js",revision:"zM0MAFBBcDx_8qY7jJiUO"},{url:"/_next/static/css/e58b72416ae2c450.css",revision:"e58b72416ae2c450"},{url:"/_next/static/zM0MAFBBcDx_8qY7jJiUO/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/zM0MAFBBcDx_8qY7jJiUO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/logo-128x128.png",revision:"c0a5c05ddccc6ef7717a3eceaa1373dd"},{url:"/icons/logo-144x144.png",revision:"738804ece66be41450f5b15144504f9b"},{url:"/icons/logo-152x152.png",revision:"bf0eb517b9a5590f3d893eaa4e1f0168"},{url:"/icons/logo-192x192.png",revision:"4dc4a40e6311bf5dd1f3cbd4830ec455"},{url:"/icons/logo-384x384.png",revision:"90b78b9850631d18ce055c4811a1c542"},{url:"/icons/logo-512x512.png",revision:"1aa7c53867aa0363d1f95728daef71f3"},{url:"/icons/logo-72x72.png",revision:"c2b45e0896a20bb90352d75df7a540da"},{url:"/icons/logo-96x96.png",revision:"522ba8eeaab92c471a7f64fcfe196da4"},{url:"/manifest.json",revision:"5b1a576b0d208066a47a1a9218095a04"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
