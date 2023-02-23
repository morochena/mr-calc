import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { calculateTotalSP } from '$lib/utils/spells/calculateSpellSP';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  let { data: spells } = await supabaseClient
    .from('spells')
    .select(`
      *,
      profiles (id, username)
    `)
    .order('name', { ascending: true });


  spells = spells?.map(spell => (
    {
      ...spell,
      domain: spell.spell_data.domain,
      mode: spell.spell_data.mode,
      cost: calculateTotalSP(spell).cost,
      owner: spell.profiles.username
    })) || []

  return {
    user: session.user,
    spells
  };
};