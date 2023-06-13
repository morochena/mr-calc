import type { ProcessedModifierOrEffect, Spell } from '../../../../types/types';
import { getProcessedModifiersAndEffects } from './getModifiersAndEffects';

export const calculateTotalSP = (spell: Spell) => {
	const effectsAndModifiers = getProcessedModifiersAndEffects(spell);
	let totalSPAdds = 0;
	let totalSPMults = 1;

	let modifierCost = effectsAndModifiers.reduce((total: number, modifier) => {
		return total + calcSPValue(spell, modifier);
	}, 0);

	if (spell.domain === 'Illusion') {
		const rawa = calcIllusionDiscount(spell, modifierCost, effectsAndModifiers);
		modifierCost -= rawa;
	}

	if (spell.mode === 'Unpredictable') {
		modifierCost += 4;
	}

	totalSPAdds = modifierCost;

	let paramSPCost = modifierCost;

	const spMultipliers = effectsAndModifiers.filter(
		(modifier) =>
			modifier.modifierType === 'multiply' || modifier.modifierType === 'functionMultiply'
	);

	spMultipliers.forEach((modifier) => {
		if (modifier.modifierType === 'functionMultiply') {
			paramSPCost *= functionSPValue(spell, modifier)[1];
			totalSPMults *= functionSPValue(spell, modifier)[1];
		} else {
			paramSPCost *= modifier.amount;
			totalSPMults *= modifier.amount;
		}
	});

	paramSPCost = Math.ceil(paramSPCost);
	paramSPCost = Math.max(paramSPCost, 0);

	return { cost: paramSPCost, adds: totalSPAdds, mults: totalSPMults };
};

export const calcSPValue = (spell: Spell, moe: ProcessedModifierOrEffect) => {
	const trueTier = moe.tier || 1;

	let cost = 0;
	switch (moe.modifierType) {
		case 'add':
			cost = Number(moe.amount) * trueTier;
			break;
		case 'reduce':
			cost = Number(moe.amount) * trueTier * -1;
			break;
		case 'function':
			cost = functionSPValue(spell, moe);
			break;
		case 'functionMultiply':
			cost = functionSPValue(spell, moe)[0];
			break;
	}
	return cost;
};

export const calcSPValueText = (spell: Spell, moe: ProcessedModifierOrEffect) => {
	const trueTier = moe.tier || 1;

	let amount;
	let operator;

	switch (moe.modifierType) {
		case 'add':
			return `+${Number(moe.amount) * trueTier}`;
		case 'reduce':
			return `${Number(moe.amount) * trueTier * -1}`;
		case 'multiply':
			return `x${Number(moe.amount) * trueTier}`;
		case 'function':
			amount = functionSPValue(spell, moe);
			operator = amount > 0 ? '+' : '';
			return `${operator}${amount}`;
		case 'functionMultiply':
			amount = functionSPValue(spell, moe)[0];
			operator = amount > 0 ? '+' : '';
			return `x${functionSPValue(spell, moe)[1]} and ${operator}${functionSPValue(spell, moe)[0]}`;
	}
};

const functionSPValue = (spell: Spell, moe: ProcessedModifierOrEffect) => {
	const trueTier = moe.tier;

	if (typeof moe.amount === 'function') return moe.amount(spell, moe, trueTier);

	console.warn('modifier case not handled: ', moe.name);

	return 0;
};

function calcIllusionDiscount(
	spell: Spell,
	modifierCost: number,
	effectsAndModifiers: ProcessedModifierOrEffect[]
) {
	return 0; /*
	const helpEffects = effectsAndModifiers.filter((x) => x.name.includes('Help'));
	let helpSP = 0;

	helpEffects.forEach((effect) => {
		helpSP += calcSPValue(spell, effect);
	});

	const unhelpEffects = effectsAndModifiers.filter(
		(x) => !x.name.includes('Help') && x.name !== 'Illusion Discount'
	);
	let unhelpSP = 0;

	unhelpEffects.forEach((effect) => {
		unhelpSP += calcSPValue(spell, effect);
	});
	console.log(helpSP);
	console.log(unhelpSP);
	console.log(unhelpEffects);
	let illusionDiscount = Math.min(helpSP, unhelpSP);
	if (spell.mode === 'Unpredictable') illusionDiscount -= 4;
	console.log(illusionDiscount);
	return illusionDiscount;*/
}
