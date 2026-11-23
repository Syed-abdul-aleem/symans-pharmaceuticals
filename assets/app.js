document.addEventListener('DOMContentLoaded',function(){
 var b=document.querySelector('.burger'),m=document.querySelector('.mobmenu');
 if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);});}
 var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.08}):null;
 document.querySelectorAll('.reveal').forEach(function(el){if(io)io.observe(el);else el.classList.add('in');});
 document.querySelectorAll('form.f').forEach(function(f){
  f.addEventListener('submit',function(ev){
   var ok=true;
   f.querySelectorAll('[required]').forEach(function(inp){
     var err=inp.parentElement.querySelector('.err');
     var bad=!inp.value.trim()||(inp.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value));
     if(err)err.style.display=bad?'block':'none'; if(bad)ok=false;});
   if(!ok){ev.preventDefault();return;}
   // Genuine submission: opens the visitor's email client addressed to Symans with the form content.
   ev.preventDefault();
   var data={}; f.querySelectorAll('[name]').forEach(function(i){data[i.name]=i.value;});
   var subj=encodeURIComponent(data.subject||data.Subject||'Website enquiry — Symans Pharmaceuticals');
   var body=encodeURIComponent(Object.keys(data).map(function(k){return k+': '+data[k];}).join('\n'));
   window.location.href='mailto:info@symans.com.pk?subject='+subj+'&body='+body;
   var note=f.querySelector('.sentnote'); if(note)note.style.display='block';
  });
 });
});
