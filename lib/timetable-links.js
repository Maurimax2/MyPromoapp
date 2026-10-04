// Puts a way to revise on each session of the planning.
//
// A session says «Biochimie — Introduction à la biochimie clinique». The
// student wants the lecture, or failing that the subject. Both are looked up
// here, on the server, against the subjects the student actually studies, and
// the answer travels with the session so the phone does no matching.
//
// A session with nothing to open stays plain — an honest «no file yet» beats a
// link to the wrong chapter.

import { LECTURE, matchSubjects, matchLecture } from './timetable-core.js';

/**
 * @param sessions   from sessionsOf()
 * @param subjects   the student's subject rows: `{ id, name }`
 * @param sb         a Supabase client that may read `documents`
 * @returns the same sessions, each lecture with `sub` (a subject id),
 *          `subName`, and — when a file matches — `fid` and `file`.
 */
export async function withLinks(sessions, subjects, sb) {
  const wanted = sessions.filter((s) => LECTURE.has(s.kind));
  const found = new Map();                      // module name → matching subjects
  for (const m of new Set(wanted.map((s) => s.module))) found.set(m, matchSubjects(m, subjects));

  const ids = [...new Set([...found.values()].flat().map((s) => s.id))];
  const files = new Map();                      // subject id → its files
  if (ids.length && sb) {
    const { data } = await sb.from('documents')
      .select('module, title, drive_id')
      .in('module', ids).eq('published', true).eq('where_shown', 'archive')
      .not('drive_id', 'is', null).limit(4000);
    for (const d of data || []) {
      if (!files.has(d.module)) files.set(d.module, []);
      files.get(d.module).push(d);
    }
  }

  return sessions.map((s) => {
    if (!LECTURE.has(s.kind)) return s;
    const subs = found.get(s.module) || [];
    if (!subs.length) return s;
    const hit = matchLecture(s.title, subs.flatMap((x) => files.get(x.id) || []));
    return {
      ...s,
      sub: subs[0].id,
      subName: subs[0].name,
      ...(hit ? { fid: hit.drive_id, file: hit.title } : {}),
    };
  });
}
