import { supabaseClient } from "$lib/db";
import Toastify from 'toastify-js';

export const saveEntity = async (entityType: string, entity) => {
  const entityToSave = { ...entity };
  if (typeof entityToSave.tags === 'string') {
    entityToSave.tags = entityToSave.tags.split(',').map((t) => t.trim());
  }

  // remove spells and equipment
  entityToSave.spells = undefined;
  entityToSave.equipment = undefined;

  const { error } = await supabaseClient
    .from(entityType)
    .update(entityToSave)
    .eq('id', entityToSave.id);
  if (!error) {
    Toastify({
      text: 'Saved!',
      duration: 3000
    }).showToast();
  } else {
    Toastify({
      text: 'Error!!',
      duration: 3000
    }).showToast();
  }
};


export const exportEntity = () => {

}

export const copyEntity = async (entityType, entity) => {
  const { data: userData } = await supabaseClient.auth.getUser();
  const entityData = { ...entity };
  delete entityData.id;
  entityData.name = entityData.name + ' (copy)';
  entityData.user_id = userData?.user?.id;

  // remove spells and equipment
  entityData.spells = undefined;
  entityData.equipment = undefined;

  delete entityData.spells;
  delete entityData.equipment;

  const { data, error } = await supabaseClient.from(entityType).insert([entityData]).select();

  let location = "/"
  if (entityType === 'monsters') {
    location = `/npcs/${data[0].id}`
  }

  if (!error) {
    Toastify({
      text: 'Copied!',
      duration: 3000
    }).showToast();
  } else {
    Toastify({
      text: 'Error!!',
      duration: 3000
    }).showToast();
  }

  window.location.href = location
}

export const deleteEntity = async (entityType, entity) => {
  const { error } = await supabaseClient.from(entityType).delete().eq('id', entity.id);

  let location = "/"
  if (entityType == 'monsters') {
    location = "/npcs"
  }

  if (!error) {
    Toastify({
      text: 'Deleted!',
      duration: 3000
    }).showToast();
  } else {
    Toastify({
      text: 'Error!!',
      duration: 3000
    }).showToast();
  }

  window.location.href = location;
}

export const createEntity = async (entityType, entity) => {
  const { data: userData } = await supabaseClient.auth.getUser();
  const entityData = { ...entity };
  delete entityData.id;
  entityData.user_id = userData?.user?.id;

  const { data, error } = await supabaseClient.from(entityType).insert([entityData]).select();

  let location = "/"
  if (entityType === 'monsters') {
    location = `/npcs/${data[0].id}`
  }

  if (!error) {
    Toastify({
      text: 'Created!',
      duration: 3000
    }).showToast();
  } else {
    Toastify({
      text: 'Error!!',
      duration: 3000
    }).showToast();
  }

  window.location.href = location
}