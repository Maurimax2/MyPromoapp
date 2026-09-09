-- Folding subjects that were catalogued as one subject per chapter.
--
-- DCEM1 was entered with SEMIOLOGIE as a dozen separate subjects — sémiologie
-- cardiaque, sémiologie chirurgicale, one per system. It is one subject and
-- those are its chapters. The same mistake was made more than once, so this
-- is written to be run again with two words changed rather than rewritten.
--
-- Nothing is deleted. Every lecture, every question paper and every question
-- moves to the kept subject; each folded subject becomes a chapter under its
-- own name; only the emptied subject row goes.
--
-- ---------------------------------------------------------------------------
-- HOW TO RUN IT
--
--   1. Run the SELECT below on its own first. It writes nothing and shows
--      exactly which subjects the fold will catch, and how many files each
--      one is holding. If that list is wrong, change `matching` — do not run
--      the second half until the list is right.
--
--   2. Then run the DO block. It says what it moved when it finishes.
--
-- Run it once per group: SEMIOLOGIE first, then change the three words at the
-- top and run it again for the next one.
-- ---------------------------------------------------------------------------


-- ---- 1. look first --------------------------------------------------------
-- Change 'dcem1' and 'SEMIOLOGIE%' here to match the group you are folding.

select m.name,
       m.semester,
       (select count(*) from documents d where d.module = m.id) as files,
       (select count(*) from question_banks b where b.module = m.id) as papers
  from modules m
 where m.promo = 'dcem1'
   and m.name ilike 'SEMIOLOGIE%'
 order by m.position, m.name;


-- ---- 2. fold them ---------------------------------------------------------

do $$
declare
  -- The three words to change. `matching` is compared case-insensitively and
  -- `%` means "and anything after this".
  in_promo  text := 'dcem1';
  matching  text := 'SEMIOLOGIE%';
  keep_name text := 'SEMIOLOGIE';

  keep      text;          -- the subject id that survives
  keep_was  text;          -- what it was called before
  src       record;
  ch        bigint;
  at_pos    int;
  bank      record;
  new_title text;
  moved     int;
  n_files   int := 0;
  n_papers  int := 0;
  n_chaps   int := 0;
begin
  -- The subject that stays: the one already carrying the right name if there
  -- is one, otherwise the first of them. Picking the correctly-named one
  -- matters when this is run a second time — it must fold into what the last
  -- run built, not start a second SEMIOLOGIE beside it.
  select id, name into keep, keep_was
    from modules
   where promo = in_promo and name ilike matching
   order by (name = keep_name) desc, position, name
   limit 1;

  if keep is null then
    raise notice 'nothing named like % in % — nothing done', matching, in_promo;
    return;
  end if;

  select coalesce(max(position) + 1, 0) into at_pos from chapters where module = keep;

  -- The kept subject was one of the strays itself, so its own loose lectures
  -- are a chapter too. Without this they hang above the chapters beside them,
  -- which is the same mess one subject further in.
  if keep_was <> keep_name
     and exists (select 1 from documents where module = keep and chapter is null)
  then
    select id into ch from chapters where module = keep and title = keep_was;
    if ch is null then
      insert into chapters (module, title, position)
           values (keep, keep_was, at_pos)
        returning id into ch;
      at_pos := at_pos + 1;
    end if;

    update documents set chapter = ch where module = keep and chapter is null;
    n_chaps := n_chaps + 1;
    raise notice 'chapter %  (its own lectures)', keep_was;
  end if;

  for src in
    select id, name from modules
     where promo = in_promo and name ilike matching and id <> keep
     order by position, name
  loop
    -- Look, then insert. A unique index is not a conflict target here, and
    -- running this twice must not raise.
    select id into ch from chapters where module = keep and title = src.name;
    if ch is null then
      insert into chapters (module, title, position)
           values (keep, src.name, at_pos)
        returning id into ch;
      at_pos := at_pos + 1;
    end if;

    -- Files first, and the subject row only once they are all off it: if this
    -- dies halfway there is work left to finish, never a file to recover.
    update documents set module = keep, chapter = ch where module = src.id;
    get diagnostics moved = row_count;
    n_files := n_files + moved;

    -- Papers keep their own names unless the kept subject already has one by
    -- that name, in which case the subject it came from tells them apart.
    for bank in select id, title from question_banks where module = src.id loop
      new_title := bank.title;
      if exists (select 1 from question_banks q
                  where q.module = keep and q.title = bank.title) then
        new_title := src.name || ' — ' || bank.title;
      end if;
      update question_banks set module = keep, title = new_title where id = bank.id;
      n_papers := n_papers + 1;
    end loop;

    n_chaps := n_chaps + 1;
    raise notice 'chapter %', src.name;
  end loop;

  delete from modules where promo = in_promo and name ilike matching and id <> keep;

  if keep_was <> keep_name then
    update modules set name = keep_name where id = keep;
  end if;

  raise notice '— % is now one subject: % chapters, % files, % papers moved',
    keep_name, n_chaps, n_files, n_papers;
end $$;
