create or replace function public.track_event(
    event_type public.event_type,
    event_data jsonb
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    username_var text;
    found_profile_id uuid;
    found_applause_id bigint;
    new_event_data jsonb;
    safe_applause_id bigint;
begin
    if event_type = 'profile_view' then
        username_var := event_data->>'username';
        if username_var is not null then
            select profile_id into found_profile_id from public.profiles where username = username_var;
            if found_profile_id is not null then
                new_event_data := event_data - 'username';
                new_event_data := jsonb_set(new_event_data, '{profile_id}', to_jsonb(found_profile_id));
                insert into public.events (event_type, event_data)
                values (event_type, new_event_data);
            end if;
        end if;
    elsif event_type = 'applause_view' or event_type = 'applause_visit' then
        if (event_data ? 'applause_id') then
            begin
                safe_applause_id := (event_data->>'applause_id')::bigint;
            exception when others then
                safe_applause_id := null;
            end;
            if safe_applause_id is not null then
                select applause_id into found_applause_id from public.applauses where applause_id = safe_applause_id;
                if found_applause_id is not null then
                    insert into public.events (event_type, event_data)
                    values (event_type, event_data);
                end if;
            end if;
        end if;
    end if;
end;
$$;
