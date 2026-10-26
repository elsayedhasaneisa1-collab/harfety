import { supabase, supabaseConfigured } from './supabase-config.js';
const $ = (id) => document.getElementById(id);
$('year').textContent = new Date().getFullYear();
const params = new URLSearchParams(location.search);
if (params.get('reason') === 'admin') showAlert('هذا الحساب لا يملك صلاحية المسؤول.');
function showAlert(message, type='error') { const el=$('login-alert'); el.textContent=message; el.classList.remove('hidden','success'); if(type==='success') el.classList.add('success'); }
$('toggle-password').addEventListener('click',()=>{const input=$('password');input.type=input.type==='password'?'text':'password';});
$('login-form').addEventListener('submit', async (event)=>{
 event.preventDefault();
 if(!supabaseConfigured){showAlert('أضف رابط Supabase والمفتاح العام في assets/js/supabase-config.js أولاً.');return;}
 const button=$('login-btn');button.disabled=true;button.textContent='جارٍ التحقق…';$('login-alert').classList.add('hidden');
 try {
  const phone=$('phone').value.trim().replace(/[\s()-]/g,''); const password=$('password').value;
  if(!/^\+[1-9]\d{7,14}$/.test(phone)) throw new Error('اكتب رقم الهاتف بصيغة دولية، مثل +201012345678.');
  const {data,error}=await supabase.auth.signInWithPassword({phone,password});
  if(error) throw error;
  if(data.user?.app_metadata?.role === 'admin') location.replace('../owner/index.html');
  else location.replace('../crafts/index.html');
 } catch(error) { showAlert(/Invalid login credentials/i.test(error?.message||'')?'رقم الهاتف أو كلمة المرور غير صحيحة.':(error?.message||'تعذر تسجيل الدخول.')); }
 finally {button.disabled=false;button.textContent='تسجيل الدخول';}
});
