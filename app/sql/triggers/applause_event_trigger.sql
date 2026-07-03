CREATE FUNCTION public.handle_applause_view_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    target_applause_id bigint;
BEGIN
    IF NEW.event_type <> 'applause_view' THEN
        RETURN NEW;
    END IF;

    BEGIN
        target_applause_id := (NEW.event_data->>'applause_id')::bigint;
    EXCEPTION WHEN OTHERS THEN
        RETURN NEW;
    END;

    UPDATE public.applauses
    SET stats = jsonb_set(
        stats,
        '{views}',
        to_jsonb(COALESCE((stats->>'views')::int, 0) + 1)
    )
    WHERE applause_id = target_applause_id;

    RETURN NEW;
END;
$$;

CREATE TRIGGER applause_view_event_trigger
AFTER INSERT ON public.events
FOR EACH ROW EXECUTE FUNCTION public.handle_applause_view_event();


CREATE FUNCTION public.handle_applause_visit_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    target_applause_id bigint;
BEGIN
    IF NEW.event_type <> 'applause_visit' THEN
        RETURN NEW;
    END IF;

    BEGIN
        target_applause_id := (NEW.event_data->>'applause_id')::bigint;
    EXCEPTION WHEN OTHERS THEN
        RETURN NEW;
    END;

    UPDATE public.applauses
    SET stats = jsonb_set(
        stats,
        '{visits}',
        to_jsonb(COALESCE((stats->>'visits')::int, 0) + 1)
    )
    WHERE applause_id = target_applause_id;

    RETURN NEW;
END;
$$;

CREATE TRIGGER applause_visit_event_trigger
AFTER INSERT ON public.events
FOR EACH ROW EXECUTE FUNCTION public.handle_applause_visit_event();
