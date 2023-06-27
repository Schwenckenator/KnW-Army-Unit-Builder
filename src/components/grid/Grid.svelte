<script lang="ts" context="module">
	export type IColumn = {
		field: string;
		label: string;
		isValueLabel?: boolean;
	};
</script>

<script lang="ts">
	import TextInput from '../inputs/TextInput.svelte';
	import GridCell from './GridCell.svelte';

	export let columns: IColumn[];
	export let values: { [key: string]: any }[];
</script>

<!-- <div class="grid" style="grid-template-columns: repeat({columns.length}, 1fr);"> -->
<div class="grid" style:grid-template-columns="repeat({columns.length}, auto)">
	<!-- Head -->
	{#each columns as column}
		<GridCell>
			{column.label}
		</GridCell>
	{/each}
	<!-- Body -->
	{#each values as value}
		{#each columns as column}
			<GridCell>
				{#if column.isValueLabel}
					<span>{value[column.field]}</span>
				{:else}
					<TextInput value={value[column.field]} />
				{/if}
			</GridCell>
		{/each}
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: auto;
		gap: 5px;
	}
</style>
