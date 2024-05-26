import{a as y,S as L,i as w}from"./assets/vendor-b0d10f48.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const b="43983774-8711aa48aacb0ae1050be5e44";async function u(r,o=1,a=15){const t={method:"get",url:"https://pixabay.com/api/",params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:a},headers:{"Content-Type":"application/json"}};try{return(await y(t)).data.hits}catch(n){throw console.error("Error fetching images:",n.message),n}}function v(){const r=document.querySelector(".gallery");r.innerHTML=""}function m(r){const o=document.querySelector(".gallery"),a=r.map(s=>`
   <a href="${s.largeImageURL}" data-lightbox="gallery">
   <div class="card">
   <img src="${s.webformatURL}" alt="${s.tags}">
   <div class="card-details">
   <p>Likes: ${s.likes}</p>
   <p>Views: ${s.views}</p>
   <p>Comments: ${s.comments}</p>
   <p>Downloads: ${s.downloads}</p>

   </div>
   </div>
   </a>
   `).join("");o.insertAdjacentHTML("beforeend",a)}const E=document.getElementById("searchForm"),I=document.getElementById("searchInput"),f=document.querySelector(".loader"),P=document.querySelector(".gallery"),d=document.getElementById("loadMoreBtn"),p=new L(".gallery a");let c=1,g="",S=0;function i(r){w.error({title:"Error",message:r,position:"topRight"})}function h(){f.classList.add("show")}function l(){f.classList.remove("show")}async function $(){try{h(),c++;const r=await u(g,c);l(),m(r),p.refresh(),P.children.length>=S&&(d.style.display="none",i("We're sorry, but you've reached the end of search results."))}catch(r){l(),console.error("Error fetching images:",r.message),i("Failed to fetch more images. Please try again later.")}}d.addEventListener("click",$);E.addEventListener("submit",async r=>{r.preventDefault();const o=I.value.trim();if(!o){i("Please enter a search term");return}c=1,g=o,v();try{h();const a=await u(o,c);l(),m(a),p.refresh(),d.style.display="block"}catch(a){l(),console.error("Error fetching images:",a.message),i("Failed to fetch images. Please try again later.")}});
//# sourceMappingURL=commonHelpers.js.map
