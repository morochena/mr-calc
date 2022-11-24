<script>
	import { supabaseClient } from '$lib/db';
	import { copyEntity, saveEntity } from '$lib/utils/operations';
	import { Button, ButtonGroup, Input, Label } from 'flowbite-svelte';

	import 'toastify-js/src/toastify.css';
	export let data;
	$: ({ disableInputs, equipment } = data);

	const deleteEquipment = async () => {
		const { data } = await supabaseClient.from('equipment').delete().eq('id', equipment.id);
		window.location.href = '/equipment';
	};
</script>

<div class="flex justify-end">
	<ButtonGroup class="space-x-px my-4">
		<Button
			on:click={() => saveEntity('equipment', equipment)}
			color="purple"
			disabled={disableInputs}>Save</Button
		>
		<Button on:click={() => copyEntity('equipment', equipment)} color="purple">Make a Copy</Button>
		<Button on:click={deleteEquipment} color="purple" disabled={disableInputs}>Delete</Button>
	</ButtonGroup>
</div>

<form class="mt-4" method="POST">
	<div class="grid gap-6 mb-6 md:grid-cols-2 mt-4">
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				name="name"
				type="text"
				required
				bind:value={equipment.name}
				disabled={disableInputs}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Roll Bonus</span>
			<Input
				name="roll_bonus"
				type="number"
				required
				bind:value={equipment.roll_bonus}
				disabled={disableInputs}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Relevant Skills</span>
			<Input name="skills" type="text" disabled={disableInputs} bind:value={equipment.skills} />
		</Label>
		<Label class="space-y-2">
			<span>Relevant Specialties</span>
			<Input
				name="specialties"
				type="text"
				disabled={disableInputs}
				bind:value={equipment.specialties}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Damage Formula</span>
			<Input
				name="damage_formula"
				type="text"
				placeholder="eg. [str] + 3"
				disabled={disableInputs}
				bind:value={equipment.damage_formula}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Armor Piercing</span>
			<Input
				name="armor_piercing"
				type="number"
				bind:value={equipment.armor_piercing}
				disabled={disableInputs}
				bind
			/>
		</Label>
		<Label class="space-y-2">
			<span>Range</span>
			<Input name="range" type="number" bind:value={equipment.range} disabled={disableInputs} />
		</Label>
		<Label class="space-y-2">
			<span>Structure Points</span>
			<Input
				name="structure_points"
				type="number"
				bind:value={equipment.structure_points}
				disabled={disableInputs}
			/>
		</Label>
	</div>
	<Label class="mt-2">
		<span>Tags</span>
		<Input
			type="text"
			bind:value={equipment.tags}
			disabled={disableInputs}
			placeholder="eg. fire, ranged"
		/>
	</Label>
</form>
