import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: monster } = await supabaseClient.from('npcs').select('*').eq('id', event.params.id).single();

  if (monster.spell_ids?.length > 0) {
    const { data: spellData } = await supabaseClient.from('spells_v2').select('*').in('id', monster.spell_ids);
    monster.spells = spellData
  }

  if (!monster.spells) { monster.spells = [] }
  if (!monster.spell_ids) { monster.spell_ids = [] }

  if (monster.equipment_ids?.length > 0) {
    const { data: equipmentData } = await supabaseClient.from('equipment').select('*').in('id', monster.equipment_ids);
    monster.equipment = equipmentData
  }

  if (!monster.equipment) { monster.equipment = [] }
  if (!monster.equipment_ids) { monster.equipment_ids = [] }

  const disableInputs = monster.user_id == session.user.id ? false : true;


  return {
    user: session.user,
    monster,
    disableInputs,
  };
};