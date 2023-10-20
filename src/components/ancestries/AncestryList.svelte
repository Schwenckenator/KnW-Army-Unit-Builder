<script lang="ts">
	import { ancestries } from '../../stores/ancestriesStore';
	import AncestryItem from './AncestryItem.svelte';

	// $: console.log($ancestries);

	function handleDelete(event: CustomEvent<{ id: string }>) {
		ancestries.delete(event.detail.id);
	}
	function handleAddNew() {
		ancestries.addNew();
	}
</script>

<ul>
	{#each $ancestries as ancestry (ancestry.id)}
		<li>
			<AncestryItem bind:ancestry on:delete={handleDelete} />
		</li>
	{/each}
</ul>
<button on:click={handleAddNew}> + Add New </button>

<style>
	ul {
		list-style-type: none;
	}
	li {
		height: 60px;
	}
</style>
