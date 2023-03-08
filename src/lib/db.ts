import { createClient } from '@supabase/auth-helpers-sveltekit';

const prodUrl = "https://ztpbyaqtzgefhmibdale.supabase.co"
const prodKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0cGJ5YXF0emdlZmhtaWJkYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMzM0MDEsImV4cCI6MTk4MTgwOTQwMX0.d4IE5zFB5cXF1x662OyLeeAuEcVf6oV9AoR4eiN0JjU"

export const supabaseClient = createClient(
  prodUrl,
  prodKey
);