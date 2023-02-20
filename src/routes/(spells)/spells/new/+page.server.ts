import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

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
      spell_data: {
        modifiers: [],
        effects: []
      }
    };

    const { error: createSpellError, data: newSpellData } = await supabaseClient
      .from('spells')
      .insert(newSpell);

    if (createSpellError) {
      console.log(createSpellError);
      return error(500, createSpellError.message);
    }

    return {
      headers: { Location: `/spells` },
      status: 302
    };
  }
};