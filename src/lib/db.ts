import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import type { Database } from '../../types/supabase'

const url = "http://localhost:54321"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const prodUrl = "https://ztpbyaqtzgefhmibdale.supabase.co"
const prodKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0cGJ5YXF0emdlZmhtaWJkYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMzM0MDEsImV4cCI6MTk4MTgwOTQwMX0.d4IE5zFB5cXF1x662OyLeeAuEcVf6oV9AoR4eiN0JjU"

export const supabaseClient = createClient(
  url,
  key
);