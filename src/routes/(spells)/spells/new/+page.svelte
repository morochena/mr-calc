<script>
	import { Button, Input, Label, Select, Textarea } from 'flowbite-svelte';
</script>

<form class="mt-4" method="POST">
	<div class="grid gap-6 mb-6 md:grid-cols-2 mt-4">
		<Label class="space-y-2">
			<span>Name</span>
			<Input name="name" type="text" required />
		</Label>
	</div>
	<Button class="mt-4" type="submit">Add</Button>
</form>
