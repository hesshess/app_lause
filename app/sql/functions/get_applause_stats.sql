CREATE OR REPLACE FUNCTION get_applause_stats(applause_id text)
RETURNS TABLE(
    applause_views bigint,
    applause_visit bigint,
    month text
) AS $$
BEGIN 
    RETURN QUERY 
    SELECT 
        SUM(CASE WHEN event_type = 'applause_view' Then 1 ELSE 0 END) AS applause_views,
        SUM(CASE WHEN event_type = 'applause_visit' THEN 1 ELSE 0 END) AS apllause_visit,
        to_char(events.created_at, 'YYYY-MM') AS month
    FROM public.events
    WHERE event_data ->> 'applause_id' = applause_id
    GROUP BY month;
END;
$$ language plpgsql;
