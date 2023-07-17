<template>
    <div>
        <h1>我就是我就是天</h1>
        <button @click=""></button>
    </div>
</template>

<script setup lang="ts">
const arr = ref([2, 99, 1, 3, 49, 26])
// 冒泡排序
const paixu = () => {
    for (let i = 0; i < arr.value.length; i++) {
        for (let j = 0; j < arr.value.length; j++) {
            if (arr.value[j] > arr.value[j + 1]) {
                let temp = arr.value[j]
                arr.value[j] = arr.value[j + 1]
                arr.value[j + 1] = temp
            }
        }
    }
}
const paixu2 = () => {
    for (let i = 0; i < arr.value.length; i++) {
        for (let j = i - 1; j < arr.value.length; j++) {
            if (arr.value[j] > arr.value[j + 1]) {
                let temp = arr.value[j]
                arr.value[j] = arr.value[j + 1]
                arr.value[j + 1] = temp
            }
        }
    }
}
// 防抖
// 防抖

onMounted(() => {
    // paixu()
    paixu2()
    console.log(arr.value);
})
</script>

<style scoped></style>