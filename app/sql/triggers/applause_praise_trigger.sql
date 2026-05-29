CREATE FUNCTION public.handle_applause_praises_count_up()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.applauses
    SET stats = jsonb_set(
        stats,
        '{praises}',
        to_jsonb(COALESCE((stats->>'praises')::int, 0) + 1)
    )
    WHERE applause_id = NEW.applause_id;

    RETURN NEW;
END;
$$;

CREATE TRIGGER applause_praises_count_up_trigger
AFTER INSERT ON public.praises
FOR EACH ROW EXECUTE FUNCTION public.handle_applause_praises_count_up();


CREATE FUNCTION public.handle_applause_praises_count_down()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.applauses
    SET stats = jsonb_set(
        stats,
        '{praises}',
        to_jsonb(GREATEST(COALESCE((stats->>'praises')::int, 0) - 1, 0))
    )
    WHERE applause_id = OLD.applause_id;

    RETURN OLD;
END;
$$;

CREATE TRIGGER applause_praises_count_down_trigger
AFTER DELETE ON public.praises
FOR EACH ROW EXECUTE FUNCTION public.handle_applause_praises_count_down();
