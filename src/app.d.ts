/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	interface PageData {
		session: import("@supabase/supabase-js").Session | null;
	}
	interface Supabase {
		Database: import('./DatabaseDefinitions').Database;
		SchemaName: 'public';
	}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
