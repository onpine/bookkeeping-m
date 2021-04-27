<template>
  <div class="setting-container">
    <van-nav-bar
      class="nav-wrap"
      title="设置"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group class="cell-wrap" @click="handleUser">
      <van-cell class="user-wrap">
        <template>
          <div class="user-title">
            <van-icon name="manager" />
            <span>用户</span>
          </div>
          <span>{{ token ? userInfo.uid : "未登录！点击登录" }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="cell-wrap">
      <van-cell title="备份数据">
        <template #label>
          <span>备份账单数据</span>
        </template>
      </van-cell>
      <van-cell title="导出CSV">
        <template #label>
          <span>将账单数据导出到CSV</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  name: "settingContainer",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      token: "token",
      userInfo: "user",
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setUserState: "setUserState",
      setTokenState: "setTokenState",
    }),
    onClickLeft() {
      this.$router.push({ path: "/" });
    },
    handleUser() {
      if (!this.token) {
        this.$router.push({ path: "/login" });
      } else {
        Dialog.confirm({
          message: "确认退出登录？",
        })
          .then(() => {
            this.setTokenState(undefined);
            this.setUserState({ uid: "" });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
};
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__title {
  font-weight: 600;
}
/deep/.van-nav-bar .van-icon {
  font-weight: 600;
  color: #41b883;
}
.setting-container {
  background-color: #eee;
  height: 100vh;
  .nav-wrap {
    margin-bottom: 10px;
  }
  .cell-wrap {
    margin: 10px 0;
    .user-wrap {
      /deep/.van-cell__value {
        height: 45px;
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        .user-title {
          display: flex;
          font-weight: bold;
          font-size: 16px;

          i {
            font-size: 30px;
            line-height: 45px;
            margin-right: 10px;
            color: seagreen;
          }
        }
        span {
          line-height: 45px;
          color: rgb(12, 12, 12);
        }
      }
    }
  }
}
</style>
