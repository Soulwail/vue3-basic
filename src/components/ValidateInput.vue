<template>
    <div class="validate-input-container pb-3">
        <input
            class="form-control"
            :class="{ 'is-invalid': inputRef.error }"
            id="exampleInputEmail1"
            v-model="inputRef.val"
            @blur="validateInput"
        />
        <span v-if="inputRef.error" class="invalid-feedback">{{
            inputRef.message
        }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
    type: 'required' | 'email';
    message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
    props: {
        rules: Array as PropType<RulesProp>,
    },
    setup(props) {
        const inputRef = reactive({
            val: '',
            error: false,
            message: '',
        });
        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every((rule) => {
                    let passed = true;
                    inputRef.message = rule.message;
                    switch (rule.type) {
                        case 'required':
                            passed = inputRef.val.trim() !== '';
                            break;
                        case 'email':
                            passed = emailReg.test(inputRef.val);
                            break;
                        default:
                            break;
                    }
                    return passed;
                });
                inputRef.error = !allPassed;
            }
        };
        return { inputRef, validateInput };
    },
});
</script>

<style></style>
