<script>
	import {
		Alert,
		Select,
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBodyCell,
		TableBody,
		TableBodyRow,
		Textarea
	} from 'flowbite-svelte';
	import { range } from '$lib/utils/range';
	import { availableEffects } from '$lib/utils/data/effects';
	import { calculateDescription } from '$lib/utils/calculateSpellDescription';
	import { XCircle } from 'svelte-heros';

	export let spell;
	export let disableInputs;

	let availableEffectOptions = availableEffects.map((effect) => ({
		name: effect.name,
		value: effect
	}));

	let selectedEffect = null;
	const addEffect = () => {
		if (selectedEffect) {
			spell = {
				...spell,
				spell_data: {
					...spell.spell_data,
					effects: [...spell.spell_data.effects, selectedEffect]
				}
			};
			selectedEffect = null;
		}
	};
	const removeEffect = (effect) => {
		spell = {
			...spell,
			spell_data: {
				...spell.spell_data,
				effects: spell.spell_data.effects.filter((m) => m !== effect)
			}
		};
	};
</script>

<h2 class="text-xl mt-8">Effects</h2>
<Select items={availableEffectOptions} disabled={disableInputs} bind:value={selectedEffect} />
{#if selectedEffect?.description}
	<Alert class="mt-2"><span>{selectedEffect.description}</span></Alert>
{/if}
<Button on:click={addEffect} class="mt-2" disabled={disableInputs || !selectedEffect}
	>Add Effect</Button
>

<Table class="mt-2">
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Tier</TableHeadCell>
		<TableHeadCell>Notes</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each spell.spell_data.effects as effect}
			<TableBodyRow>
				<TableBodyCell>{effect.name}</TableBodyCell>
				<TableBodyCell>
					{#if effect.hasTiers}
						<Select
							class="w-20"
							items={range(1, effect.maxTier + 1 || 50, 1).map((e) => ({ name: e, value: e }))}
							bind:value={effect.tier}
						/>
					{/if}
				</TableBodyCell>
				<TableBodyCell
					><Textarea
						class="w-64"
						rows="1"
						bind:value={effect.notes}
						disabled={disableInputs}
					/></TableBodyCell
				>
				<TableBodyCell tdClass="px-6 py-4 font-medium flex justify-end"
					><p>{calculateDescription(spell, effect)}</p>
					<button on:click={() => removeEffect(effect)} class="ml-4"><XCircle size="20" /></button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
