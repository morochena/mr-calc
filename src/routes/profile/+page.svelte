<script>
	import { supabaseClient } from '$lib/db';
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';

	export let data;
	let { profile } = data;

	const signOut = async () => {
		await supabaseClient.auth.signOut();
	};

	const updateUsername = async () => {
		const { data, error } = await supabaseClient
			.from('profiles')
			.update({ username: profile.username })
			.match({ id: profile.id });
		if (error) {
			console.log('error', error);
		} else {
			Toastify({
				text: 'Saved!',
				duration: 3000
			}).showToast();
		}
	};
</script>

<div class="container mx-auto px-4">
	<!-- add a form to update the public user's public username -->
	<form on:submit|preventDefault={updateUsername} class="w-96">
		<label for="username" class="dark:text-white">Public Username</label>
		<input
			id="username"
			bind:value={profile.username}
			type="text"
			placeholder="Public Username"
			class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-mr-red my-4"
		/>
		<button
			type="submit"
			class="bg-mr-red text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
		>
			Update
		</button>
	</form>
</div>
