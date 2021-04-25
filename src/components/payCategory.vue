<template>
  <div class="payCategory-container">
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
        v-for="(item, index) in payCategory"
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
          ><van-button round type="primary" @click="handleOk">确认</van-button>
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
</template>

<script>
import { payCategory } from "@/utils/Category.json";
import { getFormat1 } from "@/utils/time.ts";
import { getItem, setItem } from "@/utils/stroage.ts";
import { isMonth, isToday } from "@/utils/time.ts";
export default {
  name: "payCategoryContainer",
  components: {},
  props: {},
  data() {
    return {
      payCategory: payCategory,
      payshow: true,
      amount: "",
      message: "",
      message2: "",
      time: getFormat1(new Date()),
      selected: 0,
      textShow: false,
      timeShow: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$emit("change");
  },
  methods: {
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
      noteList.push({
        type: 0,
        amount: this.amount,
        category: this.selected,
        message: this.message,
        time: this.time,
        stamp: Date.now(),
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
      this.$router.push({ path: "/" });
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
};
</script>

<style scoped lang='less'>
// .payCategory-container {
//   // height: calc(100% - 54px);
// }
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
</style>
