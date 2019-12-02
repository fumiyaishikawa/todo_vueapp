<template>
  <div id="todo">
    <section class="container mt-5 mb-5">
      <!-- statusでタスクを絞り込む機能 -->
      <div class="checkbox text-center">
        <div class="form-check form-check-inline">
          <label class="form-check-label" v-for="label in options">
            <input
              class="form-check-input ml-3"
              type="radio"
              v-model="current"
              v-bind:value="label.value"
            />
            {{label.label}}
          </label>
        </div>
      </div>

      <!-- 登録したタスク一覧 -->
      <table class="table table-striped mt-3">
        <tr>
          <th scope="col" class="text-center">ID</th>
          <th scope="col" class="text-center">コメント</th>
          <th scope="col" class="text-center">状態</th>
          <th scope="col" class="text-center"></th>
        </tr>
        <!-- 登録しているタスクを繰り返し表示 -->
        <tr v-for="(todo, index) in filteringToDos" v-bind:key="todo.id">
          <td scope="row" class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ todo.content }}</td>
          <td class="text-center">
            <button
              class="btn btn-dark text-white bg-dark"
              v-on:click="changeStatus(todo)"
            >{{ statusLabels[todo.status] }}</button>
          </td>
          <td class="text-center">
            <button class="btn btn-dark text-white bg-dark" v-on:click="removeToDo(todo)">削除</button>
          </td>
        </tr>
      </table>
      <!-- タスクの追加 -->
      <div class="taskbox center-block mt-5">
        <h3 class="text-center bg-light py-3">新規タスクの追加</h3>
        <div class="form-group row mt-4">
          <div class="col-sm-10">
            <input type="text" v-model="addContent" class="form-control mb-2" />
          </div>
          <div class="col-sm-2">
            <button type="submit" class="btn btn-primary px-4 mb-2" v-on:click="addToDo">追加</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "#todo",
  data() {
    return {
      addContent: this.$store.state.addContent,
      todos: this.$store.state.todos,
      options: this.$store.state.options,
      current: this.$store.state.current
    };
  },
  computed: {
    //絞り込み機能でフィルタリングされたToDo
    filteringToDos: function() {
      return this.todos.filter(function(value) {
        return this.current < 0 ? true : this.current === value.status;
      }, this);
    },
    //statusを数字から文字列へ変換する処理
    //{0: '作業中', 1: '完了' }みたいな形に変換する
    statusLabels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label });
      }, {});
    }
  },
  methods: {
    //タスクの追加
    addToDo: function() {
      var lastId = this.todos.length + 1;
      if (this.addContent) {
        this.todos.push({
          id: lastId,
          content: this.addContent,
          status: 0
        });
        this.addContent = "";
      }
    },
    //クリックしたボタンとリンクしているidを有するtodoを削除する
    removeToDo: function(todo) {
      var indexNumber = this.todos.indexOf(todo);
      this.todos.splice(indexNumber, 1);
    },
    //ボタンをクリックするとstatusが０から1に切り替わる
    changeStatus: function(todo) {
      todo.status = todo.status ? 0 : 1;
    }
  }
};
</script>
