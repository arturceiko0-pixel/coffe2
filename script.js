const $=(s,e=document)=>e.querySelector(s),M=[
["Флэт уайт","Двойной эспрессо и бархатное молоко","coffee",5.5,"flat-white.jpg"],
["Капучино","Классика с плотной пенкой","coffee",5,"latte-art.jpg"],
["Американо","Чёрный кофе с пенкой","coffee",4,"coffee.jpg"],
["Айс-латте","Холодный латте со льдом","coffee",6.5,"iced-latte-new.jpg"],
["Круассан с ягодами","Крем, клубника, черника","bakery",8,"croissant.jpg"],
["Матча-круассан","Слоёный, с матча-глазурью","bakery",9,"pistachio.jpg"],
["Сэндвич с ростбифом","Ржаной хлеб, соус, овощи","food",14,"sandwich.jpg"],
["Круассан и капучино","Завтрак-комбо","food",12,"cappuccino-croissant.jpg"],
["Клубничный торт","Бисквит, свежая клубника","dessert",10,"iced-latte.jpeg"],
["Шоколадный чизкейк","С шоколадным соусом","dessert",9,"desserts.jpeg"],
["Тирамису","С какао и шоколадом","dessert",9,"tiramisu.jpg"]],
R=[["Onid Oganov","Фото сразу показывают: хочется съесть всё. Круассаны тёплые, кофе вкусный."],["Anya Sablina","Улыбчивые бариста, согласились сделать напиток не из меню. В последний час круассаны −50%."],["Павел Адаменя","Праздновали здесь годовщину. Еда восхитительная, красивая подача, внимательный персонал."]];
let cart={},toast=(t)=>{const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),1800)};
function draw(f="all"){$("#grid").innerHTML=M.map((m,i)=>(f=="all"||m[2]==f)?`<article class="it"><img src="img/${m[4]}" alt="${m[0]}" loading="lazy"><div><h3>${m[0]}</h3><p>${m[1]}</p><div class="pr"><b>${m[3]} BYN</b><button class="btn sm" data-add="${i}">В заказ</button></div></div></article>`:"").join("")}
function upd(){const k=Object.keys(cart),n=k.reduce((a,i)=>a+cart[i],0),s=k.reduce((a,i)=>a+cart[i]*M[i][3],0);$("#cart").hidden=!n;$("#cc").textContent=n;$("#ct").textContent=s.toFixed(1)}
draw();upd();
$("#gal").innerHTML=["croissant.jpg","coffee.jpg","iced-latte.jpeg","sandwich.jpg","desserts.jpeg","latte-art.jpg"].map(s=>`<img src="img/${s}" alt="Фото из кофейни" loading="lazy">`).join("");
$("#rev").innerHTML=R.map(r=>`<article class="card"><q>${r[1]}</q><small>${r[0]} · ★★★★★</small></article>`).join("");
document.addEventListener("click",e=>{const t=e.target;
if(t.dataset.f){document.querySelectorAll(".tabs button").forEach(b=>b.classList.toggle("on",b==t));draw(t.dataset.f)}
if(t.dataset.go){const b=$(`.tabs [data-f=${t.dataset.go}]`);b.click();$("#menu").scrollIntoView()}
if(t.dataset.add){cart[t.dataset.add]=(cart[t.dataset.add]||0)+1;upd();toast("Добавлено: "+M[t.dataset.add][0])}
if(t.matches(".gal img,.it img")){$("#lb img").src=t.src;$("#lb").hidden=false}
if(t.closest("#lb")){$("#lb").hidden=true}
if(t.closest("nav a"))closeNav()});
const closeNav=()=>{$("#nav").classList.remove("open");$("#burger").setAttribute("aria-expanded",false)};
$("#burger").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#burger").setAttribute("aria-expanded",o)};
$("#clr").onclick=()=>{cart={};upd()};
$("#order").onclick=()=>{const t=Object.keys(cart).map(i=>`${M[i][0]} ×${cart[i]}`).join(", ");location.href="tel:+375296141714";toast("Назовите заказ: "+t)};
$("#share").onclick=async()=>{const d={title:document.title,url:location.href};try{navigator.share?await navigator.share(d):(await navigator.clipboard.writeText(d.url),toast("Ссылка скопирована"))}catch(e){}};
$("#copy").onclick=async()=>{try{await navigator.clipboard.writeText("ул. Интернациональная 14, Минск");toast("Адрес скопирован")}catch(e){toast("ул. Интернациональная 14, Минск")}};
const d=$("[name=d]");d.min=new Date().toISOString().slice(0,10);
$("#form").onsubmit=e=>{e.preventDefault();let ok=true;const f=e.target;
f.querySelectorAll("[required]").forEach(i=>{const bad=!i.value.trim()||(i.name=="p"&&i.value.replace(/\D/g,"").length<9);i.classList.toggle("bad",bad);if(bad)ok=false});
$("#msg").textContent=ok?`Спасибо, ${f.n.value}! Ждём вас ${f.d.value} в ${f.t.value}. Мы позвоним для подтверждения.`:"Проверьте выделенные поля.";if(ok)f.reset()};
