import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//グローバルで使えるようになる
export default new Vuex.Store({
    state: {
        addContent: "",
        // 登録されているタスク情報->tasks
        todos: [
            { id: 1, content: 'aaa', status: 0 },
            { id: 2, content: 'bbb', status: 0 },
            { id: 3, content: 'ccc', status: 0 },
        ],
        //ラジオボタンの絞り込み機能用にoptionを作成
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' },
        ],
        //絞り込み機能の初期値としてcurrentを作成
        current: -1
    },
    actions: {
        //todoの登録

    },
    mutations: {
        //todoの登録

    }
});
