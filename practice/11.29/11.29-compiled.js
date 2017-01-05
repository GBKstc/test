/**
 * Created by ouer on 2016/11/29.
 */
(function ($) {
    var Upload = {
        init: function () {
            var self = this;
            self.J_refund_box = $('.J_refund_box');
            self.J_pre_img_wrap = $('.J_pre_img_wrap');
            self.J_pre_show_wrap = $('.J_pre_show_wrap');
            self.J_c_num = self.J_pre_show_wrap.find('.J_c_num');
            self.J_a_num = self.J_pre_show_wrap.find('.J_a_num');
            self.J_fileToUpload = $('.fileToUpload');
            self.J_s_img_wrap = $('.J_a_li_wrap');
            self.Fileform = $('#fileform');
            self.Uploadframe = $('#Uploadframe');
            self.J_error_wrap = $('.J_error_wrap');
            self.eventHanding();
        },
        eventHanding: function () {
            var self = this;
            self.J_refund_box.on('tap', '.J_s_img', function () {
                self.preBigImg($(this).attr('src'));
            });
            self.J_pre_img_wrap.on('tap', function () {
                self.J_pre_show_wrap.css({ display: 'none' });
            });
            self.J_pre_show_wrap.on('tap', '.J_del_pre_img', function () {
                self.delPreImg();
            });

            self.J_refund_box.on('change', '.fileToUpload', function () {
                var _data = {
                    url: '/image_uploadfy?from=other',
                    tar: 'Uploadframe'
                },
                    maxSize = 5 * 1024 * 1204,
                    file = this.files[0],
                    reader = new FileReader();
                //console.log(file);
                reader.onload = function () {
                    //console.log(this);
                    var result = this.result;
                    var img = new Image();
                    img.src = result;
                    if (result.length < maxSize) {
                        self.UploadFrameShow(_data);
                    } else {
                        var data = self.compressImg(img);
                        //console.log(data);
                        self.error_init('亲，图片太大了！');
                    }
                };
                reader.readAsDataURL(file);
            });
            self.eventLR();
        },
        compressImg: function (img) {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            var data = canvas.toDataURL('image/jpeg', 0.2); //data url的形式
            return data;
        },
        UploadFrameShow: function (rs) {
            var self = this;
            $('body').append('<iframe style="display:none;" Id="' + rs.tar + '" name="' + rs.tar + '"></iframe>');
            self.Fileform.attr('action', rs.url);
            self.Fileform.attr('target', rs.tar);
            self.Fileform.submit();

            if (window.frames[rs.tar].document.getElementsByTagName('body')[0].innerHTML) {
                //console.log(1);
            }
            var FormTT = setInterval(function () {
                if (!window.frames[rs.tar].document.getElementsByTagName('body')[0].innerHTML) {
                    return false;
                } else {
                    var obj = eval('(' + window.frames[rs.tar].document.getElementsByTagName('body')[0].innerHTML + ')');
                    self.fileWork(obj.imageUrl);
                    $('.fileToUpload').val('');
                    $('#' + rs.tar).remove();
                    clearInterval(FormTT);
                }
            }, 100);
        },
        fileWork: function (_src) {
            var self = this;
            var _html = '';
            _html = '<li> ' + '<div class="pic-s-wrap"> ' + '<img class="J_s_img" src="' + _src + '" alt=""/> ' + '</div> ' + '</li>';
            self.J_s_img_wrap.append(_html);
            self.signChooseStatus();
        },
        signChooseStatus: function () {
            var self = this;
            $('.J_sign_choose').css({ display: 'none' });
            if (self.J_s_img_wrap.find('li').length < 3) {
                $('.J_sign_choose').css({ display: 'block' });
            }
            if (self.J_s_img_wrap.find('li').length > 0) {
                $('.J_sign_choose').removeClass('no-margin-left');
            }
            if (self.J_s_img_wrap.find('li').length == 0) {
                $('.J_sign_choose').addClass('no-margin-left');
            }
        },
        delPreImg: function () {
            var self = this;
            //console.log(self.J_a_num.html());
            //console.log(self.J_c_num.html());
            self.J_pre_Big_li = self.J_pre_img_wrap.find('li');
            if (self.J_a_num.html() == 1) {
                self.J_s_img_wrap.find('li').eq(0).remove();
                self.J_pre_show_wrap.css({ display: 'none' });
                self.signChooseStatus();
                return false;
            }
            if (self.J_c_num.html() < self.J_a_num.html()) {
                self.J_pre_Big_li.removeClass('current left-show left-hide right-show right-hide');
                self.J_pre_Big_li.eq(self.J_c_num.html() - 1).remove();
                self.J_pre_Big_li.eq(self.J_c_num.html()).addClass('current');
                self.J_s_img_wrap.find('li').eq(self.J_c_num.html() - 1).remove();
                self.J_a_num.html(self.J_a_num.html() - 1);
                self.J_c_num.html(self.J_c_num.html());
                self.signChooseStatus();
                return false;
            }
            if (self.J_a_num.html() == self.J_c_num.html()) {
                self.J_pre_Big_li.removeClass('current left-show left-hide right-show right-hide');
                self.J_pre_Big_li.eq(self.J_c_num.html() - 1).remove();
                self.J_pre_Big_li.eq(0).addClass('current');
                self.J_s_img_wrap.find('li').eq(self.J_c_num.html() - 1).remove();
                self.J_a_num.html(self.J_a_num.html() - 1);
                self.J_c_num.html(1);
                self.signChooseStatus();
                return false;
            }
        },
        preBigImg: function (current) {
            var self = this;
            var _cur_i,
                list_src = [];
            self.J_s_img = self.J_refund_box.find('.J_s_img');
            for (var i = 0, j = self.J_s_img.length; i < j; i++) {
                list_src.push(self.J_s_img.eq(i).attr('src'));
                if (current == self.J_s_img.eq(i).attr('src')) {
                    _cur_i = i;
                }
            }
            self.preBigImgShow(_cur_i, list_src);
        },
        preBigImgShow: function (_i, _list) {
            var self = this;
            var _html = '';
            for (var i = 0; i < _list.length; i++) {
                _html += '' + '<li ' + (_i == i ? 'class="current"' : '') + '> ' + '<img src="' + _list[i] + '" alt=""/>' + ' </li>';
            }
            self.J_c_num.html(_i + 1);
            self.J_a_num.html(_list.length);
            self.J_pre_img_wrap.empty().append(_html);
            self.J_pre_show_wrap.css({ display: 'block' });
        },
        preBigImgLeft: function () {
            var self = this;
            self.J_pre_Big_li = self.J_pre_img_wrap.find('li');
            var _eq = self.getCurrentStyle(self.J_pre_Big_li, 'current');
            if (_eq == 0) {
                return false;
            }
            self.J_pre_Big_li.removeClass('current left-show left-hide right-show right-hide');
            self.J_pre_Big_li.eq(_eq).addClass('right-hide');
            self.J_pre_Big_li.eq(_eq - 1).addClass('right-show current');
            self.picNumInit(_eq, self.J_pre_Big_li.length);
        },
        preBigImgRight: function () {
            var self = this;
            self.J_pre_Big_li = self.J_pre_img_wrap.find('li');
            var _eq = self.getCurrentStyle(self.J_pre_Big_li, 'current');
            if (_eq == self.J_pre_Big_li.length - 1) {
                return false;
            }
            self.J_pre_Big_li.removeClass('current left-show left-hide right-show right-hide');
            self.J_pre_Big_li.eq(_eq).addClass('left-hide');
            self.J_pre_Big_li.eq(_eq + 1).addClass('left-show current');
            self.picNumInit(_eq + 2, self.J_pre_Big_li.length);
        },
        eventLR: function () {
            var self = this;
            var start_X;
            var end_X;
            var start_Y;
            var end_Y;
            mousedown = false;

            function eventDown(e) {
                e.preventDefault();
                mousedown = true;
                if (e.changedTouches) {
                    e = e.changedTouches[e.changedTouches.length - 1];
                }
                start_X = e.pageX;
                end_X = e.pageX;
                start_Y = e.pageY;
                end_Y = e.pageY;
            }
            function eventUp(e) {
                e.preventDefault();
                if (end_X - start_X > 100) {
                    self.preBigImgLeft();
                }
                if (start_X - end_X > 100) {
                    self.preBigImgRight();
                }
                if ((end_X - start_X) * -1 < 150) {
                    if (end_Y > start_Y) {
                        //self.scrollTop($(window).scrollTop()+start_Y - end_Y,200);
                        //$(window).scrollTop($(window).scrollTop()+start_Y - end_Y);
                    }
                    if (end_Y < start_Y) {
                        //$(window).scrollTop($(window).scrollTop()+start_Y - end_Y);
                        //self.scrollTop($(window).scrollTop()+start_Y - end_Y,200);
                    }
                }

                mousedown = false;
            }
            function eventMove(e) {
                e.preventDefault();
                if (mousedown) {
                    if (e.changedTouches) {
                        e = e.changedTouches[e.changedTouches.length - 1];
                    }
                    end_X = e.pageX;
                    end_Y = e.pageY;
                    if (end_Y > start_Y) {
                        //self.scrollTop($(window).scrollTop()+start_Y - end_Y,200);
                        //$(window).scrollTop($(window).scrollTop()+start_Y - end_Y);
                    }
                    if (end_Y < start_Y) {
                        //$(window).scrollTop($(window).scrollTop()+start_Y - end_Y);
                        //self.scrollTop($(window).scrollTop()+start_Y - end_Y,200);
                    }
                }
            }

            var wrap = document.getElementsByClassName('J_pre_img_wrap')[0];
            wrap.addEventListener('touchstart', eventDown);
            wrap.addEventListener('touchend', eventUp);
            wrap.addEventListener('touchmove', eventMove);
        },
        error_init: function (_msg) {
            var self = this;
            self.J_error_wrap.html(_msg).css({ display: 'block' });
            var timeout = setInterval(function () {
                self.J_error_wrap.html('').css({ display: 'none' });
                clearInterval(timeout);
            }, 1500);
        },
        picNumInit: function (c_num, a_num) {
            var self = this;
            //console.log(c_num)
            self.J_c_num.html(c_num);
            self.J_a_num.html(a_num);
        },
        getCurrentStyle: function (ele, _style) {
            var self = this;
            var _eq = -1;
            $.each(ele, function (index, item) {
                if (ele.eq(index).hasClass(_style)) {
                    _eq = index;
                }
            });
            return _eq;
        }
    };
    $(function () {
        Upload.init();
    });
})(Zepto);

//# sourceMappingURL=11.29-compiled.js.map