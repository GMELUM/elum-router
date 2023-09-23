import{atom as t,getter as e,setter as o,globalSignal as r}from"elum-state/solid";import a from"@vkontakte/vk-bridge";import{createStore as n}from"solid-js/store";import{onMount as p}from"solid-js";const s=(t,e,o=[])=>{if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){if(t.constructor!==e.constructor)return!1;var r,a,n;if(Array.isArray(t)){if((r=t.length)!=e.length)return!1;for(a=r;0!=a--;)if(!s(t[a],e[a]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if((r=(n=Object.keys(t)).length)!==Object.keys(e).length)return!1;for(a=r;0!=a--;){var p=n[a];if(!o.includes(p)){if(!Object.prototype.hasOwnProperty.call(e,p))return!1;if(!s(t[p],e[p]))return!1}}return!0}return t!=t&&e!=e},i={panel:"default",modal:void 0,popout:void 0,stay:!1,freeze:!1,params:{}},l={},u=t({key:"router_active_app"}),c=t({key:"router_active_view"}),f=t({key:"router_active_panel"}),m=t({key:"router_active_modal"}),y=t({key:"router_active_popout"}),d=t({key:"router_active_notify"}),v=t({key:"router_active_params"}),_=["popout","modal","panel"],h=t=>{"file:"!==window.location.protocol&&window.history.pushState(null,"");const r=e(u),a=t.view||e(c);l[r]||(l[r]={__snapshot:[]}),l[r][a]||(l[r][a]=[i]);const n=l[r][a].length,p=l[r][a][n-1],d={view:a,panel:t.panel||p.panel,modal:t.modal||p.modal,popout:t.popout||p.popout,stay:t.stay||i.stay,freeze:t.freeze||i.freeze,params:t.params||p.params};for(let e of _){if(t[e])break;d[e]=i[e]}s(p,d)||l[r][a].push(d),l[r].__snapshot=[d],o(u,r),o(c,a),o(f,d.panel),o(m,d.modal),o(y,d.popout),o(v,d.params),t.clear&&a!=a&&(l[r].__snapshot=[i],l[r][a]=[i])},w=(t={ignoreFreeze:!1,toStay:!1})=>{"file:"!==window.location.protocol&&window.history.pushState(null,"");const r=e(u),n=e(c),p=l[r][n],s=((t,e)=>{const o=typeof t;if("boolean"===o&&!t)return e.length-2;const r="boolean"===o?Boolean:String;for(let o=e.length-1;o>0;o--)if(r(e[o].stay)===t)return o;return 0})(t.toStay||!1,p);if(1===p.length)return void a.send("VKWebAppClose",{status:"success"});const i=p.at(-1);i&&i.freeze&&!t.ignoreFreeze||(l[r].__snapshot=[{view:n,...p[s]}],o(u,r),o(c,n),o(f,p[s].panel),o(m,p[s].modal),o(y,p[s].popout),o(v,p[s].params),p.splice(s+1))},g=(t,e)=>{l[t]||(l[t]={__snapshot:[Object.assign(i,e)]});const r=l[t].__snapshot[0];o(u,t),o(c,r.view||e.view),o(f,r.panel||e.panel),o(m,r.modal||e.modal),o(y,r.popout||e.popout),o(v,r.params||e.params)};function b(t,e,r,a){return a?function(t,e,r,a){const n=()=>(o(d,void 0),a);o(d,{type:t,params:r,callback:n}),e&&setTimeout((()=>{n()({type:t,params:r})}),e)}(t,e,r,a):function(t,e,r){return new Promise((a=>{const n=()=>(o(d,void 0),a);o(d,{type:t,params:r,callback:n}),e&&setTimeout((()=>{n()({type:t,params:r})}),e)}))}(t,e,r)}function k(t){try{const r=e(d);return(!t||r.type===t)&&(o(d,void 0),r.callback({type:r.type,params:r.params}),!0)}catch{return!1}}const O=()=>{const[t]=n(e(v));return t},j={view:c,panel:f,modal:m,popout:y},S=t=>{const[e]=r(j[t]);return e},z=()=>{const[t]=r(d),e=t();return e?{type:e.type,params:e.params}:{type:void 0,params:{}}},A=t=>(e(u)&&e(c)||g(t.app||"app",{view:t.branch}),p((()=>{window.addEventListener("popstate",(()=>w())),"file:"!==window.location.protocol&&window.history.pushState(void 0,"")})),t.children);export{u as ACTIVE_APP,m as ACTIVE_MODAL,d as ACTIVE_NOTIFY,f as ACTIVE_PANEL,v as ACTIVE_PARAMS,y as ACTIVE_POPOUT,c as ACTIVE_VIEW,A as Router,w as backPage,k as hideNotify,h as nextPage,b as showNotify,g as swapApp,z as useNotify,O as useParams,S as useRouter};