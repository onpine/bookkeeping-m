<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="uid"
        name="uid"
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
        to="register"
        >没有账号？去注册</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { login } from "@/api/user";
import { mapMutations } from "vuex";
export default {
  name: "loginContainer",
  components: {},
  props: {},
  data() {
    return {
      uid: "15893680482",
      password: "123456",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setUserState: "setUserState",
      setTokenState: "setTokenState",
    }),
    async onSubmit(values) {
      const toast = Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      try {
        let result = await login(values);
        console.log(result);
        this.setUserState(result.data.data);
        this.setTokenState(result.data.token);
        toast.clear();
        Toast.success({
          message: "登录成功",
        });
        this.$router.push({ path: "/setting" });
      } catch (error) {
        toast.clear();
        Toast.fail({
          message: "登录失败",
        });
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
