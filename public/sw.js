if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,i)=>{const t=s||("document"in self?document.currentScript.src:"")||location.href;if(e[t])return;let c={};const u=s=>a(s,t),r={module:{uri:t},exports:c,require:u};e[t]=Promise.all(n.map((s=>r[s]||u(s)))).then((s=>(i(...s),c)))}}define(["./workbox-50de5c5d"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d0d1b13631d09aff868189d20f1dd637"},{url:"/_next/static/Ts2a5NsguH4WVH2wTVbJS/_buildManifest.js",revision:"02b926c0e0d93f81521380ea4167e5c8"},{url:"/_next/static/Ts2a5NsguH4WVH2wTVbJS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-f41e9b3d4c39e4bd.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/132-cd2c4b16056dd412.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/199-ca1910542c1e6ea7.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/346-320bb5334b336baa.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/350-7b48942f85785319.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/442-13c58d29d8472951.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/501-48bf0acdd08406b6.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/502-063ab1d9f7e46721.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/643-e43f6a2c5714b1c9.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/674-222e74ec5525c349.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/698-ba6a97840e9eac7f.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/884-463f3495b35c3d6d.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/912-6e2cf7f5fc8c2989.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/945-b7f16996e11065f0.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/95-e0b8144396636abd.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/a6f24f56-c8399ad7f19d4ec7.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/about/page-10391dac884c0e24.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/auth/login/page-af7454dc054742fb.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/auth/logout/page-13d8c9a92ebdddff.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/auth/register/page-0007203ac9ec3619.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/bookmarks/page-46455744b5270322.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/home/page-42791a4d60f4a81a.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/layout-8768733e3e9ebdc5.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/list/%5Bidx%5D/page-37db23bd0759b181.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/list/page-01b94599da263e0f.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/page-8e6ebe8bb7315e93.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/r/%5Bsub%5D/comments/%5Bid%5D/%5Btopic%5D/page-4651f1d601d3e78c.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/r/%5Bsub%5D/page-66c034e75dc40adb.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/r/%5Bsub%5D/search/page-a6e421f1559564a6.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/app/s/page-fad555ac90cf507e.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/bce60fc1-567bd6045ee181ed.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/cd72e915-cf6d4986a66a51d0.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/main-2719855e162d74c6.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/main-app-856d5db8c7b857be.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/pages/_app-b75b9482ff6ea491.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/pages/_error-7fafba9435aeb6bc.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-9eb6523dc6e0dd29.js",revision:"Ts2a5NsguH4WVH2wTVbJS"},{url:"/_next/static/css/58a7702a0c1404ae.css",revision:"58a7702a0c1404ae"},{url:"/_next/static/css/ca7fd1d17d5386cf.css",revision:"ca7fd1d17d5386cf"},{url:"/_next/static/media/default-skin.5c7414a4.png",revision:"5c7414a4"},{url:"/_next/static/media/default-skin.5da9b21d.svg",revision:"5da9b21d"},{url:"/_next/static/media/preloader.32a736a5.gif",revision:"32a736a5"},{url:"/icons/logo-128x128.png",revision:"c0a5c05ddccc6ef7717a3eceaa1373dd"},{url:"/icons/logo-144x144.png",revision:"738804ece66be41450f5b15144504f9b"},{url:"/icons/logo-152x152.png",revision:"bf0eb517b9a5590f3d893eaa4e1f0168"},{url:"/icons/logo-192x192.png",revision:"4dc4a40e6311bf5dd1f3cbd4830ec455"},{url:"/icons/logo-384x384.png",revision:"90b78b9850631d18ce055c4811a1c542"},{url:"/icons/logo-512x512.png",revision:"1aa7c53867aa0363d1f95728daef71f3"},{url:"/icons/logo-72x72.png",revision:"c2b45e0896a20bb90352d75df7a540da"},{url:"/icons/logo-96x96.png",revision:"522ba8eeaab92c471a7f64fcfe196da4"},{url:"/manifest.json",revision:"5b1a576b0d208066a47a1a9218095a04"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:n})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
