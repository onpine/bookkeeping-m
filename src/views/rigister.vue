<template>
  <div class="rigister-container">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
    <van-form validate-first @failed="onFailed">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
        v-model="value3"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
      />
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
export default {
  name: "rigisterContainer",
  components: {},
  props: {},
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      pattern: /\d{6}/,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
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
