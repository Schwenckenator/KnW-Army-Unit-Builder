<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<div class="colour">
	<label>
		{label}
		<input type="color" bind:value />
	</label>
	<input type="text" bind:value placeholder="#ffffff" />
</div>

<style>
	.colour {
		height: 100%;
		display: flex;
		align-items: center;
	}
	label {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	input[type='text'] {
		width: 65px;
		font-size: large;
	}
</style>
