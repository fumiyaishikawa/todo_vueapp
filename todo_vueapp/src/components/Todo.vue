<template>
  <div id="todo">
    <section class="container mt-5 mb-5">
      <!-- statusでタスクを絞り込む機能 -->
      <div class="checkbox text-center">
        <div class="form-check form-check-inline">
          <label class="form-check-label" v-for="label in options" :key="label.value">
            <input
              class="form-check-input ml-3"
              type="radio"
              v-model="checked"
              :value="label.value"
              @click="changeCurrentStatus"
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
        <tr v-for="(todo, index) in filteringTodos" :key="todo.id">
          <td scope="row" class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ todo.content }}</td>
          <td class="text-center">
            <button
              class="btn btn-dark text-white bg-dark"
              @click="changeStatus(todo.id)"
            >{{ statusLabels[todo.status] }}</button>
          </td>
          <td class="text-center">
            <button class="btn btn-dark text-white bg-dark" @click="removeTodo(todo)">削除</button>
          </td>
        </tr>
      </table>
      <!-- タスクの追加 -->
      <div class="taskbox center-block mt-5">
        <h3 class="text-center bg-light py-3">新規タスクの追加</h3>
        <div class="form-group row mt-4">
          <div class="col-sm-10">
            <input type="text" :value="newContent" @input="updateContent" class="form-control mb-2" />
          </div>
          <div class="col-sm-2">
            <button type="submit" class="btn btn-primary px-4 mb-2" v-on:click="addTodo">追加</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { options } from "../lib/definitions"; //定数optionのインポート
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "todo",
  data() {
    return {
      checked: this.$store.state.currentStatus
    };
  },
  computed: {
    ...mapState(["todos", "newContent", "currentStatus"]),
    ...mapGetters(["filteringTodos"]),
    options() {
      return options;
    },
    //difinition.jsのoptionsを使うためコンポーネントで処理する
    // //statusの値をを数字から文字列へ変換する処理
    // //{0: '作業中', 1: '完了' }みたいな形に変換する
    statusLabels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label });
      }, {});
    }
  },
  methods: {
    ...mapMutations([
      "input",
      "addTodo",
      "removedoDo",
      "changeStatus",
      "changeCurrentStatus"
    ]),
    // //newContentの更新
    updateContent(e) {
      this.$store.commit("input", e.target.value);
    },
    // //削除ボタンと紐づいているidのタスクを削除する
    removeTodo(e) {
      this.$store.commit("removeTodo", e);
    },
    //状態ボタンをクリックするとstatusが０から1に切り替わる(同時にラベルも変化する)
    changeStatus(e) {
      this.$store.commit("changeStatus", e - 1);
    },
    changeCurrentStatus(e) {
      this.$store.commit("changeCurrentStatus", e.target.value);
    }
  }
};
</script>
