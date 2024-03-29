import { supabaseClient } from "$lib/db";
import Toastify from 'toastify-js';
import type { EntityType, Equipment, Monster, Spell } from "../../../types/types";
import { saveAs } from 'file-saver';

type Entity = Spell | Monster | Equipment;

function isMonster(entity: Entity): entity is Monster {
  return 'spells' in entity && 'equipment' in entity;
}

function isEquipment(entity: Entity): entity is Equipment {
  return 'skills' in entity && 'specialties' in entity;
}

export const saveEntity = async (entityType: EntityType, entity: Entity) => {
  const entityToSave = { ...entity };

  if (typeof entityToSave.tags === 'string') {
    entityToSave.tags = entityToSave.tags.split(',').map((t) => t.trim());
  }

  if (isEquipment(entityToSave)) {
    if (typeof entityToSave.skills === 'string') {
      entityToSave.skills = entityToSave.skills.split(',').map((t) => t.trim());
    }
    if (typeof entityToSave.specialties === 'string') {
      entityToSave.specialties = entityToSave.specialties.split(',').map((t) => t.trim());
    }

    let table: string = entityType;
    // if entityType is spells, rename to spells_v2
    if (entityType === 'spells') {
      table = 'spells_v2';
    }
  }

  if (isMonster(entityToSave)) {
    // remove spells and equipment since they are reliant on spell_ids and equipments_ids
    entityToSave.spells = undefined;
    entityToSave.equipment = undefined;
  }

  let table: string = entityType;
  if (entityType === 'spells') {
    table = 'spells_v2';
  }

  const { error } = await supabaseClient
    .from(table)
    .update(entityToSave)
    .eq('id', entityToSave.id);
  if (!error) {
    Toastify({
      text: 'Saved!',
      duration: 3000,
    }).showToast();
  } else {
    Toastify({
      text: 'Error!!',
      duration: 3000
    }).showToast();
  }
};


export const exportEntity = (entityType: EntityType, entity: Entity) => {

  const removeFields = (obj, fieldsToRemove) => {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => removeFields(item, fieldsToRemove));
    }

    const result = {};
    for (const key in obj) {
      if (fieldsToRemove.includes(key)) {
        continue;
      }
      result[key] = removeFields(obj[key], fieldsToRemove);
    }
    return result;
  };

  const fieldsToRemove = ['user_id', 'inserted_at', 'created_at'];
  const entityWithoutFields = removeFields(entity, fieldsToRemove);
  const jsonStr = JSON.stringify(entityWithoutFields, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  saveAs(blob, `${entity.name || 'entity'}.json`);
}

export const copyEntity = async (entityType: EntityType, entity) => {
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

  let table: string = entityType;
  // if entityType is spells, rename to spells_v2
  if (entityType === 'spells') {
    table = 'spells_v2';
  }

  const { data, error } = await supabaseClient.from(table).insert([entityData]).select();

  let location = "/"
  if (entityType === 'npcs') {
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

export const deleteEntity = async (entityType: EntityType, entity: Entity) => {

  // alert window to confirm
  const confirmed = confirm(`Are you sure you want to delete ${entity.name}?`);
  if (!confirmed) {
    return;
  }

  if (entityType === 'spells') {
    entityType = 'spells_v2';
  }

  const { error } = await supabaseClient.from(entityType).delete().eq('id', entity.id);

  let location = `/${entityType}`
  if (entityType == 'npcs') {
    location = "/npcs"
  }
  if (entityType == 'spells_v2') {
    location = "/spells"
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

export const createEntity = async (entityType: EntityType, entity: Entity) => {
  const { data: userData } = await supabaseClient.auth.getUser();
  const entityData = { ...entity };
  delete entityData.id;
  entityData.user_id = userData?.user?.id;

  if (entityType === 'spells') {
    entityType = 'spells_v2';
  }


  const { data, error } = await supabaseClient.from(entityType).insert([entityData]).select();

  let location = "/"
  if (entityType === 'npcs') {
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