<template>
    <div class="count">{{ storeCounter.count }}</div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';

onMounted(() => {
    console.log('test');
});

const storeCounter = useCounterStore();
</script>