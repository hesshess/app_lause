BEGIN;

-- Assumes the profile row for this id already exists.
-- Per request, profiles are not seeded here.

-- categories
INSERT INTO public.categories (
  category_id,
  value,
  name,
  description,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'mindset', 'Mindset', 'Actions that improve self-talk, resilience, and perspective.', '2026-04-01 09:00:00', '2026-04-01 09:00:00'),
  (2, 'wellness', 'Wellness', 'Actions that support physical and mental well-being.', '2026-04-02 09:00:00', '2026-04-02 09:00:00'),
  (3, 'focus', 'Focus', 'Actions that help reduce distraction and improve concentration.', '2026-04-03 09:00:00', '2026-04-03 09:00:00'),
  (4, 'routine', 'Routine', 'Actions that build consistency in daily life.', '2026-04-04 09:00:00', '2026-04-04 09:00:00'),
  (5, 'reflection', 'Reflection', 'Actions centered on journaling, review, and self-awareness.', '2026-04-05 09:00:00', '2026-04-05 09:00:00'),
  (6, 'learning', 'Learning', 'Actions that support study, reading, and skill development.', '2026-04-06 09:00:00', '2026-04-06 09:00:00');

-- topics
INSERT INTO public.topics (
  topic_id,
  value,
  name,
  slug,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'self-growth', 'Self Growth', 'self-growth', '2026-04-01 10:00:00', '2026-04-01 10:00:00'),
  (2, 'wellness', 'Wellness', 'wellness', '2026-04-02 10:00:00', '2026-04-02 10:00:00'),
  (3, 'mindset', 'Mindset', 'mindset', '2026-04-03 10:00:00', '2026-04-03 10:00:00'),
  (4, 'routine', 'Routine', 'routine', '2026-04-04 10:00:00', '2026-04-04 10:00:00'),
  (5, 'reflection', 'Reflection', 'reflection', '2026-04-05 10:00:00', '2026-04-05 10:00:00');

-- challenges
INSERT INTO public.challenges (
  challenge_id,
  title,
  overview,
  goal,
  instructions,
  benefits,
  tags,
  host_name,
  thumbnail_url,
  location,
  challenge_type,
  participation_type,
  duration,
  views_count,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, '7-Day Morning Walk Reset', 'A simple challenge to reset your mornings with movement.', 'Build a more energized start to the day.', 'Walk for 20 minutes every morning and log one reflection after each walk.', 'Better mood, more energy, stronger consistency', 'wellness,morning,consistency', 'Hess', 'https://images.example.com/challenges/morning-walk.png', 'Anywhere', 'wellness', 'solo', '4 - 7 days', 148, '2026-04-01 08:00:00', '2026-04-01 08:00:00'),
  (2, '10-Day Focus Block Sprint', 'Train yourself to protect one distraction-free block each day.', 'Improve concentration and reduce context switching.', 'Set a 30-minute focus block, silence distractions, and review how it went.', 'Deeper work, less distraction, more follow-through', 'focus,deep-work,discipline', 'Hess', 'https://images.example.com/challenges/focus-block.png', 'Anywhere', 'focus', 'solo', '1 - 2 weeks', 203, '2026-04-02 08:00:00', '2026-04-02 08:00:00'),
  (3, '5-Day Reflection Reset', 'Use short daily writing to process your days more clearly.', 'Build an evening reflection habit.', 'Write one win, one lesson, and one priority for tomorrow each night.', 'Clarity, self-awareness, calmer evenings', 'reflection,journaling,clarity', 'Hess', 'https://images.example.com/challenges/reflection-reset.png', 'Anywhere', 'mindset', 'solo', '4 - 7 days', 119, '2026-04-03 08:00:00', '2026-04-03 08:00:00'),
  (4, '14-Day Sleep Wind-Down', 'Create a healthier late-night routine before bed.', 'Reduce overstimulation at night and sleep more consistently.', 'Stop screen use 30 minutes before bed, stretch, and read for 10 minutes.', 'Better sleep, lower stress, steadier energy', 'sleep,wellness,night-routine', 'Hess', 'https://images.example.com/challenges/sleep-wind-down.png', 'Anywhere', 'wellness', 'pair', '1 - 2 weeks', 176, '2026-04-04 08:00:00', '2026-04-04 08:00:00'),
  (5, 'Weekly Reset Circle', 'A small group challenge for setting up a stronger week.', 'Help participants reflect and set weekly priorities.', 'Meet once a week, review the last week, and define the next three priorities.', 'Accountability, planning, better momentum', 'routine,group,planning', 'Hess', 'https://images.example.com/challenges/weekly-reset.png', 'Online', 'mindset', 'group', '2 - 4 weeks', 261, '2026-04-05 08:00:00', '2026-04-05 08:00:00');

-- applauses
INSERT INTO public.applauses (
  applause_id,
  name,
  tagline,
  description,
  icon,
  url,
  stats,
  profile_id,
  category_id,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'Morning Reflection Streak', 'Seven straight mornings of checking in before distractions.', 'I started each morning with five minutes of journaling before looking at my phone, and it made my mornings feel calmer and more intentional.', 'https://images.example.com/applauses/morning-reflection.png', 'https://example.com/actions/morning-reflection', '{"views":120,"praises":8}'::jsonb, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 5, '2026-04-01 07:00:00', '2026-04-01 07:00:00'),
  (2, 'Evening Reset Routine', 'A small nightly sequence to end the day with less chaos.', 'I built a 20-minute evening reset with stretching, journaling, and next-day planning to make nights feel more complete.', 'https://images.example.com/applauses/evening-reset.png', 'https://example.com/actions/evening-reset', '{"views":98,"praises":6}'::jsonb, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 4, '2026-04-02 07:00:00', '2026-04-02 07:00:00'),
  (3, 'Deep Work Sprint', 'One focused block with zero multitasking.', 'I protected a 45-minute focus block and tracked how much more I finished when I stopped checking messages.', 'https://images.example.com/applauses/deep-work.png', 'https://example.com/actions/deep-work', '{"views":145,"praises":11}'::jsonb, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 3, '2026-04-03 07:00:00', '2026-04-03 07:00:00'),
  (4, 'Daily Reading Reset', 'Replacing doomscrolling with 15 minutes of reading.', 'I swapped late-night scrolling with reading and noticed I felt more settled and less mentally noisy before bed.', 'https://images.example.com/applauses/daily-reading.png', 'https://example.com/actions/daily-reading', '{"views":88,"praises":4}'::jsonb, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 6, '2026-04-04 07:00:00', '2026-04-04 07:00:00'),
  (5, 'Mindful Walking Break', 'A midday reset to restore energy and focus.', 'I stepped away for a quiet 10-minute walk each afternoon and used it to reset my attention for the rest of the day.', 'https://images.example.com/applauses/mindful-walk.png', 'https://example.com/actions/mindful-walk', '{"views":111,"praises":9}'::jsonb, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 2, '2026-04-05 07:00:00', '2026-04-05 07:00:00');

-- ideas
INSERT INTO public.ideas (
  idea_id,
  title,
  views_count,
  claimed_at,
  claimed_by,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'Try a 7-day morning focus ritual with journaling and no phone use for the first 20 minutes of the day.', 140, '2026-04-10 08:00:00', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-01 11:00:00', '2026-04-10 08:00:00'),
  (2, 'Design a weekly review template that helps you measure energy, consistency, and progress in one page.', 117, NULL, NULL, '2026-04-02 11:00:00', '2026-04-02 11:00:00'),
  (3, 'Build a low-friction night routine that starts with a one-line journal entry and ends with next-day planning.', 92, NULL, NULL, '2026-04-03 11:00:00', '2026-04-03 11:00:00'),
  (4, 'Create a 14-day challenge around one habit you keep skipping and document what helps you stay consistent.', 165, '2026-04-12 09:00:00', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-04 11:00:00', '2026-04-12 09:00:00'),
  (5, 'Start a small accountability circle where each person shares one priority and one reflection every Sunday.', 101, NULL, NULL, '2026-04-05 11:00:00', '2026-04-05 11:00:00');

-- posts
INSERT INTO public.posts (
  post_id,
  title,
  content,
  stats,
  created_at,
  updated_at,
  topic_id,
  profile_id
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'What changed after I tracked one habit for 7 days', 'For one week I tracked the same morning habit every day. The habit itself was small, but the act of tracking made me much more honest about how often I was drifting away from what I said mattered.', '{"views":83,"replies":2}'::jsonb, '2026-04-01 12:00:00', '2026-04-01 12:00:00', 1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890'),
  (2, 'How I made nightly reflection easier to keep', 'The biggest change was lowering the bar. Instead of writing a full page, I now write one win, one lesson, and one next step. That made the routine easier to repeat.', '{"views":61,"replies":1}'::jsonb, '2026-04-02 12:00:00', '2026-04-02 12:00:00', 5, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890'),
  (3, 'A small fix that improved my focus blocks', 'I stopped opening my inbox before my first focus block. That single change gave me a much cleaner start and reduced context switching a lot.', '{"views":97,"replies":3}'::jsonb, '2026-04-03 12:00:00', '2026-04-03 12:00:00', 3, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890'),
  (4, 'Why walking helped me reset faster than scrolling', 'A 10-minute walk between tasks does more for my attention than another quick break on my phone. It creates a more obvious transition and gives my mind time to settle.', '{"views":72,"replies":0}'::jsonb, '2026-04-04 12:00:00', '2026-04-04 12:00:00', 2, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890'),
  (5, 'My current Sunday reset checklist', 'On Sundays I review the last week, clean up unfinished tasks, choose my top three priorities, and set one non-negotiable habit for the week ahead.', '{"views":129,"replies":4}'::jsonb, '2026-04-05 12:00:00', '2026-04-05 12:00:00', 4, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890');

-- teams
INSERT INTO public.teams (
  team_id,
  name,
  stage,
  size,
  open_spots,
  roles,
  description,
  leader_profile_id,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'Reset Circle', 'starting', 3, 4, 'accountability partner, reflective writer', 'A small team for people building calmer mornings through check-ins, reflection, and weekly resets.', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-01 13:00:00', '2026-04-01 13:00:00'),
  (2, 'Focus Crew', 'first-members', 2, 5, 'deep work partner, planner', 'A growth team centered on focus blocks, planning rituals, and fewer distractions during the workday.', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-02 13:00:00', '2026-04-02 13:00:00'),
  (3, 'Walk Club', 'active', 6, 3, 'routine builder, encouragement buddy', 'Members use short daily walks to reset energy, reflect, and stay consistent with a simple wellness habit.', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-03 13:00:00', '2026-04-03 13:00:00'),
  (4, 'Night Reset', 'active', 5, 2, 'journaler, check-in buddy', 'A team experimenting with screen boundaries, journaling, and better wind-down routines each evening.', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-04 13:00:00', '2026-04-04 13:00:00'),
  (5, 'Weekly Review', 'expanding', 8, 6, 'review partner, systems thinker', 'A group that meets weekly to review progress, set priorities, and keep each other accountable.', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-05 13:00:00', '2026-04-05 13:00:00');

-- message_rooms
INSERT INTO public.message_rooms (
  message_room_id,
  created_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, '2026-04-01 14:00:00'),
  (2, '2026-04-02 14:00:00'),
  (3, '2026-04-03 14:00:00'),
  (4, '2026-04-04 14:00:00'),
  (5, '2026-04-05 14:00:00');

-- follows
INSERT INTO public.follows (
  follower_id,
  following_id,
  created_at
)
VALUES
  ('33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-01 15:00:00'),
  ('33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-02 15:00:00'),
  ('33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-03 15:00:00'),
  ('33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-04 15:00:00'),
  ('33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-05 15:00:00');

-- applause_upvotes (composite primary key)
INSERT INTO public.applause_upvotes (
  applause_id,
  profile_id,
  created_at
)
VALUES
  (1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-01 16:00:00');

-- praises
INSERT INTO public.praises (
  praise_id,
  applause_id,
  profile_id,
  rating,
  content,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 5, 'This routine feels calm, realistic, and easy to learn from.', '2026-04-01 17:00:00', '2026-04-01 17:00:00'),
  (2, 2, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 4, 'A strong example of how small routines can reduce friction.', '2026-04-02 17:00:00', '2026-04-02 17:00:00'),
  (3, 3, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 5, 'The focus block idea is clear and easy to copy.', '2026-04-03 17:00:00', '2026-04-03 17:00:00'),
  (4, 4, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 4, 'This is a practical swap for a habit that usually drains energy.', '2026-04-04 17:00:00', '2026-04-04 17:00:00'),
  (5, 5, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 5, 'Simple, grounded, and easy to see yourself trying.', '2026-04-05 17:00:00', '2026-04-05 17:00:00');

-- idea_likes (composite primary key)
INSERT INTO public.idea_likes (
  idea_id,
  profile_id,
  created_at
)
VALUES
  (1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-01 18:00:00');

-- post_upvotes (composite primary key)
INSERT INTO public.post_upvotes (
  post_id,
  profile_id
)
VALUES
  (1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890');

-- post_replies
INSERT INTO public.post_replies (
  post_reply_id,
  post_id,
  parent_id,
  profile_id,
  content,
  created_at,
  updated_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 1, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Tracking really changes how honest you become about what you are actually doing each day.', '2026-04-01 19:00:00', '2026-04-01 19:00:00'),
  (2, 1, 1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Exactly. The data is small, but it makes the pattern much harder to ignore.', '2026-04-01 19:10:00', '2026-04-01 19:10:00'),
  (3, 2, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Lowering the bar is underrated. Consistency improves once the routine feels easy to start.', '2026-04-02 19:00:00', '2026-04-02 19:00:00'),
  (4, 3, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Inbox-first is always expensive for focus. This is a solid adjustment.', '2026-04-03 19:00:00', '2026-04-03 19:00:00'),
  (5, 5, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Weekly resets help me notice what is repeating instead of reacting day by day.', '2026-04-05 19:00:00', '2026-04-05 19:00:00');

-- message_room_members (composite primary key)
INSERT INTO public.message_room_members (
  message_room_id,
  profile_id,
  created_at
)
VALUES
  (1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-01 20:00:00'),
  (2, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-02 20:00:00'),
  (3, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-03 20:00:00'),
  (4, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-04 20:00:00'),
  (5, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', '2026-04-05 20:00:00');

-- messages
INSERT INTO public.messages (
  message_id,
  message_room_id,
  sender_id,
  content,
  is_seen,
  created_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Checking in on my morning reset for this week.', true, '2026-04-01 21:00:00'),
  (2, 2, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Today''s focus block went better once I closed all side tabs.', false, '2026-04-02 21:00:00'),
  (3, 3, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'I kept the reflection short tonight and it was much easier to sustain.', true, '2026-04-03 21:00:00'),
  (4, 4, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'My evening reset is finally starting to feel automatic.', false, '2026-04-04 21:00:00'),
  (5, 5, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'Setting one clear weekly priority helped more than setting five.', false, '2026-04-05 21:00:00');

-- notifications
INSERT INTO public.notifications (
  notification_id,
  source_id,
  applause_id,
  post_id,
  target_id,
  type,
  created_at
)
OVERRIDING SYSTEM VALUE
VALUES
  (1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', NULL, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'follow', '2026-04-01 22:00:00'),
  (2, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 1, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'praise', '2026-04-02 22:00:00'),
  (3, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', NULL, 1, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'reply', '2026-04-03 22:00:00'),
  (4, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', NULL, 3, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'mention', '2026-04-04 22:00:00'),
  (5, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 5, NULL, '33a4bcc7-21a6-4d8f-bbf7-ab7ddaeaa890', 'praise', '2026-04-05 22:00:00');

COMMIT;
