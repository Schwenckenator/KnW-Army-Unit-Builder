<script lang="ts">
	import { iconMap } from '../../utils/iconMap';

	export let value: string = '';
</script>

<div>
	<label class="centre">
		Icon:
		{#if value}
			<img height="48" width="48" src={iconMap[value].src} alt={iconMap[value].name} />
		{/if}
		<select bind:value>
			{#each Object.entries(iconMap) as [key, obj]}
				<option value={key}>
					{obj.name}
				</option>
			{/each}
		</select>
	</label>
</div>

<style>
	.centre {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
