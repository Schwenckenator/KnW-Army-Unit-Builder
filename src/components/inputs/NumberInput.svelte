<script lang="ts">
	export let value: number;
	export let label: string = '';
</script>

<div>
	<label>
		{label}
		<input type="number" bind:value on:change />
	</label>
</div>

<style>
	input {
		border: solid black 1px;
		width: 50px;
	}
</style>
