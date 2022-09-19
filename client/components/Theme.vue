<template>
	<div>
		<button @click="toggleDark()" class="px-2">
			<transition mode="out-in" name="fade">
				<Icon v-if="isDark" name="bi:moon" size="20" />
				<Icon v-else name="bi:sun" size="20" />
			</transition>
		</button>
	</div>
</template>

<script setup>
	const isDark = useDark();
	const toggleDark = useToggle(isDark);
</script>

<style></style>
