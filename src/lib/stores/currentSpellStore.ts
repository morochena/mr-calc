import { writable } from 'svelte/store';
import type { Spell } from '../../../types/fromSupabase';

export const currentSpell = writable<Spell>({});