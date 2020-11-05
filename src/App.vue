<template>
    <div class="container">
        <global-header :user="currentUser"></global-header>
        <column-list :list="list"></column-list>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
const currentUser: UserProps = {
    isLogin: true,
    name: 'soulwail'
}
const testData: ColumnProps[] = [
    { id: 1, title: 'test1的专栏', description: '这是test1的专栏' },
    { id: 2, title: 'test2的专栏', description: '这是test2的专栏' },
];
export default defineComponent({
    name: 'App',
    components: {
        ColumnList,
        GlobalHeader
    },
    setup() {
        return {
            list: testData,
            currentUser
        };
    },
});
</script>

<style></style>
