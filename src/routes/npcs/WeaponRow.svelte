<script>
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { damageCalculation, toHit } from '../../utils/weaponCalculations';

	export let monster;
	export let name;
	export let roll_bonus;
	export let damage_formula;
	export let skills;
	export let specialties;
</script>

<TableBodyRow>
	<TableBodyCell>{name}</TableBodyCell>
	<TableBodyCell>To Hit: +{toHit(monster, roll_bonus, specialties, skills)}</TableBodyCell>
	<TableBodyCell>Damage: {damageCalculation(monster, damage_formula)}</TableBodyCell>
</TableBodyRow>
