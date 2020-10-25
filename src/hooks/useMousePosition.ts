import { ref, toRefs, reactive, onMounted, onUnmounted } from 'vue';
function useMousePosition() {
    // const x = ref(0);
    // const y = ref(0);
    // const updateMouse = (e: MouseEvent) => {
    //     x.value = e.pageX;
    //     y.value = e.pageY;
    // };

    const data = reactive({
        x: 0,
        y: 0,
        updateMouse: (e: MouseEvent) => {
            data.x = e.pageX;
            data.y = e.pageY;
        }
    })

    onMounted(() => {
        document.addEventListener('click', data.updateMouse);
    });

    onUnmounted(() => {
        document.removeEventListener('click', data.updateMouse);
    });

    const refData = toRefs(data)

    return {
        // x,
        // y,
        ...refData
    };
}

export default useMousePosition;
