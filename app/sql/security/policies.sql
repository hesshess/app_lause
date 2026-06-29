-- 1) SECURITY DEFINER VIEW 경고 해소
alter view public.community_post_detail_view set (security_invoker = true);
alter view public.ideas_view set (security_invoker = true);
alter view public.applause_overview_view set (security_invoker = true);
alter view public.messages_view set (security_invoker = true);



-- 2) RLS enable
alter table public.posts enable row level security;
alter table public.post_replies enable row level security;
alter table public.post_upvotes enable row level security;
alter table public.praises enable row level security;
alter table public.ideas enable row level security;
alter table public.idea_likes enable row level security;
alter table public.follows enable row level security;
alter table public.message_rooms enable row level security;
alter table public.message_room_members enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.teams enable row level security;
alter table public.challenges enable row level security;
alter table public.events enable row level security;
alter table public.__drizzle_migrations enable row level security;




-- 3) 공개 읽기
create policy "posts are readable by everyone"
on public.posts for select
to anon, authenticated
using (true);

create policy "praises are readable by everyone"
on public.praises for select
to anon, authenticated
using (true);

create policy "ideas are readable by everyone"
on public.ideas for select
to anon, authenticated
using (true);

create policy "teams are readable by everyone"
on public.teams for select
to anon, authenticated
using (true);

create policy "challenges are readable by everyone"
on public.challenges for select
to anon, authenticated
using (true);

create policy "replies are readable by everyone"
on public.post_replies for select
to anon, authenticated
using (true);




-- 4) 소유 기반 쓰기
create policy "authenticated users can create posts"
on public.posts for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "owners can update posts"
on public.posts for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "owners can delete posts"
on public.posts for delete
to authenticated
using (auth.uid() = profile_id);

create policy "authenticated users can create praises"
on public.praises for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "authors can update praises"
on public.praises for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "authors can delete praises"
on public.praises for delete
to authenticated
using (auth.uid() = profile_id);

create policy "authenticated users can create replies"
on public.post_replies for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "authors can update replies"
on public.post_replies for update
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "authors can delete replies"
on public.post_replies for delete
to authenticated
using (auth.uid() = profile_id);

create policy "users can claim ideas"
on public.ideas for update
to authenticated
using (true)
with check (claimed_by = auth.uid() or claimed_by is null);

-- 5) like / upvote / follow 토글 테이블
create policy "idea likes readable by everyone"
on public.idea_likes for select
to anon, authenticated
using (true);

create policy "users can manage own idea likes"
on public.idea_likes for all
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "post upvotes readable by everyone"
on public.post_upvotes for select
to anon, authenticated
using (true);

create policy "users can manage own post upvotes"
on public.post_upvotes for all
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "follows readable by everyone"
on public.follows for select
to anon, authenticated
using (true);

create policy "users can create own follows"
on public.follows for insert
to authenticated
with check (auth.uid() = follower_id);

create policy "users can delete own follows"
on public.follows for delete
to authenticated
using (auth.uid() = follower_id);




-- 6) 메시지
create policy "room members can read memberships"
on public.message_room_members for select
to authenticated
using (
  exists (
    select 1
    from public.message_room_members me
    where me.message_room_id = message_room_members.message_room_id
      and me.profile_id = auth.uid()
  )
);

create policy "users can insert memberships for rooms they participate in"
on public.message_room_members for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "room members can read rooms"
on public.message_rooms for select
to authenticated
using (
  exists (
    select 1
    from public.message_room_members m
    where m.message_room_id = message_rooms.message_room_id
      and m.profile_id = auth.uid()
  )
);

create policy "authenticated users can create rooms"
on public.message_rooms for insert
to authenticated
with check (true);

create policy "room members can read messages"
on public.messages for select
to authenticated
using (
  exists (
    select 1
    from public.message_room_members m
    where m.message_room_id = messages.message_room_id
      and m.profile_id = auth.uid()
  )
);

create policy "room members can send messages as themselves"
on public.messages for insert
to authenticated
with check (
  auth.uid() = sender_id
  and exists (
    select 1
    from public.message_room_members m
    where m.message_room_id = messages.message_room_id
      and m.profile_id = auth.uid()
  )
);

-- 7) 알림
create policy "users can read own notifications"
on public.notifications for select
to authenticated
using (auth.uid() = target_id);

create policy "users can update own notifications"
on public.notifications for update
to authenticated
using (auth.uid() = target_id)
with check (auth.uid() = target_id);





-- applause_upvotes: RLS 켜기
alter table public.applause_upvotes enable row level security;

-- applause_upvotes: 공개 읽기
create policy "applause_upvotes are readable by everyone"
on public.applause_upvotes
for select
to anon, authenticated
using (true);

-- applause_upvotes: 로그인 사용자는 자기 upvote만 생성 가능
create policy "users can insert own applause upvotes"
on public.applause_upvotes
for insert
to authenticated
with check (auth.uid() = profile_id);

-- applause_upvotes: 로그인 사용자는 자기 upvote만 삭제 가능
create policy "users can delete own applause upvotes"
on public.applause_upvotes
for delete
to authenticated
using (auth.uid() = profile_id);


-- follows: 공개 읽기
create policy "follows are readable by everyone"
on public.follows
for select
to anon, authenticated
using (true);

-- follows: 자기 계정으로만 follow 생성
create policy "users can create own follows"
on public.follows
for insert
to authenticated
with check (auth.uid() = follower_id);

-- follows: 자기 계정으로만 follow 삭제
create policy "users can delete own follows"
on public.follows
for delete
to authenticated
using (auth.uid() = follower_id);


-- idea_likes: 공개 읽기
create policy "idea_likes are readable by everyone"
on public.idea_likes
for select
to anon, authenticated
using (true);

-- idea_likes: 자기 like만 생성
create policy "users can insert own idea likes"
on public.idea_likes
for insert
to authenticated
with check (auth.uid() = profile_id);

-- idea_likes: 자기 like만 삭제
create policy "users can delete own idea likes"
on public.idea_likes
for delete
to authenticated
using (auth.uid() = profile_id);


-- post_upvotes: 공개 읽기
create policy "post_upvotes are readable by everyone"
on public.post_upvotes
for select
to anon, authenticated
using (true);

-- post_upvotes: 자기 upvote만 생성
create policy "users can insert own post upvotes"
on public.post_upvotes
for insert
to authenticated
with check (auth.uid() = profile_id);

-- post_upvotes: 자기 upvote만 삭제
create policy "users can delete own post upvotes"
on public.post_upvotes
for delete
to authenticated
using (auth.uid() = profile_id);





create or replace function public.is_room_member(room_id bigint, user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.message_room_members
    where message_room_id = room_id
      and profile_id = user_id
  );
$$;

drop policy if exists "room members can read memberships" on public.message_room_members;
drop policy if exists "users can insert memberships for rooms they participate in" on public.message_room_members;
drop policy if exists "authenticated users can insert memberships" on public.message_room_members;
drop policy if exists "room members can read rooms" on public.message_rooms;
drop policy if exists "authenticated users can create rooms" on public.message_rooms;
drop policy if exists "room members can read messages" on public.messages;
drop policy if exists "room members can send messages as themselves" on public.messages;

alter table public.message_room_members enable row level security;
alter table public.message_rooms enable row level security;
alter table public.messages enable row level security;

create policy "room members can read memberships"
on public.message_room_members
for select
to authenticated
using (
  public.is_room_member(message_room_id, auth.uid())
);

create policy "authenticated users can insert memberships"
on public.message_room_members
for insert
to authenticated
with check (true);

create policy "room members can read rooms"
on public.message_rooms
for select
to authenticated
using (
  public.is_room_member(message_room_id, auth.uid())
);

create policy "authenticated users can create rooms"
on public.message_rooms
for insert
to authenticated
with check (true);

create policy "room members can read messages"
on public.messages
for select
to authenticated
using (
  public.is_room_member(message_room_id, auth.uid())
);

create policy "room members can send messages as themselves"
on public.messages
for insert
to authenticated
with check (
  auth.uid() = sender_id
  and public.is_room_member(message_room_id, auth.uid())
);