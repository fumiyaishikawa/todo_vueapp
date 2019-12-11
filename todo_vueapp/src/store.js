import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//グローバルで使えるようになる
export default new Vuex.Store({
    state: {
        // タスクを保存する。
        todos: [
            { id: 1, content: 'aaa', status: 0 },
            { id: 2, content: 'bbb', status: 0 },
            { id: 3, content: 'ccc', status: 0 },
        ],
        // タスクに登録するコンテンツを登録。
        newContent: "",
        //絞り込み機能の初期値。difinition.jsのoptionsと紐付ける。
        currentStatus: -1
    },
    getters: {
        //todosのstatusとcurrentStatusが一致するものを参照する
        //エラー？コンソールにfilteringTodosが記されているが、setterを持っていない的な？
        filteringTodos(state) {
            if (state.currentStatus == 0) {
                return state.todos.filter(todos => todos.status === 0);
            } else if (state.currentStatus == 1) {
                return state.todos.filter(todos => todos.status === 1);
            } else {
                return state.todos;
            }
        },
    },
    mutations: { //stateを更新する同期的な処理を書く
        //newContentを更新する処理
        input(state, value) {
            state.newContent = value;
        },
        // タスクを登録する処理
        addTodo(state) {
            let content = state.newContent;
            if (content) {
                let lastId = state.todos.length + 1;
                state.todos.push({
                    id: lastId,
                    content: content,
                    status: 0
                });
                state.newContent = "";
            }
        },
        // 削除ボタンと紐づいていたidを有するタスクを削除する処理
        removeTodo(state, index) {
            state.todos.splice(index, 1);
        },
        //状態ボタンをクリックするとstatusが０から1に切り替わる(同時にラベルも変化する)
        changeStatus(state, index) {
            state.todos[index].status = state.todos[index].status ? 0 : 1;
        },
        //currentStatusを選択されたラジオボタンのvalueに変更する
        changeCurrentStatus(state, index) {
            state.currentStatus = index;
        }
    }
});
