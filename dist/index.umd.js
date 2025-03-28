!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).ImageHotSpot=e()}(this,(function(){"use strict";return class{constructor(t){this.container=null,this.canvas=null,this.isInit=!1,this.handleMouseDownFunc=t=>{},this.scale=1,this.hotImgWidth=0,this.hotImgHeight=0,this.options=t,this.init()}init(){if(this.container="string"==typeof this.options.el?document.querySelector(this.options.el):this.options.el,!this.container)throw new Error(`${this.options.el||""} container is not found`);this.options.addMode=this.options.addMode||"default",this.initDefaultProps(),this.initSquarePos(),!0!==this.options.customUpload&&this.resetInit()}initDefaultProps(){var t,e,s,i,o,n,l,a,r,c,h,d,u,p,v,m,f,g,x,b,y,q,w,j,T,z,$,O,E;const{size:I,width:M="8px",height:P="8px",borderColor:S="#1447FF",backgroundColor:k="#1447FF"}=(null===(t=this.options)||void 0===t?void 0:t.handle)||{},A=`position: absolute;border: 1px solid ${S};background-color: ${k};box-sizing: border-box;width: ${I||M};height: ${I||P};`;this.defaultProps={canvas:Object.assign({className:"hot-container",cssText:"width: 100%; height: 100%; position: relative; border: 1px dashed #ccc; box-sizing: border-box;"},(null===(s=null===(e=this.options)||void 0===e?void 0:e.style)||void 0===s?void 0:s.canvas)||{}),container:Object.assign({className:"hot-container",cssText:"width: 100%; height: 100%; position: relative;"},(null===(o=null===(i=this.options)||void 0===i?void 0:i.style)||void 0===o?void 0:o.container)||{}),square:Object.assign({className:"hot-square",cssText:`width: 88px; height: 88px; background-color: rgba(20, 71, 255, 0.2); border: 1px dashed ${S}; cursor: move; position: absolute; left: 0px; top: 0px; opacity: 1; box-sizing: border-box;`},(null===(l=null===(n=this.options)||void 0===n?void 0:n.style)||void 0===l?void 0:l.square)||{}),content:Object.assign({className:"hot-content",cssText:"display:none"},(null===(r=null===(a=this.options)||void 0===a?void 0:a.style)||void 0===r?void 0:r.content)||{}),lt:Object.assign({className:"lt",cssText:`${A}cursor: nw-resize;top: -4px;left: -4px;`},(null===(h=null===(c=this.options)||void 0===c?void 0:c.style)||void 0===h?void 0:h.lt)||{}),lm:Object.assign({className:"lm",cssText:`${A}cursor: e-resize;top: 50%;left: -4px;transform: translateY(-50%);`},(null===(u=null===(d=this.options)||void 0===d?void 0:d.style)||void 0===u?void 0:u.lm)||{}),lb:Object.assign({className:"lb",cssText:`${A}cursor: ne-resize;bottom: -4px;left: -4px;`},(null===(v=null===(p=this.options)||void 0===p?void 0:p.style)||void 0===v?void 0:v.lb)||{}),bm:Object.assign({className:"bm",cssText:`${A}cursor: n-resize;bottom: -4px;left: 50%;transform: translateX(-50%);`},(null===(f=null===(m=this.options)||void 0===m?void 0:m.style)||void 0===f?void 0:f.bm)||{}),br:Object.assign({className:"br",cssText:`${A}cursor: se-resize;bottom: -4px;right: -4px;`},(null===(x=null===(g=this.options)||void 0===g?void 0:g.style)||void 0===x?void 0:x.br)||{}),rm:Object.assign({className:"rm",cssText:`${A}cursor: e-resize;top: 50%;right: -4px;transform: translateY(-50%);`},(null===(y=null===(b=this.options)||void 0===b?void 0:b.style)||void 0===y?void 0:y.rm)||{}),tm:Object.assign({className:"tm",cssText:`${A}cursor: n-resize;top: -4px;left: 50%;transform: translateX(-50%);`},(null===(w=null===(q=this.options)||void 0===q?void 0:q.style)||void 0===w?void 0:w.tm)||{}),rt:Object.assign({className:"rt",cssText:`${A}cursor: ne-resize;top: -4px;right: -4px;`},(null===(T=null===(j=this.options)||void 0===j?void 0:j.style)||void 0===T?void 0:T.rt)||{}),seq:Object.assign({className:"hot-seq",cssText:"min-width: 14px; min-height: 14px; text-align: center; color: #fff; line-height: 14px; position: absolute; top: 0px; left: 0px; background-color: red; font-size: 10px;cursor:default"},(null===($=null===(z=this.options)||void 0===z?void 0:z.style)||void 0===$?void 0:$.seq)||{}),del:Object.assign({className:"hot-del",cssText:"width: 16px; height: 16px; position: absolute; right: -20px; top: -20px; z-index: 2; cursor: pointer;"},(null===(E=null===(O=this.options)||void 0===O?void 0:O.style)||void 0===E?void 0:E.del)||{})}}initSquarePos(){this.squarePos=Object.assign({x:0,y:0,w:80,h:80},this.options.squarePos||{})}resetInit(){this.isInit=!0,this.generateContainer(),this.handleMouseDownFunc=this.handleMouseDown.bind(this),this.canvas.addEventListener("mousedown",this.handleMouseDownFunc),setTimeout((()=>{var t,e;null===(e=null===(t=this.options)||void 0===t?void 0:t.afterInit)||void 0===e||e.call(t)}))}generateContainer(){var t;const e=this.createElement("div",Object.assign({},this.defaultProps.canvas));null===(t=this.container)||void 0===t||t.appendChild(e),this.canvas=e}addHotArea({x:t=this.squarePos.x,y:e=this.squarePos.y,w:s=this.squarePos.w,h:i=this.squarePos.h}={},o){var n,l,a,r;if(null===(l=null===(n=this.options)||void 0===n?void 0:n.beforeAdd)||void 0===l?void 0:l.call(n,this.hasBackgroundImage()))return Promise.reject(new Error("beforeAdd return false"));if(!this.canvas||!this.container)return Promise.reject(new Error("Please initialize the instance first"));if("default"===this.options.addMode||o){const o=this.container.querySelectorAll(".hot-square").length+1,n=this.createHotSquare(o,{style:{left:parseFloat(t)+"px",top:parseFloat(e)+"px",width:parseFloat(s)+"px",height:parseFloat(i)+"px"}});return this.canvas.appendChild(n),null===(r=null===(a=this.options)||void 0===a?void 0:a.afterAdd)||void 0===r||r.call(a,{seq:o,square:n}),Promise.resolve({index:o-1,square:n})}return Promise.reject(new Error("options addMode is not default"))}createHotSquare(t,e){return this.createElement("div",Object.assign(Object.assign({},this.defaultProps.square),e),[this.createElement("div",Object.assign({},this.defaultProps.content),this.createElement("div",Object.assign({},this.defaultProps.lt)),this.createElement("div",Object.assign({},this.defaultProps.lm)),this.createElement("div",Object.assign({},this.defaultProps.lb)),this.createElement("div",Object.assign({},this.defaultProps.bm)),this.createElement("div",Object.assign({},this.defaultProps.br)),this.createElement("div",Object.assign({},this.defaultProps.rm)),this.createElement("div",Object.assign({},this.defaultProps.rt)),this.createElement("div",Object.assign({},this.defaultProps.tm)),this.createElement("div",Object.assign({},this.defaultProps.del),this.createElement("div",{className:"lines",cssText:" width: 16px;height: 16px;position: relative;cursor: pointer;border-radius: 50%;background: #ff4b4b;transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);display: flex;align-items: center;justify-content: center;"},[this.createElement("div",{className:"line",cssText:" position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(45deg);"}),this.createElement("div",{className:"line",cssText:" position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(-45deg);"})]))),this.createElement("div",Object.assign({},this.defaultProps.seq),t)])}createElement(t,...e){const s="object"!=typeof e[0]||Array.isArray(e[0])?{}:e.shift();let i=e.flat(1/0);const o=document.createElement(t);((t,e)=>{e.cssText&&(t.style.cssText=e.cssText,Reflect.deleteProperty(e,"cssText")),e.style&&("string"==typeof e.style?t.style.cssText=e.style:"object"==typeof e.style&&Object.assign(t.style,e.style),Reflect.deleteProperty(e,"style"))})(o,s);for(const[t,e]of Object.entries(s))if("className"!==t||"string"!=typeof e)if("htmlFor"!==t||"string"!=typeof e)if(/^on[A-Z]/.test(t)&&"function"==typeof e){const s=t.slice(2).toLowerCase();o.addEventListener(s,e)}else"style"!==t?"boolean"!=typeof e?o.setAttribute(t,e):e?o.setAttribute(t,""):o.removeAttribute(t):"object"==typeof e?Object.assign(o.style,e):"string"==typeof e&&(o.style.cssText=e);else o.setAttribute("for",e);else o.className=e;return i=i.flat(1/0).filter((t=>null!=t&&!1!==t)).map((t=>"string"==typeof t||"number"==typeof t?document.createTextNode(String(t)):t)),i.forEach((t=>{t instanceof Node?o.appendChild(t):console.warn("Invalid child element:",t)})),o}delHotArea(t){const e=t.closest(".hot-square");if(e){const t=1*e.querySelector(".hot-seq").innerText,s=()=>{e.remove(),this.resetHotSeq(t)};"function"==typeof this.options.beforeDel?this.options.beforeDel(t,e,s):s()}}resetHotSeq(t){if(!this.container)return;this.container.querySelectorAll(".hot-square").forEach((e=>{const s=e.querySelector(".hot-seq");if(s){const e=Number(s.innerText);e>t&&(s.innerText=String(e-1))}}))}handleMouseDown(t){if(t.preventDefault(),!this.canvas)return;const{target:e}=t,s=e.className,i=e.closest(".hot-del");if(i)return this.delHotArea(i);let o=null;if(["lt","lm","lb","bm","br","rm","rt","tm","hot-square"].includes(s)){const i="hot-square"===s?e:e.closest(".hot-square"),n=this.canvas.querySelector(".hot-active");n&&n.parentElement!==i&&(n.classList.remove("hot-active"),n.style.display="none"),o=i.querySelector(".hot-content"),o&&!o.classList.contains("hot-active")&&(o.classList.add("hot-active"),o.style.display="block",i.style.zIndex=String(this.getMaxZIndex()+1)),this.startDrag(t,i,s,o)}else if("hot-container"===s&&"manual"===this.options.addMode){const e=this.canvas.getBoundingClientRect(),s=e.left,i=e.top;let o=t.clientX-s,n=t.clientY-i;const l=this.createElement("div",{className:"hot-line",style:{left:o+"px",top:n+"px",width:"0px",height:"0px",border:"1px solid red",boxSizing:"border-box",position:"absolute"}});this.canvas.appendChild(l);let a=0,r=0;const c=l.offsetLeft,h=l.offsetTop,d=this.canvas.offsetWidth-c,u=this.canvas.offsetHeight-h,p=l.offsetWidth,v=l.offsetHeight;document.onmousemove=e=>{const{clientX:m,clientY:f}=e,g=t.clientX-m,x=t.clientY-f,b=m-s-o,y=f-i-n;let q=b,w=y;m<t.clientX?(q=p+g,q=q>c?c:q,o=m-s,o=o<0?0:o):q=b>d?d:b,f<t.clientY?(w=v+x,w=w>h?h:w,n=f-i,n=n<0?0:n):w=y>u?u:y,l.style.left=o+"px",l.style.top=n+"px",l.style.width=q+"px",l.style.height=w+"px",a=q,r=w},document.onmouseup=t=>{var e,s;l&&(null===(e=this.canvas)||void 0===e||e.removeChild(l));const i=()=>this.addHotArea({x:o+"px",y:n+"px",w:a+"px",h:r+"px"},!0);if("manual"===(null===(s=this.options)||void 0===s?void 0:s.addMode)&&a>16&&r>16)if("function"==typeof this.options.manualAdd){const t=this.hasBackgroundImage();!0===this.options.customUpload||t?!0===this.options.customUpload&&t&&this.options.manualAdd(i)&&i():this.options.manualAdd(i)&&i()}else i();document.onmousemove=null,document.onmouseup=null}}}startDrag(t,e,s,i){var o,n;const{clientX:l,clientY:a}=t,r=e.offsetWidth,c=e.offsetHeight,h=parseInt(e.style.left)||0,d=parseInt(e.style.top)||0,u=(null===(o=this.canvas)||void 0===o?void 0:o.offsetWidth)||0,p=(null===(n=this.canvas)||void 0===n?void 0:n.offsetHeight)||0,v=u-r,m=p-c;document.onmousemove=t=>{this.handleMouseMove(t,s,e,l,a,r,c,h,d,v,m,20,u,p)},document.onmouseup=()=>{var t,e;null===(e=null===(t=this.options)||void 0===t?void 0:t.overlapCallback)||void 0===e||e.call(t,this.areElementsOverlapping(this.canvas)),i&&(i.style.opacity="1"),document.onmousemove=null,document.onmouseup=null}}handleMouseMove(t,e,s,i,o,n,l,a,r,c,h,d,u,p){const v=t.clientX-i,m=t.clientY-o;switch(e){case"hot-square":this.moveSquare(s,a,r,v,m,c,h);break;case"lt":this.resizeLT(s,n,l,a,r,v,m,d,u,p);break;case"lb":this.resizeLB(s,n,l,a,r,v,m,d,u,p);break;case"rt":this.resizeRT(s,n,l,a,r,v,m,d,u,p);break;case"br":this.resizeBR(s,n,l,a,r,v,m,d,u,p);break;case"lm":this.resizeLM(s,n,a,v,d,u);break;case"rm":this.resizeRM(s,n,a,v,d,u);break;case"tm":this.resizeTM(s,l,r,m,d,p);break;case"bm":this.resizeBM(s,l,r,m,d,p)}}moveSquare(t,e,s,i,o,n,l){const a=Math.max(0,Math.min(e+i,n)),r=Math.max(0,Math.min(s+o,l));t.style.left=`${a}px`,t.style.top=`${r}px`}resizeLT(t,e,s,i,o,n,l,a,r,c){let h=e+(n=-n),d=i-n,u=s+(l=-l),p=o-l;h<a&&(h=a,d=i+e-a),d<0&&(d=0,h=e+i),d+h>r&&(h=r-d),u<a&&(u=a,p=o+s-a),p<0&&(p=0,u=s+o),p+u>c&&(u=c-p),t.style.width=`${h}px`,t.style.height=`${u}px`,t.style.left=`${d}px`,t.style.top=`${p}px`}resizeLB(t,e,s,i,o,n,l,a,r,c){let h=e-n,d=i+n,u=s+l;h<a&&(h=a,d=i+(e-a)),d<0&&(d=0,h=e+i),d+h>r&&(h=r-d),u<a&&(u=a),o+u>c&&(u=c-o),t.style.width=`${h}px`,t.style.left=`${d}px`,t.style.height=`${u}px`}resizeRT(t,e,s,i,o,n,l,a,r,c){let h=e+n,d=s+(l=-l),u=o-l;h<a&&(h=a),i+h>r&&(h=r-i),d<a&&(d=a,u=o+s-a),u<0&&(u=0,d=s+o),u+d>c&&(d=c-u),t.style.width=`${h}px`,t.style.height=`${d}px`,t.style.top=`${u}px`}resizeBR(t,e,s,i,o,n,l,a,r,c){let h=e+n,d=s+l;h<a&&(h=a),i+h>r&&(h=r-i),d<a&&(d=a),o+d>c&&(d=c-o),t.style.width=`${h}px`,t.style.height=`${d}px`}resizeLM(t,e,s,i,o,n){let l=e-i,a=s+i;l<o&&(l=o,a=s+(e-o)),a<0&&(a=0,l=e+s),a+l>n&&(l=n-a),t.style.width=`${l}px`,t.style.left=`${a}px`}resizeRM(t,e,s,i,o,n){let l=e+i;l<o&&(l=o),s+l>n&&(l=n-s),t.style.width=`${l}px`}resizeTM(t,e,s,i,o,n){let l=e+(i=-i),a=s-i;l<o&&(l=o,a=s+e-o),a<0&&(a=0,l=e+s),a+l>n&&(l=n-a),t.style.height=`${l}px`,t.style.top=`${a}px`}resizeBM(t,e,s,i,o,n){let l=e+i;l<o&&(l=o),s+l>n&&(l=n-s),t.style.height=`${l}px`}uploadHotImg(t){return new Promise(((e,s)=>{var i;const o=new Image;o.src=t,o.style.cssText="position:absolute;left:0;top:0;opacity:0",null===(i=this.container)||void 0===i||i.appendChild(o),o.onload=()=>{this.scaleCalc(o.offsetWidth,o.offsetHeight,t,e),o.remove()},o.onerror=()=>{o.remove(),s(new Error("Image load error"))}}))}scaleCalc(t,e,s,i){var o,n;if(this.isInit||this.resetInit(),!this.container||!this.canvas)return;const{offsetWidth:l,offsetHeight:a}=this.container,r=t/e,c=l/a;let h;h="auto"===this.options.scaleMode&&t<l&&e<a?1:r>c?l/t:a/e,this.canvas.style.cssText=`\n        position: absolute;\n        width: ${t*h}px;\n        height: ${e*h}px;\n        background-image: url(${s});\n        left: 50%;\n        top: 50%;\n        transform: translate(-50%, -50%);\n        background-size: contain;\n        background-repeat: no-repeat;\n        background-position: center;\n        box-sizing: border-box;\n        border: 1px dashed #ccc;\n      `;const d=(null===(n=null===(o=this.options)||void 0===o?void 0:o.style)||void 0===n?void 0:n.canvas)||{};Object.keys(d).forEach((t=>{this.canvas&&(this.canvas.style[t]=d[t])})),this.scale=h,this.hotImgWidth=t*h,this.hotImgHeight=e*h,i({w:this.hotImgWidth,h:this.hotImgHeight,scale:this.scale})}hasBackgroundImage(){if(!this.canvas)return!1;const t=getComputedStyle(this.canvas).backgroundImage;return"none"!==t&&t.includes("url(")}delImage(){var t;this.canvas&&(this.canvas.style.backgroundImage="none",this.canvas.style.display="none",null===(t=this.container)||void 0===t||t.querySelectorAll(".hot-square").forEach((t=>t.remove())))}destroy(){var t,e,s;null===(t=this.container)||void 0===t||t.querySelectorAll(".hot-square").forEach((t=>t.remove())),null===(e=this.canvas)||void 0===e||e.remove(),null===(s=this.container)||void 0===s||s.removeEventListener("mousedown",this.handleMouseDownFunc),this.canvas=null,this.isInit=!1,this.container=null}getMaxZIndex(){var t;const e=null===(t=this.container)||void 0===t?void 0:t.querySelectorAll(".hot-square");return(null==e?void 0:e.length)?Math.max(...Array.from(e).map((t=>parseInt(getComputedStyle(t).zIndex)||1))):1}areElementsOverlapping(t=this.canvas){const e=t.querySelectorAll(".hot-square"),s=e.length;for(let t=0;t<s;t++){const i=e[t].getBoundingClientRect();for(let o=t+1;o<s;o++){const t=e[o].getBoundingClientRect();if(!(t.left>i.right||t.right<i.left||t.top>i.bottom||t.bottom<i.top))return!0}}return!1}getHotAreaData(t="array"){const e=this.container.querySelectorAll(".hot-square"),s=Array.from(e).reduce(((t,e)=>{const s=e.querySelector(".hot-seq");if(!s)return t;const i=parseInt(s.innerText)-1,o=parseFloat(e.style.left||"0"),n=parseFloat(e.style.top||"0"),l=t;return l[i]={x:o,y:n,w:e.offsetWidth,h:e.offsetHeight,index:i},l}),{});return"array"===t?Object.values(s):s}}}));
