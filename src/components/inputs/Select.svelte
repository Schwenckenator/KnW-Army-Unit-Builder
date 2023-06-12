<script lang="ts">
	export let label: string;
	export let options: { name: string; value: any }[];
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
