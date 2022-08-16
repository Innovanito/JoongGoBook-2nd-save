Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    var d = this;
    var h;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
        case "yyyy":
          return d.getFullYear();
        case "yy":
          return (d.getFullYear() % 1000).zf(2);
        case "MM":
          return (d.getMonth() + 1).zf(2);
        case "dd":
          return d.getDate().zf(2);
        case "E":
          return weekName[d.getDay()];
        case "HH":
          return d.getHours().zf(2);
        case "hh":
          return ((h = d.getHours() % 12) ? h : 12).zf(2);
        case "mm":
          return d.getMinutes().zf(2);
        case "ss":
          return d.getSeconds().zf(2);
        case "a/p":
          return d.getHours() < 12 ? "오전" : "오후";
        default:
          return $1;
      }
    });
  };

  String.prototype.string = function (len) {
    var s = "",
      i = 0;
    while (i++ < len) {
      s += this;
    }
    return s;
  };
  String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
  };
  Number.prototype.zf = function (len) {
    return this.toString().zf(len);
  };

  let timeEx = '2022-08-15T07:20:53.727Z'


  let today = new Date();
// console.log(today.format("yyyy.MM.dd a/p hh:mm:ss"));


// This is code written by SolomonKim

let ex = '2017-02-12T09:15:00Z'

let ex2 = ex.split('T')

let todayTime = ex2[1].split(':')

let date = ex[0]
let hours = todayTime[0]
let minutes = todayTime[1]

console.log(ex2);
console.log(hours);
console.log(minutes);




