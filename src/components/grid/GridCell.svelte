<script lang="ts">
	import type { Nullable } from '../../utils/types';

	type IAlignment = 'centre' | 'left';

	export let alignment: Nullable<IAlignment> = undefined;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<div class={className ?? ''} class:centre={alignment === 'centre'}>
	<slot />
</div>

<style>
	.centre {
		text-align: center;
	}
</style>
