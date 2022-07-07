<template>
  <div>
    <MyTable :arr="list">
      <template #header>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template #tbody="scope">
        <td>{{ scope.row.id }}</td>
        <td>{{ scope.row.goods_name }}</td>
        <td>{{ scope.row.goods_price }}</td>
        <td>
          <input
            type="text"
            class="tag-input form-control"
            style="width: 100px"
            v-focus
            v-if="scope.row.inputShow"
            v-model="scope.row.inputValue"
            @blur="scope.row.inputShow = false"
            @keydown.enter="enterFn(scope.row), (scope.row.inputShow = false)"
            @keydown.esc="scope.row.inputValue = ''"
          />
          <button
            class="btn btn-primary btn-sm add-tag"
            v-else
            @click="scope.row.inputShow = true"
          >
            +Tag
          </button>
          <span
            v-for="(item, index) in scope.row.tags"
            :key="index"
            class="badge badge-warning"
            style="margin-left: 10px"
          >
            {{ item }}
          </span>
        </td>
        <td>
          <button
            class="btn btn-danger btn-sm"
            @click="delFn(scope.row.id)"
            v-premission1="3"
          >
            删除
          </button>
          <button class="btn btn-success btn-sm" v-premission1="3">编辑</button>
        </td>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from '../components/MyTable';
// 目标: 循环商品列表表格
// 1. 封装MyTable.vue 整体表格组件-一套标签和样式
// 2. axios请求数据
// 3. 传入MyTable组件里循环tr显示数据

// 目标: 展示tags标签
// 1. tags数组 - 某个td循环span使用文字
// 2. span设置bs的样式

// 目标: 删除数据
// 1. 删除按钮 - 点击事件
// 2. 作用域插槽把索引值关联出来了
// scope身上就有row和index
// 3. 删除中使用scope.index的索引值
// 4. 删除事件里删除数组里对应索引值的数据
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      list: [], // 所有数据
    };
  },
  created() {
    this.getList();
  },
  methods: {
    delFn(info) {
      const index = this.list.findIndex((ele) => (ele.id = info));
      this.list.splice(index, 1);
    },
    getList() {
      this.$axios({
        url: '/api/goods',
      }).then((res) => {
        res.data.data.forEach((ele) => {
          ele.inputShow = false;
        });
        // console.log(res.data.data);
        this.list = res.data.data;
      });
    },
    enterFn(obj) {
      if (obj.inputValue.trim() == '') {
        return alert('请输入内容');
      }
      obj.tags.push(obj.inputValue);
      obj.inputValue = '';
    },
  },
};
</script>
