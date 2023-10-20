<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type IEvents = {
		delete: { id: string };
	};

	export let id: string;

	const dispatch = createEventDispatcher<IEvents>();

	function deleteMe() {
		dispatch('delete', {
			id: id,
		});
	}
</script>

<button on:click={deleteMe}>Delete</button>
