<script>
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { damageCalculation, formattedToHit, toHit } from '$lib/utils/weaponCalculations';

	export let monster;
	export let id;
	export let name;
	export let roll_bonus;
	export let damage_formula;
	export let skills;
	export let specialties;
</script>

<TableBodyRow>
	<TableBodyCell><a href={`/equipment/${id}`} target="_blank">{name}</a></TableBodyCell>
	<TableBodyCell
		>To Hit: {formattedToHit(toHit(monster, roll_bonus, specialties, skills))}</TableBodyCell
	>
	<TableBodyCell>Damage: {damageCalculation(monster, damage_formula)}</TableBodyCell>
</TableBodyRow>
