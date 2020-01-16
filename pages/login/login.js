Page({
  data: {
    active:false,
    sec:60,
    focusPhone:true,
    focusCode:false

  },
  onLoad() {},
  getCode(){
    console.log(1);
    this.myShowToast('验证码短信已成功发送');
    this.setData({
      active:true
    });
    let _that = this;
    let timer = setInterval(function(){
      _that.data.sec --;
     
      if(_that.data.sec == 0){
        clearInterval(timer);
        _that.setData({
          data:60,
          active:false
        })
      }else{
        _that.setData({
          sec:_that.data.sec
        })
      }
    },1000)
  },
  focusInput(e){//聚焦
    if(e.target.dataset.type == 1 && !this.data.focusPhone){
      this.setData({focusPhone:true});
    }else if(e.target.dataset.type == 2 && !this.data.focusCode){
      this.setData({focusCode:true});
    }
  },
  blurInput(e){//失去焦点
    if(e.target.dataset.type == 1){
      this.setData({focusPhone:false});
    }else if(e.target.dataset.type == 2){
      this.setData({focusCode:false});
    }
  },
  formSubmit(e){
    
    console.log(e.detail.value);
    if(e.detail.value.phone == ''){
      this.myShowToast('请填写手机号码',1);
      return false;
    }
    if(e.detail.value.code == ''){
      this.myShowToast('请填写验证码',2);
      return false;
    } 
    my.request({
      url:'https://www.sjshou.cn/admin/test/login',
      method:'POST',
      data:e.detail.value,
      dataType:'json',
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log('fail');
      },
      complete:function(res){
        console.log('complete');
      },
    })
  },
  onGetAuthorize(e){
    console.log(e);
    my.getPhoneNumber({
      success: (res) => {
          let encryptedData = res.response
          console.log(encryptedData);
      },
      fail: (res) => {
          console.log(res)
          console.log('getPhoneNumber_fail')
      },
    });
  },
  myShowToast(content,type=0){
    my.showToast({
        content:content,
        duration:3000
    });
    if(type == 1){
      this.setData({focusPhone:true})
    }else if(type == 2){
      this.setData({focusCode:true})
    }
    
  }
});
