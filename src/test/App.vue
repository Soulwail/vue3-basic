import useMousePosition from './hooks/useMousePosition'; import useURLLoader
from './hooks/useURLLoader';
<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <h1>{{ count }}</h1>
        <h1>{{ double }}</h1>
        <h1 v-if="loading">Loading...</h1>
        <!-- <img v-if="loaded" :src="result.message" /> -->
        <img v-if="loaded" :src="result[0].url" />
        <h1>X：{{ x }}，Y：{{ y }}</h1>
        <!-- <ul>
            <li v-for="number in numbers" :key="number">
                <h1>{{ number }}</h1>
            </li>
        </ul>
        <h1>{{ person.name }}</h1> -->
        <h1>{{ greetings }}</h1>
        <p>{{ error }}</p>
        <Suspense>
            <template #default>
                <div>
                    <async-show></async-show>
                    <dog-show></dog-show>
                </div>
            </template>
            <template #fallback>
                <h1>Loading!...</h1>
            </template>
        </Suspense>
        <button @click="openModal">Open Modal</button>
        <button @click="increase">👍+1</button>
        <modal :isOpen="modalIsOpen" @close-modal="onModalClose">
            My Modal!!!
        </modal>
        <br />
        <button @click="updateGreeting">Update Title</button>
    </div>
</template>

<script lang="ts">
import {
    ref,
    computed,
    reactive,
    toRefs,
    onMounted,
    onUnmounted,
    onUpdated,
    onRenderTriggered,
    watch,
    onErrorCaptured,
} from 'vue';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import Modal from './components/Modal.vue';
import AsyncShow from './components/AsyncShow.vue';
import DogShow from './components/DogShow.vue';
interface DataProps {
    count: number;
    double: number;
    increase: () => void;
    numbers: number[];
    person: { name?: string };
}
interface DogResult {
    message: string;
    status: string;
}
interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
}
export default {
    name: 'App',
    components: {
        Modal,
        AsyncShow,
        DogShow,
    },
    setup() {
        const error = ref(null);
        onErrorCaptured((e: any) => {
            error.value = e;
            return true;
        });
        // const count = ref(0);
        // const double = computed(() => count.value * 2);
        // const increase = () => {
        //     count.value++;
        // };

        // onMounted(() => {
        //     console.log('mounted');
        // });
        // onUpdated(() => {
        //     console.log('updated');
        // });
        // onRenderTriggered((event) => {
        //     console.log(event);
        // });

        const data: DataProps = reactive({
            count: 0,
            increase: () => data.count++,
            double: computed(() => data.count * 2),
            numbers: [1, 2, 3],
            person: {},
        });
        // data.numbers[0] = 5;
        // data.person.name = 'soulwail';

        const greetings = ref('');
        const updateGreeting = () => {
            greetings.value += 'Hello! ';
        };
        watch([greetings, () => data.count], (newValue, oldValue) => {
            console.log('new', newValue);
            console.log('old', oldValue);
            document.title = 'upload' + greetings.value + data.count;
        });

        const { x, y } = useMousePosition();

        // const { result, loading, loaded } = useURLLoader<DogResult>(
        //     'https://dog.ceo/api/breeds/image/random'
        // );

        const { result, loading, loaded } = useURLLoader<CatResult[]>(
            'https://api.thecatapi.com/v1/images/search?limit=1'
        );

        watch(result, () => {
            if (result.value) {
                console.log(result.value[0].url);
            }
        });

        const modalIsOpen = ref(false);
        const openModal = () => {
            modalIsOpen.value = true;
        };
        const onModalClose = () => {
            modalIsOpen.value = false;
        };

        const refData = toRefs(data);
        return {
            // count,
            // increase,
            // double,
            ...refData,
            greetings,
            updateGreeting,
            x,
            y,
            result,
            loading,
            loaded,
            modalIsOpen,
            openModal,
            onModalClose,
            error,
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
