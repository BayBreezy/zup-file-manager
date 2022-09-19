<template>
	<div>
		<Menu as="div" class="relative">
			<MenuButton
				v-slot="{ open }"
				class="flex items-center justify-center p-1 text-gray-400 rounded-full"
			>
				<transition mode="out-in" name="fade">
					<Icon v-if="open" name="bi:x" size="20" />
					<Icon v-else name="bi:three-dots-vertical" size="20" />
				</transition>
			</MenuButton>

			<transition name="menu">
				<MenuItems
					class="absolute right-0 p-2 mt-2 space-y-2 origin-top-right bg-white divide-y rounded-lg shadow dark:divide-gray-600 dark:bg-slate-700 w-52"
				>
					<div class="space-y-1">
						<MenuItem v-slot="{ active }">
							<button
								@click="$refs.editFile.openModal(document)"
								:class="[active ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-300']"
								class="w-full flex justify-start items-center space-x-3 text-sm p-2.5 rounded-md transition-all"
								type="button"
							>
								<Icon name="bi:pen" size="15" />
								<span>Edit</span>
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								@click="$refs.fileDetails.openModal(document)"
								:class="[active ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-300']"
								class="w-full flex justify-start items-center space-x-3 text-sm p-2.5 rounded-md transition-all"
								type="button"
							>
								<Icon name="bi:box-arrow-in-up-right" size="15" />
								<span>View Details</span>
							</button>
						</MenuItem>
					</div>
					<div class="pt-2">
						<MenuItem v-slot="{ active }">
							<button
								@click="deleteDoc()"
								:class="[active ? 'bg-red-50 text-red-500' : 'text-gray-500 dark:text-gray-300']"
								class="w-full flex justify-start items-center space-x-3 text-sm p-2.5 rounded-md transition-all"
								type="button"
							>
								<Icon name="bi:trash3" size="15" />
								<span>Delete</span>
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>

		<!-- File details action -->
		<FileDetails ref="fileDetails" />
		<!-- File Edit details action -->
		<EditFile ref="editFile" />
	</div>
</template>

<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

	// declare props
	const props = defineProps({
		document: {
			required: true,
			type: Object,
		},
	});

	// bring in function used to removedoc
	const { removeDocument } = useDocument();
	const deleteDoc = async () => {
		let c = confirm("Are you sure?");
		if (!c) return;
		await removeDocument(props.document.id);
	};
</script>

<style></style>
