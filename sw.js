const C='planner-v10';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./fonts/NotoAr-400.woff2','./fonts/NotoAr-500.woff2','./fonts/NotoAr-700.woff2','./fonts/NotoAr-800.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cl=res.clone();caches.open(C).then(c=>c.put('./index.html',cl));return res}).catch(()=>caches.match('./index.html')));return;
  }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cl=res.clone();caches.open(C).then(c=>c.put(r,cl))}return res})));
});
