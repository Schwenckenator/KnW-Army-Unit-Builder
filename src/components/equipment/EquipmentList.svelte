<script lang="ts">
	import { equipment } from '../../stores/equipmentStore';
	import TextInput from '../inputs/TextInput.svelte';
	import DeleteItemButton from '../inputs/DeleteItemButton.svelte';

	function handleDelete(event: CustomEvent<{ id: string }>) {
		equipment.delete(event.detail.id);
	}
	function handleAddNew() {
		equipment.addNew();
	}
	$: console.log(equipment);
</script>

<ul>
	{#each $equipment as equip (equip.id)}
		<li>
			<div class="hbox">
				<TextInput label="Name:" bind:value={equip.name} />
				<DeleteItemButton id={equip.id} on:delete={handleDelete} />
			</div>
		</li>
	{/each}
</ul>
<button on:click={handleAddNew}>+ Add New</button>

<style>
	ul {
		list-style-type: none;
	}
	li {
		height: 40px;
	}
	.hbox {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
