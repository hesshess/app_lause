CREATE FUNCTION public.handle_applause_upvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.applauses
    SET stats = jsonb_set(
        stats,
        '{upvotes}',
        to_jsonb(COALESCE((stats->>'upvotes')::int, 0) + 1)
    )
    WHERE applause_id = NEW.applause_id;

    RETURN NEW;
END;
$$;

CREATE TRIGGER applause_upvote_trigger
AFTER INSERT ON public.applause_upvotes
FOR EACH ROW EXECUTE FUNCTION public.handle_applause_upvote();


CREATE FUNCTION public.handle_applause_unvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.applauses
    SET stats = jsonb_set(
        stats,
        '{upvotes}',
        to_jsonb(GREATEST(COALESCE((stats->>'upvotes')::int, 0) - 1, 0))
    )
    WHERE applause_id = OLD.applause_id;

    RETURN OLD;
END;
$$;

CREATE TRIGGER applause_unvote_trigger
AFTER DELETE ON public.applause_upvotes
FOR EACH ROW EXECUTE FUNCTION public.handle_applause_unvote();
