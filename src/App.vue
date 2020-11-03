<template>
    <div class="container">
        <column-list :list="list"></column-list>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
const testData: ColumnProps[] = [
    { id: 1, title: 'test1的专栏', description: '这是test1的专栏' },
    { id: 2, title: 'test2的专栏', description: '这是test2的专栏' },
];
export default {
    name: 'App',
    components: {
        ColumnList,
    },
    setup() {
        return {
            list: testData,
        };
    },
};
</script>

<style></style>
