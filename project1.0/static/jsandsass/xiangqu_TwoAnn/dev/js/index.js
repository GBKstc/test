/**
 * Created by wjf55 on 2016/7/7.
 */
(function(){
    var isTest = false;
    var App = {
        /*productList:'/activity/tag/getProductByPageList',*/
        productList:'/activity/tag/products',
        recommendList:'/activity/tag/products',
        grant:'/activity/coupon/grant/normal',
        bindPhone:'/activity/twoAnn/getTicket ',//绑定手机
        giftBag:'/activity/twoAnn/coupon/grant',//礼包
        limit:'/activity/seconds/kill',//限时购
        puzzle:'/activity/twoAnn/getUser/tickets'//翻牌

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
            self.todayLeftTime = 0;
            self.todayLeftTimeHours = 0;
            self.limitData = [];
            if(XIANGQU.userId == ''){

             }else {
                self.userCards = userCards || [];
                self.selfUserCard = selfUserCard;
            }
            self.J_body = $('body');
            self.J_ProductList = $('#selectProductList');
            self.J_loadText = document.querySelector('#loadText');
            self.J_recommend_wrap = $('#recommendWrap');
            self.J_banner_image = document.querySelector('#bannerImage');
            self.J_load_wrap = document.querySelector('#loadWrap');
            self.myposition = $("#J_con_positioning");
            self.bodytop =$("#bannerImage");
            self.location1 = $("#J_location1");
            self.location2 = $("#J_location2");
            self.location3 = $("#J_location3");
            self.location4 = $("#J_location4");
            self.J_error_wrap = $('.J_error_wrap');
            self.loginUrl = 'http://'+window.location.host+'/login/wap/login.html';
            self.J_giftBag = $('#J_giftBag');
            self.currenttime = $('body').attr('data-time');
            self.J_date_ul = $('.J_date_ul');
            self.J_date_li = $('.J_date_li');
            self.J_show_img = $('.J_show_img');
            self.J_show_img_wrap = $('#J_show_img_wrap');
            self.J_show_img_wrap_post = $('.J_show_img_wrap_post');

            self.J_choicenessList = $('#J_choicenessList');

            self.J_blockPuzzle = $('#J_blockPuzzle');
            self.J_blockPuzzleQ = $('#J_blockPuzzleQ');
            self.J_blockPuzzleNum = $('#J_blockPuzzleNum');
            self.J_blockPuzzleShare = $('#J_blockPuzzleShare');
            self.J_blockPuzzleApp = $('#J_blockPuzzleApp');
            self.J_shareOpacity = $('#J_shareOpacity');
            self.J_shareOpacityA = $('#J_shareOpacityA');

            //商品定位
            if(self.J_blockPuzzleShare.length>0){
                self.storage = window.localStorage;
            }else{

            }
            //
            self.J_noticeDiv = $('#J_noticeDiv');
            //抢购倒计时
            setInterval(function(){
                self.countdown();
            },1000);
            self.hours = 0;
            //绑定手机
            self.SMSTimer = null;
            self.J_detail = $('body');
            self.J_bindPhoneBox = self.J_detail.find('.J_bindPhoneBox');

            self.initBanner();
            self.initUA();
            self.initProductAjax();
            self.eventHanding();
            /*self.initFlyTop();*/

            self.blockPuzzleShare();
                self.myyposition(self.myposition);
            self.ChoicenessListAjax();
            self.blockPuzzle();
            self.GiftBag();


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
            //抢购商品初始化
            self.countdownstatus();
            //翻牌轮播
            self.AutoScrollCon();
            //轮播
            self.date_tab_change();
            LR();
            /*//绑定手机模块
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
        initProductAjax:function(){
            var self = this;
            self.isOver=false;
            self.tags = 91;
            self.activityId = 94;
            if(self.J_blockPuzzleShare.length>0){
                if(self.storage.sNum!==""&&self.storage.sNum!==null&&self.storage.sNum!==undefined){
                    self.productAjax(parseInt(self.storage.sNum));
                }else{
                    self.productAjax(1);
                }
            }else{
                self.productAjax(1);
            }


        },
        recommendAjax:function(){
            var self = this,_data = '';
            _data = {
                activityId: 94,
                excludedTags:'92,93,94,95',
            }
            self.midYearAjax(App.recommendList,_data,function(rs){
                self.recommendAppend(rs);
            })
        },
        recommendAppend:function(rs){
            var self = this;
            var _temp = template('J_tempRecommendList',{recommendList:rs});
            if(rs){
                self.J_recommend_wrap.append(_temp);
                self.initRecommendMsg();
                self.bingo = 1;
            }

        },
        initRecommendMsg:function(){
            var self = this;
            self.J_slide_msg_wrap = $('.J_slide_msg_wrap');
            for(var i = 0,j=self.J_slide_msg_wrap.length;i<j;i++){
                self.J_slide_msg_wrap.eq(i).append(self.J_slide_msg_wrap.eq(i).attr('data-msg'));
            }
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
            location.href=_link;

        },
        initUA:function(){
            var self = this,
                ua = window.navigator.userAgent.toLocaleLowerCase();
            if(ua.indexOf('xiangqu')>-1){
                self.isApp = true;
            }
            else{
                self.isH5 = true;
                if(ua.indexOf('micromessenger')>-1){
                    self.isWeix = true;
                }
            }
        },
        productAjaxScroll:function(){
            var self = this;
            $(window).bind('scroll',function(){
                var bot = 570;
                if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
                    self.recommendAjax();
                    $(window).unbind('scroll');
                }
            })
        },
        productAjax:function(num){
            var self = this,data= '';
            self.J_loadText.style.display = 'block';
            if(!self.isOver){
                self.isOver = true;
                data = {
                    activityId: self.activityId,
                    tags:num+92+"",
                    shuffle:true,
                }
                self.midYearAjax(App.productList,data,function(rs){
                    if(!rs){
                        self.J_loadText.style.display = 'none';
                        self.recommendAjax();
                        return false;
                    }
                    var productList = rs;
                        self.J_choicenessList.find("li").removeClass('span_border');
                    if(num==1){
                        self.J_choicenessList.find("li").eq(0).addClass('span_border');
                    }else if(num==0){
                        self.J_choicenessList.find("li").eq(1).addClass('span_border');
                    }else{
                        self.J_choicenessList.find("li").eq(num).addClass('span_border');
                    }
                    self.productAppend(self.J_ProductList,productList[0].products,function(){
                        self.isOver = false;
                        self.J_loadText.style.display = 'none';
                    });
                    if(self.bingo === 0){
                        self.productAjaxScroll();
                    }
                    onlazyImg();
                    if(self.J_blockPuzzleShare.length>0){
                        self.commodityPosition();
                    }else{

                    }

                },function(){
                    self.J_loadText.style.display = 'none';

                })
            }
        },
        productAppend:function(Object,rs,callback){
            var self = this,
                _html = '';
                for(var i = 0,j=rs.length;i<j;i++){
                _html +='<li> ' +
                    '<div class="link-wrap"> ' +
                    '<a class="J_product_link" data-id="'+rs[i].productId+'"> ' +
                    '<img data-src="'+rs[i].imgUrl+'"alt=""/>' +
                    '</a> ' +
                    '</div> ' +
                    '<div class="msg-wrap"> ' +
                    '<p class="name">'+rs[i].title+'</p> ';
                        if(!rs[i].originalPrice || rs[i].price==rs[i].originalPrice){
                            rs[i].originalPrice = Math.floor(rs[i].price*1.25);
                        }
                    _html+='<p class="price">￥'+rs[i].price+'<span class="origin-price">原价:<span>'+rs[i].originalPrice+'</span></span></p>' +
                    /*'<p class="price">￥'+rs[i].price+'</p>' +*/
                    '</div> ';
                _html += '<div class="rotate">折扣</div>';
                _html += '</li>';
            }
            Object.html(_html);
            if(callback){
                callback();
            }

        },
        midYearAjax:function(_url,_data,callback,completeback){
            var self = this;
            $.ajax({
                url:_url,
                type:'post',
                data:_data,
                dataType:'json',
                success:function(data){
                    if(data.code == 200){
                        if(callback){
                            callback(data.data);
                        }
                    }
                    else if(data.code == 700){
                        self.error_init(data.msg);
                    }
                    else{
                        alert(data.msg);
                    }
                },
                complete:function(){
                    if(completeback){
                        completeback();
                    }
                }
            })
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
        scrollAnimate:function(h,t){
            clearInterval(scroll);
            var count = 100,
                time = t,
                scroll_height = '',
                count_time ='',
                count_height='',
                i=0;
            if(h == 'last'){
                scroll_height = document.body.scrollHeight-document.body.scrollTop;
            }else{
                scroll_height = h-document.body.scrollTop;
            }
            count_time = time /count;
            count_height = scroll_height/count;
            if(count_height>0&&count_height<1){
                count_height=1;
            }
            var scroll = setInterval(function(){
                if(Math.abs(h-document.body.scrollTop)<Math.max(10,Math.abs(scroll_height/50))){
                    document.body.scrollTop = h;
                    clearInterval(scroll);
                }else{
                    document.body.scrollTop += count_height;
                    i++;
                }
                if(i>200){
                    clearInterval(scroll);
                }
            },count_time);

        },
        initFlyTop:function(){
            var self = this;
            self.J_fly_top = $('#flyTop');
            self.J_fly_top.on('touchstart',function(){
                self.J_fly_top.css({opacity:'.8'});
            })
            self.J_fly_top.on('touchend',function(){
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
        myyposition:function(Obj){
            var self = this;
            Obj.on('tap','li',function() {
               /* console.log($(this)[0].value);
                console.log(self.J_body.scrollTop());*/
                if($(this)[0].value==1){
                    self.scrollAnimate((self.location1.offset().top),500);
                }else if($(this)[0].value==2){
                    self.scrollAnimate((self.location2.offset().top+5),500);
                }else if($(this)[0].value==3){
                    if(self.bingo==0) {
                        self.bingo = 1;
                        var scroll = setTimeout(function () {
                            self.scrollAnimate((self.location3.offset().top),500);
                            clearTimeout(scroll);
                        }, 400);
                    }else{
                        self.scrollAnimate((self.location3.offset().top),500);
                    }
                }else if($(this)[0].value==4){
                    if(self.bingo==0) {
                        self.bingo = 1;
                        var scroll = setTimeout(function () {
                            self.scrollAnimate((self.location4.offset().top),500);
                            clearTimeout(scroll);
                        }, 400);
                    }else{
                        self.scrollAnimate((self.location4.offset().top),500);
                    }
                }else if($(this)[0].value==5){
                    self.scrollAnimate(0,500);
                }

            });
        },
        //翻牌
        blockPuzzle:function(){
            var self = this;
            var num = 0,numAg=0;
            self.J_blockPuzzle.on('click',function(e){
                if(XIANGQU.userId == ''){
                    self.login();
                    return false;
                }else{
                    self.blockPuzzleAjax(App.bindPhone,"",function(rs){
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
                                        }
                                    }
                                }
                                num =num+1;
                                if(numAg==1){
                                    alert("你翻到了重复的"+num+"号牌！");
                                }else if(numAg==0){
                                    alert("恭喜你翻到了"+num+"号牌！");
                                }
                                self.J_blockPuzzle.find('a').eq(1).css('display','block');
                                self.J_blockPuzzle.find('a').eq(0).css('display','none');
                                self.J_blockPuzzleNum.find('li').eq(rs.data).addClass("li-opacity");
                                self.J_blockPuzzle.off('click');
                                alert("请将此页面分享给你的好友，即可让好友帮你一起翻牌哟~");
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
                    self.blockPuzzleAjax(App.bindPhone,"",function(rs){
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
                                self.J_blockPuzzle.find('a').eq(1)/*.attr('href','/activity/view/page/147?toUserId='+XIANGQU.userId)*/.css('display','block');
                                self.J_blockPuzzle.find('a').eq(0).css('display','none');
                                self.J_blockPuzzleNum.find('li').eq(rs.data).addClass("li-opacity");
                                self.J_blockPuzzle.off('click');
                                alert("请将此页面分享给你的好友，即可让好友帮你一起翻牌哟~");
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
                    self.J_blockPuzzle.find('a').eq(1).css('display','block');
                    self.J_blockPuzzle.find('a').eq(0).css('display','none');
                    self.J_blockPuzzle.off('click');
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
        blockPuzzleShare:function(){
            var self = this;
            self.J_blockPuzzleShare.on('click',function(){
                self.J_shareOpacity.css('display','block');
            });
            self.J_shareOpacity.on('click',function(){
                $(this).css('display','none');
            })
            self.J_blockPuzzleApp.on('click',function(){
                window.location.assign("xiangqu://share");
            })
        },
        //列表
        ChoicenessListAjax:function(){
            var self = this;
            self.J_choicenessList.on('click','li',function(e){
                if($(this)){
                    self.productAjax($(this).val());
                    if(self.J_blockPuzzleShare.length>0){
                        self.storage.sNum = $(this).val();
                    }else{

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
                            if(rs.code == 200){
                                self.J_shareOpacityA.css('display','block');
                                self.J_shareOpacityA.on('click',function(){
                                    self.J_shareOpacityA.css('display','none');
                                    self.myposition.find("li").eq(2).trigger('tap');
                                });
                            }else if(rs.code == 700){
                                alert(rs.msg);
                                self.myposition.find("li").eq(2).trigger('tap');
                            }else{
                                alert(rs.msg);
                            }
                        });
                    }
            })
        },
        //限时初始化
        countdownagain:function(){
            var self = this;
            var newTime = new Date();
            if(self.todayLeftTimeHours>9){
                self.todayLeftTime = self.limitData[0][0].startTime - newTime.getTime();
                self.hours=10;
                for(var i=0;i<self.J_date_li.length;i++){
                    self.J_date_li.eq(i).find('.date_time').html("还未开始");
                    self.J_show_img_wrap.find('a').eq(i).removeClass('J_product_link');
                }
            }else{
                if(newTime.getHours()<10||newTime.getHours()>=21){
                    self.todayLeftTime = self.limitData[0][0].startTime - newTime.getTime();
                    self.J_show_img_wrap.find('a').eq(0).addClass('J_product_link').removeClass('limitClose');
                    self.J_show_img_wrap.find('a').eq(1).addClass('J_product_link').removeClass('limitClose');
                    self.J_show_img_wrap.find('a').eq(2).addClass('J_product_link').removeClass('limitClose');
                    self.J_date_li.eq(0).find('.date_time').html("10:00");
                    self.J_date_li.eq(1).find('.date_time').html("13:00");
                    self.J_date_li.eq(2).find('.date_time').html("16:00");
                    self.hours=10;
                }else if(10<=newTime.getHours()&&newTime.getHours()<13){
                    self.todayLeftTime = self.limitData[1][0].startTime - newTime.getTime();
                    self.hours=13;
                    self.J_date_li.eq(1).trigger('click');
                    if(11<=newTime.getHours()&&newTime.getHours()<13){
                        self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                        self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                    }
                }else if(13<=newTime.getHours()&&newTime.getHours()<16){
                    self.todayLeftTime = self.limitData[2][0].startTime - newTime.getTime();
                    self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                    self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                    self.hours=16;
                    self.J_date_li.eq(2).trigger('click');
                    if(14<=newTime.getHours()&&newTime.getHours()<16){
                        self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                        self.J_show_img_wrap.find('a').eq(1).removeClass('J_product_link').addClass('limitClose');
                        self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                        self.J_date_li.eq(1).find('.date_time').html("秒杀结束");
                    }
                }else if(16<=newTime.getHours()&&newTime.getHours()<19){
                    self.todayLeftTime = self.limitData[3][0].startTime - newTime.getTime();
                    self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                    self.J_show_img_wrap.find('a').eq(1).removeClass('J_product_link').addClass('limitClose');
                    self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                    self.J_date_li.eq(1).find('.date_time').html("秒杀结束");
                    self.hours=19;
                    self.J_date_li.eq(3).trigger('click');
                    if(17<=newTime.getHours()&&newTime.getHours()<19){
                        self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                        self.J_show_img_wrap.find('a').eq(1).removeClass('J_product_link').addClass('limitClose');
                        self.J_show_img_wrap.find('a').eq(2).removeClass('J_product_link').addClass('limitClose');
                        self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                        self.J_date_li.eq(1).find('.date_time').html("秒杀结束");
                        self.J_date_li.eq(2).find('.date_time').html("秒杀结束");
                    }
                }else if(19<=newTime.getHours()&&newTime.getHours()<21){
                    self.todayLeftTime = self.limitData[4][0].startTime - newTime.getTime();
                    self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                    self.J_show_img_wrap.find('a').eq(1).removeClass('J_product_link').addClass('limitClose');
                    self.J_show_img_wrap.find('a').eq(2).removeClass('J_product_link').addClass('limitClose');
                    self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                    self.J_date_li.eq(1).find('.date_time').html("秒杀结束");
                    self.J_date_li.eq(2).find('.date_time').html("秒杀结束");
                    self.hours=21;
                    self.J_date_li.eq(4).trigger('click');
                    if(20<=newTime.getHours()&&newTime.getHours()<21){
                        self.J_show_img_wrap.find('a').eq(0).removeClass('J_product_link').addClass('limitClose');
                        self.J_show_img_wrap.find('a').eq(1).removeClass('J_product_link').addClass('limitClose');
                        self.J_show_img_wrap.find('a').eq(2).removeClass('J_product_link').addClass('limitClose');
                        self.J_show_img_wrap.find('a').eq(3).removeClass('J_product_link').addClass('limitClose');
                        self.J_date_li.eq(0).find('.date_time').html("秒杀结束");
                        self.J_date_li.eq(1).find('.date_time').html("秒杀结束");
                        self.J_date_li.eq(2).find('.date_time').html("秒杀结束");
                        self.J_date_li.eq(3).find('.date_time').html("秒杀结束");
                    }
                }
            }
            if(self.todayLeftTime<0){
                self.todayLeftTime = 0;
            }
            for(var i=0;i<self.limitData.length;i++){
                if(self.limitData[i][0].image==""||self.limitData[i][0].image==null){
                    self.J_show_img_wrap.children('a').eq(i).data("id",self.limitData[i][0].productId);
                }else{
                    self.J_show_img_wrap.children('a').eq(i).data("id",self.limitData[i][0].productId).children('img').attr('src',self.limitData[i][0].image);
                }
                if(self.limitData[i][0].subtitle==""||self.limitData[i][0].subtitle==null){
                    self.J_date_li.children('.date_product').eq(i).html("想去");
                }else{
                    self.J_date_li.children('.date_product').eq(i).html(self.limitData[i][0].subtitle);
                }
            }
        },
        countdownstatus:function(){
            var self = this;
            var t1 = 0;
            var newTime = new Date();
            self.blockPuzzleAjax(App.limit,"",function(rs){
                if(rs){
                    if(rs.code == 200){
                        if(rs.data){
                            self.limitData = rs.data;
                            t1 = self.limitData[0][0].startTime - newTime.getTime();
                            self.todayLeftTimeHours = Math.floor(t1 / 1000 / 60 / 60) > 9 ? Math.floor(t1 / 1000 / 60 / 60) : '0' + Math.floor(t1 / 1000 / 60 / 60);
                            self.countdown();
                            self.countdownagain();
                        }
                    }else{
                        alert(rs.msg);
                    }
                }
            });
        },
        //限时倒计时
        countdown:function () {
            var self = this;
            var countHours = 0,
                countMinutes = 0,
                countSeconds = 0;
            self.todayLeftTime -= 1000;
            var t1 = self.todayLeftTime;
            if (t1 > 0) {
                countHours = Math.floor(t1 / 1000 / 60 / 60) > 9 ? Math.floor(t1 / 1000 / 60 / 60) : '0' + Math.floor(t1 / 1000 / 60 / 60);
                t1 -= Math.floor(t1 / 1000 / 60 / 60) * 3600 * 1000;
                countMinutes = Math.floor(t1 / 1000 / 60) > 9 ? Math.floor(t1 / 1000 / 60) : '0' + Math.floor(t1 / 1000 / 60);
                t1 -= Math.floor(t1 / 1000 / 60) * 60 * 1000;
                countSeconds = Math.floor(t1 / 1000) > 9 ? Math.floor(t1 / 1000) : '0' + Math.floor(t1 / 1000);
                $('#J_seckill_time_com').html('距离<span>'+self.hours+'</span>点开场&nbsp;还有<span class="seckill-time-clock">'+countHours+'</span><b>:</b><span class="seckill-time-clock">'+countMinutes+'</span><b>:</b></><span class="seckill-time-clock">'+countSeconds+'</span>');
                self.todayLeftTimeHours = countHours;

            }else{
                self.countdownagain();
            }

        },
        //商品定位
        commodityPosition:function(){
            var self = this;
            document.body.scrollTop = self.storage.sTop;
            self.J_body.on('touchend',function(){
                if (!self.storage.getItem("sTop")) {
                    self.storage.setItem("sTop",0);
                }
                self.storage.sTop = $(window).scrollTop();//保存距离顶部的数值
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
        //翻牌轮播
        AutoScrollCon:function(){
            var self = this;
            self.blockPuzzleAjax(App.puzzle,"{page: 0,size:'10',}",function(rs){
                if(rs){
                    if(rs.code == 200){
                        _html = '';
                        for(var i = 0,j=rs.data.length;i<j;i++){
                            _html +='<li class="clear">'+
                                '<img src="'+rs.data[i].avatarPath+'" alt=""/>'+
                                '<p class="notice-div-con"  target="_blank"><span>'+rs.data[i].nick+'</span>翻你牌子啦</p>'+
                            '<p class="notice-div-date">'+rs.data[i].createdAtStr+'</p>'+
                            '</li>';
                        }
                        if(rs.data.length==0){
                            self.J_noticeDiv.css('display','none');
                        }
                        self.J_noticeDiv.find("ul").eq(0).html(_html);
                        if(rs.data.length>3){
                            setInterval(function(){
                                self.AutoScroll(self.J_noticeDiv);
                            }, 3000);
                        }
                    }else{
                        alert(rs.msg);
                    }
                }
            });
        },
        AutoScroll:function(obj){
            var self = this;
            /*obj.find("ul").eq(0).css({marginTop: "-0.5rem"});*/
            obj.find("ul").eq(0).addClass('J_animation');
            var t = setTimeout(function(){
                obj.find("ul").eq(0).css({
                    marginTop: "0"
                }).removeClass('J_animation').find("li").eq(0).appendTo(obj.find("ul").eq(0));
                clearTimeout(t);
            },2500);
        },
        //轮播
        date_img_table_left:function(){
            var self = this;
            var _i = self.data_tab_change_nth();
            self.J_date_li.removeClass('current');
            self.J_show_img.removeClass('show_img');
            if(_i > 3){
                self.J_date_li.eq(0).addClass('current');
                self.J_show_img.eq(0).addClass('show_img');
            }
            else{
                self.J_date_li.eq(_i+1).addClass('current');
                self.J_show_img.eq(_i+1).addClass('show_img');
            }
        },
        date_img_table_right:function(){
            var self = this;
            var _i = self.data_tab_change_nth();
            self.J_date_li.removeClass('current');
            self.J_show_img.removeClass('show_img');
            if(_i < 1){
                self.J_date_li.eq(4).addClass('current');
                self.J_show_img.eq(4).addClass('show_img');
            }
            else{
                self.J_date_li.eq(_i-1).addClass('current');
                self.J_show_img.eq(_i-1).addClass('show_img');
            }
        },
        date_tab_change:function(){
            var self = this;
            self.J_date_li.on('click',function(){
                var _i = self.data_tab_change_nth();
                var _n_i = $(this).index();
                self.J_date_li.removeClass('current');
                self.J_show_img.removeClass('show_img');
                self.J_date_li.eq(_i).removeClass('current');
                self.J_show_img.eq(_i).removeClass('show_img');
                $(this).addClass('current');
                self.J_show_img.eq(_n_i).addClass('show_img');
                if(_i > _n_i){
                }
                if(_i < _n_i){
                }
            });
        },
        data_tab_change_nth:function(){
            var self = this;
            var i=0;
            for(var _i =0;_i<self.J_date_li.length;_i++){
                if(self.J_date_li.eq(_i).hasClass('current')){
                    i=_i;
                }
            }
            return i;
        },
    }
    $(function(){
        new FastClick(document.body);
        MidYear.init();
    })
    function LR(){
        var start_X;
        var end_X;
        var start_Y;
        var end_Y;
        mousedown = false;
        function eventDown(e){
            e.preventDefault();
            mousedown = true;
            if(e.changedTouches){
                e = e.changedTouches[e.changedTouches.length-1];
            }
            start_X = e.pageX;
            end_X = e.pageX;
            start_Y = e.pageY;
            end_Y = e.pageY;
        }
        function eventUp(e){
            e.preventDefault();
            if(end_X - start_X > 50){
                MidYear.date_img_table_right();
            }
            if(start_X - end_X > 50){
                MidYear.date_img_table_left();
            }
            mousedown = false;
        }
        function eventMove(e){
            e.preventDefault();
            if(mousedown) {
                if(e.changedTouches){
                    e = e.changedTouches[e.changedTouches.length-1];
                }
                end_X = e.pageX;
                end_Y = e.pageY;
                $(window).scrollTop($(window).scrollTop()+start_Y - end_Y);
            }
        }
        var wrap = document.getElementById('J_show_img_wrap');
        wrap.addEventListener('touchstart', eventDown);
        wrap.addEventListener('touchend', eventUp);
        wrap.addEventListener('touchmove', eventMove);
    }
})(Zepto);