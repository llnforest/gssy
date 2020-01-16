var initialData = {
  num:0
}
Page({
  data: initialData,
  onLoad() {},
  plusOne(e){
    this.data.num ++;
    this.setData({
      num:this.data.num
    })
  }
});
