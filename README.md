## Color theme generater + live time examples.

### To start

```bash
git clone <Repo>
->
npm install
```

### ChromaJs

Chroma js blir brukt for å generere farger og for å sjekke kontraster.

### Live updating

Live oppdatering funker bare i style="" ikke i class=""

### så for å se fargene oppdatere seg live

```svelte
<script>
	let variable_for_color = '#f3d2a3';
</script>

<div style={`background-color: ${variable_for_color}`}></div>
```
