CREATE OR REPLACE VIEW applause_overview_view AS
SELECT
  applause_id,
  name,
  tagline,
  description,
  icon,
  url,
  stats->>'upvotes' AS upvotes,
  stats->>'views' AS views,
  stats->>'praises' AS praises,
  AVG(applause_praises.rating) AS average_rating
FROM public.applauses
LEFT JOIN public.praises AS applause_praises USING (applause_id)
GROUP BY applause_id;