<script lang="ts">
	import { onMount } from 'svelte';

	export let color = '#fae345';
	export let isOpen = false;
	let hue = 'hsl(0, 100%, 50%)';
	let colorstop = 0.5;
	let canvasRef: any;
	let colorPickerCanvasRef: any;

	let drawGradient = (ctx: any) => {
		const gradient = ctx.createLinearGradient(0, canvasRef.height, canvasRef.width, 0);
		gradient.addColorStop(0.1, 'black');
		gradient.addColorStop(colorstop, hue);
		gradient.addColorStop(1, 'white');

		return gradient;
	};

	onMount(() => {
		// Get the canvas context
		const ctx = canvasRef.getContext('2d');
		const colorPickerCtx = colorPickerCanvasRef.getContext('2d');

		// Set the canvas size
		canvasRef.width = canvasRef.offsetWidth;
		canvasRef.height = canvasRef.offsetHeight;

		colorPickerCanvasRef.width = colorPickerCanvasRef.offsetWidth;
		colorPickerCanvasRef.height = colorPickerCanvasRef.offsetHeight;
		// Create a gradient from bottom left to top right

		const gradient = drawGradient(ctx);
		// Fill the canvas with the gradient
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

		// Create a gradient from left to right
		const colorgradient = colorPickerCtx.createLinearGradient(
			0,
			colorPickerCanvasRef.height,
			colorPickerCanvasRef.width,
			0
		);

		// Set the gradient stops to different hues
		colorgradient.addColorStop(0, 'hsl(0, 100%, 50%)');
		colorgradient.addColorStop(0.17, 'hsl(60, 100%, 50%)');
		colorgradient.addColorStop(0.33, 'hsl(120, 100%, 50%)');
		colorgradient.addColorStop(0.5, 'hsl(180, 100%, 50%)');
		colorgradient.addColorStop(0.67, 'hsl(240, 100%, 50%)');
		colorgradient.addColorStop(0.83, 'hsl(300, 100%, 50%)');
		colorgradient.addColorStop(1, 'hsl(360, 100%, 50%)');

		// Fill the canvas with the gradient
		colorPickerCtx.fillStyle = colorgradient;
		colorPickerCtx.fillRect(0, 0, colorPickerCanvasRef.width, colorPickerCanvasRef.height);
	});

	let isDragging = false;
	let isColorPicker = false;

	function handleMouseEnter() {
		isColorPicker = true;
	}

	function handleMouseLeave() {
		isColorPicker = false;
	}

	function handleMouseDown(e) {
		isDragging = true;
		getColor(e);
	}

	function handleMouseMove(e) {
		if (isDragging) {
			getColor(e);
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function getColor(e: any) {
		// Get the canvas context
		let ctx: any;
		if (isColorPicker) {
			ctx = colorPickerCanvasRef.getContext('2d');
		} else {
			ctx = canvasRef.getContext('2d');
		}

		// Get the pixel data
		const pixelData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;

		// Set the color

		// if (isColorPicker) i want to change only the hue. else change the color

		if (!isColorPicker) {
			color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
		} else {
			hue = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
		}
	}
	$: {
		if (hue && canvasRef) {
			const ctx = canvasRef.getContext('2d');
			const gradient = drawGradient(ctx);
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
		}
	}
</script>

<div class="w-[300px] h-80 z-50 rounded-lg bg-white border shadow-sm fixed bottom-32 left-12 flex">
	<div class="flex flex-col w-full p-2 gap-2">
		<canvas
			on:mousedown={handleMouseDown}
			on:mousemove={handleMouseMove}
			on:mouseup={handleMouseUp}
			class="w-full h-2/3 rounded-lg"
			bind:this={canvasRef}
		/>
		<canvas
			on:mousedown={handleMouseDown}
			on:mousemove={handleMouseMove}
			on:mouseup={handleMouseUp}
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
			class="w-full h-3 rounded-lg"
			bind:this={colorPickerCanvasRef}
		></canvas>
		<button
			on:click={() => {
				isOpen = false;
			}}>Close</button
		>
	</div>
</div>
