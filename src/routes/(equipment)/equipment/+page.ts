import type { PageLoad } from '../$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  let { data: equipment } = await supabaseClient.from('equipment').select('*,profiles (id, username)').order('name', { ascending: true });

  equipment = equipment?.map(item => (
    {
      ...item,
      owner: item.profiles.username
    })) || []

  return {
    user: session.user,
    equipment
  };
};