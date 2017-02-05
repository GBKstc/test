/**
 * Created by Administrator on 2017/2/5.
 */
(function(){
    var index = {
        init:function(){
            var self = this;
            self.J_click = $('.J_click');
            self.myClick();
        },
        myClick:function(){
            var self = this;
            self.J_click.on('click','li', function (e) {
                console.log(e);
            })

        }
    }

    $(function(){
        index.init();
    })
})(Zepto);
