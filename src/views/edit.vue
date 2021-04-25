<template>
  <div class="edit-container">
    <van-nav-bar
      class="nav-wrap"
      title="修改账单"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
      <!-- <template #right>
        <van-icon name="delete-o" size="18" />
      </template> -->
    </van-nav-bar>
    <div class="category-content">
      <!-- <van-field readonly clickable /> -->
      <van-field
        :value="amount"
        clearable
        clickable
        readonly
        label="金额"
        right-icon="gold-coin-o"
        placeholder="显示清除图标"
        @touchstart.native.stop="show = true"
        @clear="handleClear"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <van-grid :column-num="5">
        <van-grid-item
          :class="index === selected ? 'bchigh' : ''"
          v-for="(item, index) in category"
          :key="index"
          :text="item.name"
          @click.native="handleChangeCate(index)"
        >
          <template #icon>
            <van-icon
              class-prefix="icon"
              :class="index === selected ? 'high' : ''"
              :name="item.icon"
            ></van-icon>
          </template>
        </van-grid-item>
        <van-grid-item
          @click.native="handleChangeCate(-1)"
          icon="setting"
          text="设置"
        />
      </van-grid>

      <van-row>
        <van-col :span="12">
          <van-button type="default" @click="textShow = true">{{
            message ? message : "添加备注"
          }}</van-button>
        </van-col>
        <van-col :span="12">
          <van-button type="default" @click="timeShow = true">{{
            time
          }}</van-button>
        </van-col>
      </van-row>
      <van-number-keyboard
        :show="payshow"
        v-model="amount"
        theme="custom"
        :extra-key="['-', '.']"
        close-button-text="完成"
        @blur="show = false"
        @close="handleSubmit"
      />
      <van-popup
        v-model="textShow"
        round
        :style="{ width: '90%', padding: '5%' }"
      >
        <span class="textLabel">填写备注：</span>
        <van-field
          v-model="message2"
          rows="2"
          autosize
          border
          type="textarea"
          maxlength="50"
          placeholder="备注"
          show-word-limit
        />
        <van-row>
          <van-col span="10" offset="1">
            <van-button round plain type="primary" @click="textShow = false"
              >取消</van-button
            >
          </van-col>
          <van-col span="10" offset="2"
            ><van-button round type="primary" @click="handleOk"
              >确认</van-button
            >
          </van-col>
        </van-row>
      </van-popup>
      <van-popup
        v-model="timeShow"
        round
        :style="{ width: '90%', padding: '5%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleTime"
          @cancel="handleCancel"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { payCategory, inCategory } from "@/utils/Category.json";
import { getItem, setItem } from "@/utils/stroage.ts";
import { isMonth, isToday, getFormat1, getFormat } from "@/utils/time.ts";
export default {
  name: "editContainer",
  components: {},
  props: {},
  data() {
    return {
      data: this.$route.params,
      payCategory: payCategory,
      inCategory: inCategory,
      category: undefined,
      payshow: true,
      amount: "",
      message: "",
      message2: "",
      time: undefined,
      selected: 0,
      textShow: false,
      timeShow: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: undefined,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      this.amount = this.data.amount;
      this.message = this.data.message;
      this.message2 = this.data.message;
      this.time = this.data.time;
      this.currentDate = getFormat(this.data.time, "YYYY年MM月DD日 HH:mm").$d;
      if (this.data.type) {
        this.category = JSON.parse(JSON.stringify(inCategory));
      } else {
        this.category = JSON.parse(JSON.stringify(payCategory));
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    handleClear() {
      this.value = "";
    },
    handleChangeCate(index) {
      if (index === -1) {
        this.$router.push({ path: "/setting" });
      }
      this.selected = index;
    },
    handleFocus() {
      this.payshow = true;
    },
    handleBlur() {
      // this.payshow = false;
    },
    handleSubmit() {
      let noteList = getItem("noteList") || [];
      let monthList = getItem("monthList") || [];
      console.log(noteList);
      if (this.amount == "") {
        alert("输入金额");
        return;
      }
      noteList.forEach((item) => {
        if (item.stamp == this.data.stamp) {
          item.amount = this.amount;
          item.category = this.selected;
          item.message = this.message;
          item.time = this.time;
        }
      });
      setItem("noteList", noteList);

      let monthTotal = {
        payTotal: 0,
        payNum: 0,
        inTotal: 0,
        inNum: 0,
        budget: getItem("monthTotal").budget || 0,
        time: getFormat1(new Date()),
      };
      let todayTotal = {
        payTotal: 0,
        inTotal: 0,
        time: getFormat1(new Date()),
      };
      noteList.forEach((element) => {
        if (isMonth(element.time)) {
          if (element.type) {
            monthTotal.inNum += 1;
            monthTotal.inTotal += parseFloat(element.amount);
            if (isToday(element.time)) {
              todayTotal.inTotal += parseFloat(element.amount);
            }
          } else {
            monthTotal.payNum += 1;
            monthTotal.payTotal += parseFloat(element.amount);
            if (isToday(element.time)) {
              todayTotal.payTotal += parseFloat(element.amount);
            }
          }
        }
      });
      setItem("monthTotal", monthTotal);
      setItem("todayTotal", todayTotal);
      this.$router.go(-1);
    },
    handleOk() {
      this.message = this.message2;
      this.textShow = false;
    },
    handleTime(value) {
      console.log(value);
      this.time = getFormat1(value);
      this.timeShow = false;
    },
    handleCancel() {
      this.timeShow = false;
    },
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    let params = { ...to.params };
    if (JSON.stringify(params) != "{}") {
      next();
    } else {
      next({ name: "home" });
    }
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
.category-content {
  .high {
    color: indianred;
  }
  /deep/.bchigh > .van-grid-item__content {
    background-color: #ccc;
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
}
</style>
