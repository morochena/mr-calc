import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('id, username')
    .filter('id', 'eq', session.user.id)
    .single()



  return {
    user: session.user,
    profile
  };
};