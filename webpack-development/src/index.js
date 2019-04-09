import _ from 'lodash';
/* import { cube } from './math.js';
import './style.css';


// process.env.NODE_ENV 环境变量关联 NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量
// 通常用于决定在开发环境与生产环境(dev-vs-prod)下，server tools(服务期工具)、build scripts(构建脚本) 和 client-side libraries(客户端库) 的行为
if (process.env.NODE_ENV != 'production') {
    console.log('Looks like we are in development mode!');
}


function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
}
document.body.appendChild(component()); */


/* ******************动态导入 懒加载 *************************  */
// async function getComponent() {
function component() {
    // import() 会返回一个 promise, 因此它可以和 async 函数一起使用 需要使用像 Babel 这样的预处理器

    // return import(/* webapckChunkName "lodash" */ 'lodash').then(({ default: _ }) => {
    //     var element = document.createElement('div');
    //     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    //     return element;
    // }).catch(error => 'An error occurred while loading the component');

    // 使用 async
    var element = document.createElement('div');
    // const { default: _ } = await import('lodash');
    var button = document.createElement('button');
    var br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);
    // 请注意，由于涉及网络请求，因此需要在生产级别站点/应用程序中显示某些加载指示。
    button.onclick = e => import(/* webpackChunkName */'./print').then(moudle =>{
        var print =  moudle.default;
        print();
    })

    return element;
}

/* getComponent().then(component => {
    document.body.appendChild(component);
}) */

document.body.appendChild(component());


