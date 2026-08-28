const tasks=[
 {id:1,icon:"📝",title:"Quick Survey",type:"Survey",desc:"Share your opinion in a short survey.",reward:35,time:"5 min"},
 {id:2,icon:"🎮",title:"Game Challenge",type:"Offer",desc:"Try a featured mobile game and complete the challenge.",reward:75,time:"10 min"},
 {id:3,icon:"📱",title:"App Discovery",type:"Offer",desc:"Explore a new app and complete the required steps.",reward:50,time:"7 min"},
 {id:4,icon:"▶️",title:"Video Reward",type:"Social",desc:"Watch sponsored content and answer a quick question.",reward:20,time:"3 min"},
 {id:5,icon:"📊",title:"Market Survey",type:"Survey",desc:"Complete a consumer research questionnaire.",reward:60,time:"8 min"},
 {id:6,icon:"🎯",title:"Daily Challenge",type:"Social",desc:"Complete today's challenge to keep your streak alive.",reward:25,time:"2 min"}
];
let state=JSON.parse(localStorage.getItem("cashreward_demo")||'{"balance":125.5,"points":4850,"totalEarned":325.5,"streak":6,"completed":[]}');

function money(n){return "₵"+Number(n).toFixed(2)}
function save(){localStorage.setItem("cashreward_demo",JSON.stringify(state));render()}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function showPage(page){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById("page-"+page).classList.add("active");
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));

function taskCard(t){
 const done=state.completed.includes(t.id);
 return `<article class="task-card"><div class="task-top"><span class="task-logo">${t.icon}</span><span class="reward">+${t.reward} pts</span></div><h3>${t.title}</h3><p>${t.desc}</p><small style="color:#777">⏱ ${t.time} · ${t.type}</small><button class="btn ${done?"btn-ghost":"btn-gold"}" ${done?"disabled":""} onclick="completeTask(${t.id})">${done?"✓ Completed":"Complete task"}</button></article>`
}
function completeTask(id){
 const t=tasks.find(x=>x.id===id); if(!t||state.completed.includes(id))return;
 state.completed.push(id);state.points+=t.reward;state.balance+=t.reward/100;state.totalEarned+=t.reward/100;
 toast(`+${t.reward} points earned!`);
 save();
}
function render(){
 document.getElementById("balance").textContent=money(state.balance);
 document.getElementById("walletBalance").textContent=money(state.balance);
 document.getElementById("points").textContent=state.points.toLocaleString();
 document.getElementById("totalEarned").textContent=money(state.totalEarned);
 document.getElementById("streak").textContent=state.streak+" days";
 document.getElementById("homeTasks").innerHTML=tasks.slice(0,3).map(taskCard).join("");
 document.getElementById("allTasks").innerHTML=tasks.map(taskCard).join("");
 document.getElementById("transactions").innerHTML=[
   {i:"🎯",name:"Task rewards",date:"Today",amount:"+₵"+(state.totalEarned-200).toFixed(2)},
   {i:"👥",name:"Referral bonus",date:"Yesterday",amount:"+₵15.00"},
   {i:"💸",name:"Withdrawal",date:"18 Aug 2026",amount:"-₵200.00"}
 ].map(x=>`<div class="tx"><span class="tx-icon">${x.i}</span><div><b>${x.name}</b><small>${x.date}</small></div><span class="amount">${x.amount}</span></div>`).join("");
}
function showModal(id){document.getElementById(id).classList.add("open")}
function hideModal(id){document.getElementById(id).classList.remove("open")}
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
function requestWithdrawal(){
 const amount=Number(document.getElementById("withdrawAmount").value);
 if(!amount||amount<10)return toast("Minimum withdrawal is ₵10.00");
 if(amount>state.balance)return toast("Insufficient demo balance");
 hideModal("withdrawModal");toast("Withdrawal request saved in demo mode");
}
function copyReferral(){
 navigator.clipboard?.writeText(document.getElementById("refInput").value);
 toast("Referral link copied!");
}
function toggleProfileMenu(){const x=document.getElementById("profileMenu");x.style.display=x.style.display==="block"?"none":"block"}
function toggleNotifications(){const x=document.getElementById("notificationPanel");x.style.display=x.style.display==="block"?"none":"block"}
function resetDemo(){localStorage.removeItem("cashreward_demo");location.reload()}
render();
