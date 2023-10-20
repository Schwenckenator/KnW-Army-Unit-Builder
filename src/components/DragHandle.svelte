<script lang="ts">
	export let dragDisabled: boolean;
</script>

<div
	class="handle"
	on:mousedown
	on:touchstart
	style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
>
	<img src="/icons/internal/handle.svg" alt="drag handle" />
</div>

<style>
	div {
		width: 20px;
	}
	img {
		height: 100%;
	}
</style>
