import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';

export const supabaseClient = createClient("https://ztpbyaqtzgefhmibdale.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0cGJ5YXF0emdlZmhtaWJkYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMzM0MDEsImV4cCI6MTk4MTgwOTQwMX0.d4IE5zFB5cXF1x662OyLeeAuEcVf6oV9AoR4eiN0JjU");