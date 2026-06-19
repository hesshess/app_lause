create or replace function public.get_dashboard_stats(user_id uuid)
returns table (
    views bigint,
    month text
)
language plpgsql
set search_path = ''
as $$
begin
    return query
    select
        count(*) as views,
        to_char(events.created_at, 'YYYY-MM') as month
    from public.events
    where events.event_type = 'profile_view'
      and (events.event_data ->> 'profile_id')::uuid = user_id
    group by to_char(events.created_at, 'YYYY-MM')
    order by month;
end;
$$;
