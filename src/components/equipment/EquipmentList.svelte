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
</script>

<ul>
	{#each $equipment as equipment (equipment.id)}
		<li>
			<div class="hbox">
				<TextInput label="Name:" bind:value={equipment.name} />
				<DeleteItemButton id={equipment.id} on:delete={handleDelete} />
			</div>
		</li>
	{/each}
</ul>
<button on:click={handleAddNew}>+ Add New</button>
