<script>
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { damageCalculation, formattedToHit, toHit } from '$lib/utils/npcs/weaponCalculations';
	import { ArrowTopRightOnSquare } from 'svelte-heros';

	export let monster;
	export let id;
	export let name;
	export let roll_bonus;
	export let damage_formula;
	export let skills;
	export let specialties;
</script>

<TableBodyRow>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">
		<a href={`/equipment/${id}`} target="_blank" rel="noreferrer"
			><span class="flex">{name}<ArrowTopRightOnSquare size="18" class="ml-1" /></span>
		</a>
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap">
		<ul>
			<li>Skills: {skills}</li>
			<li>Specialties: {specialties}</li>
		</ul>
	</TableBodyCell>
	<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap"
		><ul>
			<li>To Hit: {formattedToHit(toHit(monster, roll_bonus, specialties, skills))}</li>
			<li>Damage: {damageCalculation(monster, damage_formula)}</li>
		</ul>
	</TableBodyCell>
</TableBodyRow>
