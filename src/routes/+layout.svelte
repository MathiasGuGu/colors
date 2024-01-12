<script>
	import '../app.css';
</script>

<nav>
	<div
		class="  shadow-lg w-screen border border-zinc-200 h-14 flex items-center justify-between px-12"
	>
		<h2 class=" font-thin">Color</h2>
		<div class="flex items-center gap-8 text-sm">
			<div class="hover:underline">Palette</div>
			<div class="hover:underline">Brand Colors</div>
			<button>Sign Up</button>
			<button class="bg-blue-500 px-6 py-2 rounded-lg text-blue-50">Sign In</button>
		</div>
	</div>
</nav>
<main>
	<slot />
</main>
