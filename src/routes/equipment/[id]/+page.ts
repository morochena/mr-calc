import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {

  const { session, supabaseClient } = await getSupabase(event);
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: equipment } = await supabaseClient.from('equipment').select('*').eq('id', event.params.id).single();


  const disableInputs = equipment.user_id == session.user.id ? false : true;

  return {
    user: session.user,
    equipment,
    disableInputs,
  };
};