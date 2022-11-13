import type { Actions } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, invalid, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

export const actions: Actions = {

  default: async (event) => {
    const { request } = event;
    const { session, supabaseClient } = await getSupabase(event);

    if (!session) {
      throw error(403, { message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const newEquipment = {
      name: formData.get('name'),
      type: formData.get('type'),
      roll_bonus: formData.get('roll_bonus'),
      skills: formData.get('skills')?.split(",")?.map((skill: string) => skill.trim()),
      specialties: formData.get('specialties')?.split(",")?.map((specialty: string) => specialty.trim()),
      damage_formula: formData.get('damage_formula'),
      armor_piercing: formData.get('armor_piercing'),
      range: formData.get('range'),
      structure_points: formData.get('structure_points'),
      user_id: session.user.id
    };

    console.log(newEquipment)

    const { error: createEquipmentError, data: newPost } = await supabaseClient
      .from('equipment')
      .insert(newEquipment);

    if (createEquipmentError) {
      console.log(createEquipmentError);
      return invalid(500, {
        supabaseErrorMessage: createEquipmentError.message
      });
    }

    return {
      headers: { Location: "/equipment" },
      status: 302
    };
  }
};