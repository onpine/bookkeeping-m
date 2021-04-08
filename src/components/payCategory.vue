<template>
  <div class="payCategory-container">
    <van-field
      :value="value"
      clearable
      clickable
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
          ></van-icon> </template
      ></van-grid-item>
      <van-grid-item
        @click.native="handleChangeCate(-1)"
        icon="setting"
        text="设置"
      />
    </van-grid>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="备注"
      type="textarea"
      maxlength="50"
      placeholder="备注"
      show-word-limit
    />
    <van-number-keyboard
      :show="payshow"
      v-model="value"
      theme="custom"
      :extra-key="['-', '.']"
      close-button-text="完成"
      @blur="show = false"
    />
  </div>
</template>

<script>
import { payCategory } from "@/utils/Category.json";
export default {
  name: "payCategoryContainer",
  components: {},
  props: {},
  data() {
    return {
      payCategory: payCategory,
      payshow: false,
      value: "",
      message: "",
      selected: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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
      this.payshow = false;
    },
  },
};
</script>

<style scoped lang='less'>
.payCategory-container {
  height: calc(100% - 54px);
}
.high {
  color: indianred;
}
/deep/.bchigh > .van-grid-item__content {
  background-color: #ccc;
}
</style>
