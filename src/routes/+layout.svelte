<header>
	<a href="/">Card</a>
	<a href="/ancestries">Ancestries</a>
</header>
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
	main {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	header {
		width: 100%;
		display: flex;
		margin-top: 30px;
		justify-content: center;
		gap: 10px;
	}
</style>
