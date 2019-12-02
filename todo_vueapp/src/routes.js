//コンポーネントをインポートする。
import Todo from './components/Todo.vue';

// コンポーネントとパスを結びつける。今回は１ページ完結
export const routes = [
    { path: '/', component: Todo },
];
