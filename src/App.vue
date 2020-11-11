<template>
    <div class="container">
        <global-header :user="currentUser"></global-header>
        <!-- <column-list :list="list"></column-list> -->
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1">邮箱地址</label>
                <validate-input :rules="emailRules"></validate-input>
            </div>
            <div class="form-group mb-3">
                <label for="exampleInputEmail1">邮箱地址</label>
                <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    v-model="emailRef.val"
                    @blur="validateEmail"
                />
                <div class="form-text" v-if="emailRef.error">
                    {{ emailRef.message }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="exampleInputPassword1">密码</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                />
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import ValidateInput, { RulesProp } from './components/ValidateInput.vue';
const currentUser: UserProps = {
    isLogin: true,
    name: 'soulwail',
};
const testData: ColumnProps[] = [
    { id: 1, title: 'test1的专栏', description: '这是test1的专栏' },
    { id: 2, title: 'test2的专栏', description: '这是test2的专栏' },
];
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default defineComponent({
    name: 'App',
    components: {
        // ColumnList,
        GlobalHeader,
        ValidateInput,
    },
    setup() {
        const emailRules: RulesProp = [
            { type: 'required', message: '电子邮箱地址不能为空' },
            { type: 'email', message: '请输入正确的电子邮箱格式' },
        ];
        const emailRef = reactive({
            val: '',
            error: false,
            message: '',
        });
        const validateEmail = () => {
            if (emailRef.val.trim() === '') {
                emailRef.error = true;
                emailRef.message = 'can not be empty';
            } else if (!emailReg.test(emailRef.val)) {
                emailRef.error = true;
                emailRef.message = 'should be valid email';
            } else {
                emailRef.error = false;
                emailRef.message = '';
            }
        };
        return {
            list: testData,
            currentUser,
            emailRef,
            validateEmail,
            emailRules,
        };
    },
});
</script>

<style></style>
