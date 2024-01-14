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
		class="w-full h-96 rounded-lg max-w-7xl flex flex-col"
		style={`
		background-color: ${backgroundColor};
		color: ${backgroundContent.darkest};
		`}
	></section>
</div>
