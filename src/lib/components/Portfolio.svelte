<script lang="ts">
	import { Rainbow, MessageCircle, BellDot, User } from 'lucide-svelte';
	// background color and content color
	export let backgroundColor: any;
	export let backgroundContent: any;
	// primary color and content color
	export let primaryColor: any;
	export let primaryContent: any;
	// secondary color and content color
	export let secondaryColor: any;
	export let secondaryContent: any;
	// tertiary color and content color
	export let tertiaryColor: any;
	export let tertiaryContent: any;
	// quad color and content color
	export let quadColor: any;
	export let quadContent: any;

	/* 
		Not all colors have to exist at all times. 
		For example, if the user is using a monochromatic palette,
		only the background color and content color will exist.

		However, if the user is using a quad palette, all colors will exist.

		therefor, the different parts of the dashboard need to have checks to see if the color exists or not.
		if it does not, it will either have to be another color, hidden or disabled.
	*/

	$: console.log(
		backgroundColor,
		backgroundContent,
		primaryColor,
		primaryContent,
		secondaryColor,
		secondaryContent,
		tertiaryColor,
		tertiaryContent,
		quadColor,
		quadContent
	);
</script>

<div class="w-full h-auto flex items-center justify-center">
	<section
		class="w-full h-auto rounded-lg max-w-7xl flex flex-col"
		style={`
		background-color: ${backgroundColor};
		color: ${backgroundContent.darkest};
		`}
	>
		<!--Start of hero section-->
		<div class="w-full h-auto mt-12 flex items-center justify-center">
			<div
				class="w-auto px-6 h-80 rounded-full flex flex-col max-w-3xl items-center justify-center"
				style={`color: ${backgroundContent.darker}`}
			>
				<p class="w-auto text-center font-bold text-3xl">
					Hello! My name is User! Welcome to my portfolio
				</p>
				<p class="text-center max-w-2xl font-light">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi voluptate, nam
					similique ipsam cumque adipisci saepe et sequi odio provident minus deleniti fuga
					consequatur tenetur!
				</p>
				<div class="flex items-center justify-center gap-6 mt-6">
					<button
						class="w-32 h-10 rounded-lg font-thin"
						style={`background-color: ${primaryColor}; color: ${primaryContent.darkest}`}
					>
						Contact
					</button>
					<button
						class="w-32 h-10 rounded-lg font-thin"
						style={`background-color: ${secondaryColor}; color: ${secondaryContent.darkest}`}
					>
						Projects
					</button>
				</div>
			</div>
		</div>
	</section>
</div>
