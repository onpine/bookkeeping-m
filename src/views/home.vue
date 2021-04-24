<template>
  <div class="home-container">
    <van-nav-bar title="我的记账本" border>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-cell>
        <span slot="title" class="this-title">本月支出</span>
      </van-cell>
      <van-cell>
        <span slot="title" class="this-value">{{
          eye
            ? monthTotal.payTotal
              ? "￥" + monthTotal.payTotal
              : "暂无支出"
            : "****"
        }}</span>
        <van-icon
          slot="right-icon"
          :name="eye ? 'eye' : 'closed-eye'"
          class="eye"
          @click="setEyeState(!eye)"
        />
      </van-cell>
      <van-cell>
        <div slot="title">
          <span class="this-title">本月收入</span>
          <span class="this-value2">{{
            eye
              ? monthTotal.inTotal
                ? "￥" + monthTotal.inTotal
                : "暂无收入"
              : "****"
          }}</span>
        </div>
        <div slot="default" class="left-value">
          <span class="this-title">预算剩余</span>
          <span class="this-value2" @click="eye ? (numberShow = true) : null">{{
            eye
              ? monthTotal.budget
                ? "￥" + (monthTotal.budget - monthTotal.payTotal)
                : "未设置预算"
              : "****"
          }}</span>
        </div>
      </van-cell>
      <van-cell>
        <van-button
          icon="chart-trending-o"
          type="default"
          to="/monthDetails"
          block
          >查看图标分析</van-button
        >
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell>
        <div slot="title">
          <span class="this-title">今日支出</span>
          <span class="this-value2">{{
            todayTotal.payTotal ? "￥" + todayTotal.payTotal : "暂无"
          }}</span>
        </div>
        <div slot="default" class="left-value">
          <span class="this-title">今日收入</span>
          <span class="this-value2">{{
            todayTotal.inTotal ? "￥" + todayTotal.inTotal : "暂无"
          }}</span>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- 设置预算 -->
    <van-popup
      v-model="numberShow"
      round
      :style="{ width: '90%', padding: '5%' }"
    >
      <span class="textLabel">填写预算：</span>
      <van-field
        v-model="budget"
        rows="2"
        size="large"
        border
        type="number"
        placeholder="预算"
        show-word-limit
      />
      <van-row>
        <van-col span="10" offset="1">
          <van-button round plain type="primary" @click="numberShow = false"
            >取消</van-button
          >
        </van-col>
        <van-col span="10" offset="2"
          ><van-button round type="primary" @click="handleBudgetOk"
            >确认</van-button
          >
        </van-col>
      </van-row>
    </van-popup>
    <!-- 今日记录的账目 -->
    <div class="today" style="padding-bottom: 80px">
      <record
        v-for="(item, index) in todayList"
        :key="index"
        :item="item"
        @update-view="initData"
      />
    </div>
    <!-- 操作按钮 -->
    <div class="write-btn">
      <van-button to="/note" round type="primary" icon="edit"
        >记一笔...</van-button
      >
    </div>
    <div class="info-btn">
      <van-button
        @click="show = !show"
        round
        type="primary"
        icon="points"
      ></van-button>
    </div>
    <!-- 导航 -->
    <van-action-sheet v-model="show" title="导航">
      <div class="sheet">
        <van-grid clickable :column-num="3">
          <van-grid-item icon="info-o" text="关于" to="/about" />
          <van-grid-item icon="setting-o" text="设置" to="/setting" />
          <van-grid-item icon="bars" text="账单记录" to="/records" />
          <van-grid-item
            icon="chart-trending-o"
            text="账单详情"
            to="/monthDetails"
          />
        </van-grid>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/stroage.ts";
import Record from "@/components/record.vue";
import { mapState, mapMutations } from "vuex";
import { getFormat1, isToday } from "@/utils/time";
export default {
  name: "homeContainer",
  components: { Record },
  props: {},
  data() {
    return {
      show: false,
      todayList: [],
      numberShow: false,
      budget: undefined,
      monthTotal: {
        payTotal: 0,
        inTotal: 0,
        budget: 0,
      },
      todayTotal: {
        payTotal: 0,
        inTotal: 0,
      },
    };
  },
  computed: {
    ...mapState({
      eye: "eyeState",
    }),
  },
  watch: {},
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations({
      setEyeState: "setEyeState",
    }),
    initData() {
      let noteList = [...getItem("noteList")];
      this.todayList = noteList.filter((item) => {
        return isToday(item.time);
      });

      this.monthTotal = {
        ...(getItem("monthTotal") || {
          payTotal: 0,
          inTotal: 0,
          budget: 0,
          time: getFormat1(new Date()),
        }),
      };
      this.budget = this.monthTotal.budget;
      let todayT = getItem("todayTotal");
      this.todayTotal = {
        ...(todayT && isToday(todayT.time)
          ? todayT
          : "" || {
              payTotal: 0,
              inTotal: 0,
              time: getFormat1(new Date()),
            }),
      };

      console.log(this.todayList);
    },
    handleBudgetOk() {
      this.monthTotal.budget = this.budget;
      setItem("monthTotal", this.monthTotal);
      this.numberShow = false;
    },
    handleCancel() {
      this.numberShow = false;
    },
  },
};
</script>

<style scoped lang='less'>
.home-container {
  background-color: #eee;
  min-height: 100vh;

  .this-title {
    font-size: 13px;
    color: #aaa;
    flex: 1;
  }
  .this-value {
    font-size: 24px;
    font-weight: 600;
    margin: 10px auto;
    line-height: 30px;
  }
  .this-value2 {
    font-size: 14px;
    padding: 0px 10px;
    color: #323233;
    flex: 1;
    font-weight: 600;
  }
  .eye {
    font-size: 20px;
    line-height: 30px;
  }
  .left-value {
    text-align: left;
  }
  .write-btn {
    position: fixed;
    bottom: 20px;
    text-align: center;
    width: 100%;
    /deep/.van-button--primary {
      border: none;
      padding: auto 20px;
      font-weight: 600;
    }
    /deep/.van-button--round {
      box-shadow: #777777 2px 3px 3px 0px;
    }
  }
  .info-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    /deep/.van-button--primary {
      border: none;
      padding: auto 20px;
      font-weight: 600;
    }
    /deep/.van-button--round {
      box-shadow: #777777 2px 3px 3px 0px;
    }
  }
}
/deep/.van-cell-group {
  margin: 16px;
}
/deep/.van-nav-bar__title {
  margin-left: 16px;
  font-weight: 600;
}
/deep/.van-nav-bar .van-icon {
  font-weight: 600;
  font-size: 16px;
  color: #41b883;
}
/deep/.van-button__icon {
  font-size: 16px;
  font-weight: 600;
}
/deep/.van-icon-shop-o {
  display: block;
  font-size: 20px;
  font-weight: 600;
  // background-color: indianred;
  color: indianred;
}

/deep/.van-button--default {
  border: none;
  color: #41b883;
  font-weight: 600;
}

.sheet {
  padding: 20px;
  height: 150px;
}
/deep/.van-row {
  .van-col--12:first-child .van-button {
    float: left;
    background-color: #fff;
    border: 0;
  }
  .van-col--12:last-child .van-button {
    background-color: #fff;
    border: 0;
    float: right;
  }
}
/deep/.van-col--10 .van-button {
  width: 100%;
}
.textLabel {
  font-size: 14px;
  padding: 16px;
}
</style>
