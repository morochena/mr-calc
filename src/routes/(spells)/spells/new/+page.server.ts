import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {

  default: async (event) => {
    const { request } = event;
    const { session, supabaseClient } = await getSupabase(event);

    if (!session) {
      throw error(403, { message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const newSpell = {
      name: formData.get('name'),
      user_id: session.user.id,
    };

    const { error: createSpellError, data: newSpellData } = await supabaseClient
      .from('spells_v2')
      .insert(newSpell)
      .select()
      .single();

    if (createSpellError) {
      console.error(createSpellError);
      return error(500, createSpellError.message);
    }

    throw redirect(303, `/spells/${newSpellData.id}`);
  }
};