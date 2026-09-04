# -*- coding: utf-8 -*-
"""Generates the MyPromo design artboards (.dc.html), 3 directions x 5 screens."""
import io, json, os

P  = dict(purple='#6B21B5', plight='#8B5CF6', ppale='#EDE9FE',
          orange='#F97316', olight='#FDBA74', opale='#FFF1E3',
          bg='#F1F5F9', surf='#FFFFFF', ink='#1A1424',
          ink2='#655D75', ink3='#9C95A9', line='#E8E4F0', linesoft='#F1EEF7')

ICON = {
 'home':'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
 'book':'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
 'archive':'<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
 'user':'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
 'search':'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 'chev':'<path d="m15 18-6-6 6-6"/>',
 'plus':'<path d="M5 12h14"/><path d="M12 5v14"/>',
 'bell':'<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M21 8.5c0-3.6-2.7-6.5-6-6.5S9 4.9 9 8.5c0 7-3 9-3 9h18s-3-2-3-9"/>',
 'heart':'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
 'msg':'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
 'dots':'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
 'clock':'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
 'person':'<circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/>',
 'flask':'<path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>',
 'micro':'<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
 'shield':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
 'book2':'<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
 'bookmark':'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
 'settings':'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
 'logout':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
 'mail':'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
 'lock':'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
}

def ic(name, size=20, sw=2):
    return ('<svg width="%d" height="%d" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            'stroke-width="%s" stroke-linecap="round" stroke-linejoin="round">%s</svg>'
            % (size, size, sw, ICON[name]))

MARK = ('<svg width="%(s)s" height="%(s)s" viewBox="0 0 48 48" fill="none">'
        '<defs><linearGradient id="mg%(u)s" x1="10" y1="14" x2="26" y2="40" gradientUnits="userSpaceOnUse">'
        '<stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#6B21B5"/></linearGradient>'
        '<linearGradient id="mo%(u)s" x1="38" y1="14" x2="22" y2="40" gradientUnits="userSpaceOnUse">'
        '<stop stop-color="#FDBA74"/><stop offset="1" stop-color="#F97316"/></linearGradient></defs>'
        '<path d="M12 40V23l12 13" stroke="url(#mg%(u)s)" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>'
        '<path d="M36 40V23L24 36" stroke="url(#mo%(u)s)" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>'
        '<circle cx="12" cy="12" r="5.6" fill="%(pc)s"/><circle cx="36" cy="12" r="5.6" fill="%(oc)s"/></svg>')

def mark(size=34, uid='a', white=False):
    """On a purple ground the whole mark goes white; the two-tone gradient
    version is only legible on a light background."""
    if white:
        m = MARK.replace('url(#mg%(u)s)', '#FFFFFF').replace('url(#mo%(u)s)', '#FFFFFF')
        return m % dict(s=size, u=uid, pc='#FFFFFF', oc='#FFFFFF')
    return MARK % dict(s=size, u=uid, pc='#8B5CF6', oc='#F97316')

CSS = """
  *{box-sizing:border-box;margin:0;padding:0}
  a{color:%(purple)s;text-decoration:none}
  a:hover{color:%(plight)s}
  .phone{
    width:390px;height:844px;position:relative;overflow:hidden;
    background:%(bg)s;color:%(ink)s;
    font-family:'IBM Plex Sans Arabic','IBM Plex Sans',system-ui,sans-serif;
    display:flex;flex-direction:column;
    direction:rtl;text-align:right;
  }
  .scroll{flex:1;overflow:hidden;display:flex;flex-direction:column}
  .pad{padding:16px 18px}

  /* ---- header ---- */
  .hdr{background:%(surf)s;padding:18px 18px 14px;display:flex;flex-direction:column;gap:14px;
       border-bottom:1px solid %(linesoft)s;flex-shrink:0}
  .hdr-row{display:flex;align-items:center;gap:11px}
  .hdr-t{font-size:20px;font-weight:700;flex:1}
  .hdr-s{font-size:12px;color:%(ink3)s;font-weight:400}
  .icobtn{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;
          color:%(ink2)s;background:%(bg)s;flex-shrink:0}

  .hdr-bold{background:%(purple)s;color:#fff;padding:20px 18px 18px;display:flex;flex-direction:column;gap:15px;flex-shrink:0}
  .hdr-bold .hdr-t{color:#fff;font-size:23px}
  .hdr-bold .hdr-s{color:rgba(255,255,255,.78)}
  .hdr-bold .icobtn{background:rgba(255,255,255,.16);color:#fff}

  /* ---- search ---- */
  .srch{display:flex;align-items:center;gap:9px;background:%(bg)s;border-radius:13px;padding:0 14px;height:46px;
        font-size:14px;color:%(ink3)s}
  .srch-b{background:rgba(255,255,255,.17);color:rgba(255,255,255,.75)}

  /* ---- segmented ---- */
  .seg{display:flex;gap:4px;background:%(bg)s;border-radius:12px;padding:4px}
  .seg span{flex:1;text-align:center;font-size:13.5px;font-weight:600;color:%(ink2)s;padding:9px 0;border-radius:9px}
  .seg .on{background:%(surf)s;color:%(purple)s;box-shadow:0 1px 3px rgba(26,20,36,.09)}
  .tabs{display:flex;gap:22px;align-items:center}
  .tabs span{font-size:15px;font-weight:600;color:%(ink3)s;padding-bottom:8px}
  .tabs .on{color:%(purple)s;border-bottom:2.5px solid %(orange)s}
  .tabs-b span{color:rgba(255,255,255,.62)}
  .tabs-b .on{color:#fff;border-bottom-color:%(olight)s}

  /* ---- cards ---- */
  .card{background:%(surf)s;border-radius:17px;box-shadow:0 1px 2px rgba(26,20,36,.04),0 4px 16px rgba(26,20,36,.06)}
  .row{display:flex;align-items:center;gap:13px;padding:14px}
  .tile{width:46px;height:46px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .tile-s{width:38px;height:38px;border-radius:11px}
  .grow{flex:1;min-width:0}
  .nm{font-size:15px;font-weight:600;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .mt{font-size:12px;color:%(ink3)s;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .chev{color:%(ink3)s;flex-shrink:0}
  .list{display:flex;flex-direction:column;gap:10px}

  /* ---- dense ---- */
  .dlist{background:%(surf)s;display:flex;flex-direction:column}
  .drow{display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid %(linesoft)s}
  .dhead{font-size:11px;font-weight:700;letter-spacing:.08em;color:%(ink3)s;padding:14px 18px 7px;background:%(bg)s}

  /* ---- chips / pills ---- */
  .chip{display:inline-flex;align-items:center;font-size:11.5px;font-weight:600;padding:4px 10px;border-radius:20px;
        background:%(ppale)s;color:%(purple)s}
  .chip-o{background:%(opale)s;color:#C2410C}
  .chip-g{background:%(bg)s;color:%(ink3)s}
  .cnt{font-size:12px;font-weight:700;color:%(purple)s;font-variant-numeric:tabular-nums}

  /* ---- avatar ---- */
  .av{border-radius:50%%;display:flex;align-items:center;justify-content:center;flex-shrink:0;
      font-weight:700;color:#fff;font-size:14px}

  /* ---- post ---- */
  .ptitle{font-size:15px;font-weight:700;line-height:1.4;margin-top:9px}
  .pbody{font-size:13px;color:%(ink2)s;line-height:1.75;margin-top:5px}
  .pfoot{display:flex;align-items:center;gap:16px;margin-top:11px;color:%(ink3)s;font-size:12.5px;font-weight:600}
  .pf{display:flex;align-items:center;gap:5px}

  /* ---- buttons ---- */
  .btn{height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;
       font-size:15px;font-weight:700}
  .btn-p{background:%(purple)s;color:#fff}
  .btn-o{background:%(orange)s;color:#fff}
  .btn-g{background:%(bg)s;color:%(ink)s}
  .btn-w{background:#fff;color:%(purple)s}
  .btn-ol{border:1.5px solid %(line)s;color:%(ink)s}
  .fld{height:52px;border-radius:14px;background:%(bg)s;display:flex;align-items:center;gap:10px;
       padding:0 15px;font-size:14px;color:%(ink3)s}

  /* ---- nav ---- */
  .nav{position:absolute;bottom:0;left:0;right:0;height:76px;background:%(surf)s;
       border-top:1px solid %(linesoft)s;display:flex;align-items:center;padding:0 4px;
       box-shadow:0 -1px 20px rgba(26,20,36,.07)}
  .nav div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;
           font-size:10.5px;font-weight:600;color:%(ink3)s;min-height:56px;justify-content:center}
  .nav .on{color:%(purple)s}
  .nav .fab{width:52px;height:52px;flex:none;border-radius:17px;background:%(orange)s;color:#fff;
       display:flex;align-items:center;justify-content:center;margin-top:-14px;
       box-shadow:0 6px 16px rgba(249,115,22,.4)}
  .navsp{flex:1;display:flex;justify-content:center;align-items:center}
""" % P

def nav(active):
    items = [('home','الرئيسية'), ('book','المحاضرات'), None, ('archive','الأرشيف'), ('user','الملف')]
    out = []
    for it in items:
        if it is None:
            out.append('<div class="navsp"><div class="fab">%s</div></div>' % ic('plus', 24, 2))
            continue
        k, lbl = it
        cls = ' class="on"' if k == active else ''
        out.append('<div%s>%s<span>%s</span></div>' % (cls, ic(k, 21), lbl))
    return '<div class="nav">%s</div>' % ''.join(out)

def av(initials, color, size=42, fs=14):
    return ('<div class="av" style="width:%dpx;height:%dpx;background:%s;font-size:%dpx">%s</div>'
            % (size, size, color, fs, initials))

def tile(icon, bg, fg, small=False, isz=21):
    return ('<div class="tile%s" style="background:%s;color:%s">%s</div>'
            % (' tile-s' if small else '', bg, fg, ic(icon, isz)))

# ---------------------------------------------------------------- data (real, from the UNEM-PCEM2 Drive)
MODS = [
    ('ANATOMIE',       'person', 19, 'Ali Ghorbel',      P['ppale'], P['purple']),
    ('BIOCHIMIE',      'flask',   4, 'Kebir · K. Ba',    P['opale'], P['orange']),
    ('PHYSIOLOGIE S1', 'heart',   3, 'بوليكوبيات',        P['opale'], '#C2410C'),
    ('HISTOLOGIE',     'micro',   0, 'المجلد فارغ',       P['ppale'], P['plight']),
    ('MODULE SANTE',   'shield',  0, 'المجلد فارغ',       P['bg'],    P['ink3']),
]
LECS = [
    (1,  'Intro — fonctions'),        (2,  'Ostéologie de la tête'),
    (3,  "L'appareil manducateur"),   (4,  'Les muscles tête–cou'),
    (5,  'Les vaisseaux tête et cou'),(6,  'Appareil de vision'),
    (7,  'Fosses nasales'),           (8,  'Oreille'),
]
POSTS = [
    ('أ م', P['purple'], 'أحمد محمد',  'طالب سنة 2 · طب',
     'ملخص فسيولوجيا الكلية',
     'جمعت أهم النقاط في ورقتين. راجعوها وقولوا لي إذا نقص شيء.',
     'فسيولوجيا', '54', '12'),
    ('م س', P['orange'], 'مريم سيدي', 'طالبة سنة 2 · صيدلة',
     'سؤال حول محاضرة اليوم',
     'ما الفرق بين الأوعية اللمفاوية السطحية والعميقة في الرقبة؟',
     'تشريح', '23', '7'),
    ('ي و', P['plight'], 'يحيى ولد أحمد', 'طالب سنة 2 · طب',
     'ملفان يحملان الرقم 5 في التشريح',
     'الأوعية واللمفاويات كلاهما مرقّم ‎-5-‎ في الدرايف. الصحيح: الأوعية أولًا.',
     'تشريح', '41', '9'),
]
TODAY = [
    ('08:30', 'Fosses nasales',      'Ali Ghorbel',  'ANATOMIE',       P['ppale'], P['purple']),
    ('10:15', 'Les glucides',        'Kebir',        'BIOCHIMIE',      P['opale'], P['orange']),
    ('14:00', 'Les lipides',         'Kadijetou Ba', 'BIOCHIMIE',      P['opale'], '#C2410C'),
]

# ---------------------------------------------------------------- LOGIN
def login(v):
    if v == 'cards':
        return ('<div class="phone" style="background:#fff">'
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 30px">'
          '%s'
          '<div style="font-size:31px;font-weight:700;margin-top:18px;letter-spacing:-.02em">'
          '<span style="color:%s">My</span><span style="color:%s">Promo</span></div>'
          '<div style="width:100%%;display:flex;flex-direction:column;gap:11px;margin-top:40px">'
          '<div class="btn btn-p">تسجيل الدخول</div>'
          '<div class="btn btn-g">إنشاء حساب</div></div>'
          '<div style="font-size:11.5px;color:%s;line-height:1.9;text-align:center;margin-top:22px;'
          'max-width:250px">بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية</div>'
          '</div></div>' % (mark(74, 'l1'), P['ink'], P['purple'], P['ink3']))
    if v == 'dense':
        return ('<div class="phone" style="background:#fff">'
          '<div style="padding:56px 26px 0;display:flex;flex-direction:column">'
          '<div style="display:flex;align-items:center;gap:11px">%s'
          '<div style="font-size:22px;font-weight:700"><span style="color:%s">My</span>'
          '<span style="color:%s">Promo</span></div></div>'
          '<div style="font-size:14px;color:%s;margin-top:14px;line-height:1.7">'
          'أدخل بريدك الجامعي للمتابعة</div>'
          '<div style="display:flex;flex-direction:column;gap:10px;margin-top:30px">'
          '<div class="fld">%s<span>البريد الإلكتروني</span></div>'
          '<div class="fld">%s<span>كلمة المرور</span></div>'
          '<div class="btn btn-p" style="margin-top:6px">تسجيل الدخول</div></div>'
          '<div style="display:flex;justify-content:space-between;margin-top:18px;font-size:13px">'
          '<span style="color:%s">نسيت كلمة المرور؟</span>'
          '<span style="color:%s;font-weight:600">إنشاء حساب</span></div>'
          '<div style="display:flex;align-items:center;gap:12px;margin-top:34px;color:%s;font-size:12px">'
          '<div style="flex:1;height:1px;background:%s"></div>أو<div style="flex:1;height:1px;background:%s"></div></div>'
          '<div class="btn btn-ol" style="margin-top:18px">المتابعة بحساب Google</div>'
          '</div></div>' % (mark(40, 'l2'), P['ink'], P['purple'], P['ink2'],
                            ic('mail', 18), ic('lock', 18),
                            P['ink3'], P['purple'], P['ink3'], P['line'], P['line']))
    return ('<div class="phone" style="background:%s">'
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 30px">'
      '%s'
      '<div style="font-size:32px;font-weight:700;color:#fff;margin-top:20px;letter-spacing:-.02em">MyPromo</div>'
      '<div style="font-size:15px;color:rgba(255,255,255,.78);line-height:1.85;text-align:center;margin-top:12px">'
      'كل ما تشاركه دفعتك،<br>في مكان واحد</div></div>'
      '<div style="background:#fff;border-radius:30px 30px 0 0;padding:32px 26px 40px;'
      'display:flex;flex-direction:column;gap:11px">'
      '<div style="font-size:19px;font-weight:700;margin-bottom:6px">أهلاً بك</div>'
      '<div class="btn btn-p">تسجيل الدخول</div>'
      '<div class="btn btn-ol">إنشاء حساب</div>'
      '<div style="font-size:11.5px;color:%s;line-height:1.9;text-align:center;margin-top:10px">'
      'بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية</div>'
      '</div></div>' % (P['purple'], mark(80, 'l3', True), P['ink3']))

# ---------------------------------------------------------------- FEED
def post_card(p, style='cards'):
    ini, col, name, meta, title, body, tag, likes, cms = p
    inner = ('<div style="display:flex;align-items:center;gap:11px">' + av(ini, col) +
      '<div class="grow"><div style="font-size:14.5px;font-weight:700">%s</div>'
      '<div style="font-size:11.5px;color:%s;margin-top:2px">%s</div></div>'
      '<div style="color:%s">%s</div></div>'
      '<div class="ptitle">%s</div><div class="pbody">%s</div>'
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">'
      '<div class="pfoot" style="margin:0"><span class="pf">%s %s</span><span class="pf">%s %s</span></div>'
      '<span class="chip">%s</span></div>'
      % (name, P['ink3'], meta, P['ink3'], ic('dots',18), title, body,
         ic('heart',17), likes, ic('msg',17), cms, tag))
    if style == 'dense':
        return '<div style="padding:15px 18px;border-bottom:1px solid %s;background:#fff">%s</div>' % (P['linesoft'], inner)
    return '<div class="card" style="padding:15px">%s</div>' % inner

def feed(v):
    if v == 'cards':
        return ('<div class="phone">'
          '<div class="hdr"><div class="hdr-row">%s'
          '<div class="hdr-t">الرئيسية</div>'
          '<div class="icobtn">%s</div>%s</div>'
          '<div class="tabs"><span class="on">لك</span><span>متابَعة</span></div></div>'
          '<div class="scroll"><div class="pad list">%s</div></div>%s</div>'
          % (mark(34,'f1'), ic('bell',19), av('ه ب', P['purple'], 38, 13),
             ''.join(post_card(p) for p in POSTS[:2]), nav('home')))
    if v == 'dense':
        return ('<div class="phone" style="background:#fff">'
          '<div class="hdr" style="padding-bottom:0"><div class="hdr-row">'
          '<div class="hdr-t">الرئيسية</div><div class="icobtn">%s</div>%s</div>'
          '<div class="tabs"><span class="on">لك</span><span>متابَعة</span></div></div>'
          '<div class="scroll">%s</div>%s</div>'
          % (ic('bell',19), av('ه ب', P['purple'], 38, 13),
             ''.join(post_card(p,'dense') for p in POSTS), nav('home')))
    return ('<div class="phone" style="background:%s">'
      '<div class="hdr-bold"><div class="hdr-row">%s'
      '<div class="hdr-t">الرئيسية</div><div class="icobtn">%s</div>%s</div>'
      '<div class="tabs tabs-b"><span class="on">لك</span><span>متابَعة</span></div></div>'
      '<div class="scroll"><div class="pad list" style="margin-top:-2px">%s</div></div>%s</div>'
      % (P['bg'], mark(34,'f3',True), ic('bell',19),
         av('ه ب', 'rgba(255,255,255,.22)', 38, 13),
         ''.join(post_card(p) for p in POSTS[:2]), nav('home')))

# ---------------------------------------------------------------- ARCHIVE
def archive(v):
    if v == 'cards':
        rows = ''.join(
          '<div class="card"><div class="row">%s<div class="grow"><div class="nm">%s</div>'
          '<div class="mt">%s</div></div>%s%s</div></div>'
          % (tile(k, bg, fg), n, (('%d ملف · %s' % (c, pr)) if c else pr),
             ('<span class="cnt">%d</span>' % c) if c else '<span class="chip-g chip">فارغ</span>',
             ('<span class="chev">%s</span>' % ic('chev',18)) if c else '')
          for n, k, c, pr, bg, fg in MODS)
        return ('<div class="phone">'
          '<div class="hdr"><div class="hdr-row"><div class="hdr-t">الأرشيف<div class="hdr-s">UNEM · PCEM2</div></div>'
          '<div class="icobtn">%s</div></div>'
          '<div class="srch">%s<span>ابحث في الأرشيف</span></div>'
          '<div class="seg"><span class="on">السداسي 1</span><span>السداسي 2</span></div></div>'
          '<div class="scroll"><div class="pad list">%s</div></div>%s</div>'
          % (ic('bookmark',19), ic('search',18), rows, nav('archive')))
    if v == 'dense':
        rows = ''.join(
          '<div class="drow">%s<div class="grow"><div class="nm" style="font-size:14px">%s</div>'
          '<div class="mt">%s</div></div>%s</div>'
          % (tile(k, bg, fg, True, 18), n, (('%d ملف · %s' % (c, pr)) if c else pr),
             (('<span class="cnt">%d</span><span class="chev">%s</span>' % (c, ic('chev',17)))
              if c else '<span style="font-size:11.5px;color:%s">فارغ</span>' % P['ink3']))
          for n, k, c, pr, bg, fg in MODS)
        lecs = ''.join(
          '<div class="drow"><span style="width:26px;height:26px;border-radius:8px;background:%s;color:%s;'
          'display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">%d</span>'
          '<div class="grow"><div class="nm" style="font-size:13.5px;font-weight:500">%s</div></div>'
          '<span style="font-size:10px;font-weight:700;color:%s">PDF</span></div>'
          % (P['ppale'], P['purple'], i, t, P['ink3']) for i, t in LECS[:4])
        return ('<div class="phone" style="background:#fff">'
          '<div class="hdr"><div class="hdr-row"><div class="hdr-t">الأرشيف</div>'
          '<div class="icobtn">%s</div></div>'
          '<div class="srch">%s<span>ابحث في الأرشيف</span></div></div>'
          '<div class="scroll"><div class="dhead">السداسي 1</div><div class="dlist">%s</div>'
          '<div class="dhead">ANATOMIE — آخر المحاضرات</div><div class="dlist">%s</div></div>%s</div>'
          % (ic('bookmark',19), ic('search',18), rows, lecs, nav('archive')))
    cells = ''.join(
      '<div style="background:#fff;border-radius:18px;padding:15px;display:flex;flex-direction:column;gap:10px;'
      '%sbox-shadow:0 2px 10px rgba(26,20,36,.05)">%s'
      '<div><div style="font-size:13.5px;font-weight:700;line-height:1.35">%s</div>'
      '<div style="font-size:11.5px;color:%s;margin-top:4px">%s</div></div></div>'
      % ('grid-column:span 2;' if (i == len(MODS) - 1 and len(MODS) % 2) else '',
         tile(k, bg, fg), n, P['ink3'], ('%d محاضرة' % c) if c else 'فارغ')
      for i, (n, k, c, pr, bg, fg) in enumerate(MODS))
    return ('<div class="phone" style="background:%s">'
      '<div class="hdr-bold"><div class="hdr-row"><div class="hdr-t">الأرشيف'
      '<div class="hdr-s">السداسي 1 · 5 مواد</div></div></div>'
      '<div class="srch srch-b">%s<span>ابحث في الأرشيف</span></div></div>'
      '<div class="scroll"><div class="pad">'
      '<div style="display:flex;gap:8px;margin-bottom:14px"><span class="chip">السداسي 1</span>'
      '<span class="chip-g chip">السداسي 2</span><span class="chip-g chip">الامتحانات</span></div>'
      '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px">%s</div>'
      '</div></div>%s</div>' % (P['bg'], ic('search',18), cells, nav('archive')))

# ---------------------------------------------------------------- LECTURES
def lectures(v):
    if v == 'cards':
        rows = ''.join(
          '<div class="card"><div class="row">'
          '<div style="width:52px;flex-shrink:0;text-align:center"><div style="font-size:15px;font-weight:700;'
          'color:%s;font-variant-numeric:tabular-nums">%s</div></div>'
          '<div style="width:3px;height:38px;border-radius:3px;background:%s;flex-shrink:0"></div>'
          '<div class="grow"><div class="nm">%s</div><div class="mt">%s · %s</div></div>'
          '<span class="chev">%s</span></div></div>'
          % (P['purple'], t, fg, ti, pr, m, ic('chev',18))
          for t, ti, pr, m, bg, fg in TODAY)
        return ('<div class="phone">'
          '<div class="hdr"><div class="hdr-row"><div class="hdr-t">المحاضرات'
          '<div class="hdr-s">الثلاثاء 4 سبتمبر</div></div><div class="icobtn">%s</div></div>'
          '<div class="seg"><span class="on">اليوم</span><span>هذا الأسبوع</span></div></div>'
          '<div class="scroll"><div class="pad list">%s'
          '<div style="text-align:center;font-size:12.5px;color:%s;padding:16px 0">'
          'لا محاضرات أخرى اليوم</div></div></div>%s</div>'
          % (ic('clock',19), rows, P['ink3'], nav('book')))
    if v == 'dense':
        rows = ''.join(
          '<div class="drow" style="align-items:flex-start">'
          '<div style="width:44px;flex-shrink:0;font-size:13.5px;font-weight:700;color:%s;padding-top:2px;'
          'font-variant-numeric:tabular-nums">%s</div>'
          '<div class="grow"><div class="nm" style="font-size:14px">%s</div>'
          '<div class="mt">%s</div><span class="chip" style="margin-top:7px;font-size:10.5px;'
          'background:%s;color:%s">%s</span></div></div>'
          % (P['purple'], t, ti, pr, bg, fg, m) for t, ti, pr, m, bg, fg in TODAY)
        return ('<div class="phone" style="background:#fff">'
          '<div class="hdr"><div class="hdr-row"><div class="hdr-t">المحاضرات</div>'
          '<div class="icobtn">%s</div></div></div>'
          '<div class="scroll"><div class="dhead">اليوم · الثلاثاء 4 سبتمبر</div>'
          '<div class="dlist">%s</div><div class="dhead">غدًا</div>'
          '<div class="dlist"><div class="drow"><div style="width:44px;flex-shrink:0;font-size:13.5px;font-weight:700;color:%s">09:00</div>'
          '<div class="grow"><div class="nm" style="font-size:14px">Oreille</div>'
          '<div class="mt">Ali Ghorbel</div></div></div></div></div>%s</div>'
          % (ic('clock',19), rows, P['purple'], nav('book')))
    rows = ''.join(
      '<div style="background:#fff;border-radius:18px;padding:15px;display:flex;gap:13px;align-items:center;'
      'box-shadow:0 2px 10px rgba(26,20,36,.05)">'
      '<div style="width:54px;height:54px;border-radius:15px;background:%s;color:%s;display:flex;'
      'flex-direction:column;align-items:center;justify-content:center;flex-shrink:0">'
      '<div style="font-size:14px;font-weight:700">%s</div></div>'
      '<div class="grow"><div class="nm">%s</div><div class="mt">%s · %s</div></div></div>'
      % (bg, fg, t, ti, pr, m) for t, ti, pr, m, bg, fg in TODAY)
    return ('<div class="phone" style="background:%s">'
      '<div class="hdr-bold"><div class="hdr-row"><div class="hdr-t">المحاضرات'
      '<div class="hdr-s">الثلاثاء 4 سبتمبر · 3 محاضرات</div></div><div class="icobtn">%s</div></div>'
      '<div class="tabs tabs-b"><span class="on">اليوم</span><span>الأسبوع</span></div></div>'
      '<div class="scroll"><div class="pad list">%s</div></div>%s</div>'
      % (P['bg'], ic('clock',19), rows, nav('book')))

# ---------------------------------------------------------------- PROFILE
PITEMS = [('bookmark','ملفاتي المحفوظة','12'), ('book2','منشوراتي','8'),
          ('archive','سجل التحميلات',''), ('settings','الإعدادات',''), ('logout','تسجيل الخروج','')]

def stat(nn, lbl, colour):
    return ('<div style="flex:1;text-align:center"><div style="font-size:19px;font-weight:700;color:%s;'
            'font-variant-numeric:tabular-nums">%s</div>'
            '<div style="font-size:11.5px;color:%s;margin-top:2px">%s</div></div>' % (colour, nn, P['ink3'], lbl))

def profile(v):
    if v == 'cards':
        items = ''.join(
          '<div class="card"><div class="row">%s<div class="grow"><div class="nm" style="font-size:14px">%s</div></div>'
          '%s<span class="chev">%s</span></div></div>'
          % (tile(k, P['bg'], P['ink2'], True, 18), lbl,
             ('<span class="cnt">%s</span>' % n) if n else '', ic('chev',18))
          for k, lbl, n in PITEMS)
        return ('<div class="phone">'
          '<div class="hdr"><div class="hdr-row"><div class="hdr-t">الملف الشخصي</div>'
          '<div class="icobtn">%s</div></div></div>'
          '<div class="scroll"><div class="pad list">'
          '<div class="card" style="padding:20px;display:flex;flex-direction:column;align-items:center;gap:11px">'
          '%s<div style="text-align:center"><div style="font-size:17px;font-weight:700">هَمَد بشير</div>'
          '<div style="font-size:12.5px;color:%s;margin-top:3px">سنة 2 · طب · UNEM</div></div>'
          '<div style="display:flex;width:100%%;margin-top:6px;padding-top:14px;border-top:1px solid %s">%s%s%s</div>'
          '</div>%s</div></div>%s</div>'
          % (ic('settings',19), av('ه ب', P['purple'], 68, 22), P['ink3'], P['linesoft'],
             stat('8','منشور',P['purple']), stat('12','محفوظ',P['orange']), stat('34','تعليق',P['plight']),
             items, nav('user')))
    if v == 'dense':
        items = ''.join(
          '<div class="drow">%s<div class="grow"><div class="nm" style="font-size:14px;font-weight:500">%s</div></div>'
          '%s<span class="chev">%s</span></div>'
          % (tile(k, P['bg'], P['ink2'], True, 17), lbl,
             ('<span class="cnt">%s</span>' % n) if n else '', ic('chev',17))
          for k, lbl, n in PITEMS)
        return ('<div class="phone" style="background:#fff">'
          '<div class="hdr"><div class="hdr-row">%s'
          '<div class="grow"><div style="font-size:17px;font-weight:700">هَمَد بشير</div>'
          '<div style="font-size:12.5px;color:%s;margin-top:2px">سنة 2 · طب · UNEM</div></div>'
          '<div class="icobtn">%s</div></div></div>'
          '<div class="scroll"><div style="display:flex;padding:16px 0;background:%s">%s%s%s</div>'
          '<div class="dlist">%s</div></div>%s</div>'
          % (av('ه ب', P['purple'], 52, 17), P['ink3'], ic('settings',19), P['bg'],
             stat('8','منشور',P['purple']), stat('12','محفوظ',P['orange']), stat('34','تعليق',P['plight']),
             items, nav('user')))
    items = ''.join(
      '<div class="card"><div class="row">%s<div class="grow"><div class="nm" style="font-size:14px">%s</div></div>'
      '%s<span class="chev">%s</span></div></div>'
      % (tile(k, P['ppale'], P['purple'], True, 18), lbl,
         ('<span class="cnt">%s</span>' % n) if n else '', ic('chev',18))
      for k, lbl, n in PITEMS)
    return ('<div class="phone" style="background:%s">'
      '<div class="hdr-bold" style="padding-bottom:46px"><div class="hdr-row">'
      '<div class="hdr-t">الملف الشخصي</div><div class="icobtn">%s</div></div>'
      '<div style="display:flex;align-items:center;gap:14px;margin-top:6px">%s'
      '<div><div style="font-size:19px;font-weight:700;color:#fff">هَمَد بشير</div>'
      '<div style="font-size:12.5px;color:rgba(255,255,255,.78);margin-top:3px">سنة 2 · طب · UNEM</div></div></div></div>'
      '<div class="scroll"><div class="pad" style="margin-top:-34px">'
      '<div class="card" style="display:flex;padding:16px 0;margin-bottom:12px">%s%s%s</div>'
      '<div class="list">%s</div></div></div>%s</div>'
      % (P['bg'], ic('settings',19), av('ه ب', 'rgba(255,255,255,.22)', 62, 21),
         stat('8','منشور',P['purple']), stat('12','محفوظ',P['orange']), stat('34','تعليق',P['plight']),
         items, nav('user')))

# ---------------------------------------------------------------- write files
SHELL = ('<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n'
         '<script src="./support.js"></script>\n</head>\n<body>\n<x-dc>\n<helmet>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
         'family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap">\n'
         '<style>%s</style>\n</helmet>\n'
         '%s\n</x-dc>\n</body>\n</html>\n')

SCREENS = [
    ('Login',    'page-login',    'تسجيل الدخول', login),
    ('Feed',     'page-feed',     'الرئيسية',     feed),
    ('Archive',  'page-archive',  'الأرشيف',      archive),
    ('Lectures', 'page-lectures', 'المحاضرات',    lectures),
    ('Profile',  'page-profile',  'الملف الشخصي', profile),
]
VARIANTS = [('Cards','بطاقات'), ('Dense','مدمج'), ('Bold','لوني')]

boards, pages = [], []
for si, (screen, page, ar_name, fn) in enumerate(SCREENS):
    pages.append({'id': page, 'name': ar_name})
    for vi, (vn, v_ar) in enumerate(VARIANTS):
        stem = 'Main' if (screen == 'Login' and vn == 'Cards') else screen + vn
        io.open(stem + '.dc.html', 'w', encoding='utf-8').write(
            SHELL % (CSS, fn(vn.lower())))
        boards.append({'file': stem + '.dc.html', 'x': vi * 490, 'y': 0,
                       'w': 390, 'h': 844, 'page': page,
                       'title': '%s — %s' % (ar_name, v_ar)})

canvas = {'artboards': boards, 'pages': pages,
          'launch': {'view': 'canvas', 'page': 'page-login'}}
io.open('canvas.json', 'w', encoding='utf-8').write(
    json.dumps(canvas, ensure_ascii=False, indent=2))
print('artboards:', len(boards), '| pages:', len(pages))
print(' '.join(sorted(f for f in os.listdir('.') if f.endswith('.dc.html'))))
