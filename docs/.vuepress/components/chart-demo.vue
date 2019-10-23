<template>
    <div id="box">
        <canvas id="chart">
        </canvas>
    </div>
</template>

<script>
class MineChart{
    constructor(el,options){
        if(!document.createElement('canvas').getContext){
            console.log('您的浏览器不支持canvas')
            return
        };
        this.state = {
            dom : el,
            context : el.getContext('2d'),
            options:{
                marginRate : 0.1,          //外边距
                textRate:0.1,               // y坐标 level值所占的宽度
                contentRate : {
                    x:0.9,
                    y:0.75
                } // 坐标系
            },
            timer:''
        };

        this.state.options.y = options.y
        this.init();
    }

    init(){
        // 初始化坐标面板及参数
        this.bindEvent();
        if(document.createEvent) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("resize", true, true);
            window.dispatchEvent(event);
        } else if(document.createEventObject) {
            window.fireEvent("onresize");
        }
        // 处理数据
        document.getElementById('chart').style.display = 'block'
        // 绘画图像
        // this.draw();
    }

    bindEvent(){
        var state = this.state,
            el = state.dom;
        window.onresize = ()=>{
            const P_Width =  el.parentElement.clientWidth;
            this.state.dom.onmousemove = null; //移除鼠标事件，防止渲染中的画面被保存
            // 存储canvas宽高。
            state.width = parseInt(P_Width);
            state.dom.setAttribute('width',state.width)
            if(P_Width > 800){
                state.dom.setAttribute('height',400)
                state.height = 400;
            }else{
                state.dom.setAttribute('height',P_Width*0.5)
                state.height = parseInt(P_Width*0.5);
            };
            state.dom.style.transform = 'scale(1,-1)';  //反转坐标系
            state.Origin_x = parseInt(state.width*(state.options.marginRate+state.options.textRate));// 设置坐标原点x坐标
            state.Origin_y = parseInt(state.height*state.options.marginRate);// 设置坐标原点y坐标
            state.Origin_width = parseInt(state.width*state.options.contentRate.x);// 设置坐标盘宽度
            state.Origin_height = parseInt(state.height*state.options.contentRate.y);// 设置坐标盘高度
            this.state.maxVal = Math.ceil(this.utils().max(this.state.options.y)/800)*800; //获取数组中y的最大值
            this.state.options.process_y = this.utils().formData(this.state,this.state.options.y);//格式化坐标数据
            window.clearTimeout(this.state.timer);
            this.state.index = 0;
            this.drawGrid();
            this.draw();
        };
    }

    mouseMove(){
        var that = this,
            context = this.state.context;
        this.state.imageData = this.state.context.getImageData(0,0,this.state.width,this.state.height);

        this.state.dom.onmousemove = this.saveImageData.bind(this);
    }
    // 每次移动都恢复之前的画面
    saveImageData(e){
        var box = this.state.dom.getBoundingClientRect();
        var context = this.state.context;
        var x = parseInt(e.clientX - box.left) - this.state.Origin_x;
        var y = this.state.height - parseInt(e.clientY - box.top) - this.state.Origin_y;
        if(x<0 || x > this.state.Origin_width - this.state.Origin_x  || y<0 || y > this.state.Origin_height){
            context.putImageData(this.state.imageData,0,0);
            return false;
        }else{
            context.putImageData(this.state.imageData,0,0);
            context.save();
            context.lineWidth = .5;
            context.strokeStyle = '#666666';
            context.beginPath();
            var now_pos = (x/this.state.x_step).toFixed(0);
            if(now_pos > this.state.options.process_y.length -1 ){ //
                return false;
            }
            
            context.fillStyle = 'rgba(0,0,0,.5)';
            context.fillRect(parseInt(e.clientX - box.left) + 20,y+20,90,30);
            context.font = '10pt Arial';
            context.fillStyle = 'rgb(255,255,255)';
            var text_content = this.state.options.process_y[now_pos].x +'/'+ this.state.options.y[now_pos];
            var t_w = context.measureText(text_content).width;
            context.scale(1, -1);
            context.fillText(text_content,parseInt(e.clientX - box.left) + 40,-(y+30));
            context.setTransform(1, 0, 0, 1, 0, 0);

            context.moveTo(this.state.options.process_y[now_pos].x+0.5,this.state.Origin_y);
            context.lineTo(this.state.options.process_y[now_pos].x+0.5,this.state.Origin_y+this.state.Origin_height);
            context.stroke();
            context.restore();
        }
    }

    utils(){
        return{
            max:function(ary){
                if(ary.length == 0){
                    throw '数据错误'
                }
                var max = ary[0];
                for(var i = 1;i<ary.length;i++){
                    max < ary[i+1]?max= ary[i+1]:null;
                }
                return max;
            },
            formData:function(state,ary){
                let new_ary = [];
                state.x_step = (state.Origin_width-state.Origin_x)/ary.length;
                for(let i =0; i<ary.length;i++){
                    var item = {};
                    item.x = parseInt(state.x_step*i + state.Origin_x);
                    item.y = parseInt((ary[i]/state.maxVal).toFixed(2)*state.Origin_height + state.Origin_y);
                    new_ary.push(item);
                }
                return new_ary;
            }
        };
    }

    drawGrid(){
        const state = this.state,
              context = state.context;
        const stepVal = state.maxVal/8;
        state.y_step = parseInt((state.Origin_height/800)*100);
        let num_W = '',
            grap = '';
        context.strokeStyle = '#666666';
        context.lineWidth = 0.5;
        context.fillStyle = '#666666';
        var rate = state.dom.parentElement.clientWidth/800;
        if(rate > 1 ){
            context.font = '11pt Arial';
            grap = 50;
        }else{
            context.font = 11*rate +'pt Arial';
            grap = 50*rate;
        };
        for(var j=0; j<9; j++){
            // 绘画网格线
            context.beginPath();
            if(j===0){
                context.moveTo(state.Origin_x,state.Origin_y+state.y_step*j-0.5);
                context.lineTo(state.Origin_width,state.Origin_y+state.y_step*j-0.5);
                context.stroke();
                //横坐标的切割
            }else{
                this.drawDashedLine(
                    context,
                    state.Origin_x,
                    state.Origin_y+state.y_step*j-0.5,
                    state.Origin_width,
                    state.Origin_y+state.y_step*j-0.5,
                    3);
            }
            // 文本level
            context.save();
            context.scale(1, -1);
            num_W = context.measureText(stepVal*j).width;
            context.fillText(stepVal*j+' gps',state.Origin_x-num_W-grap,-(state.Origin_y+state.y_step*j-2.5));
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.restore();
        }
    }

    drawDashedLine(context,x0,y0,x1,y1,line_width){
        line_width = line_width === undefined ? 5 :line_width;
        var d_x = x1-x0;
        var d_y = y1-y0;
        var line_num = Math.floor(Math.sqrt(d_x * d_x + d_y * d_y) / line_width);
        for(var i =0 ; i<line_num;++i){
            context[i%2===0?'moveTo':'lineTo']
            (x0+(d_x/line_num)*i,y0+(d_y/line_num)*i);
        }
        context.stroke();
    }


    draw(){
        var state = this.state;
        var context = this.state.context;
        context.save();
        context.fillStyle = 'red';
        var point= state.options.process_y;
        context.lineWidth = 1;
        context.strokeStyle = '#de8666';
        // for(var i = 0; i<point.length;i++){
        //     context.fillRect(point[i].x, point[i].y, 3, 3);
        // }
        this.pointer();
    }

    getCtrlPoint(ps,i,a,b){
        if(!a||!b){a=0.2;b=0.2;}//处理两种极端情形
        if(i < 1){
            var pAx=ps[0].x+(ps[1].x-ps[0].x)*a;
            var pAy=ps[0].y+(ps[1].y-ps[0].y)*a;
        }else{
            var pAx=ps[i].x+(ps[i+1].x-ps[i-1].x)*a;
            var pAy=ps[i].y+(ps[i+1].y-ps[i-1].y)*a;
        }
        if(i > ps.length-3){
            var last=ps.length-1;
            var pBx=ps[last].x-(ps[last].x-ps[last-1].x)*b;
            var pBy=ps[last].y-(ps[last].y-ps[last-1].y)*b;
        }else{
            var pBx=ps[i+1].x-(ps[i+2].x-ps[i].x)*b;
            var pBy=ps[i+1].y-(ps[i+2].y-ps[i].y)*b;
        }
        return {pA:{x:pAx,y:pAy},pB:{x:pBx,y:pBy}}
    }

    handler(){
        var that = this,
            state = this.state,
            point= state.options.process_y;
        return new Promise((resolve,reject)=>{
            state.timer = window.setTimeout(()=>{
                if(this.state.index > this.state.options.process_y.length-2){
                    reject();
                    return false;
                }else{
                    this.state.index++;
                    resolve();
                }
                state.context.beginPath();
                state.context.moveTo(point[state.index-1].x,point[state.index-1].y);
                var ctrlP = that.getCtrlPoint(point,state.index-1);
                state.context.bezierCurveTo(ctrlP.pA.x,ctrlP.pA.y,ctrlP.pB.x,ctrlP.pB.y,point[state.index].x,point[state.index].y);
                state.context.stroke();
                window.clearTimeout(state.timer);
            },1*state.index)
        }); 
    }

    pointer(){
        this.handler().then(
            ()=>{ //继续
                this.pointer();
            },
            ()=>{ //停止
                this.mouseMove();
                console.log('绘制完成')
            }
        )
    };
};

export default {
    data(){
        return{
            chart:''
        }
    },
    mounted(){
        var dom = document.getElementById('chart');
        var options = {
            x:[1,2,3,4,5,6,7],
            y:[60.12,123,123,1064,800,790,300,740,350,650,190,420,340,250,450,240,320,200,100,132,454,621,500,132,454,121],
        };
        this.chart = new MineChart(dom,options);
    }
}
</script>


<style lang="stylus">
#box
    margin: 0 auto
    width: 100%
    text-align: center
#chart
    margin: 0
    display: none
    
</style>