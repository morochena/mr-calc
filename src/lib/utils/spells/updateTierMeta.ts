export const updateModifierTier = (id: number, value: string) => {
	const updated_modifier = spell.selected_modifiers.find((m) => m.id === id);
	if (!updated_modifier) return;
	updated_modifier.tier = parseInt(value);
	spell = {
		...spell,
		selected_modifiers: spell.selected_modifiers.map((m) => {
			if (m.id === id) return updated_modifier;
			return m;
		})
	};
};

export const updateEffectTier = (id: number, value: string) => {
	const updated_effect = spell.selected_effects.find((m) => m.id === id);
	if (!updated_effect) return;
	updated_effect.tier = parseInt(value);
	spell = {
		...spell,
		selected_effects: spell.selected_effects.map((m) => {
			if (m.id === id) return updated_effect;
			return m;
		})
	};
};

export const updateModifierMetaValue = (id: number, meta: string) => {
	const updated_modifier = spell.selected_modifiers.find((m) => m.id === id);
	if (!updated_modifier) return;
	updated_modifier.meta = meta;
	spell = {
		...spell,
		selected_modifiers: spell.selected_modifiers.map((m) => {
			if (m.id === id) return updated_modifier;
			return m;
		})
	};
};

export const updateEffectMetaValue = (id: number, meta: string) => {
	const updated_effect = spell.selected_effects.find((m) => m.id === id);
	if (!updated_effect) return;
	updated_effect.meta = meta;
	spell = {
		...spell,
		selected_effects: spell.selected_effects.map((m) => {
			if (m.id === id) return updated_effect;
			return m;
		})
	};
};
