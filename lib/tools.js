// Everything MyPromo can do.
//
// One list, read by الرئيسية's row and by the الأدوات screen, so a feature
// cannot appear in one and be forgotten in the other. `about` is a sentence a
// student can act on — a name alone told nobody what «تحدّي زميلك» was.

export const TOOLS = [
  { id: 'quiz',   label: 'اختبر نفسك', icon: 'quiz',   href: '/quiz',
    about: 'أسئلة من امتحانات سابقة',      from: '#6B21B5', to: '#8B5CF6' },
  { id: 'lectures', label: 'المحاضرات', icon: 'book',  href: '/lectures',
    about: 'كل ملفات موادك',               from: '#F97316', to: '#FDBA74' },
  { id: 'qa',     label: 'سؤال وجواب',  icon: 'msg',    href: '/qa',
    about: 'اسأل دفعتك',                   from: '#7C3AED', to: '#A78BFA' },
  { id: 'chat',   label: 'المحادثات',   icon: 'send',   href: '/chat',
    about: 'رسائل مباشرة',                 from: '#C2410C', to: '#F97316' },
  { id: 'rooms',  label: 'غرف الدراسة', icon: 'person', href: '/rooms',
    about: 'ادرسوا على نفس الصفحة',        from: '#5B21B6', to: '#7C3AED' },
  { id: 'review', label: 'المراجعة',    icon: 'clock',  href: '/review',
    about: 'ما أخطأت فيه، حين يحين وقته',  from: '#5B21B6', to: '#8B5CF6' },
  { id: 'points', label: 'النقاط',      icon: 'check',  href: '/points',
    about: 'ما جمعته من مساهماتك',         from: '#9A3412', to: '#F97316' },
  { id: 'duel',   label: 'تحدّي زميلك', icon: 'flask',  about: 'سؤال بسؤال مع زميل' },
  { id: 'models', label: 'نماذج 3D',    icon: 'atom',   about: 'تشريح تدور حوله بإصبعك' },
  { id: 'timetable', label: 'جدول الحصص', icon: 'clock', about: 'حصص اليوم والأسبوع' },
];
