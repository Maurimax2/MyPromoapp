import { redirect } from 'next/navigation';

// الأرشيف folded into الدراسة.
//
// They were two tabs for one idea — "the material" — and a student looking
// for a lecture had to guess which of them held it. The subject screens under
// /archive/[id] are untouched and still where a subject opens; only the list
// moved.
export default function Archive() {
  redirect('/study');
}
