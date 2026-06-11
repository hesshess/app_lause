create or replace function get_dashboard_stats(user_id uuid)
returns table (
    views bigint,
    month text
) as $$
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
$$ language plpgsql;