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
    <van-cell-group class="cell-wrap">
      <button>
        <van-cell class="user-wrap" @click="handleUser">
          <template>
            <div class="user-title">
              <van-icon name="manager" />
              <span>用户</span>
            </div>
            <span>{{ token ? userInfo.uid : "未登录！点击登录" }}</span>
          </template>
        </van-cell>
      </button>
    </van-cell-group>
    <van-cell-group class="cell-wrap">
      <button>
        <van-cell title="备份数据" @click="handleBackups">
          <template #label>
            <span>备份账单数据</span>
          </template>
        </van-cell>
      </button>
      <button>
        <van-cell title="同步数据" @click="handlePull">
          <template #label>
            <span>同步账单数据</span>
          </template>
        </van-cell>
      </button>
      <button>
        <van-cell title="导出Excel">
          <template #label>
            <span>将账单数据导出到Excel</span>
          </template>
        </van-cell>
      </button>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Dialog, Toast } from "vant";
import { backups, pull } from "@/api/user.ts";
import { getItem, setItem, initTotal } from "@/utils/stroage.ts";
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
      clearTokenState: "clearTokenState",
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
            this.clearTokenState();
            this.setUserState({ uid: "" });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    async handleBackups() {
      try {
        await this.handlePull();
      } catch (error) {
        return;
      }
      if (this.token) {
        // 已登录
        const toast = Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        try {
          let noteList = getItem("noteList") || "";
          let result = await backups(noteList);
          toast.clear();
          if (result.data.status == 200) {
            Toast.success("备份成功");
          } else {
            Toast.fail("备份失败，稍后再试");
          }
        } catch (error) {
          toast.clear();
          Toast.fail("备份失败，稍后再试");
          console.log(error);
        }
      } else {
        // 未登录
        Dialog.alert({
          message: "还未登录！去登录",
        }).then(() => {
          this.$router.push({ path: "/login" });
        });
      }
    },
    async handlePull() {
      if (this.token) {
        // 已登录
        const toast = Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        try {
          let noteList = getItem("noteList") || "";
          let result = await pull();
          let pullNoteList = result.data.data.noteList;
          pullNoteList = [...pullNoteList, ...noteList];
          // 对象数组去重
          let map = new Map();
          for (let item of pullNoteList) {
            if (!map.has(item.stamp)) {
              map.set(item.stamp, item);
            }
          }
          console.log([...map.values()]);
          setItem("noteList", [...map.values()]);
          // 计算本月和今日统计
          initTotal();
          toast.clear();
          if (result.data.status == 200) {
            Toast.success("同步成功");
          } else {
            Toast.fail("同步失败，稍后再试");
          }
        } catch (error) {
          toast.clear();
          Toast.fail("同步失败，稍后再试");
          console.log(error);
        }
      } else {
        // 未登录
        Dialog.alert({
          message: "还未登录！去登录",
        }).then(() => {
          this.$router.push({ path: "/login" });
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
    button {
      width: 100%;
      text-align: inherit;
      padding: 0;
      border: 0;
    }
    button:active {
      /deep/.van-cell {
        background-color: #eee;
      }
    }
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
