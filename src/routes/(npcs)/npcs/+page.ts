import type { PageLoad } from '../$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { calcLevel } from '$lib/utils/npcs/statCalculations';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  let { data: npcs } = await supabaseClient.from('npcs').select('*,profiles (id, username)').order('name', { ascending: true });

  npcs = npcs?.map(npc => (
    {
      ...npc,
      level: calcLevel(npc),
      owner: npc.profiles.username
    })) || []

  return {
    user: session.user,
    npcs
  };
};