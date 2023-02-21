import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: spells } = await supabaseClient
    .from('spells')
    .select(`
      *,
      profiles (id, username)
    `)
    .order('name', { ascending: true });

  return {
    user: session.user,
    spells
  };
};