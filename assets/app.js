document.addEventListener('DOMContentLoaded',function(){
 var b=document.querySelector('.burger'),m=document.querySelector('.mobmenu');
 if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);});}
 // Products dropdown: click/keyboard support alongside hover
 var drop=document.querySelector('.drop'),dbtn=drop?drop.querySelector('button'):null;
 if(drop&&dbtn){
   dbtn.addEventListener('click',function(e){e.stopPropagation();var o=drop.classList.toggle('open');dbtn.setAttribute('aria-expanded',o);});
   document.addEventListener('click',function(e){if(!drop.contains(e.target)){drop.classList.remove('open');dbtn.setAttribute('aria-expanded','false');}});
 }
 document.addEventListener('keydown',function(e){
   if(e.key==='Escape'){
     if(m&&m.classList.contains('open')){m.classList.remove('open');if(b)b.setAttribute('aria-expanded','false');}
     if(drop&&drop.classList.contains('open')){drop.classList.remove('open');if(dbtn)dbtn.setAttribute('aria-expanded','false');}
   }
 });
 var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.08}):null;
 document.querySelectorAll('.reveal').forEach(function(el){if(io)io.observe(el);else el.classList.add('in');});
 // Contact page: preselect enquiry type / product from the URL
 var params=new URLSearchParams(window.location.search);
 var typeSel=document.getElementById('enqType');
 if(typeSel&&params.get('type')){
   for(var i=0;i<typeSel.options.length;i++){if(typeSel.options[i].text===params.get('type')){typeSel.selectedIndex=i;break;}}
 }
 if(params.get('product')){
   var subj=document.querySelector('form.f [name="Subject"]');
   if(subj&&!subj.value)subj.value='Product enquiry: '+params.get('product');
 }
 document.querySelectorAll('form.f').forEach(function(f){
  f.addEventListener('submit',function(ev){
   ev.preventDefault();
   var ok=true;
   f.querySelectorAll('[required]').forEach(function(inp){
     var err=inp.parentElement.querySelector('.err');
     var bad=!inp.value.trim()||(inp.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value));
     if(err)err.style.display=bad?'block':'none'; if(bad)ok=false;});
   if(!ok)return;
   var note=f.querySelector('.sentnote'),enote=f.querySelector('.errnote');
   if(note)note.style.display='none'; if(enote)enote.style.display='none';
   var data={}; f.querySelectorAll('[name]').forEach(function(i){data[i.name]=i.value;});
   // Spam honeypot: silently accept without sending
   if(data._honey){if(note){note.textContent='Thank you — your message has been received. Our team will reply shortly.';note.style.display='block';}f.reset();return;}
   var btn=f.querySelector('button[type="submit"]'); var oldTxt=btn?btn.textContent:'';
   if(btn){btn.disabled=true;btn.textContent='Sending…';}
   var payload={_subject:(data.Subject||data.subject||'Website enquiry — Symans Pharmaceuticals'),_template:'table',_captcha:'false',_replyto:data.Email||''};
   Object.keys(data).forEach(function(k){if(k!=='_honey')payload[k]=data[k];});
   fetch('https://formsubmit.co/ajax/info@symans.com.pk',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
   .then(function(r){return r.json().catch(function(){return{};}).then(function(j){return{ok:r.ok,j:j};});})
   .then(function(res){
     if(btn){btn.disabled=false;btn.textContent=oldTxt;}
     if(res.ok&&String(res.j.success)==='true'){
       if(note){note.textContent='Thank you — your message has been sent to Symans Pharmaceuticals. Our team will reply shortly.';note.style.display='block';}
       f.reset();
     }else{
       if(enote){enote.innerHTML='Online sending is not available right now. Please email us directly at <a href="mailto:info@symans.com.pk">info@symans.com.pk</a> or call <a href="tel:+923402220060">+92 340-2220060</a>.';enote.style.display='block';}
     }
   })
   .catch(function(){
     if(btn){btn.disabled=false;btn.textContent=oldTxt;}
     if(enote){enote.innerHTML='Your message could not be sent (connection problem). Please email us directly at <a href="mailto:info@symans.com.pk">info@symans.com.pk</a> or call <a href="tel:+923402220060">+92 340-2220060</a>.';enote.style.display='block';}
   });
  });
 });
});
