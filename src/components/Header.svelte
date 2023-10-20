<script lang="ts">
	import { base } from "$app/paths";
</script>

<header>
	<a href="{base}/">Units</a>
	<a href="{base}/ancestries">Ancestries</a>
	<a href="{base}/experience">Experience</a>
	<a href="{base}/equipment">Equipment</a>
	<!-- <a href="/unit-types">Unit Types</a> -->
	<a href="{base}/upgrade">Upgrade Settings</a>
	<a href="{base}/data">Import / Export</a>
</header>

<style>
	header {
		display: flex;
		width: 100%;
		height: 20px;
		padding-top: 30px;
		justify-content: center;
		gap: 10px;
	}
</style>
