<script lang="ts">
	import { supabaseClient } from '$lib/db';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOAuth({
				provider: 'discord',
				options: {
					redirectTo:
						import.meta.env.MODE == 'production'
							? 'https://mr-calc.pages.dev'
							: 'http://localhost:3000'
				}
			});
			if (error) throw error;
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};

	console.log(import.meta.env.MODE);
</script>

<form class="row flex-center flex" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget">
		<p class="description">Sign in wth Discord</p>
		<div>
			<input
				type="submit"
				class="button block"
				value={loading ? 'Loading' : 'Sign In'}
				disabled={loading}
			/>
		</div>
	</div>
</form>
