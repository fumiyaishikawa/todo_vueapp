import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//グローバルで使えるようになる
export default new Vuex.Store({
    state: {
        addContent: "",
        // 登録されているタスク情報->tasks
        todos: [],
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
