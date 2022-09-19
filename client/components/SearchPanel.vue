<template>
	<div>
		<TransitionRoot appear :show="isOpen" as="template">
			<Dialog as="div" @close="closeModal" class="relative z-10">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					leave="duration-200 ease-in"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/40 backdrop-blur" />
				</TransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex items-center justify-center min-h-full p-4">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							leave="duration-200 ease-in"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-full max-w-lg overflow-hidden transition-all transform bg-white shadow-xl rounded-xl"
							>
								<div class="flex items-center w-full px-3 space-x-2 border-b">
									<Icon class="text-gray-400" name="ep:search" size="20" />
									<input
										v-model.trim="search"
										type="search"
										name="search"
										id="sarch"
										class="w-full py-4 outline-none"
										placeholder="Search for file here"
									/>
								</div>

								<div class="px-4 pb-4 mt-4">
									<p class="text-sm font-light text-gray-500">Files</p>
									<ul class="mt-3">
										<template v-for="d in docs" :key="d.id">
											<li>
												<button
													class="flex items-center w-full p-3 space-x-5 transition-all duration-300 rounded-md outline-none focus:ring-4 focus:ring-primary/30 group"
												>
													<img
														:src="`${getVSIFileIcon(d.originalname)}`"
														alt="js"
														width="32"
														height="32"
														class="object-contain"
													/>
													<div class="min-w-0 text-left">
														<h2 class="text-sm text-gray-600 truncate group-hover:text-primary">
															{{ d.name }}
														</h2>
														<p class="text-xs font-light text-gray-500 group-hover:text-primary">
															{{ fileSize(d.size).human("si") }}
														</p>
													</div>
												</button>
											</li>
										</template>
									</ul>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup lang="ts">
	import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";
	import { getVSIFileIcon } from "file-extension-icon-js";
	import { IDocument } from "~~/types";
	import fileSize from "file-size";

	const { searchDocument } = useDocument();
	const docs = ref<IDocument[]>([]);

	const search = ref("");

	const isOpen = ref(false);
	function closeModal() {
		isOpen.value = false;
	}
	function openModal() {
		isOpen.value = true;
	}

	const findDocs = async () => {
		if (!search.value) return;
		docs.value = await searchDocument(search.value);
	};

	watch(search, (val, oldVal) => {
		if (val !== oldVal) {
			setTimeout(() => {
				findDocs();
			}, 250);
		}
	});
	defineExpose({
		closeModal,
		openModal,
	});
</script>
