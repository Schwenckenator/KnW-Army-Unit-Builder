<script lang="ts">
	export let value: string;
	export let label: string;
</script>

<div>
	<label>
		{label}
		<input type="text" bind:value />
	</label>
</div>

<style>
	input {
		border: solid black 1px;
	}
</style>
