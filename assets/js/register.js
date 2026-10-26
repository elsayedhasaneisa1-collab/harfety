import { supabase, supabaseConfigured } from './supabase-config.js';
const $ = (id) => document.getElementById(id);
const form = $('register-form');
function alertMessage(message, type='error') { const el=$('register-alert'); el.textContent=message; el.classList.remove('hidden','success'); if(type==='success') el.classList.add('success'); }
form.addEventListener('submit', async (event) => {
 event.preventDefault();
 if (!supabaseConfigured) { alertMessage('أضف رابط Supabase والمفتاح العام في assets/js/supabase-config.js أولاً.'); return; }
 const btn=$('register-btn'); btn.disabled=true; btn.textContent='جارٍ إنشاء الحساب…'; $('register-alert').classList.add('hidden');
 const phone=$('phone').value.trim().replace(/[\s()-]/g,'');
 const password=$('password').value;
 const experience=Number($('experience').value || 0);
 try {
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) throw new Error('اكتب رقم الهاتف بصيغة دولية، مثل +201012345678.');
  if (password.length < 10 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) throw new Error('كلمة المرور يجب أن تكون 10 أحرف على الأقل وتحتوي على حرف ورقم.');
  if (!Number.isInteger(experience) || experience < 0 || experience > 70) throw new Error('سنوات الخبرة يجب أن تكون رقمًا من 0 إلى 70.');
  const metadata={full_name:$('full-name').value.trim(),craft:$('craft').value.trim(),city:$('city').value.trim(),experience_years:experience,bio:$('bio').value.trim(),role:'artisan'};
  const {data,error}=await supabase.auth.signUp({phone,password,options:{data:metadata}});
  if(error) throw error;
  if(data.session){
   alertMessage('تم إنشاء الحساب وتسجيل الدخول بنجاح.', 'success');
   setTimeout(()=>location.replace('../crafts/index.html'),700);
  } else {
   alertMessage('تم إرسال طلب إنشاء الحساب، لكن Supabase لم يُنشئ جلسة دخول. عطّل خيار تأكيد الهاتف (Confirm phone) في إعدادات Authentication حتى يعمل التسجيل بدون SMS أو رمز تحقق، ثم حاول مرة أخرى.');
  }
 } catch(error) { alertMessage(/already registered|already been registered/i.test(error?.message||'')?'رقم الهاتف مسجل بالفعل. سجّل الدخول بدلًا من إنشاء حساب جديد.':(error?.message||'تعذر إنشاء الحساب.')); }
 finally {btn.disabled=false;btn.textContent='إنشاء حساب حرفي';}
});
