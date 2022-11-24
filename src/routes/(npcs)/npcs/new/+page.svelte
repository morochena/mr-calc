<script>
	import {
		Input,
		Select,
		Label,
		Helper,
		Checkbox,
		Textarea,
		Button,
		Toggle
	} from 'flowbite-svelte';
	import { createEntity } from '$lib/utils/operations';
	import { sizes } from '$lib/utils/data/sizes';
	import { generateMonster } from '$lib/utils/generateMonster';

	let name = '';

	let selectedGenerationType = 'none';
	let generationTypes = [
		{ value: 'none', name: 'None' },
		{ value: 'stats_only', name: 'Stats Only' },
		{ value: 'full', name: 'Full' }
	];

	let selectedSize = 'medium';

	let selectedType = 'humanoid';
	let types = [
		{ value: 'aberration', name: 'Aberration' },
		{ value: 'beast', name: 'Beast' },
		{ value: 'celestial', name: 'Celestial' },
		{ value: 'construct', name: 'Construct' },
		{ value: 'dragon', name: 'Dragon' },
		{ value: 'elemental', name: 'Elemental' },
		{ value: 'fey', name: 'Fey' },
		{ value: 'fiend', name: 'Fiend' },
		{ value: 'giant', name: 'Giant' },
		{ value: 'humanoid', name: 'Humanoid' },
		{ value: 'monstrosity', name: 'Monstrosity' },
		{ value: 'ooze', name: 'Ooze' },
		{ value: 'plant', name: 'Plant' },
		{ value: 'undead', name: 'Undead' }
	];

	let selectedHumanoidRace = 'human';
	let humanoidRaces = [
		{ value: 'human', name: 'Human' },
		{ value: 'dwarf', name: 'Dwarf' },
		{ value: 'elf', name: 'Elf' },
		{ value: 'gnome', name: 'Gnome' },
		{ value: 'half-elf', name: 'Half-Elf' },
		{ value: 'halfling', name: 'Halfling' },
		{ value: 'half-orc', name: 'Half-Orc' },
		{ value: 'tiefling', name: 'Tiefling' }
	];

	let selectedDifficulty = 'average';
	let difficulties = [
		{ value: 'trivial', name: 'Trivial (4-10 XP)' },
		{ value: 'easy', name: 'Easy (10-20 XP)' },
		{ value: 'average', name: 'Average (20-30 XP)' },
		{ value: 'hard', name: 'Hard (30-40 XP)' },
		{ value: 'deadly', name: 'Deadly (40-50 XP)' },
		{ value: 'epic', name: 'Epic (50+ XP)' }
	];

	let theme = '';
	let magicUser = false;

	const createNPC = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		let data = Object.fromEntries(formData);

		switch (data.generation_type) {
			case 'stats_only':
				data = generateMonster(data);
				delete data.generation_type;
				createEntity('monsters', data);
				break;
			case 'full':
				break;
			default:
				delete data.generation_type;
				createEntity('monsters', data);
				break;
		}
	};
</script>

<h1 class="text-4xl dark:text-white pb-8">Generate a new NPC</h1>

<Label
	>Generation Type
	<Select class="mt-2" items={generationTypes} bind:value={selectedGenerationType} />
</Label>

{#if selectedGenerationType === 'none'}
	<form class="mt-16" on:submit={createNPC}>
		<div class="grid gap-6 mb-6 md:grid-cols-1">
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input type="text" name="name" placeholder="A Goblin Warrior" required bind:value={name} />
			</div>
		</div>

		<input type="hidden" name="generation_type" bind:value={selectedGenerationType} />

		<Button type="submit">Create</Button>
	</form>
{:else if selectedGenerationType === 'stats_only'}
	<form class="mt-16" on:submit={createNPC}>
		<div class="grid gap-6 mb-6 md:grid-cols-1">
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input type="text" name="name" placeholder="A Goblin Warrior" required bind:value={name} />
			</div>

			<div>
				<Label
					>Size
					<Select class="mt-2" items={sizes} bind:value={selectedSize} name="size" />
				</Label>
			</div>
			<div>
				<Label
					>Difficulty
					<Select
						class="mt-2"
						items={difficulties}
						bind:value={selectedDifficulty}
						name="difficulty"
					/>
				</Label>
			</div>
		</div>

		<Toggle class="my-4" checked={magicUser} name="magic_user">Magic User?</Toggle>

		<input type="hidden" name="generation_type" bind:value={selectedGenerationType} />

		<Button type="submit">Create</Button>
	</form>
{:else if selectedGenerationType === 'full'}
	<form class="mt-16" on:submit={createNPC}>
		<div class="grid gap-6 mb-6 md:grid-cols-1">
			<div>
				<Label for="openapi-key" class="mb-2"
					><a href="https://beta.openai.com/account/api-keys" target="_blank">OpenAI Key</a></Label
				>
				<Input
					type="text"
					name="openai-key"
					placeholder="OpenAI API Key"
					required
					bind:value={name}
				/>
			</div>

			<div>
				<Label
					>Size
					<Select class="mt-2" items={sizes} bind:value={selectedSize} name="size" />
				</Label>
			</div>
			<div>
				<Label
					>Difficulty
					<Select
						class="mt-2"
						items={difficulties}
						bind:value={selectedDifficulty}
						name="difficulty"
					/>
				</Label>
			</div>
			<div>
				<Label
					>Type
					<Select class="mt-2" items={types} bind:value={selectedType} name="type" />
				</Label>
			</div>
			{#if selectedType == 'humanoid'}
				<div>
					<Label
						>Race
						<Select
							class="mt-2"
							items={humanoidRaces}
							bind:value={selectedHumanoidRace}
							name="race"
						/>
					</Label>
				</div>
			{/if}
			<div>
				<Label for="theme" class="mb-2">Theme</Label>
				<Input
					type="text"
					id="theme"
					placeholder="Theme (eg. Aquatic)"
					bind:value={theme}
					name="theme"
				/>
			</div>

			<Toggle class="my-4" checked={magicUser} name="magic_user">Magic User?</Toggle>

			<input type="hidden" name="generation_type" bind:value={selectedGenerationType} />

			<Button type="submit">Create</Button>
		</div>
	</form>
{/if}
