<template>
  <div class="rigister-container">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="uid"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ pattern, message: '请输入手机号' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <!-- <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      /> -->
      <van-field
        v-model="password1"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="重复密码"
        label="重复密码"
        placeholder="重复密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <!-- <van-field
        v-model="age"
        name="年龄"
        label="年龄"
        placeholder="年龄"
        :rules="[{ validator: asyncValidator, message: '请输入年龄' }]"
      />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field> -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button round plain block type="info" native-type="submit" to="login"
        >已有帐号？去登陆</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { register } from "@/api/user";
export default {
  name: "rigisterContainer",
  components: {},
  props: {},
  data() {
    return {
      uid: "15893680482",
      // username: "onpine",
      password1: "123456",
      password2: "123456",
      // age: "20",
      // sex: "1",
      pattern: /\d{6}/,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit(values) {
      console.log("submit", values);
      const user = {
        uid: this.uid,
        password: this.password1,
      };
      try {
        let result = await register(user);
        console.log(result);
        if (result.status == 200) {
          this.$router.push({ path: "/login" });
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    // validator(val) {
    //   return /1\d{10}/.test(val);
    // },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{2}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>

<style scoped lang='less'>
</style>
