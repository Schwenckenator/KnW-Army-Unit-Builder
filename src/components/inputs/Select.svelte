<script context="module" lang="ts">
	export type ISelectOption = { name: string; value: any };
</script>

<script lang="ts">
	export let label: string;
	export let options: ISelectOption[];
	export let value: any;
</script>

<div>
	<label>
		{label}
		<select bind:value>
			{#each options as { name, value }}
				<option {value}>{name}</option>
			{/each}
		</select>
	</label>
</div>
