---
title: "heapSort"
pubDate: 2016-07-18

tags: []
---
## 算法: 堆排序

* 堆分析
  堆排序适合于求"前K大问题" 海量输出中找出前几大数据
      堆排序->二叉树模型
          父节点
           (3)
          /   \
         /     \
       (2)     (1)
      左孩子    右孩子
  堆排序两种情况
  大根堆：父节点要比左右孩子都大
  小根堆：父节点要比左右孩子都小
  堆排序需要做两件事：
  第一：构建大根堆
                    (3)
                   /   \
                  /     \
                (2)    (1)
               /   \
              /     \
            (4)     (5)
  上面的树是一个无序堆，构建大根堆步骤如下：
  第一步：首先找到堆中的2个父节点（2,3）;
  第二步：比较2这个父节点的两个孩子(4,5)，发现5大
  第三步：将较大的右孩子(5)跟父节点(2)进行交换，至此3的左孩子对构建完成，
  如下所示
                    (3)
                   /   \
                  /     \
                (5)     (1)
               /   \
              /     \
             (4)    (2)
  第四步：比较第二个父节点(3)下面的左右孩子(5,1),发现左孩子5大
  第五步：然后父节点（3）与左孩子（5）进行交换，注意，交换后，堆可能会遭到破坏，
  按照以上步骤一，步骤二，步骤三进行重新构造堆。

  最后构造的堆如下
                     (5)
                    /   \
                   /     \
                 (4)     (1)
                /   \
               /     \
             (3)     (2)

  第二：输出大根堆
  至此，我们把大根堆构造出来了，那怎么输出呢？我们做大根堆的目的就是要找出最大值，
  那么我们将堆顶（5）与堆尾（2）进行交换，然后将（5）剔除根堆，由于堆顶现在是（2），
  所以破坏了根堆，必须重新构造，构造完之后又会出现最大值，再次交换和剔除，最后也就
  是要的效果

* 构建堆heapAdjust
  @param list     数组(待排序集合)
  @param parent   父节点
  @param lenght   输出根堆时剔除最大值使用 

```javascript
function heapAdjust(list, parent, length) {
    //temp 保存当前父节点
    var temp = list[parent];
    //得到左孩子（二叉树定义）
    var child = 2 * parent + 1;
    while (child < length) {
        //如果parent有右孩子，则判断左孩子是否小于右孩子
        if (child + 1 < length && list[child] < list[child + 1]) {
            child++;
        }
        //如果父节点大于子节点，就不用交换
        if (temp >= list[child]) {
            break;
        }
        //将较大子节点的值赋给父节点
        list[parent] = list[child];
        //然后将子节点作为父节点，防止是否破坏根堆时重新构造
        parent = child;
        //找到该父节点较小的左孩子节点
        child = 2 * parent + 1;
    }
    //最后将temp值赋给较大的子节点，以形成两值交换
    list[parent] = temp;
}
```

* 堆排序heapSort
  
@param list 待排序数组
@param top  前K大

```javascript
function heapSort(list, top) {
    //需要输出的集合
    var topNode = [];
    //list.length/2-1 为堆中父节点个数
    for (var i = list.length / 2 - 1; i >= 0; i--) {
        heapAdjust(list, i, list.length);
    }
    //最后输出堆元素
    for (var i = list.length - 1; i >= list.length - top ; i--) {
        //堆顶与当前堆得第一个元素进行值对调
        var temp = list[0];
        list[0] = list[i];
        list[i] = temp;

        //最大值添加到输出集合
        topNode.push(temp);
        //因为顺序被打乱，重新构造堆
        heapAdjust(list, 0, i);
    }
    return topNode;
}
```

* 调用
  
```javascript
//获取一个随机数组
function getDatalist() {
    var listarr = [];
    for (var j = 0; j < 20000; j++) {
        listarr[j] = Math.ceil(Math.random() * 20000);
    }
    return listarr;
}
// 调用
//var list = getDatalist();
//var toplist = heapSort(list, 10);
var list1 = [50, 20, 80, 60, 75, 33, 25, 85, 66, 55];
var toplist1 = heapSort(list1, 3);
```