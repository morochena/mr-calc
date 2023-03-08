import { writable } from 'svelte/store';
import type { Spell } from '../../../types/types';

export const currentSpell = writable<Spell>({});