CREATE OR REPLACE VIEW ideas_view AS
SELECT ideas.idea_id,
    CASE
        WHEN ideas.claimed_at IS NULL THEN ideas.title
        ELSE 'ClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimed'
    END AS title,
    ideas.views_count,
    CASE
        WHEN ideas.claimed_at IS NULL THEN FALSE
        ELSE TRUE
    END AS is_claimed,
    COUNT(idea_likes.idea_id) AS likes,
    ideas.created_at
FROM public.ideas
    LEFT JOIN public.idea_likes USING (idea_id)
GROUP BY ideas.idea_id;
