<script>
	import Header from '../components/Header.svelte';
</script>

<Header />
<main>
	<slot />
</main>

<style>
	:global(html) {
		height: 100%;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}

	:global(body) {
		height: 100%;
		box-sizing: border-box;
		margin: 0;
	}
	:global(input) {
		border: none;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
	:global(.hbox) {
		display: flex;
		gap: 5px;
	}
	main {
		height: calc(100% - 50px);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
