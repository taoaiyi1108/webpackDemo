import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';

import printMe from './print';

import { cube } from './math';

function component() {
    var element = document.createElement("div");
    var btn = document.createElement("button");
    var pre = document.createElement('pre');

    // lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], '');
    element.classList.add('hello');

    // 将图像添加到我们已经存在的 div 中。
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    btn.innerHTML = "点击这里，然后查看 console!";
    btn.onclick = printMe;
    element.appendChild(btn);

    pre.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    element.appendChild(pre);

    console.log(Data);


    return element;
}

// document.body.appendChild(component());
let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);

// 模块热替换
if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
        document.body.appendChild(element);
    })
}