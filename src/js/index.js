import '@/style/index.scss';
import onLayout from '@/layout/index';

const test =require('@/js/test');

const components = []; //组件
onLayout(function ($wrap) {

    components.map((el) => {


        el($wrap, {});

    })

});