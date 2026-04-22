---
title: "quickSort"
pubDate: 2016-07-18

tags:
  - 算法
  - 排序
---
# 算法: 快速排序
* 快排分割
@param list  数组
@param left  数组第一个元素的下标
@param right 数据最后一个元素的下标
```javascript
function division(list, left, right) {
    //首先选择一个基准元素
    var basenum = list[left];
    while (left < right) {
       //从数组的右端开始向前找，一直找到比base小的数字为止(包括base同等数)
       while (left < right && list[right] >= basenum) {
           right = right - 1;
        }
        //最终找到了比baseNum小的元素，要做的事情就是此元素放到base的位置
        list[left] = list[right];

        //从数组的左端开始向后找，一直找到比base大的数字为止（包括base同等数）
        while (left < right && list[left] <= basenum) {
            left = left + 1;
        }
        //最终找到了比baseNum大的元素，要做的事情就是将此元素放到最后的位置
        list[right] = list[left];
        //最后就是把baseNum放到该left的位置
        list[left] = basenum;
        //最终，我们发现left位置的左侧数值部分比left小，left位置右侧数值比left大
        //至此，我们完成了第一篇排序
        return left;
    }
}
```
* 调用
  @param list  数组
  @param left  数组第一个元素的下标
  @param right 数据最后一个元素的下标
```javascript
function quickSort(list, left, right) {
    //左下标一定小于右下标，否则就超越了
    if (left < right) {
        //对数组进行分割，取出下次分割的基准标号
        var i = division(list, left, right)
        //对“基准标号“左侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(list, left, i - 1);
        //对“基准标号“右侧的一组数值进行递归的切割，以至于将这些数值完整的排序
        quickSort(list, i + 1, right);
    }
}
var array = [20, 40, 50, 10, 60];
quickSort(array, 0, array.length - 1);
```
* 算法分析
  数组：
  [20,40,50,10,60]

  第一步：
    首先我们从数组的left位置取出该数（20）作为基准（base为20）参照物。

  第二步：
    从数组的right位置向前找，一直找到比（base）小的数，

    如果找到，将此数赋给left位置（也就是将10赋给20），

    此时数组为：10，40，50，10，60，

    left和right指针（下标）分别为前后的10。

  第三步：
    从数组的left位置向后找，一直找到比（base为20）大的数，

    如果找到，将此数赋给right的位置（也就是40赋给10），

    此时数组为：10，40，50，40，60，

    left和right指针分别为前后的40。

  第四步：
    重复“第二,第三“步骤，直到left和right指针（下标）重合，

    最后将（base）插入到40的位置，

    此时数组值为： 10，20，50，40，60，至此完成一次排序。

  第五步：
    此时20已经潜入到数组的内部，20的左侧一组数都比20小，20的右侧作为一组数都比20大，

    以20为切入点对左右两边数按照"第一，第二，第三，第四"步骤进行，最终快排大功告成。

* 复杂度
  平均复杂度： O(n*logn)
  最坏复杂度： 0(n^2)