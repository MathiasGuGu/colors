<script></script>

<main class="w-full h-auto flex flex-col items-center gap-12">
	<section class="w-full max-w-5xl mt-12">
		<h2 class=" font-extralight text-4xl text-button">HUE</h2>
		<p class="text-lg font-light leading-8">
			Hue is the color of a point, as found along the spectrum or around a color wheel. In physics,
			light is described in terms of being an electromagnetic wave. In these terms, hue is measured
			as frequency (the number of cycles per second, or Hertz) or wavelength (the distance between
			two successive peaks or troughs. The frequency of visible light is in the region of 10^15 Hz
			(that's a one and fifteen zeroes) or between about 400 and 700 nm (nanometers). Nanometers are
			more often used to reduce the number of zeroes needed! In computer work, hue is often measured
			in degrees, bring the angle around a color wheel. In this, red is zero (or 360) degrees, green
			is 120 degrees and blue is 240 degrees, with other colors spread between these. Artists just
			used names, such as burnt umber and vermillion, which are often based on the pigment materials
			used to make the paint. To calculate Hue from Red, Green and Blue, in degrees: First identify
			the Red, Green and Blue values (0 to 1, typically R/255, G/255 and B/255). Identify the
			maximum (max) and minimum (min) of these. If max = 0 then the Color is black and Hue is zero.
			If Red = max, then Hue = 60 * ((Green - Blue) Mod 6) / (max - min)) If Green = max, then Hue =
			60 * (2.0 + (Blue - Red) / (max - min)) If Blue = max, then Hue = 60 * (4.0 + (Red - Green) /
			(max - min)) If the result is zero, add 360 degrees. Psychologically, the meaning of colors
			varies with culture but has common patterns of interpretation, such as red is arousing as it
			indicates danger, blood, fire and sex, while blue is calming, indicating sky, water and
			sadness.
		</p>
	</section>

	<section class="w-full max-w-5xl">
		<h2 class=" font-extralight text-4xl text-button">Saturation</h2>
		<p class="text-lg font-light leading-8">
			Saturation is an indicator of the intensity of a hue. Higher saturation hues appear
			'stronger', for example being 'more red' or 'more blue'. Saturation is often measured as a
			percentage, ranging from zero (gray) to 100% (full color), as in the picture below. Turning it
			up adds color only until it is fully saturated (so turning luminance up on a fully saturated
			color has no effect). Turning down saturation on a photograph will make it become 'black and
			white' or monochrome. In a color photograph, many hues are not fully saturated. Turning up
			saturation will push unsaturated hues up to become increasingly saturated, creating a garish
			look. In a subtractive system such as paints, saturation can be decreased by adding white,
			gray, black and even the complementary (opposite) color (when adjacent, complementary colors
			are highly contrastive). To calculate saturation from Red, Green and Blue: First identify the
			normalized Red, Green and Blue values (0 to 1, typically R/255, G/255 and B/255) Identify the
			maximum (max) and minimum (min) of these. If max = 0 then the Color is black and Saturation is
			zero. Calculate the Luminosity as (max - min). the Luminosity of a pixel is the range between
			the minimum and maximum values of Red, Green and Blue. If Luminosity is less than 0.5 then
			Saturation = (max - min) / (max + min) If Luminosity is greater than 0.5 then Saturation =
			(max - min) / (2 - max - min) In a photo editor, you can change the saturation of any pixel by
			seeking out RGB sliders for it, then bringing the three sliders closer together. When they are
			at extremes, you will see full saturation. When they get closer, saturation decreases. When
			they are all at the same level, you will see a shade of gray (indicating zero saturation).
			This is simply using the (max - min) effect. Psychologically, more saturated hues are more
			arousing. Bright days get us going while dull, overcast days show only less saturated colors
			and are more depressing.
		</p>
	</section>

	<section class="w-full max-w-5xl">
		<h2 class=" font-extralight text-4xl text-button">Luminosity</h2>
		<p class="text-lg font-light leading-8">
			Luminosity Luminosity is a measure of how bright or dark a hue is. Physically, this is found
			in the amplitude and consequent energy of the electromagnetic waves of light. Luminosity is
			often measured as a percentage, ranging from zero (black) to 100% (full color), as in the
			image below. (hue horizontally and luminance decreasing downwards). In a photo editor, turning
			luminance down shifts the color down to black. Luminosity may also be extended beyond full
			color as white is added. This is how the saturation control on photo editors often work, going
			from the normal color to black as it is turned down and from the normal color to white as it
			is turned up. In this way, a luminance control can vary color from black through to white.
			Psychologically, as things become darker they slow us down. Dark indicates night, danger and
			evil. In the dark, we strain to see and find it difficult to make out shapes and recognize
			shapes, objects and people. Light indicates day and is more positively arousing, though in
			bright conditions, in which there is much white light, we can be dazzled as our eyes are
			unable to cope with the increased amplitude and energy of the inbound electromagnetic
			radiation. In computer editing, luminosity is calculated from Red, Green and Blue values as:
			First identify the normalized Red, Green and Blue values (0 to 1, typically R/255, G/255 and
			B/255). Identify the maximum (max) and minimum (min) of these. Calculate Luminosity = (max -
			min). An alternative for a central figure in the (hexacone model), is the average of max and
			min. If max = 0 then the Color is black and Luminosity is zero. Note: The 'L' in HSL can vary,
			depending on the software used. HSL can hence also mean 'Hue, Saturation and Luminance' or
			'Hue, Saturation and Lightness'. The exact definition of these may vary with the software.
		</p>
	</section>
</main>
