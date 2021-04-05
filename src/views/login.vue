<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button
        round
        plain
        block
        type="info"
        native-type="submit"
        to="rigister"
        >没有账号？去注册</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { login } from "@/api/user";
import { setItem } from "@/utils/stroage.ts";
export default {
  name: "loginContainer",
  components: {},
  props: {},
  data() {
    return {
      username: "123456",
      password: "123456",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit(values) {
      const toast = Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      try {
        let result = await login(values);
        console.log(result);
        setItem("token", result.data.token);
        toast.clear();
      } catch (error) {
        console.log(error);
      }
    },
    onClickLeft() {
      this.$router.back(-1);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
