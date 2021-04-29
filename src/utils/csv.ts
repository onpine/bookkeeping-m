/**
 * 将JSON数据导出CSV文件
 */
import { inCategory, payCategory } from "@/utils/Category.json";

export const exportCSV = (data: any) => {
  var csv = '';
  let header = "序号,收\/支,分类,金额,时间,备注 \n";
  csv = csv + header;
  type record = { stamp: number, type: number, category: number, amount: string, message: string, time: string };
  data.forEach((item: record, index: number, arr: Array<object>) => {
    let row = `${item.stamp},${item.type ? '支出' : '收入'},${item.type ? payCategory[item.category].name : inCategory[item.category].name},${item.amount},${item.time},${item.message}`
    csv = csv + row + ' \n';
  });
  var url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csv);
  //通过创建a标签实现
  var link = document.createElement("a");
  link.href = url;
  //对下载的文件命名
  link.download = "账单数据.csv";
  return link;
}

