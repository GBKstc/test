/**
 * Created by wjf55 on 2016/7/7.
 */
(function(){
    var isTest = false;
    var App = {
        bindPhone:'/activity/twoAnn/getTicket ',//绑定手机
        giftBag:'/activity/twoAnn/coupon/grant',//礼包
    }
    /*var APP = {
        bindPhoneIsPic:isTest ? '/_resources/testdata/phoneCheck.json' :'/phone/verifyPhoneBeforBind',//是否要显示图片验证码
        sendSms:isTest?'/_resources/testdata/sendSms.json':'/ouer/sendsms',
        bindPhone:'/ouer/user/bindPhone2'//绑定手机
    };*/
    var MidYear = {
        init:function(){
            var self = this;
            self.bingo = 0;
            self.blockPuzzleNum = 0;
            self.J_body = $('body');
            if(XIANGQU.userId == ''){

            }else {
                self.userCards = userCards || [];
                /*self.userCards = self.J_body.attr('data-userCards'));*/
                self.selfUserCard = selfUserCard;
            }
            self.toUser = {};


            self.J_banner_image = document.querySelector('#bannerImage');
            self.J_load_wrap = document.querySelector('#loadWrap');
            self.J_error_wrap = $('.J_error_wrap');
            self.loginUrl = 'http://'+window.location.host+'/login/wap/login.html';

            self.J_blockPuzzle = $('#J_blockPuzzle');
            self.J_blockPuzzleQ = $('#J_blockPuzzleQ');
            self.J_blockPuzzleNum = $('#J_blockPuzzleNum');

            //绑定手机
            self.SMSTimer = null;
            /* self.key = '';*/
            self.J_detail = $('body');
            self.J_bindPhoneBox = self.J_detail.find('.J_bindPhoneBox');
            self.initBanner();
            self.eventHanding();
            self.blockPuzzle();
        },
        initBanner:function(){
            var self = this,
                _src = self.J_banner_image.getAttribute('data-bannerSrc'),
                image = new Image();
            image.onload = function(){
                self.J_banner_image.setAttribute('src',_src);
                self.J_load_wrap.style.display = 'none';
            }
            image.src = _src;
        },
        eventHanding:function(){
            var self = this;
            self.J_body.on('tap','.J_product_link',function(){
                self.productlinkUrl($(this).attr('data-id'))
            })
            self.J_body.on('tap','.J_slide_banner',function(){
                location.href = $(this).attr('data-url');
            })
        /*    //绑定手机模块
            //取消绑定
            self.J_bindPhoneBox.on('tap','.J_bindCancel',function(e){
                e.preventDefault();
                self.J_bindPhoneBox.hide();
                self.clearTime();
                self.clearBindForm();
            });
            //是否显示 图片
            self.J_bindPhoneBox.on('blur','.J_phoneNum',function(){
                var _str = $(this).val();
                var that = this;
                if(!_str){
                    $(this).attr('placeholder','请填写手机号码');
                    return false;
                }
                if(!self.checkPhone(_str)){
                    alert('手机号码不正确');
                    $(this).focus();
                    return false;
                }else{
                    var data = {
                        phone:_str,
                        verifyFrom:'BIND_PHONE',
                        t: self.returnTime()
                    };
                    self.getIsPicCode(data,function(rs){
                        if(rs.code != 200){
                            alert(rs.msg);
                            return false;
                        }

                        if(rs.data && rs.data.isShowPicCode){
                            var ele = $(that).closest('ul').find('.J_picCodeBox');
                            ele.attr('data-isshowpiccode',1);
                            var _data = {
                                uniqueKey:'',
                                verifyFrom:'BIND_PHONE'
                            };
                            self.updatePicCode(ele,_data);
                        }
                        /!*self.key = rs.data.key;*!/

                    });
                }
            });
            //刷新图片验证码
            self.J_bindPhoneBox.on('click','.J_codeNumBtn',function(e){
                e.preventDefault();
                var _data = {
                    uniqueKey:'',
                    verifyFrom:'BIND_PHONE'
                };
                var ele = $(this).closest('ul').find('.J_picCodeBox');
                console.log("J_codeNumBtn");
                self.updatePicCode(ele,_data);

            });
            //获取手机验证码
            self.J_bindPhoneBox.on('click','.J_phoneCode',function(e){
                e.preventDefault();
                var _val = self.J_bindPhoneBox.find('.J_phoneNum').val();
                var _that = this,
                    url = APP.sendSms;
                if($(_that).attr('data-isable') != 1){
                    return false;
                }
                if(!_val || !self.checkPhone(_val)){
                    self.J_bindPhoneBox.find('.J_phoneNum').attr('placeholder','请填写正确的手机号码').focus();
                    return false;
                }
                /!*if(!self.key){
                 console.log(self.key);
                 return false;
                 }*!/
                var data = {};
                if(self.J_bindPhoneBox.find('.J_picCodeBox').attr('data-isshowpiccode') == 1){
                    var _data = {
                        uniqueKey:'',
                        verifyFrom:'BIND_PHONE'
                    };
                    var ele = $(_that).closest('ul').find('.J_picCodeBox');
                    data = {
                        phone:_val,
                        type:'BIND_PHONE',
                        imgCode:(function(){
                            var _imgCode = $(_that).closest('ul').find('.J_codeNum');
                            if(!self.trim(_imgCode.val())){
                                _imgCode.attr('placeholder','请输入图片验证码').focus();
                                console.log('imgCode');
                                self.updatePicCode(ele,_data);

                            }
                            console.log(_imgCode.val());
                            /!*return self.trim(_imgCode.val());*!/
                            return _imgCode.val();
                        })(),
                        t:self.returnTime(),
                        userId:XIANGQU.userId,
                    };
                }else{
                    data = {
                        phone:_val,
                        type:'BIND_PHONE',
                        imgCode:(function(){
                            return '';
                        })(),
                        /!*sign:(function(){
                         var _str = _val + 'BIND_PHONE'/!* + self.key*!/;
                         return $.md5(_str);
                         })(),*!/
                        t:self.returnTime(),
                        userId:XIANGQU.userId,
                    };
                }
                /!*url = url+'?type=BIND_PHONE'+'&phone='+_val+'&imgCode='+data.imgCode;*!/
                if(self.J_bindPhoneBox.find('.J_picCodeBox').attr('data-isshowpiccode') == 1){
                    if(!data.imgCode){
                        self.updatePicCode(ele,_data);
                        return false;
                    }
                }

                self.getPhoneCode(url,data,function(rs){
                    if(rs.code == 400){
                        alert(rs.msg);

                    }else if(rs.code == 200){
                        $(_that).attr('data-isable',0);
                        if(rs.data.isShowPicCode){
                            self.J_bindPhoneBox.find('.J_picCodeBox').show();
                        }else{
                            self.J_bindPhoneBox.find('.J_picCodeBox').removeAttr('data-isshowpiccode').hide();
                        }
                        self.sendSMSsuccess(_that,120);
                        return false;
                    }else if(rs.code == 401){
                        location.href = '/login.html?redirectUrl=' + encodeURI(location.href);
                    }else{
                        /!*alert(rs.msg);
                         console.log("5000");
                         self.updatePicCode(ele,_data);*!/
                    }
                });
            });
            //确定绑定
            self.J_bindPhoneBox.on('click','.J_bindPhoneSure',function(e){
                e.preventDefault();
                self.sureBindPhone();
            });*/
        },
        productlinkUrl:function(id){
            var self = this,_link = '';
            if(self.isApp){
                //_link='xiangqu://'+location.host+'/product/detail?id='+id+'&isApp=1&spm=midyear';
                _link = 'http://www.xiangqu.com/product/detail?id='+id+'&isApp=1&spm=16.09.22';
                if(window.navigator.userAgent.toLocaleLowerCase().indexOf('android') >-1){
                    _link='xiangqu://'+location.host+'/product/detail?id='+id+'&isApp=1&spm=16.09.22';
                }
            }
            else{
                _link='/product/detail?id='+id+'&spm=16.09.22';
            }
            window.location.href=_link;

        },
        login:function(){
            var self=this;
            if (self.loginUrl != '') {
                //有登录接口
                if( self.loginUrl.indexOf('http://') >= 0 ){
                    location.href = self.loginUrl + '?redirectUrl='+location.href;
                }else{
                    location.href = self.loginUrl;
                }
            } else {
                self.error_init('请重新登录～');
            }
        },
        error_init:function(_msg){
            var self = this;
            self.J_error_wrap.find('.J_error_div').empty().append(_msg);
            self.J_error_wrap.css({display:'block'});
            //self.J_MB2.css({display:'block'});
            var timeout = setInterval(function(){
                self.J_error_wrap.css({display:'none'});
                self.J_error_wrap.find('.J_error_div').empty();
                //self.J_MB2.css({display:'none'});
                clearInterval(timeout);
            },1000);

        },
        initFlyTop:function(){
            var self = this;
            self.J_fly_top = $('#flyTop');
            self.J_body.on('touchstart',function(){
                self.J_fly_top.css({opacity:'.8'});
            })
            self.J_body.on('touchend',function(){
                self.J_fly_top.css({opacity:'1'});

            })
            self.J_fly_top.on('tap',function(){
                self.scrollAnimate(0,1000);

            })
            $(window).bind('scroll',function(){
                if($(window).scrollTop()>$(window).height()){
                    self.J_fly_top.css({display:'block'});
                }
                else{
                    self.J_fly_top.css({display:'none'});
                }

            });

        },
        getToUser:function(){
            var self = this;
            var name,value;
            var str = location.href;
            var num = str.indexOf("?");
            str = str.substr(num+1);
            var arr = str.split("&");
            for(var i=0;i<arr.length;i++){
                num = arr[i].indexOf("=");
                if(num>0){
                    name = arr[i].substring(0,num);
                    value = arr[i].substr(num+1);
                    self.toUser[name] = value;
                }
            }
            /*console.log(self.toUser.toUserId);*/
        },
        /*getToUserU:function(){
            self.getToUser();
            if(self.toUser!==""||self.toUser!==null){
                if(self.toUser == XIANGQU.userId){
                    alert("请将此页面分享给你的好友，即可让好友帮你一起翻牌哟~");
                }
            }
        }*/
        blockPuzzle:function(){
            var self = this;
            var num = 0,numAg=0;
            self.J_blockPuzzle.find('a').eq(0).on('click',function(e){
                if(XIANGQU.userId == ''){
                    self.login();
                    return false;
                }else{
                    self.getToUser();
                    self.blockPuzzleAjax(App.bindPhone,self.toUser,function(rs){
                        if(rs){
                            /*if(rs.code == 4001){
                             alert(rs.msg);
                             e.preventDefault();
                             self.J_bindPhoneBox.show();
                             }else */
                            if(rs.code == 200){
                                num = rs.data-0;
                                if(self.userCards){
                                    for(var i=0;i<self.userCards.length;i++){
                                        if(self.userCards[i] == num){
                                            numAg = 1;
                                            /*alert("你翻到了重复的"+num+"号牌！");*/
                                        }
                                    }
                                }
                                num =num+1;
                                if(numAg==1){
                                    alert("你翻到了重复的"+num+"号牌！");
                                }else if(numAg==0){
                                    alert("恭喜你翻到了"+num+"号牌！");
                                }
                                /*self.J_blockPuzzle.find('a').eq(1)/!*.attr('href','/activity/view/page/147?toUserId='+XIANGQU.userId)*!/.css('display','block');*/
                                /*self.J_blockPuzzle.find('a').eq(0).css('display','none');*/
                                self.J_blockPuzzleNum.find('li').eq(rs.data).addClass("li-opacity");
                                self.J_blockPuzzle.off('click');
                                alert("请将此页面分享给你的好友，即可让好友帮你一起翻牌哟~");
                            }else if(rs.code == 3000){
                                alert(rs.msg);
                                /*self.J_blockPuzzle.find('a').eq(1).css('display','block');*/
                                /*self.J_blockPuzzle.find('a').eq(0).css('display','none');*/
                                self.J_blockPuzzle.off('click');
                            }else{
                                alert(rs.msg);
                            }
                        }
                    });
                }
            })
            self.J_blockPuzzleQ.on('click',function(e){
                if(XIANGQU.userId == ''){
                    self.login();
                    return false;
                }else{
                    self.getToUser();
                    self.blockPuzzleAjax(App.bindPhone,self.toUser,function(rs){
                        if(rs){
                            if(rs.code == 200){
                                num = rs.data-0;
                                if(self.userCards){
                                    for(var i=0;i<self.userCards.length;i++){
                                        if(self.userCards[i] == num){
                                            numAg = 1;
                                        }
                                    }
                                }
                                num =num+1;
                                if(numAg==1){
                                    alert("你翻到了重复的"+num+"号牌！");
                                }else if(numAg==0){
                                    alert("恭喜你翻到了"+num+"号牌！");
                                }
                               /* self.J_blockPuzzle.find('a').eq(1)/!*.attr('href','/activity/view/page/147?toUserId='+XIANGQU.userId)*!/.css('display','block');*/
                                /*self.J_blockPuzzle.find('a').eq(0).css('display','none');*/
                                self.J_blockPuzzleNum.find('li').eq(rs.data).addClass("li-opacity");
                                self.J_blockPuzzle.off('click');
                                alert("请将此页面分享给你的好友，即可让好友帮你一起翻牌哟~");
                            }else if(rs.code == 3000){
                                alert(rs.msg);
                                /*self.J_blockPuzzle.find('a').eq(1).css('display','block');*/
                                /*self.J_blockPuzzle.find('a').eq(0).css('display','none');*/
                                self.J_blockPuzzle.off('click');
                            }else{
                                alert(rs.msg);
                            }
                        }
                    });
                }
            })
            if(self.userCards){
                for(var i=0;i<self.userCards.length;i++){
                    self.J_blockPuzzleNum.find('li').eq(self.userCards[i]).addClass("li-opacity");
                }
                if(self.selfUserCard){
                    /*self.J_blockPuzzle.find('a').eq(1).css('display','block');
                    self.J_blockPuzzle.find('a').eq(0).css('display','none');*/
                    /*self.J_blockPuzzle.find('a').eq(0).off('click');*/
                }
            }
        },
        blockPuzzleAjax:function(_url,_data,callback,completeback){
            var self = this;
            $.ajax({
                url:_url,
                type:'post',
                data:_data,
                dataType:'json',
                success:function(data){
                    if(callback){
                        callback(data);
                    }
                },
                complete:function(){
                    if(completeback){
                        completeback();
                    }
                }
            })
        },
        GiftBag:function(){
            var self = this;
            self.J_giftBag.on("click",function(e){
                if(XIANGQU.userId == ''){
                    self.login();
                    return false;
                }else{
                    self.blockPuzzleAjax(App.giftBag,'94',function(rs){
                        if(rs){
                            alert(rs.msg);
                        }
                    });
                }
            })
        },

        /*//手机绑定
        returnTime:function(){
            var self = this;
            var _t = new Date();
            return _t.getTime();
        },
        trim:function(str) {

            return str.replace(/(^\s*)|(\s*$)/g,'');
        },
        checkPhone:function(str){
            var self = this;
            var re = /^1[3|4|5|7|8]\d{9}$/g;
            return re.test(str)?true:false;
        },
        getIsPicCode:function(data,cb){
            var self = this;
            $.ajax({
                url:APP.bindPhoneIsPic,
                data:data,
                dataType:'json',
                success:function(rs){
                    if(!rs){
                        alert('服务器异常请刷新页面再试');
                        return false;
                    }

                    if(cb){
                        cb(rs);
                    }
                },
                error:function(req,tst,err){
                    alert('系统正在维护中...');
                }
            });
        },
        updatePicCode:function(ele,option){
            var self = this;
            //var HOST = window.location.host.indexOf('xiangqutest') > -1?"http://www.xiangqutest.com" :'http://www.xiangqu.com';
            var _picUrl =  '/common/getVerifyCode';
            var _url = '';
            if(option){
                _url = _picUrl + '?uniqueKey='+ option.uniqueKey  +'&verifyFrom=' + option.verifyFrom;
            }else{
                _url = _picUrl + '?uniqueKey=&verifyFrom=';
            }
            var t = (new Date()).getTime();
            ele.find('.J_codeNumBtn img').attr('src',_url + '&t=' + t);
            ele.show();
            ele.find('J_codeNum').val('');

        },
        getPhoneCode:function(url,data,callBack){
            //获取手机验证码
            var isSending = false;
            $.ajax({
                url:url,
                type:'post',
                data:data,
                dataType:'json',
                timeout:50000,
                beforeSend:function(){
                    isSending = true;
                },
                complete:function(){
                    isSending = false;
                },
                success:function(rs){

                    if(callBack){
                        callBack(rs);
                    }
                },
                error:function(req,tst,err){
                    alert('系统正在维护中...');
                }
            });
        },
        sendSMSsuccess:function(ele,time){
            var self = this;
            ele = $(ele);
            var waitTime = time,
                oldBtnText = ele.html(),
                TIMESTR = '重新获取';
            ele.html(waitTime + 's');
            ele.addClass('checked');
            intervalSMS();
            function intervalSMS(){
                var start = waitTime;
                self.SMSTimer = setInterval(function(){
                    start --;
                    ele.html(start + 's');
                    if(start == 0){
                        ele.attr('data-isable',1);
                        clearInterval(self.SMSTimer);
                        ele.html(TIMESTR);
                        ele.removeClass('checked');
                    }
                },1000);
            }
        },
        sureBindPhone:function(){
            var self = this;
            var _data = {
                phone:self.J_bindPhoneBox.find('.J_phoneNum').val(),
                phoneCode:self.J_bindPhoneBox.find('.J_imgCode').val(),
                t:self.returnTime(),
                userId:XIANGQU.userId,
                verifyFrom:'BIND_PHONE',
                imgCode:self.J_bindPhoneBox.find('.J_imgCode').val(),

            };

            if(!_data.phone || !self.checkPhone(_data.phone)){
                self.J_bindPhoneBox.find('.J_phoneNum').attr('placeholder','请填写正确的手机号码').focus();
                return false;
            }
            if(!_data.phoneCode){
                self.J_bindPhoneBox.find('.J_imgCode').focus();
                return false;
            }
            $.ajax({
                url:APP.bindPhone,
                type:'post',
                data:_data,
                dataType:'json',
                success:function(rs){
                    if(!rs){
                        alert('服务器异常请刷新页面再试');
                        return false;
                    }
                    if(rs && rs.code != 200){
                        alert(rs.msg);
                        return false;
                    }
                    window.location.reload();
                },
                error:function(req,tst,err){
                    alert('系统正在维护中...');
                }
            });

        },
        clearTime:function(){
            var self =this;
            if(self.SMSTimer){
                clearInterval(self.SMSTimer);
                self.J_bindPhoneBox.find('.J_phoneCode').html('获取验证码').attr('data-isable',1).removeClass('checked');

            }
        },
        clearBindForm:function(){
            var self = this;
            self.J_bindPhoneBox.find('.J_phoneNum').val('');
            self.J_bindPhoneBox.find('.J_imgCode').val('');
            self.J_bindPhoneBox.find('.J_codeNum').val('');
            self.J_bindPhoneBox.find('.J_picCodeBox').removeAttr('data-isshowpiccode').hide().find('.J_codeNum').val();
        },*/
    }
    $(function(){
        new FastClick(document.body);
        MidYear.init();
    })
})(Zepto);