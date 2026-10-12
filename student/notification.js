try{var s=JSON.parse(localStorage.getItem("crimson_portal_v2"));if(s&&s.set&&s.set.theme==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}
;
        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const leftSidebar = document.getElementById('leftSidebar');

            mobileMenuBtn?.addEventListener('click', () => {
                leftSidebar.classList.toggle('mobile-sidebar-active');
            });
        });
    
;
/* CRIMSON shared portal logic. Role comes from the filename: staff_* pages = staff, all others = student.
   State lives in localStorage so every page sees the same registrations, saves and notifications. */
(()=>{"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const D=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const TODAY=D(0),fmt=d=>new Date(d+"T00:00").toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}),fmtS=d=>new Date(d+"T00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"});
const rel=d=>{const n=Math.round((new Date(TODAY+"T00:00")-new Date(d+"T00:00"))/864e5);return n<=0?"Today":n===1?"Yesterday":n<7?n+" days ago":fmt(d)};
const ampm=t=>{const[h,m]=t.split(":").map(Number);return(h%12||12)+":"+String(m).padStart(2,"0")+" "+(h<12?"AM":"PM")};
const PN="COLLEGE OF COMPUTING STUDIES - COUNCIL",KEY="crimson_portal_v2";
const DEPTS=[["WMSU","Western Mindanao State University","General updates & notices","graduation-cap"],["CCS","College of Computing Studies","CSS Department","laptop-code"],["CM","College of Medicine","CM Department","compass-drafting"],["CLA","College of Liberal Arts","CLA Department","flask"],["CTE","College of Education","CTE Department","chalkboard-user"],["COE","College of Engineering","COE Department","gear"],["CN","College of Nursing","CN Department","user-nurse"],["CCJE","College of Criminal Justice Education","CCEJE Department","users-gear"],["CA","College of Architecture","CA Department","ruler-combined"],["CL","College of Law","CL Department","scale-balanced"],["CSM","College of Science & Mathematics","CSM Department","atom"],["CSSPE","College of Sports Science & PE","CSSPE Department","dumbbell"]];
const seed=()=>({nid:100,mode:"",
U:{name:"Alex Rivera",id:"2026-00123",email:"alex.rivera@wmsu.edu.ph",course:"BS Computer Science",cc:"BSCS",year:"2nd Year",contact:"",dept:"CCS"},
P:{name:PN,short:"CCS",dept:"CCS",desc:"Official student council page of the College of Computing Studies.",email:"ccs.council@wmsu.edu.ph",org:"Student Council"},
ann:[{id:1,title:"Midterm Examination Schedule",cat:"Academic",body:"Midterm exams run from October 20 to 24. Bring your ID and writing materials.",date:D(-6),author:"Registrar's Office",dept:"WMSU",status:"Published"},
{id:2,title:"Classes Suspended on Oct 8",cat:"Urgent",body:"Classes are suspended due to a typhoon warning. Follow the modular learning guide.",date:D(-2),author:"Office of the President",dept:"WMSU",status:"Published"},
{id:3,title:"CCS Week 2026 Schedule Released",cat:"General",body:"CCS Week runs from October 14 to 18. Check the events tab for the full program.",date:D(-3),author:PN,dept:"CCS",status:"Published"},
{id:4,title:"BSCS Thesis Defense Schedule",cat:"Academic",body:"Thesis defense schedules for BSCS 4th year students are posted at the department office.",date:D(-2),author:"CCS Department Office",dept:"CCS",status:"Published",courses:["BSCS"]}],
evt:[{id:1,title:"Annual Campus Tech Innovation Expo Registration Open",date:D(42),time:"09:00",end:"17:00",venue:"Main Lobby",cap:500,desc:"Join fellow student innovators and developers this coming month! Registration is open for project exhibits and hackathon tracks. Certificates and prize grants will be awarded.",status:"Open",host:"Student Affairs Office",dept:"WMSU",posted:D(-1),deadline:D(32),img:"https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"},
{id:2,title:"CCS Week Opening Ceremony",date:D(5),time:"07:30",end:"12:00",venue:"University Gym",cap:200,desc:"Wear the official CCS shirt.",status:"Open",host:PN,dept:"CCS",posted:D(-3),deadline:D(3)},
{id:3,title:"CCS Hackathon 2026",date:D(13),time:"09:00",end:"17:00",venue:"Computer Lab 3",cap:8,desc:"A build challenge. Bring your laptop.",status:"Open",host:PN,dept:"CCS",posted:D(-1),deadline:D(11)},
{id:4,title:"Medical Mission 2026",date:D(21),time:"08:00",end:"12:00",venue:"CM Quadrangle",cap:100,desc:"Volunteer for the community medical mission.",status:"Open",host:"CM Student Council",dept:"CM",posted:D(-2),deadline:D(16)},
{id:5,title:"CCS Quiz Bee 2026",date:D(9),time:"13:00",end:"16:00",venue:"AVR",cap:40,desc:"Individual quiz bee on programming, networking and databases. Top 3 win prizes and certificates.",status:"Open",host:PN,dept:"CCS",posted:D(0),deadline:D(6)}],
posts:[{id:1,author:"Maria Santos",text:"Our hackathon team is ready! 💻",date:D(-1),dept:"CCS"},{id:2,author:PN,text:"Reminder: wear the official CCS shirt for the opening ceremony. See you there!",date:D(-1),dept:"CCS"},{id:3,author:"Student Affairs Office",text:"Reminder: student IDs must be validated before October 15.",date:D(-3),dept:"WMSU"}],
regs:[{id:1,ev:2,sid:"2026-00123",name:"Alex Rivera",course:"BSCS",status:"Approved",att:"—",date:D(-4),mine:true},{id:2,ev:3,sid:"2026-0098",name:"Maria Santos",course:"BSCS",status:"Pending",att:"—",date:D(-2)},{id:3,ev:3,sid:"2026-0120",name:"Carlos Reyes",course:"BSIT",status:"Approved",att:"—",date:D(-2)},{id:4,ev:2,sid:"2026-0155",name:"Angela Cruz",course:"BSIS",status:"Pending",att:"—",date:D(-1)}],
notifs:[{id:1,for:"student",t:"ann",acad:1,src:"College of Computing Studies",title:"Midterm Examination Schedule Update",text:"Revised exam room assignments for BSCS 2nd Year students have been posted.",date:TODAY,read:false},
{id:2,for:"student",t:"evt",src:"WMSU Student Council",title:"Upcoming Campus Hackathon 2026",text:"Registration is now open. Register before the deadline.",date:D(-1),read:false},
{id:3,for:"student",t:"sys",src:"CRIMSON",title:"Registration approved",text:"Your registration for CCS Week Opening Ceremony was approved.",date:D(-3),read:true},
{id:4,for:"staff",t:"sys",src:"CRIMSON",title:"Registrations to review",text:"2 registrations are waiting for your review.",date:TODAY,read:false}],
fol:["WMSU","CCS","CM","COE","CN"],set:{scope:"mine",campus:true,dept:true,evt:true,urgent:true,theme:"light"}});
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}if(!S||!S.U)S=seed();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast("Browser storage is full. Remove some images or posts.")}};
const IMGKEY="crimson_imgs_v1",STORE_MSG="Not enough browser storage for these images. Remove an old image or use a smaller one.",PEND={e:"",a:""};let IMG={};try{IMG=JSON.parse(localStorage.getItem(IMGKEY))||{}}catch(e){}
const persistImgs=()=>{try{localStorage.setItem(IMGKEY,JSON.stringify(IMG));return true}catch(e){return false}};
const imgSrc=r=>r?(r[0]==="@"?IMG[r]||"":r):"";
const putImgs=a=>{const added=[],out=a.map(x=>{if(!x.startsWith("data:"))return x;const k="@i"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);IMG[k]=x;added.push(k);return k});if(added.length&&!persistImgs()){added.forEach(k=>delete IMG[k]);return null}return out};
const gc=()=>{const u=new Set([...S.evt.map(e=>e.img),...S.ann.map(a=>a.img),...S.posts.flatMap(p=>p.imgs||[])]);let ch=false;for(const k of Object.keys(IMG))if(!u.has(k)){delete IMG[k];ch=true}if(ch)persistImgs()};
const usage=()=>JSON.stringify(S).length+JSON.stringify(IMG).length+V.pimgs.concat(V.eimgs,Object.values(PEND)).filter(x=>x&&x.startsWith("data:")).reduce((a,x)=>a+x.length,0);
const readImg=f=>new Promise((res,rej)=>{if(!f||!/^image\//.test(f.type))return rej(new Error("Please choose an image file (JPG, PNG, WebP or GIF)."));if(f.size>15e6)return rej(new Error("That image is over 15 MB."));
 const fr=new FileReader();fr.onerror=()=>rej(new Error("Could not read that file."));
 fr.onload=()=>{const im=new Image();im.onerror=()=>rej(new Error("That file is not a valid image."));
  im.onload=()=>{const w=im.width||1200,h=im.height||800,k=Math.min(1,1200/Math.max(w,h)),c=document.createElement("canvas");c.width=Math.round(w*k);c.height=Math.round(h*k);const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);res(c.toDataURL("image/jpeg",.82))};
  im.src=fr.result};fr.readAsDataURL(f)});
const pimg=r=>{const s=imgSrc(r);return s?`<img class="pimg1" src="${esc(s)}" alt="">`:""};
const gal=a=>{const s=(a||[]).map(imgSrc).filter(Boolean);return !s.length?"":s.length===1?`<img class="pimg1" src="${esc(s[0])}" alt="">`:`<div class="pgal">${s.map(x=>`<img src="${esc(x)}" alt="">`).join("")}</div>`};
const thumbs=(arr,k)=>arr.length?`<div class="pthumbs">${arr.map((s,i)=>`<div class="pthumb"><img src="${esc(imgSrc(s))}" alt=""><button class="pthumb-x" data-a="rmimg" data-k="${k}" data-i="${i}" title="Remove">×</button></div>`).join("")}</div>`:"";
const addPhotos=k=>`<label class="pbtn" style="display:inline-flex;gap:.375rem;align-items:center;cursor:pointer"><i class="fa-regular fa-image"></i> Add photos<input type="file" accept="image/*" multiple data-img="${k}" style="display:none"></label> <span class="pmeta">Up to 4 images</span>`;
const pvHtml=k=>PEND[k]?`<img src="${esc(imgSrc(PEND[k]))}" alt="" style="max-width:100%;max-height:12rem;border-radius:.5rem;display:block"><button class="pbtn" style="margin-top:.5rem" data-a="imgclear" data-k="${k}">Remove image</button>`:`<span class="pmeta">No image selected.</span>`;
const imgField=(k,l,h)=>`<label class="plbl">${l}</label><input class="pf-input" type="file" accept="image/*" data-img="${k}"><div id="imgpv-${k}" style="margin-top:.5rem">${pvHtml(k)}</div><p class="pmeta" style="margin-top:.25rem">${h}</p>`;

const F=location.pathname.split("/").pop(),isDash=/dashboard/.test(F),staff=F.startsWith("staff_"),PF=staff?"staff_":"";
const V={sf:"",view:"home",q:"",dept:"mine",more:false,open:new Set(),pimgs:[],eimgs:[],ptxt:"",ev:null,rq:"",rf:"All",af:"All",qr:null,sopen:[],lock:false};
const v=id=>{const x=$("#"+id);return x?x.value.trim():""};
const btn=(a,t,c="",x="")=>`<button class="pbtn ${c}" data-a="${a}" ${x}>${t}</button>`;
const st=s=>`<span class="ptag s-${s}">${s}</span>`;
const pushN=(f,title,text,t="sys")=>{S.notifs.unshift({id:S.nid++,for:f,t,src:"CRIMSON",title,text,date:TODAY,read:false})};
const own=o=>staff&&(o.author===S.P.name||o.host===S.P.name);
const forMe=o=>["WMSU",S.U.dept].includes(o.dept)&&(!o.courses||o.courses.includes(S.U.cc));
const inScope=o=>V.dept==="all"||(V.dept==="mine"?(staff||S.fol.includes(o.dept)):o.dept===V.dept);
const myReg=id=>S.regs.find(r=>r.mine&&r.ev===id&&r.status!=="Cancelled");
const used=e=>S.regs.filter(r=>r.ev===e.id&&!["Cancelled","Declined"].includes(r.status)).length;
const astOf=e=>e.ast||"Not started";
const atag=s=>`<span class="ptag a-${s.replace(" ","")}">${s}</span>`;
const attOf=r=>r.att==="Present"?"Present":astOf(evOf(r))==="Finished"?"Absent":"Pending";
const attS=r=>r.status==="Approved"?attOf(r):"—";
const qrCode=r=>{let h=2166136261;for(const c of r.sid+"|"+r.ev+"|"+r.id+"|crimson"){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return "CRM-"+r.ev+"-"+r.id+"-"+h.toString(36).toUpperCase().padStart(7,"0")};
const qrSvg=t=>{const q=qrcode(0,"M");q.addData(t);q.make();return q.createSvgTag({cellSize:5,margin:2,scalable:true})};
const evOf=r=>S.evt.find(e=>e.id===r.ev)||{title:"(deleted event)",venue:"",date:TODAY};
const byKey=k=>{const id=+k.slice(1),c=k[0];return c==="p"?{t:"p",o:S.posts.find(x=>x.id===id)}:c==="a"?{t:"a",o:S.ann.find(x=>x.id===id)}:{t:"e",o:S.evt.find(x=>x.id===id)}};
const ini=n=>n===S.P.name?S.P.short:n.split(" ").filter(w=>/^[A-Za-z]/.test(w)).map(w=>w[0]).slice(0,3).join("").toUpperCase();
const av=n=>{const p=n===S.P.name;return `<div style="width:2.5rem;height:2.5rem;border-radius:5.75rem;background-color:var(${p?"--brand-100":"--amber-100"});color:var(${p?"--brand-600":"--amber-700"});font-weight:700;display:flex;align-items:center;justify-content:center;font-size:.75rem;flex-shrink:0">${esc(ini(n))}</div>`};
const fld=(l,id,x="",t="text")=>`<label class="plbl">${l}</label><input class="pf-input" id="${id}" type="${t}" value="${esc(x)}">`;
const ta=(l,id,x="")=>`<label class="plbl">${l}</label><textarea class="pf-input" id="${id}" rows="3">${esc(x)}</textarea>`;
const sel=(l,id,arr,x)=>`<label class="plbl">${l}</label><select class="pf-input" id="${id}">${arr.map(o=>`<option ${o===x?"selected":""}>${o}</option>`).join("")}</select>`;
const mfoot=(a,id)=>`<div class="prow" style="margin-top:1rem"><button class="pbtn" data-a="closem">Cancel</button><button class="pbtn p" data-a="${a}" data-id="${id||""}">Save</button></div>`;
let tt;const toast=m=>{const t=$("#ptoast");t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2200)};
const openM=(h,c="")=>{const b=$("#pbox");b.className=("pbox "+c).trim();b.innerHTML=h;const t=$(".ph3",b);if(t){t.id="pbt";b.setAttribute("aria-labelledby","pbt")}$("#pmodal").classList.add("show")},closeM=()=>{if(V.lock)return;V.qr=null;$("#pmodal").classList.remove("show")};
const H4=t=>`<h4 style="font-weight:700;color:var(--slate-900);font-size:1rem;line-height:1.375">${esc(t)}</h4>`,PP=t=>`<p style="color:var(--slate-600);font-size:.875rem;margin-top:.5rem;line-height:1.625">${esc(t)}</p>`;
const PM=[["#9f1239","#fb7185"],["#1e3a8a","#38bdf8"],["#065f46","#34d399"],["#92400e","#fbbf24"],["#4c1d95","#c084fc"]];
const pubmat=e=>{const c=PM[e.id%PM.length],w=(e.title.match(/.{1,22}(\s|$)/g)||[]).slice(0,3).map((l,i)=>`<text x="40" y="${250+i*56}" font-size="44" font-weight="800" fill="#fff" font-family="Arial Black,Arial,sans-serif">${esc(l.trim().toUpperCase())}</text>`).join("");
 return "data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="800" height="400" fill="url(#g)"/><circle cx="680" cy="90" r="120" fill="#fff" fill-opacity=".12"/><circle cx="740" cy="360" r="90" fill="#fff" fill-opacity=".1"/><text x="40" y="70" font-size="22" font-weight="700" fill="#fff" fill-opacity=".85" font-family="Arial,sans-serif">${esc(e.host)}</text><text x="40" y="110" font-size="20" fill="#fff" fill-opacity=".85" font-family="Arial,sans-serif">${fmt(e.date)} · ${esc(e.venue)}</text>${w}</svg>`)};
const DOCS=[["Copy of school ID",1],["Certificate of Registration (COR)",1],["Parent/guardian consent form",0]];
const cover=e=>`<div style="margin-top:1rem;border-radius:.75rem;overflow:hidden;position:relative"><img src="${esc(imgSrc(e.img)||pubmat(e))}" alt="" style="${e.img?"width:100%;max-height:28rem;object-fit:contain;background:var(--slate-100);display:block":"width:100%;height:16rem;object-fit:cover;display:block"}"><div style="position:absolute;bottom:.75rem;right:.75rem;background-color:rgba(15,23,42,.8);backdrop-filter:blur(12px);color:#fff;font-size:11px;font-weight:500;padding:.375rem .75rem;border-radius:.5rem;border:1px solid rgba(255,255,255,.2)">Registration Deadline: ${fmtS(e.deadline)}</div></div>`;
const evBtn=e=>{if(staff)return own(e)?`<button class="action-btn" data-a="gotoreg" data-id="${e.id}"><i class="fa-solid fa-users"></i><span>Registrations</span></button>`:`<span class="pmeta">Managed by ${esc(e.host)}</span>`;
 const r=myReg(e.id),late=e.deadline<TODAY;if(r)return `<span class="ptag s-${r.status}">Registered · ${r.status}</span>`;
 if(e.status!=="Open"||late)return `<span class="pmeta">${late&&e.status==="Open"?"Deadline passed":"Registration closed"}</span>`;
 if(used(e)>=e.cap)return `<span class="pmeta">Full</span>`;
 return `<button class="action-btn" data-a="reg" data-id="${e.id}"><i class="fa-solid fa-user-plus" style="font-size:.875rem"></i><span>Register</span></button>`};
function pcard(k,o,author,sub,body,right){
 return `<article class="card card-interactive" style="padding:1.5rem"><div class="flex items-start justify-between"><div class="flex items-center gap-3">${av(author)}<div><h3 style="font-weight:700;color:var(--slate-900);font-size:.875rem">${esc(author)}</h3><p style="font-size:11px;color:var(--slate-400);margin-top:.125rem">${rel(o.posted||o.date)} · ${o.dept} · ${sub}${o.status==="Draft"?" · Draft":""}</p></div></div><div class="flex items-center gap-2"><button class="action-btn" data-a="kebab" data-k="${k}" style="padding:.25rem"><i class="fa-solid fa-ellipsis-vertical" style="font-size:1rem;color:var(--slate-400)"></i></button></div></div><div style="margin-top:1rem">${body}</div><div class="flex items-center justify-between" style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--slate-100);font-size:.75rem;color:var(--slate-500)"><div class="flex items-center gap-6"><button class="action-btn" data-a="details" data-k="${k}"><i class="fa-regular fa-eye" style="font-size:.875rem"></i><span>View Details</span></button></div>${right||""}</div></article>`}
const CARD={p:o=>pcard("p"+o.id,o,o.author,"Post",(o.text?PP(o.text):"")+gal(o.imgs)),
a:o=>pcard("a"+o.id,o,o.author,"Announcement",H4(o.title)+PP(o.body)+`<span class="ptag" style="margin-top:.5rem">${esc(o.cat)}</span>`+pimg(o.img)),
e:o=>pcard("e"+o.id,o,o.host,"Event",H4(o.title)+PP(o.desc)+`<div class="pmeta" style="margin-top:.5rem"><i class="fa-regular fa-calendar"></i> ${fmt(o.date)} · ${ampm(o.time)} – ${ampm(o.end)} · <i class="fa-solid fa-location-dot"></i> ${esc(o.venue)} · <i class="fa-solid fa-users"></i> ${used(o)}/${o.cap}</div>`+cover(o),evBtn(o))};
const txt=o=>[o.title,o.body,o.text,o.desc,o.venue,o.author,o.host,o.cat].filter(Boolean).join(" ").toLowerCase();
function items(){const q=V.q.toLowerCase(),w=V.view,sf=w==="announcements"||w==="events"?V.sf:"",visA=a=>a.status==="Published"||own(a),visE=e=>e.status!=="Draft"||own(e);
 const P=S.posts.map(o=>({t:"p",o,d:o.date})),A=S.ann.filter(visA).map(o=>({t:"a",o,d:o.date})),E=S.evt.filter(visE).map(o=>({t:"e",o,d:w==="events"?o.date:o.posted}));
 const L=(w==="announcements"?A:w==="events"?E:[...P,...A,...E]).filter(x=>inScope(x.o)&&(staff||V.dept!=="mine"||w==="home"||forMe(x.o))&&(!sf||(sf==="wide"?x.o.dept==="WMSU":x.o.dept===S.U.dept&&(staff||forMe(x.o))))&&txt(x.o).includes(q));
 return L.sort((a,b)=>w==="events"?a.d.localeCompare(b.d):b.d.localeCompare(a.d))}
const sfBar=()=>`<div class="flex gap-2">${btn("sf","Campus-wide",V.sf==="wide"?"p":"",'data-s="wide"')} ${btn("sf","Your department",V.sf==="dept"?"p":"",'data-s="dept"')}</div>`;
const none=t=>`<div class="card" style="padding:1.5rem;color:var(--slate-500);font-size:.875rem">${t}</div>`;
const deptBar=()=>{const d=DEPTS.find(x=>x[0]===V.dept),f=S.fol.includes(d[0]);return `<div class="card prow" style="padding:1rem 1.5rem"><div><b>${d[1]}</b><div class="pmeta">${d[2]}</div></div><span>${btn("dfollow",f?"Following ✓":"Follow",f?"":"p",`data-c="${d[0]}"`)} ${btn("dclear","✕ Clear")}</span></div>`};
const feed=()=>(V.dept!=="mine"&&V.dept!=="all"?deptBar():"")+(items().map(x=>CARD[x.t](x.o)).join("")||none("Nothing found. Try another department or search."));
const hd=(t,r="")=>`<div class="prow"><h2 style="font-family:'Bungee',sans-serif;font-weight:400;color:var(--slate-900)">${t}</h2>${r}</div>`;
const tbl=(h,rows,n)=>`<div class="card" style="padding:1rem;overflow-x:auto"><table class="ptable"><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows||`<tr><td colspan="${n}" class="pmeta">Nothing here yet.</td></tr>`}</table></div>`;
const VIEWS={
home:()=>feed(),
announcements:()=>hd("Announcements",staff?btn("annform","+ New announcement","p"):"")+sfBar()+feed(),
events:()=>hd("Events",staff?btn("evform","+ New event","p"):"")+sfBar()+feed(),
myevents(){
 if(!staff){const qb=(r,e)=>{if(r.status!=="Approved")return "";if(r.att==="Present")return `<button class="pbtn" disabled>Checked in</button>`;const s=astOf(e);return s==="Ongoing"?btn("showqr","Show QR","p",`data-id="${r.id}"`):`<button class="pbtn" disabled>${s==="Finished"?"QR closed":"Not open yet"}</button>`};
  return hd("My Events")+tbl(["Event","Date","Status","Attendance",""],S.regs.filter(r=>r.mine).reverse().map(r=>{const e=evOf(r);return `<tr><td><b>${esc(e.title)}</b><div class="pmeta">${esc(e.venue)}</div></td><td>${fmt(e.date)}</td><td>${st(r.status)}</td><td>${r.status==="Approved"?`${st(attOf(r))}<div class="pmeta" style="margin-top:.375rem">Event: ${atag(astOf(e))}</div><div style="margin-top:.375rem">${qb(r,e)}</div>`:"—"}</td><td>${btn("regview","Show details","",`data-id="${r.id}"`)} ${["Pending","Approved"].includes(r.status)?btn("cancel","Cancel","",`data-id="${r.id}"`):""}</td></tr>`}).join(""),5)}
 const pe=S.evt.filter(e=>e.host===S.P.name);if(!pe.some(e=>e.id===V.ev))V.ev=(pe[0]||{}).id;
 const e=pe.find(x=>x.id===V.ev);if(!e)return hd("Register and Attendance")+none("You have no events yet. Create one from the Events tab.");
 const all=S.regs.filter(r=>r.ev===V.ev),ap=all.filter(r=>r.status==="Approved"),rq=V.rq.toLowerCase(),s=astOf(e);
 const rows=all.filter(r=>(V.rf==="All"||r.status===V.rf)&&(V.af==="All"||attS(r)===V.af)&&(!rq||(r.name+" "+r.sid).toLowerCase().includes(rq)));
 const opt=(a,x)=>a.map(([v,l])=>`<option value="${v}" ${v===x?"selected":""}>${l}</option>`).join("");
 const scan=`<div style="margin-top:.75rem">${SC.on?btn("scanstop","Stop camera"):btn("scanstart","Start camera scanner","p")}<div id="vidSlot" style="margin-top:.75rem"></div><p class="pmeta" style="margin-top:.5rem">${esc(SC.msg||"Start the camera and point it at a student's QR code. A student is marked Present only when their QR is detected.")}</p>${SC.fb?`<div class="flex items-center gap-2" style="margin-top:.5rem"><input class="pf-input" id="ci0" placeholder="Camera unavailable. Type the code under the student's QR" style="flex:1"><button class="pbtn" data-a="checkin">Check in</button></div>`:""}</div>`;
 const bar=`<div class="card" style="padding:1.25rem"><label class="plbl">Event</label><select class="pf-input" data-a="pickev">${pe.map(x=>`<option value="${x.id}" ${x.id===V.ev?"selected":""}>${esc(x.title)}</option>`).join("")}</select><div class="prow" style="margin-top:1rem"><div><b>${esc(e.title)}</b><div class="pmeta">${fmt(e.date)} · ${ampm(e.time)} – ${ampm(e.end)} · ${esc(e.venue)} · ${used(e)}/${e.cap} registered</div></div>${atag(s)}</div><div class="seg" style="margin-top:1rem">${["Not started","Ongoing","Finished"].map(x=>`<button class="seg-b ${s===x?"on":""}" data-a="setast" data-s="${x}" data-id="${e.id}">${x}</button>`).join("")}</div><p class="pmeta" style="margin-top:.5rem">Students can show their QR only while this is Ongoing. When you set it to Finished, anyone not scanned is marked Absent.</p>${s==="Ongoing"?scan:""}</div>`;
 const cnt=x=>ap.filter(r=>attOf(r)===x).length,fil=`<div class="card" style="padding:1rem"><div class="pfilters"><input class="pf-input" data-f="rq" value="${esc(V.rq)}" placeholder="Search student name or ID…"><select class="pf-input" data-a="regf">${opt([["All","All registrations"],["Pending","Pending"],["Approved","Approved"],["Declined","Declined"],["Cancelled","Cancelled"]],V.rf)}</select><select class="pf-input" data-a="attf">${opt([["All","All attendance"],["Pending","Pending"],["Present","Present"],["Absent","Absent"]],V.af)}</select></div><p class="pmeta" style="margin-top:.5rem">${all.length} registered · ${ap.length} approved · ${cnt("Present")} present · ${cnt("Absent")} absent · ${cnt("Pending")} pending</p></div>`;
 return hd("Register and Attendance")+bar+fil+tbl(["Student","Registration","Attendance",""],rows.map(r=>`<tr><td><b>${esc(r.name)}</b><div class="pmeta">${r.sid} · ${esc(r.course)}</div></td><td>${st(r.status)}</td><td>${r.status==="Approved"?st(attOf(r)):`<span class="pmeta">—</span>`}</td><td>${r.status==="Pending"?btn("setst","Approve","p",`data-id="${r.id}" data-s="Approved"`)+" "+btn("setst","Reject","",`data-id="${r.id}" data-s="Declined"`):""}</td></tr>`).join(""),4)},
depts:()=>hd("Departments")+`<div class="pgrid">${DEPTS.map(d=>{const f=S.fol.includes(d[0]);return `<div class="card" style="padding:1.25rem"><div class="flex items-center gap-3"><div class="dept-badge"><i class="fa-solid fa-${d[3]}"></i></div><div class="dept-info"><span class="dept-title">${d[1]}</span><span class="dept-sub">${d[2]}</span></div></div><div style="margin-top:.75rem">${btn("dfollow",f?"Following ✓":"Follow",f?"":"p",`data-c="${d[0]}"`)} ${btn("dept","View posts","",`data-c="${d[0]}"`)}</div></div>`}).join("")}</div>`,
help:()=>hd("Help & Support")+`<div class="card" style="padding:1.5rem"><b>Frequently asked questions</b>${[["How do I register for an event?","Press Register on the event post. Your registration stays Pending until the organizer approves it."],["Where can I see my registration status?","Open My Events. It shows Pending, Approved, Declined or Cancelled, plus attendance."],["Why can't I register anymore?","Registration closes at the deadline shown on the event, or when the event is full or closed."]].map(([q,a])=>`<details class="pdet"><summary>${q}</summary><p class="pmeta" style="margin:.375rem 0">${a}</p></details>`).join("")}</div><div class="card" style="padding:1.5rem"><b>Contact support</b>${fld("Subject","h0")}${ta("Message","h1")}<p style="margin-top:1rem">${btn("sendhelp","Send message","p")}</p></div>`,
settings(){return hd("Settings")+(staff?staffSettings():studentSettings())}};
const PROG=[["BS Computer Science","BSCS"],["BS Information Technology","BSIT"],["BS Information Systems","BSIS"]];
const roF=(l,x)=>`<div><label class="plbl">${l}</label><div class="sro"><input class="pf-input" value="${esc(x)}" readonly tabindex="-1" aria-readonly="true"><i class="fa-solid fa-lock"></i></div></div>`;
const progSel=(id,U)=>{const p=PROG.some(x=>x[1]===U.cc)?PROG:[[U.course,U.cc],...PROG];return `<label class="plbl">Program</label><select class="pf-input" id="${id}">${p.map(x=>`<option value="${x[1]}" ${x[1]===U.cc?"selected":""}>${esc(x[0])}</option>`).join("")}</select>`};
const colSel=(id,c)=>`<label class="plbl">College</label><select class="pf-input" id="${id}">${DEPTS.slice(1).map(d=>`<option value="${d[0]}" ${d[0]===c?"selected":""}>${esc(d[1])}</option>`).join("")}</select>`;
const collegeName=c=>(DEPTS.find(d=>d[0]===c)||DEPTS[1])[1];
function setPage(o){const P=S.P,old=P.name,n=(o.name||"").trim()||old,d=o.dept||P.dept;
 S.ann.forEach(a=>{if(a.author===old){a.author=n;a.dept=d}});S.posts.forEach(p=>{if(p.author===old){p.author=n;p.dept=d}});S.evt.forEach(e=>{if(e.host===old){e.host=n;e.dept=d}});
 P.name=n;if(o.desc!=null)P.desc=o.desc;P.dept=d;P.short=d;if(o.org!=null&&o.org.trim())P.org=o.org.trim();if(o.email!=null)P.email=o.email;save();applyUser()}
const sRow=(t,s,r)=>`<div class="srow"><div><div class="srow-t">${t}</div>${s?`<div class="srow-s">${s}</div>`:""}</div>${r}</div>`;
const sSw=(k,l,s)=>sRow(l,s,`<input type="checkbox" class="sw" data-a="setpref" data-k="${k}" aria-label="${esc(l)}" ${S.set[k]!==false?"checked":""}>`);
const sTheme=()=>{const th=S.set.theme==="dark"?"dark":"light";return sRow("Theme","Switch between a light and a dark appearance.",`<div class="seg">${["light","dark"].map(t=>`<button type="button" class="seg-b ${th===t?"on":""}" data-a="settheme" data-t="${t}" aria-pressed="${th===t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join("")}</div>`)};
const sPass=()=>`<b class="sub-t">Change password</b>${fld("Current password","w0","","password")}${fld("New password","w1","","password")}${fld("Confirm new password","w2","","password")}<p style="margin-top:1rem">${btn("savepw","Update password")}</p>`;
const sSessions=()=>{const ua=navigator.userAgent,br=/Edg\//.test(ua)?"Edge":/OPR\//.test(ua)?"Opera":/Chrome\//.test(ua)?"Chrome":/Firefox\//.test(ua)?"Firefox":/Safari\//.test(ua)?"Safari":"Browser",os=/Windows/.test(ua)?"Windows":/Android/.test(ua)?"Android":/iPhone|iPad/.test(ua)?"iOS":/Mac OS X/.test(ua)?"macOS":/Linux/.test(ua)?"Linux":"this device";
 return sRow("Active sessions",`${br} on ${os} · this device`,`<span class="ptag s-Approved">Active now</span>`)+`<p class="pmeta" style="margin-top:.25rem">Only this device is shown. Sign-ins on other devices are not tracked yet.</p>`};
const sAcc=(id,ic,t,sub,body,cls="")=>{const o=V.sopen.includes(id);return `<section class="card sacc ${cls} ${o?"open":""}" id="set-${id}"><button type="button" class="sacc-h" id="sh-${id}" data-a="sacc" data-s="${id}" aria-expanded="${o}" aria-controls="sp-${id}"><span class="sset-ic"><i class="fa-solid fa-${ic}"></i></span><span class="sacc-tx"><span class="sset-t">${t}</span><span class="sset-s">${sub}</span></span><i class="fa-solid fa-chevron-down sacc-chev"></i></button><div class="sacc-p" id="sp-${id}" role="region" aria-labelledby="sh-${id}" ${o?"":"hidden"}>${body}</div></section>`};
function gotoSet(id,go=true){if(go){V.view="settings";if(!V.sopen.includes(id))V.sopen.push(id);render()}const e=$("#set-"+id);if(e)e.scrollIntoView({behavior:"smooth",block:"start"})}
function studentSettings(){const U=S.U,sp=U.name.trim().split(/\s+/),keep=U.first&&U.last&&(U.first+" "+U.last)===U.name,last=keep?U.last:(sp.length>1?sp.pop():""),first=keep?U.first:sp.join(" "),d=DEPTS.find(x=>x[0]===U.dept)||DEPTS[1],cell=h=>`<div>${h}</div>`;
 const account=`<div class="sgrid">${cell(fld("First name","st0",first))}${cell(fld("Last name","st1",last))}</div>
<div class="sgrid">${roF("Student ID",U.id)}${roF("WMSU email",U.email)}</div>
<div class="sgrid">${roF("College",d[1])}${roF("Department",d[2])}</div>
<p class="pmeta" style="margin-top:.5rem">Student ID, WMSU email, college and department are managed by the university and cannot be changed here.</p>
<div class="sgrid">${cell(progSel("st2",U))}${cell(sel("Year level","st3",["1st Year","2nd Year","3rd Year","4th Year"],U.year))}</div>
<div class="sgrid">${cell(fld("Contact number","st4",U.contact))}</div>
<p style="margin-top:1rem">${btn("saveacct","Save changes","p")}</p>`,
 display=sTheme()+sRow("Feed preferences","Which posts appear on your home feed by default.",`<select class="pf-input" style="width:auto;max-width:100%" data-a="setfeed" aria-label="Default feed"><option value="mine" ${S.set.scope==="mine"?"selected":""}>Colleges I follow</option><option value="all" ${S.set.scope==="all"?"selected":""}>All departments</option></select>`),
 notif=sSw("campus","New campus-wide announcements","Updates from WMSU offices and the university.")+sSw("dept","Department announcements","Posts from your college and department.")+sSw("evt","Upcoming events and registration reminders","Event updates, deadlines and your registration status.")+sSw("urgent","Urgent announcements","Time-sensitive notices such as class suspensions and schedule changes."),
 danger=sRow("Deactivate account","Temporarily hide your account and log out. You can reactivate it any time by logging back in.",btn("deact","Deactivate"))+sRow("Delete account","Permanently delete your account, registrations and preferences. This cannot be undone.",`<button type="button" class="pbtn danger" data-a="del">Delete account</button>`);
 return sAcc("account","user","Account","Manage personal account information.",account)+sAcc("security","shield-halved","Security","Protect your account.",sPass()+'<hr class="shr">'+sSessions())+sAcc("display","sliders","Display","Choose your theme and what you see first.",display)+sAcc("notification","bell","Notification","Choose which updates to receive.",notif)+sAcc("danger","triangle-exclamation","Deactivate or delete account","Temporarily deactivate your account or permanently delete it.",danger,"sacc-danger")}
function staffSettings(){const P=S.P,cell=h=>`<div>${h}</div>`;
 const account=`${fld("Page name","ps0",P.name)}${ta("Description","ps1",P.desc)}<div class="sgrid">${cell(colSel("ps2",P.dept))}${cell(fld("Organization","ps3",P.org||"Student Council"))}</div>${fld("Contact email","ps4",P.email,"email")}<p style="margin-top:1rem">${btn("savepage","Save changes","p")}</p>`,
 notif=sSw("s_reg","New event registrations","When students register for your events.")+sSw("s_evt","Event reminders","Reminders before your events start.")+sSw("s_urg","Urgent announcements","Time-sensitive notices from the university."),
 danger=sRow("Leave as admin","Step down as an admin of this page. The page, its posts and its events stay, but you will no longer be able to manage them.",`<button type="button" class="pbtn danger" data-a="leave">Leave as admin</button>`)+sRow("Delete page","Permanently delete this page and everything it has published, including its events and registrations. This cannot be undone.",`<button type="button" class="pbtn danger" data-a="del">Delete page</button>`);
 return sAcc("account","user","Account","Manage your page information.",account)+sAcc("security","shield-halved","Security","Protect your account.",sSessions())+sAcc("display","sliders","Display","Choose how CRIMSON looks.",sTheme())+sAcc("notification","bell","Notification","Choose which updates to receive.",notif)+sAcc("danger","triangle-exclamation","Delete page or leave as admin","Leave this page as an admin or permanently delete it.",danger,"sacc-danger")}
function gate(){const dead=staff?S.P.deleted:S.U.deleted,off=!staff&&S.U.status==="deactivated",left=staff&&S.P.left&&!dead;if(!dead&&!off&&!left)return;
 if(left){openM(`<div class="lo"><div class="lo-ic"><i class="fa-solid fa-right-from-bracket"></i></div><h3 class="ph3">You left as admin</h3><p class="pmeta" style="line-height:1.5">You are no longer an admin of this page.</p><div class="lo-actions"><button type="button" class="pbtn" data-a="rejoin">Rejoin as admin</button><a class="pbtn p" href="dashboard.html">Go to student account</a></div></div>`,"pbox-sm");V.lock=true;return}
 if(dead)openM(`<div class="lo"><div class="lo-ic danger"><i class="fa-solid fa-user-slash"></i></div><h3 class="ph3">${staff?"This page was deleted":"This account was deleted"}</h3><p class="pmeta" style="line-height:1.5">${staff?"The page and everything it published have been removed.":"Your profile, registrations and preferences have been removed."}</p><div class="lo-actions one"><a class="pbtn p" href="${LOGIN}">Go to login</a></div></div>`,"pbox-sm");
 else openM(`<div class="lo"><div class="lo-ic"><i class="fa-solid fa-user-clock"></i></div><h3 class="ph3">Your account is deactivated</h3><p class="pmeta" style="line-height:1.5">Reactivate it to keep using CRIMSON, or log out.</p><div class="lo-actions"><a class="pbtn" href="${LOGIN}">Log out</a><button type="button" class="pbtn p" data-a="reactivate">Reactivate</button></div></div>`,"pbox-sm");
 V.lock=true}
function deptSide(){const top=[DEPTS[0],DEPTS.find(d=>d[0]===S.U.dept)],rest=DEPTS.filter(d=>!top.includes(d)),vis=V.more?rest:rest.slice(0,6);
 const row=(d,c,b)=>`<a href="#" class="dept-item ${c||""}" data-a="dept" data-c="${d[0]}"><div class="dept-badge ${b||""}"><i class="fa-solid fa-${d[3]}"></i></div><div class="dept-info"><span class="dept-title">${d[1]}</span><span class="dept-sub">${d[2]}</span></div></a>`;
 return row(top[0],"dept-item-university","dept-badge-university")+row(top[1],"dept-item-user","dept-badge-user")+'<div class="dept-divider"></div>'+vis.map(d=>row(d)).join("")+`<a href="#" class="see-more-btn" data-a="more"><span>${V.more?"See Less":"See More"}</span></a>`}
const unread=()=>S.notifs.some(n=>n.for===(staff?"staff":"student")&&!n.read);
const badge=()=>$$(".badge-dot").forEach(b=>b.style.display=unread()?"":"none");
function render(){const np=$("#np");if(np)V.ptxt=np.value;save();$$("#leftSidebar .nav-item[data-v]").forEach(a=>{const on=a.dataset.v===V.view;a.classList.toggle("active",on);a.classList.toggle("btn-nav",on)});
 $("main").innerHTML=VIEWS[V.view]();scanHook();const dl=$(".dept-list");if(dl)dl.innerHTML=deptSide();badge()}
let redraw=()=>{};
const LOGIN="index.html",PHOTO="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";
const applyTheme=()=>{const r=document.documentElement;if(S.set.theme==="dark")r.setAttribute("data-theme","dark");else r.removeAttribute("data-theme")};
const closeAcc=()=>{const m=$("#accm");if(m)m.hidden=true;const b=$(".profile-btn");if(b)b.setAttribute("aria-expanded","false")};
const accMenu=()=>{const stuAv=`<img class="avatar-img" style="width:2.5rem;height:2.5rem" src="${PHOTO}" alt="" onerror="this.src='https://placehold.co/100x100/2563eb/ffffff?text=AR'">`,
 me=staff?{n:S.P.name,s:S.P.email,a:av(S.P.name)}:{n:S.U.name,s:S.U.email,a:stuAv},home=staff?"staff_dashboard.html":"dashboard.html",
 it=(a,ic,l,x="",c="")=>`<button type="button" role="menuitem" class="pmi pmr ${c}" data-a="${a}" ${x}><i class="${ic} pm-ic"></i>${l}</button>`,
 acc=(on,h,a,n)=>`<button type="button" role="menuitem" class="pmi pmp ${on?"cur":""}" ${on?'aria-current="true" data-a="closeacc"':`data-a="go" data-h="${h}"`}>${a}<b>${esc(n)}</b>${on?`<i class="fa-solid fa-circle-check"></i>`:""}</button>`;
 return `<div class="pm-who">${me.a}<div class="pm-wt"><div class="pm-name">${esc(me.n)}</div><div class="pm-sub">${esc(me.s)}</div></div></div><hr>`
  +(isDash?it("nav","fa-solid fa-gear","Settings",'data-v="settings"'):it("go","fa-solid fa-gear","Settings",`data-h="${home}#settings"`))
  +`<hr><div class="pm-label">Switch account</div>`
  +acc(!staff,"dashboard.html",stuAv,S.U.name)+acc(staff,"staff_dashboard.html",av(S.P.name),S.P.name)
  +`<hr>`+it("logout","fa-solid fa-right-from-bracket","Log out","","danger")};
const A={
sf(el){V.sf=V.sf===el.dataset.s?"":el.dataset.s;render()},
go(el){location.href=el.dataset.h},
nav(el){V.sf="";V.view=el.dataset.v;V.q="";V.dept=S.set.scope;V.ev=null;const s=$("#searchInput");if(s)s.value="";history.replaceState(null,"","#"+V.view);$("#leftSidebar").classList.remove("mobile-sidebar-active");closeAcc();render();$("main").scrollTop=0;scrollTo(0,0)},
depts(){V.view="depts";render()},
closem:closeM,
accmenu(el){const m=$("#accm"),b=(el&&el.closest&&el.closest(".profile-btn"))||$(".profile-btn");if(!m.hidden){closeAcc();return}
 $("#pm").hidden=true;m.innerHTML=accMenu();const r=b.getBoundingClientRect(),w=document.documentElement.clientWidth;
 m.style.top=r.bottom+8+"px";m.style.right=Math.max(8,w-r.right)+"px";m.style.left="auto";m.hidden=false;b.setAttribute("aria-expanded","true")},
closeacc(){closeAcc()},
logout(){closeAcc();$("#pm").hidden=true;const sb=$("#leftSidebar");if(sb)sb.classList.remove("mobile-sidebar-active");
 openM(`<div class="lo"><div class="lo-ic"><i class="fa-solid fa-right-from-bracket"></i></div><h3 class="ph3">Log out of CRIMSON?</h3><p class="pmeta" style="line-height:1.5">You are signed in as <b>${esc(staff?S.P.name:S.U.name)}</b>. You will need to log in again to get back to your account.</p><div class="lo-actions"><button type="button" class="pbtn" id="lo-cancel" data-a="closem">Stay logged in</button><a class="pbtn p" id="lo-ok" href="${LOGIN}">Log out</a></div></div>`,"pbox-sm");
 setTimeout(()=>{const c=$("#lo-cancel");if(c)c.focus()},0)},
report(){toast("Thanks, your report was submitted")},
kebab(el){const k=el.dataset.k,x=byKey(k),r=el.getBoundingClientRect(),m=$("#pm"),id=k.slice(1),it=(a,l)=>`<div class="pmi" data-a="${a}" data-id="${id}">${l}</div>`;
 m.innerHTML=own(x.o)?(x.t==="p"?it("editpost","Edit post")+it("delpost","Delete post"):x.t==="a"?it("annform","Edit announcement")+it("anndel","Delete announcement"):it("evform","Edit event")+it("evdel","Delete event")):`<div class="pmi" data-a="report">Report</div>`;
 m.style.top=r.bottom+4+"px";m.style.left=Math.max(8,r.right-200)+"px";m.hidden=false},
details(el){const x=byKey(el.dataset.k),o=x.o;
 openM(x.t==="e"?`<h3 class="ph3">${esc(o.title)}</h3>${PP(o.desc)}${pimg(o.img)}<p class="pmeta" style="margin-top:.75rem">${fmt(o.date)} · ${ampm(o.time)} – ${ampm(o.end)}<br>${esc(o.venue)} · ${used(o)}/${o.cap} slots · Hosted by ${esc(o.host)}<br>Register by ${fmt(o.deadline)}</p><div class="prow" style="margin-top:1rem"><button class="pbtn" data-a="closem">Close</button><span>${evBtn(o)}</span></div>`:`<h3 class="ph3">${esc(o.title||o.author)}</h3>${PP(o.body||o.text)}${[o.img,...(o.imgs||[])].map(pimg).join("")}<p class="pmeta" style="margin:.75rem 0">${esc(o.author)} · ${fmt(o.date)} · ${o.dept}</p><button class="pbtn" data-a="closem">Close</button>`)},
dept(el){V.dept=el.dataset.c;V.view="home";V.q="";const s=$("#searchInput");if(s)s.value="";render();$("main").scrollTop=0;scrollTo(0,0)},
dclear(){V.dept=S.set.scope;render()},
dfollow(el){const c=el.dataset.c,i=S.fol.indexOf(c);i<0?S.fol.push(c):S.fol.splice(i,1);toast(i<0?"Following "+c:"Unfollowed "+c);render()},
more(){V.more=!V.more;render()},
reg(el){const e=S.evt.find(x=>x.id==el.dataset.id);openM(`<h3 class="ph3">Register for ${esc(e.title)}</h3><p class="pmeta">${fmt(e.date)} · ${ampm(e.time)} – ${ampm(e.end)} · ${esc(e.venue)} · Register by ${fmt(e.deadline)}</p>${fld("Full name *","rf0",S.U.name)}${fld("Student ID *","rf1",S.U.id)}${fld("Contact number *","rf2",S.U.contact)}<label class="plbl">Required documents</label>${DOCS.map((d,i)=>`<label class="pmeta" style="display:block;margin-top:.5rem">${d[0]}${d[1]?" *":" (optional)"}</label><input class="pf-input" type="file" id="rd${i}">`).join("")}${ta("Remarks (optional)","rf3")}<div class="prow" style="margin-top:1rem"><button class="pbtn" data-a="closem">Cancel</button><button class="pbtn p" data-a="confirmreg" data-id="${e.id}">Submit registration</button></div>`)},
confirmreg(el){const id=+el.dataset.id,e=S.evt.find(x=>x.id===id),n=v("rf0"),sid=v("rf1"),c=v("rf2");
 if(!n||!sid)return toast("Enter your name and student ID");if(!c)return toast("Enter a contact number");for(let i=0;i<DOCS.length;i++)if(DOCS[i][1]&&!$("#rd"+i).files[0])return toast("Attach: "+DOCS[i][0]);
 S.regs.push({id:S.nid++,ev:id,sid,name:n,course:S.U.cc,contact:c,remarks:v("rf3"),docs:DOCS.map((d,i)=>{const f=$("#rd"+i).files[0];return f?d[0]+": "+f.name:""}).filter(Boolean),status:"Pending",att:"—",date:TODAY,mine:true});S.U.contact=c;
 pushN("student","Registration submitted","You registered for "+e.title+". Status: Pending.");pushN("staff","New registration",n+" registered for "+e.title+".");
 closeM();toast("Registration submitted. See it in My Events.");render()},
regview(el){const r=S.regs.find(x=>x.id==el.dataset.id),e=evOf(r),row=(k,x)=>`<div class="prow" style="padding:.375rem 0;border-bottom:1px solid var(--slate-100)"><span class="pmeta">${k}</span><span style="font-size:.8125rem;text-align:right">${x?esc(x):"—"}</span></div>`;
 openM(`<h3 class="ph3">${esc(e.title)}</h3><p>${st(r.status)}</p>${row("Name",r.name)}${row("Student ID",r.sid)}${row("Course",r.course)}${row("Contact",r.contact)}${row("Remarks",r.remarks)}${row("Documents",(r.docs||[]).join("; "))}${row("Registered on",fmt(r.date))}<button class="pbtn" style="margin-top:1rem" data-a="closem">Close</button>`)},
cancel(el){const r=S.regs.find(x=>x.id==el.dataset.id),t=evOf(r).title;r.status="Cancelled";pushN("student","Registration cancelled","You cancelled your registration for "+t+".");pushN("staff","Registration cancelled",r.name+" cancelled their registration for "+t+".");toast("Registration cancelled");render()},
setst(el){const r=S.regs.find(x=>x.id==el.dataset.id);r.status=el.dataset.s;if(r.mine)pushN("student","Registration "+r.status.toLowerCase(),"Your registration for "+evOf(r).title+" was "+r.status.toLowerCase()+".");toast(r.name+": "+r.status.toLowerCase());render()},
imgclear(el){const k=el.dataset.k;PEND[k]="";const b=$("#imgpv-"+k);if(b)b.innerHTML=pvHtml(k)},
rmimg(el){const k=el.dataset.k;(k==="p"?V.pimgs:V.eimgs).splice(+el.dataset.i,1);if(k==="p")render();else{const b=$("#imgpv-pe");if(b)b.innerHTML=thumbs(V.eimgs,"pe")}},
regf(el){V.rf=el.value;render()},
attf(el){V.af=el.value;render()},
setast(el){const e=S.evt.find(x=>x.id==el.dataset.id),s=el.dataset.s;if(astOf(e)===s)return;e.ast=s;if(s!=="Ongoing"){stopScan();SC.msg=""}if(S.regs.some(r=>r.mine&&r.ev===e.id&&r.status==="Approved")){if(s==="Ongoing")pushN("student","Attendance is open","Attendance for "+e.title+" is now ongoing. Open My Events to show your QR code.");if(s==="Finished")pushN("student","Attendance closed","Attendance for "+e.title+" has finished. Your QR code is no longer available.")}toast("Attendance: "+s.toLowerCase());render()},
scanstart(){startScan()},
scanstop(){stopScan();SC.msg="";render()},
checkin(){scanned((($("#ci0")||{}).value)||"")},
showqr(el){const r=S.regs.find(x=>x.id==el.dataset.id);if(!r||!r.mine||r.status!=="Approved")return;const e=evOf(r);if(r.att==="Present"){toast("You are already checked in.");render();return}if(astOf(e)!=="Ongoing"){toast(astOf(e)==="Finished"?"Attendance is finished. QR is no longer available.":"Attendance has not started yet.");render();return}const c=qrCode(r);V.qr=r.id;openM(`<h3 class="ph3">Attendance QR</h3><p class="pmeta">${esc(e.title)} · ${fmt(e.date)}</p><div style="width:14rem;margin:1rem auto">${qrSvg(c)}</div><p style="text-align:center;font-weight:700;letter-spacing:.08em">${c}</p><p class="pmeta" style="text-align:center">${esc(r.name)} · ${r.sid}<br>This code is unique to you. Hold it up to the staff camera. You are marked Present once it is detected.</p><div class="prow" style="margin-top:1rem"><span></span><button class="pbtn" data-a="closem">Close</button></div>`)},
pickev(el){V.ev=+el.value;render()},
gotoreg(el){V.view="myevents";V.ev=+el.dataset.id;render();scrollTo(0,0)},
addpost(){const t=v("np");if(!t&&!V.pimgs.length)return toast("Write something or add a photo first");const im=putImgs(V.pimgs);if(!im)return toast(STORE_MSG);S.posts.unshift({id:S.nid++,author:S.P.name,text:t,imgs:im,date:TODAY,dept:S.P.dept});V.pimgs=[];V.ptxt="";const np=$("#np");if(np)np.value="";toast("Posted as "+S.P.short);render()},
editpost(el){const p=S.posts.find(x=>x.id==el.dataset.id);V.eimgs=[...(p.imgs||[])];openM(`<h3 class="ph3">Edit post</h3>${ta("Post","ep",p.text)}<div id="imgpv-pe">${thumbs(V.eimgs,"pe")}</div><div style="margin-top:.5rem">${addPhotos("pe")}</div>${mfoot("savepost",p.id)}`)},
savepost(el){const t=v("ep");if(!t&&!V.eimgs.length)return toast("Post can't be empty");const im=putImgs(V.eimgs);if(!im)return toast(STORE_MSG);const p=S.posts.find(x=>x.id==el.dataset.id);p.text=t;p.imgs=im;gc();closeM();toast("Post updated");render()},
delpost(el){S.posts=S.posts.filter(x=>x.id!=el.dataset.id);gc();toast("Post deleted");render()},
annform(el){const id=el.dataset.id,a=S.ann.find(x=>x.id==id)||{title:"",cat:"General",body:"",status:"Draft"};PEND.a=a.img||"";openM(`<h3 class="ph3">${id?"Edit":"New"} announcement</h3>${fld("Title","a0",a.title)}${sel("Category","a1",["Academic","General","Urgent"],a.cat)}${ta("Message","a2",a.body)}${imgField("a","Pubmat / image (optional)","Upload a poster or photo to show with this announcement.")}${sel("Status","a3",["Draft","Published","Archived"],a.status)}${mfoot("saveann",id)}`)},
saveann(el){const t=v("a0");if(!t)return toast("Title is required");const im=putImgs(PEND.a?[PEND.a]:[]);if(!im)return toast(STORE_MSG);const x={title:t,cat:v("a1"),body:v("a2"),status:v("a3"),img:im[0]||""},a=S.ann.find(y=>y.id==el.dataset.id);a?Object.assign(a,x):S.ann.unshift({id:S.nid++,date:TODAY,author:S.P.name,dept:S.P.dept,...x});gc();closeM();toast("Announcement saved");render()},
anndel(el){S.ann=S.ann.filter(x=>x.id!=el.dataset.id);gc();toast("Announcement deleted");render()},
evform(el){const id=el.dataset.id,e=S.evt.find(x=>x.id==id)||{title:"",date:"",time:"08:00",end:"17:00",venue:"",cap:50,desc:"",status:"Draft",deadline:""};PEND.e=e.img||"";openM(`<h3 class="ph3">${id?"Edit":"New"} event</h3>${fld("Title","e0",e.title)}${fld("Date","e1",e.date,"date")}${fld("Start time","e2",e.time,"time")}${fld("End time","e3",e.end,"time")}${fld("Venue","e4",e.venue)}${fld("Registration deadline","e5",e.deadline,"date")}${fld("Capacity","e6",e.cap,"number")}${ta("Description","e7",e.desc)}${imgField("e","Pubmat (image)","Optional. Upload a poster for this event. If you skip it, a pubmat is generated from the title and venue. Images are resized to fit.")}${sel("Status","e8",["Draft","Open","Closed","Cancelled"],e.status)}${mfoot("saveevt",id)}`)},
saveevt(el){const t=v("e0"),d=v("e1");if(!t||!d)return toast("Title and date are required");const im=putImgs(PEND.e?[PEND.e]:[]);if(!im)return toast(STORE_MSG);const x={title:t,date:d,time:v("e2")||"08:00",end:v("e3")||"17:00",venue:v("e4"),deadline:v("e5")||d,cap:+v("e6")||1,desc:v("e7"),status:v("e8"),img:im[0]||""},e=S.evt.find(y=>y.id==el.dataset.id);e?Object.assign(e,x):S.evt.push({id:S.nid++,host:S.P.name,dept:S.P.dept,posted:TODAY,...x});gc();closeM();toast("Event saved");render()},
evdel(el){S.evt=S.evt.filter(x=>x.id!=el.dataset.id);S.regs=S.regs.filter(r=>r.ev!=el.dataset.id);V.ev=null;gc();toast("Event deleted");render()},
saveacct(){const f=v("st0"),l=v("st1");if(!f||!l)return toast("Enter your first and last name");const pg=$("#st2");S.U.first=f;S.U.last=l;S.U.name=f+" "+l;S.U.cc=pg.value;S.U.course=pg.options[pg.selectedIndex].text;S.U.year=v("st3");S.U.contact=v("st4");save();applyUser();toast("Account settings saved")},
setpref(el){S.set[el.dataset.k]=el.checked;save();toast("Notification preferences saved")},
settheme(el){S.set.theme=el.dataset.t==="dark"?"dark":"light";save();applyTheme();$$('[data-a="settheme"]').forEach(b=>{const on=b.dataset.t===S.set.theme;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});toast((S.set.theme==="dark"?"Dark":"Light")+" theme on")},
setfeed(el){S.set.scope=el.value;V.dept=el.value;save();toast("Feed preference saved")},
savepw(){const a=v("w0"),b=v("w1"),c=v("w2");if(!a||!b)return toast("Fill in all password fields");if(b!==c)return toast("New passwords do not match");["w0","w1","w2"].forEach(i=>$("#"+i).value="");toast("Password updated")},
sendhelp(){const s=v("h0"),m=v("h1");if(!s||!m)return toast("Add a subject and a message");pushN(staff?"staff":"student","Support","We received your message “"+s+"”.");toast("Message sent");render()},
nread(el){const n=S.notifs.find(x=>x.id==el.dataset.id);if(n)n.read=true;save();redraw();badge()},
editprof(){if(staff){const P=S.P;openM(`<h3 class="ph3">Edit profile</h3>${fld("Page name","pf0",P.name)}${ta("Description","pf1",P.desc)}${colSel("pf2",P.dept)}${fld("Organization","pf3",P.org||"Student Council")}${mfoot("saveprof")}`);return}
 const U=S.U,d=DEPTS.find(x=>x[0]===U.dept)||DEPTS[1];openM(`<h3 class="ph3">Edit profile</h3>${fld("Full name","pf0",U.name)}<div class="sgrid">${roF("Student ID",U.id)}${roF("Department",d[2])}</div>${roF("WMSU email",U.email)}${roF("College",d[1])}<p class="pmeta" style="margin:.25rem 0 .5rem">Student ID, email, college and department are managed by the university and cannot be edited.</p>${progSel("pf3",U)}${sel("Year level","pf4",["1st Year","2nd Year","3rd Year","4th Year"],U.year)}${fld("Contact number","pf5",U.contact)}${mfoot("saveprof")}`)},
sacc(el){const id=el.dataset.s,o=V.sopen.indexOf(id)<0;if(o)V.sopen.push(id);else V.sopen.splice(V.sopen.indexOf(id),1);el.setAttribute("aria-expanded",o);const p=$("#sp-"+id);if(p)p.hidden=!o;el.closest(".sacc").classList.toggle("open",o);history.replaceState(null,"",o?"#settings-"+id:"#settings")},
savepage(){const n=v("ps0");if(!n)return toast("Enter a page name");setPage({name:n,desc:v("ps1"),dept:v("ps2"),org:v("ps3"),email:v("ps4")});toast("Page settings saved")},
deact(){openM(`<div class="lo"><div class="lo-ic"><i class="fa-solid fa-user-clock"></i></div><h3 class="ph3">Deactivate your account?</h3><p class="pmeta" style="line-height:1.5">Your account will be hidden and you will be logged out. You can reactivate it any time by logging back in.</p><div class="lo-actions"><button type="button" class="pbtn" id="lo-cancel" data-a="closem">Cancel</button><button type="button" class="pbtn danger" data-a="deactgo">Deactivate</button></div></div>`,"pbox-sm");setTimeout(()=>{const c=$("#lo-cancel");if(c)c.focus()},0)},
deactgo(){S.U.status="deactivated";save();location.href=LOGIN},
reactivate(){V.lock=false;delete S.U.status;save();closeM();toast("Welcome back! Your account is active again.")},
del(){const w=staff?"page":"account";openM(`<div class="lo"><div class="lo-ic danger"><i class="fa-solid fa-trash-can"></i></div><h3 class="ph3">Delete your ${w}?</h3><p class="pmeta" style="line-height:1.5">${staff?"This permanently deletes the page and everything it has published, including its events and registrations.":"This permanently deletes your account, event registrations and preferences."} This cannot be undone.</p><div style="text-align:left;margin-top:.75rem"><label class="plbl" for="delc">Type <b>DELETE</b> to confirm</label><input class="pf-input" id="delc" autocomplete="off"></div><div class="lo-actions"><button type="button" class="pbtn" data-a="closem">Cancel</button><button type="button" class="pbtn danger" id="delgo" data-a="delgo" disabled>Delete ${w}</button></div></div>`,"pbox-sm");setTimeout(()=>{const c=$("#delc");if(c)c.focus()},0)},
leave(){openM(`<div class="lo"><div class="lo-ic danger"><i class="fa-solid fa-right-from-bracket"></i></div><h3 class="ph3">Leave as admin?</h3><p class="pmeta" style="line-height:1.5">You will no longer be an admin of <b>${esc(S.P.name)}</b> and will lose access to managing its posts, events and registrations. The page itself will not be deleted.</p><div class="lo-actions"><button type="button" class="pbtn" data-a="closem">Cancel</button><button type="button" class="pbtn danger" data-a="leavego">Leave as admin</button></div></div>`,"pbox-sm")},
leavego(){S.P.left=true;save();location.href="dashboard.html"},
rejoin(){V.lock=false;delete S.P.left;save();closeM();toast("You are an admin of this page again.")},
delgo(){if(v("delc")!=="DELETE")return;
 if(staff){const n=S.P.name,ids=S.evt.filter(e=>e.host===n).map(e=>e.id);S.ann=S.ann.filter(a=>a.author!==n);S.posts=S.posts.filter(p=>p.author!==n);S.evt=S.evt.filter(e=>e.host!==n);S.regs=S.regs.filter(r=>!ids.includes(r.ev));S.notifs=S.notifs.filter(x=>x.for!=="staff");S.P.deleted=true}
 else{S.regs=S.regs.filter(r=>!r.mine);S.notifs=S.notifs.filter(x=>x.for!=="student");S.U.deleted=true}
 save();location.href=LOGIN},
saveprof(){if(staff){const n=v("pf0");if(!n)return toast("Enter a page name");setPage({name:n,desc:v("pf1"),dept:v("pf2"),org:v("pf3")});closeM();toast("Profile saved");return}
 const U=S.U,pg=$("#pf3");U.name=v("pf0")||U.name;U.cc=pg.value;U.course=pg.options[pg.selectedIndex].text;U.year=v("pf4");U.contact=v("pf5");save();applyUser();closeM();toast("Profile saved")}};
function applyUser(){const U=S.U,P=S.P,n=staff?P.short+" Council":U.name,sub=staff?"Staff":U.course,pb=$(".profile-btn .hidden-sm");
 if(pb&&pb.children[1]){pb.children[0].textContent=n;pb.children[1].textContent=sub}
 const sn=$("#leftSidebar .avatar-img+span");if(sn)sn.textContent=n;
 $$(".avatar-img,.profile-large-avatar").forEach(i=>i.alt=n);
 const pn=$(".profile-name");if(pn){const m=$$(".meta-item span"),iv=$$(".info-value");
  if(staff){const cn=collegeName(P.dept),org=P.org||"Student Council",pd=$(".profile-desc");pn.textContent=P.name;$(".profile-headline").textContent=org+" \u2022 Western Mindanao State University";if(pd)pd.textContent=P.desc||"";m[0].textContent="Staff Account \u2022 "+P.short;m[1].textContent=cn;m[2].textContent=P.email;iv[0].textContent=P.name;iv[1].textContent=org;iv[2].textContent=cn+" ("+P.dept+")";iv[4].textContent=P.email}
  else{pn.textContent=n;$(".profile-headline").textContent=U.course+" \u2022 Western Mindanao State University";m[0].textContent="Student ID: "+U.id;m[2].textContent=U.email;iv[0].textContent=n;iv[1].textContent=U.course;iv[2].textContent=U.year}}}
function notifPage(){const box=$("main > .space-y-3"),tabs=$$(".tab-btn");let tab="All";
 const g=(l,a)=>a.length?`<div class="notif-group-label">${l}</div>`+a.map(n=>`<div class="card notif-card ${n.read?"":"unread"}" data-a="nread" data-id="${n.id}" style="cursor:pointer"><div class="notif-icon-wrapper icon-${n.t==="ann"?"announcement":n.t==="evt"?"event":"system"}"><i class="fa-${n.t==="evt"?"regular":"solid"} fa-${n.t==="ann"?"bullhorn":n.t==="evt"?"calendar-check":"circle-info"}"></i></div><div class="notif-body"><div class="notif-header"><span class="notif-source">${esc(n.src)}</span><span class="notif-time">${rel(n.date)}</span></div><h4 class="notif-title">${esc(n.title)}</h4><p class="notif-message">${esc(n.text)}</p></div>${n.read?"":'<div class="unread-indicator"></div>'}</div>`).join(""):"";
 redraw=()=>{const L=S.notifs.filter(n=>n.for===(staff?"staff":"student")&&(tab==="Unread"?!n.read:tab==="Announcement"?n.t==="ann":tab==="Events"?n.t==="evt":true));
  box.innerHTML=(g("Today",L.filter(n=>n.date===TODAY))+g("Earlier",L.filter(n=>n.date!==TODAY)))||none("No notifications here.")};
 tabs.forEach(b=>b.addEventListener("click",()=>{tab=b.textContent.trim();tabs.forEach(x=>x.classList.toggle("active",x===b));redraw()}));redraw()}
function initNav(){const M={"Home":"home","Announcements":"announcements","Events":"events","My Events":"myevents","Register and Attendance":"myevents","Help & Support":"help","Settings":"settings"},home=staff?"staff_dashboard.html":"dashboard.html";
 $$("#leftSidebar .nav-item").forEach(a=>{const t=a.textContent.replace(/\s+/g," ").trim(),w=M[t];
  if(isDash){if(w){a.dataset.v=w;a.dataset.a="nav"}else if(t==="Profile")a.setAttribute("href",PF+"profile.html");else if(t==="Notifications")a.setAttribute("href",PF+"notification.html")}
  else if(w)a.setAttribute("href",w==="home"?home:home+"#"+w)})}
function boot(){document.body.insertAdjacentHTML("beforeend",'<div class="pmodal" id="pmodal"><div class="pbox" id="pbox" role="dialog" aria-modal="true"></div></div><div id="ptoast" hidden></div><div class="pmenu" id="pm" hidden></div><div class="pmenu" id="accm" role="menu" aria-label="Account menu" hidden></div>');
 applyTheme();applyUser();initNav();badge();{const b=$(".profile-btn");if(b){b.dataset.a="accmenu";b.setAttribute("role","button");b.tabIndex=0;b.setAttribute("aria-haspopup","menu");b.setAttribute("aria-expanded","false");b.setAttribute("aria-controls","accm")}}
 if(isDash){S.mode=staff?"staff":"student";V.dept=S.set.scope;const h=location.hash.slice(1),sm=/^settings-(account|security|display|notification|danger)$/.exec(h);if(VIEWS[h])V.view=h;if(sm){V.view="settings";V.sopen=[sm[1]]}
  const pb=$(".profile-btn");if(pb)pb.dataset.a="accmenu";const nb=$("#notifBtn");if(nb){nb.dataset.a="go";nb.dataset.h=PF+"notification.html"}
  const vh=$$(".card h3").find(h=>h.textContent.trim()==="Departments");if(vh&&vh.nextElementSibling)Object.assign(vh.nextElementSibling.style,{cursor:"pointer"}),vh.nextElementSibling.dataset.a="depts";
  render();if(sm)gotoSet(sm[1],false)}
 else if(/notification/.test(F))notifPage();
 else if(/profile/.test(F)){const b=$(".profile-user-details .btn-nav");if(b)b.dataset.a="editprof"}gate()}
document.addEventListener("click",e=>{const T=e.target;
 if(!T.closest("#accm,[data-a=accmenu]"))closeAcc();
 if(!T.closest("#pm,[data-a=kebab]"))$("#pm").hidden=true;
 if(["SELECT","OPTION","INPUT","TEXTAREA"].includes(T.tagName))return;
 const el=T.closest("[data-a]");
 if(el&&A[el.dataset.a]){if(el.tagName==="A")e.preventDefault();A[el.dataset.a](el)}else if(T.id==="pmodal")closeM()});
document.addEventListener("input",e=>{if(e.target.id==="searchInput"&&isDash){V.q=e.target.value;if(!["home","announcements","events"].includes(V.view))V.view="home";render()}});
document.addEventListener("keydown",e=>{const pb=$(".profile-btn"),m=$("#accm");
 if(e.key==="Escape"){const open=!m.hidden;closeAcc();$("#pm").hidden=true;if($("#pmodal").classList.contains("show"))closeM();else if(open&&pb)pb.focus();return}
 if(pb&&e.target===pb&&(e.key==="Enter"||e.key===" ")){e.preventDefault();A.accmenu(pb);if(!m.hidden){const f=$("button",m);if(f)f.focus()}return}
 if(!m.hidden&&m.contains(e.target)&&(e.key==="ArrowDown"||e.key==="ArrowUp")){e.preventDefault();const b=$$("button",m),i=b.indexOf(document.activeElement);b[(i+(e.key==="ArrowDown"?1:-1)+b.length)%b.length].focus()}});
window.addEventListener("resize",closeAcc);
window.addEventListener("hashchange",()=>{if(!isDash)return;const m=/^#settings-(account|security|display|notification|danger)$/.exec(location.hash);if(m)gotoSet(m[1])});
document.addEventListener("input",e=>{const t=e.target;if(t.id==="delc"){const b=$("#delgo");if(b)b.disabled=t.value.trim()!=="DELETE"}});
window.addEventListener("pageshow",e=>{if(e.persisted){closeAcc();closeM()}});
document.addEventListener("input",e=>{const t=e.target;if(t.dataset&&t.dataset.f&&isDash){V[t.dataset.f]=t.value;const p=t.selectionStart;render();const n=$(`[data-f="${t.dataset.f}"]`);if(n){n.focus();try{n.setSelectionRange(p,p)}catch(x){}}}});
const SC={on:false,stream:null,vid:null,det:null,t:0,last:"",lt:0,msg:"",fb:false},cv=document.createElement("canvas");
const playV=v=>{try{const p=v.play();p&&p.catch&&p.catch(()=>{})}catch(x){}};
function scanHook(){const sl=$("#vidSlot");if(SC.on&&sl&&SC.vid){sl.appendChild(SC.vid);playV(SC.vid)}else if(SC.on)stopScan()}
async function startScan(){
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){SC.msg="This browser cannot open the camera here (it needs https or localhost).";SC.fb=true;render();return}
 try{SC.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false})}catch(x){SC.msg="Camera permission was denied or no camera was found.";SC.fb=true;render();return}
 const v=SC.vid=document.createElement("video");v.setAttribute("playsinline","");v.muted=true;v.srcObject=SC.stream;v.style.cssText="width:100%;max-width:22rem;border-radius:.75rem;background:#0f172a;display:block";
 SC.det=("BarcodeDetector" in window)?new BarcodeDetector({formats:["qr_code"]}):null;
 SC.on=true;SC.fb=false;SC.msg="Camera on. Point it at a student's QR code.";render();tick()}
function stopScan(){SC.on=false;clearTimeout(SC.t);if(SC.stream)SC.stream.getTracks().forEach(t=>t.stop());SC.stream=null;if(SC.vid){SC.vid.srcObject=null;SC.vid.remove()}SC.vid=null}
async function tick(){if(!SC.on)return;const v=SC.vid;let code="";
 if(v&&v.readyState>=2&&v.videoWidth){try{if(SC.det){const r=await SC.det.detect(v);if(r.length)code=r[0].rawValue}else if(typeof jsQR==="function"){const k=Math.min(1,640/v.videoWidth);cv.width=Math.round(v.videoWidth*k);cv.height=Math.round(v.videoHeight*k);const x=cv.getContext("2d",{willReadFrequently:true});x.drawImage(v,0,0,cv.width,cv.height);const d=x.getImageData(0,0,cv.width,cv.height),q=jsQR(d.data,d.width,d.height);if(q)code=q.data}}catch(x){}}
 if(!SC.on)return;if(code){const n=Date.now(),again=code!==SC.last||n-SC.lt>1500;SC.last=code;SC.lt=n;if(again)scanned(code)}
 SC.t=setTimeout(tick,200)}
function scanned(c){c=String(c).trim().toUpperCase();const e=S.evt.find(x=>x.id===V.ev);
 if(!e||astOf(e)!=="Ongoing"){SC.msg="Attendance is not ongoing.";return render()}
 const r=S.regs.find(x=>qrCode(x)===c);
 if(!r){SC.msg="That is not a CRIMSON attendance QR code.";return render()}
 if(r.ev!==e.id){SC.msg=r.name+"'s QR is for a different event.";return render()}
 if(r.status!=="Approved"){SC.msg=r.name+" is not approved for this event.";return render()}
 if(r.att==="Present"){SC.msg=r.name+" is already checked in.";return render()}
 r.att="Present";SC.msg="QR detected: "+r.name+" is marked Present.";if(r.mine)pushN("student","Attendance recorded","You were marked present for "+e.title+".");toast(r.name+" marked present");render()}
document.addEventListener("change",async e=>{const t=e.target;if(!(t.tagName==="INPUT"&&t.type==="file"&&t.dataset.img))return;const k=t.dataset.img,files=[...t.files];t.value="";const list=k==="p"?V.pimgs:k==="pe"?V.eimgs:null;
 for(const f of files){if(list&&list.length>=4){toast("You can attach up to 4 images");break}
  try{const d=await readImg(f);if(usage()+d.length>4.5e6){toast(STORE_MSG);break}if(list)list.push(d);else PEND[k]=d}catch(x){toast(x.message);break}}
 if(k==="p")render();else if(k==="pe"){const b=$("#imgpv-pe");if(b)b.innerHTML=thumbs(V.eimgs,"pe")}else{const b=$("#imgpv-"+k);if(b)b.innerHTML=pvHtml(k)}});
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="ci0")A.checkin()});
window.addEventListener("storage",e=>{if(e.key===IMGKEY&&e.newValue&&isDash){try{IMG=JSON.parse(e.newValue)}catch(x){}const a=document.activeElement;if(!$("#pmodal").classList.contains("show")&&!(a&&["INPUT","TEXTAREA","SELECT"].includes(a.tagName)))render();return}if(e.key!==KEY||!e.newValue||!isDash)return;try{S=JSON.parse(e.newValue)}catch(x){return}applyTheme();
 if(V.qr){const r=S.regs.find(x=>x.id===V.qr);if(r&&r.att==="Present"){closeM();toast("QR detected. You are marked present.")}else if(!r||astOf(evOf(r))!=="Ongoing"){closeM();toast("Attendance finished. QR is no longer available.")}}
 const a=document.activeElement;if(!$("#pmodal").classList.contains("show")&&!(a&&["INPUT","TEXTAREA","SELECT"].includes(a.tagName)))render()});
document.addEventListener("change",e=>{const t=e.target;if((t.tagName==="SELECT"||t.type==="checkbox")&&t.dataset.a&&A[t.dataset.a])A[t.dataset.a](t)});
boot();
})();
