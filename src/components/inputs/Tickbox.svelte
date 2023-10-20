<script lang="ts">
	export let label: string;
	export let checked: boolean;
	export let disabled: boolean | undefined = undefined;
</script>

<div>
	<label>
		<input type="checkbox" bind:checked {disabled} />
		{label}
	</label>
</div>
