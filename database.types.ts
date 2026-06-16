export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      __drizzle_migrations: {
        Row: {
          created_at: number | null
          hash: string
          id: number
        }
        Insert: {
          created_at?: number | null
          hash: string
          id?: number
        }
        Update: {
          created_at?: number | null
          hash?: string
          id?: number
        }
        Relationships: []
      }
      applause_upvotes: {
        Row: {
          applause_id: number
          created_at: string
          profile_id: string
        }
        Insert: {
          applause_id: number
          created_at?: string
          profile_id: string
        }
        Update: {
          applause_id?: number
          created_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applause_upvotes_applause_id_applauses_applause_id_fk"
            columns: ["applause_id"]
            isOneToOne: false
            referencedRelation: "applause_overview_view"
            referencedColumns: ["applause_id"]
          },
          {
            foreignKeyName: "applause_upvotes_applause_id_applauses_applause_id_fk"
            columns: ["applause_id"]
            isOneToOne: false
            referencedRelation: "applauses"
            referencedColumns: ["applause_id"]
          },
          {
            foreignKeyName: "applause_upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      applauses: {
        Row: {
          applause_id: number
          category_id: number | null
          created_at: string
          description: string
          icon: string
          name: string
          profile_id: string
          stats: Json
          tagline: string
          updated_at: string
          url: string
        }
        Insert: {
          applause_id?: never
          category_id?: number | null
          created_at?: string
          description: string
          icon: string
          name: string
          profile_id: string
          stats?: Json
          tagline: string
          updated_at?: string
          url: string
        }
        Update: {
          applause_id?: never
          category_id?: number | null
          created_at?: string
          description?: string
          icon?: string
          name?: string
          profile_id?: string
          stats?: Json
          tagline?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "applauses_category_id_categories_category_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "applauses_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      categories: {
        Row: {
          category_id: number
          created_at: string
          description: string
          name: string
          updated_at: string
          value: Database["public"]["Enums"]["applause_category"]
        }
        Insert: {
          category_id?: never
          created_at?: string
          description: string
          name: string
          updated_at?: string
          value: Database["public"]["Enums"]["applause_category"]
        }
        Update: {
          category_id?: never
          created_at?: string
          description?: string
          name?: string
          updated_at?: string
          value?: Database["public"]["Enums"]["applause_category"]
        }
        Relationships: []
      }
      challenges: {
        Row: {
          benefits: string
          challenge_id: number
          challenge_type: Database["public"]["Enums"]["challenge_type"]
          created_at: string
          duration: Database["public"]["Enums"]["challenge_duration"]
          goal: string
          host_name: string
          instructions: string
          location: string
          overview: string
          participation_type: Database["public"]["Enums"]["challenge_participation_type"]
          tags: string
          thumbnail_url: string
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          benefits: string
          challenge_id?: never
          challenge_type: Database["public"]["Enums"]["challenge_type"]
          created_at?: string
          duration: Database["public"]["Enums"]["challenge_duration"]
          goal: string
          host_name: string
          instructions: string
          location: string
          overview: string
          participation_type: Database["public"]["Enums"]["challenge_participation_type"]
          tags: string
          thumbnail_url: string
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          benefits?: string
          challenge_id?: never
          challenge_type?: Database["public"]["Enums"]["challenge_type"]
          created_at?: string
          duration?: Database["public"]["Enums"]["challenge_duration"]
          goal?: string
          host_name?: string
          instructions?: string
          location?: string
          overview?: string
          participation_type?: Database["public"]["Enums"]["challenge_participation_type"]
          tags?: string
          thumbnail_url?: string
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_id: string
          event_type: Database["public"]["Enums"]["event_type"] | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_id?: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_id?: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_profiles_profile_id_fk"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "follows_following_id_profiles_profile_id_fk"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      idea_likes: {
        Row: {
          created_at: string
          idea_id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          idea_id: number
          profile_id: string
        }
        Update: {
          created_at?: string
          idea_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "idea_likes_idea_id_ideas_idea_id_fk"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["idea_id"]
          },
          {
            foreignKeyName: "idea_likes_idea_id_ideas_idea_id_fk"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas_view"
            referencedColumns: ["idea_id"]
          },
          {
            foreignKeyName: "idea_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      ideas: {
        Row: {
          claimed_at: string | null
          claimed_by: string | null
          created_at: string
          idea_id: number
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          idea_id?: never
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          idea_id?: never
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "ideas_claimed_by_profiles_profile_id_fk"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      message_room_members: {
        Row: {
          created_at: string
          message_room_id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          message_room_id: number
          profile_id: string
        }
        Update: {
          created_at?: string
          message_room_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_room_members_message_room_id_message_rooms_message_room"
            columns: ["message_room_id"]
            isOneToOne: false
            referencedRelation: "message_rooms"
            referencedColumns: ["message_room_id"]
          },
          {
            foreignKeyName: "message_room_members_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      message_rooms: {
        Row: {
          created_at: string
          message_room_id: number
        }
        Insert: {
          created_at?: string
          message_room_id?: never
        }
        Update: {
          created_at?: string
          message_room_id?: never
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          is_seen: boolean
          message_id: number
          message_room_id: number
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          is_seen?: boolean
          message_id?: never
          message_room_id: number
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          is_seen?: boolean
          message_id?: never
          message_room_id?: number
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_message_room_id_message_rooms_message_room_id_fk"
            columns: ["message_room_id"]
            isOneToOne: false
            referencedRelation: "message_rooms"
            referencedColumns: ["message_room_id"]
          },
          {
            foreignKeyName: "messages_sender_id_profiles_profile_id_fk"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      notifications: {
        Row: {
          applause_id: number | null
          created_at: string
          notification_id: number
          post_id: number | null
          seen: boolean
          source_id: string | null
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          applause_id?: number | null
          created_at?: string
          notification_id?: never
          post_id?: number | null
          seen?: boolean
          source_id?: string | null
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          applause_id?: number | null
          created_at?: string
          notification_id?: never
          post_id?: number | null
          seen?: boolean
          source_id?: string | null
          target_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_applause_id_applauses_applause_id_fk"
            columns: ["applause_id"]
            isOneToOne: false
            referencedRelation: "applause_overview_view"
            referencedColumns: ["applause_id"]
          },
          {
            foreignKeyName: "notifications_applause_id_applauses_applause_id_fk"
            columns: ["applause_id"]
            isOneToOne: false
            referencedRelation: "applauses"
            referencedColumns: ["applause_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_source_id_profiles_profile_id_fk"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "notifications_target_id_profiles_profile_id_fk"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_replies: {
        Row: {
          content: string
          created_at: string
          parent_id: number | null
          post_id: number | null
          post_reply_id: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          parent_id?: number | null
          post_id?: number | null
          post_reply_id?: never
          profile_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          parent_id?: number | null
          post_id?: number | null
          post_reply_id?: never
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_replies_parent_id_post_replies_post_reply_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_replies"
            referencedColumns: ["post_reply_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_upvotes: {
        Row: {
          post_id: number
          profile_id: string
        }
        Insert: {
          post_id: number
          profile_id: string
        }
        Update: {
          post_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          post_id: number
          profile_id: string
          title: string
          topic_id: number
          updated_at: string
          upvotes: number | null
        }
        Insert: {
          content: string
          created_at?: string
          post_id?: never
          profile_id: string
          title: string
          topic_id: number
          updated_at?: string
          upvotes?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          post_id?: never
          profile_id?: string
          title?: string
          topic_id?: number
          updated_at?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "posts_topic_id_topics_topic_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "posts_topic_id_topics_topic_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      praises: {
        Row: {
          applause_id: number
          content: string
          created_at: string
          praise_id: number
          profile_id: string
          rating: number
          updated_at: string
        }
        Insert: {
          applause_id: number
          content: string
          created_at?: string
          praise_id?: never
          profile_id: string
          rating: number
          updated_at?: string
        }
        Update: {
          applause_id?: number
          content?: string
          created_at?: string
          praise_id?: never
          profile_id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "praises_applause_id_applauses_applause_id_fk"
            columns: ["applause_id"]
            isOneToOne: false
            referencedRelation: "applause_overview_view"
            referencedColumns: ["applause_id"]
          },
          {
            foreignKeyName: "praises_applause_id_applauses_applause_id_fk"
            columns: ["applause_id"]
            isOneToOne: false
            referencedRelation: "applauses"
            referencedColumns: ["applause_id"]
          },
          {
            foreignKeyName: "praises_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          headline: string | null
          name: string
          profile_id: string
          role: Database["public"]["Enums"]["role"]
          stats: Json | null
          updated_at: string
          username: string
          views: Json | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          headline?: string | null
          name: string
          profile_id: string
          role?: Database["public"]["Enums"]["role"]
          stats?: Json | null
          updated_at?: string
          username: string
          views?: Json | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          headline?: string | null
          name?: string
          profile_id?: string
          role?: Database["public"]["Enums"]["role"]
          stats?: Json | null
          updated_at?: string
          username?: string
          views?: Json | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          description: string
          leader_profile_id: string
          name: string
          open_spots: number
          roles: string
          size: number
          stage: Database["public"]["Enums"]["team_stage"]
          team_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          leader_profile_id: string
          name: string
          open_spots: number
          roles: string
          size: number
          stage: Database["public"]["Enums"]["team_stage"]
          team_id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          leader_profile_id?: string
          name?: string
          open_spots?: number
          roles?: string
          size?: number
          stage?: Database["public"]["Enums"]["team_stage"]
          team_id?: never
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_leader_profile_id_profiles_profile_id_fk"
            columns: ["leader_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          name: string
          slug: string
          topic_id: number
          updated_at: string
          value: Database["public"]["Enums"]["community_topic"]
        }
        Insert: {
          created_at?: string
          name: string
          slug: string
          topic_id?: never
          updated_at?: string
          value: Database["public"]["Enums"]["community_topic"]
        }
        Update: {
          created_at?: string
          name?: string
          slug?: string
          topic_id?: never
          updated_at?: string
          value?: Database["public"]["Enums"]["community_topic"]
        }
        Relationships: []
      }
    }
    Views: {
      applause_overview_view: {
        Row: {
          applause_id: number | null
          average_rating: number | null
          description: string | null
          icon: string | null
          name: string | null
          praises: string | null
          tagline: string | null
          upvotes: string | null
          url: string | null
          views: string | null
        }
        Relationships: []
      }
      community_post_detail_view: {
        Row: {
          applauses: number | null
          author_avatar: string | null
          author_created_at: string | null
          author_name: string | null
          author_role: Database["public"]["Enums"]["role"] | null
          content: string | null
          created_at: string | null
          is_upvoted: boolean | null
          post_id: number | null
          replies: number | null
          title: string | null
          topic_id: number | null
          topic_name: string | null
          topic_slug: string | null
          upvotes: number | null
        }
        Relationships: []
      }
      community_post_list_view: {
        Row: {
          author: string | null
          author_avatar: string | null
          author_username: string | null
          created_at: string | null
          is_upvoted: boolean | null
          post_id: number | null
          title: string | null
          topic: string | null
          topic_slug: string | null
          upvotes: number | null
        }
        Relationships: []
      }
      ideas_view: {
        Row: {
          created_at: string | null
          idea_id: number | null
          is_claimed: boolean | null
          likes: number | null
          title: string | null
          views_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_applause_stats: {
        Args: { applause_id: string }
        Returns: {
          applause_views: number
          applause_visit: number
          month: string
        }[]
      }
      get_dashboard_stats: {
        Args: { user_id: string }
        Returns: {
          month: string
          views: number
        }[]
      }
      track_event: {
        Args: {
          event_data: Json
          event_type: Database["public"]["Enums"]["event_type"]
        }
        Returns: undefined
      }
    }
    Enums: {
      applause_category:
        | "mindset"
        | "wellness"
        | "focus"
        | "routine"
        | "reflection"
        | "learning"
        | "creativity"
        | "relationships"
        | "energy"
      challenge_duration:
        | "1 - 3 days"
        | "4 - 7 days"
        | "1 - 2 weeks"
        | "2 - 4 weeks"
        | "1 - 2 months"
        | "2 months+"
      challenge_participation_type: "solo" | "pair" | "group"
      challenge_type: "mindset" | "wellness" | "focus"
      community_topic:
        | "self-growth"
        | "wellness"
        | "mindset"
        | "routine"
        | "reflection"
      event_type: "applause_view" | "applause_visit" | "profile_view"
      notification_type: "follow" | "praise" | "reply"
      role:
        | "habit-builder"
        | "mindful-learner"
        | "accountability-partner"
        | "growth-coach"
        | "reflective-writer"
        | "other"
      team_stage: "starting" | "first-members" | "active" | "expanding"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      applause_category: [
        "mindset",
        "wellness",
        "focus",
        "routine",
        "reflection",
        "learning",
        "creativity",
        "relationships",
        "energy",
      ],
      challenge_duration: [
        "1 - 3 days",
        "4 - 7 days",
        "1 - 2 weeks",
        "2 - 4 weeks",
        "1 - 2 months",
        "2 months+",
      ],
      challenge_participation_type: ["solo", "pair", "group"],
      challenge_type: ["mindset", "wellness", "focus"],
      community_topic: [
        "self-growth",
        "wellness",
        "mindset",
        "routine",
        "reflection",
      ],
      event_type: ["applause_view", "applause_visit", "profile_view"],
      notification_type: ["follow", "praise", "reply"],
      role: [
        "habit-builder",
        "mindful-learner",
        "accountability-partner",
        "growth-coach",
        "reflective-writer",
        "other",
      ],
      team_stage: ["starting", "first-members", "active", "expanding"],
    },
  },
} as const
