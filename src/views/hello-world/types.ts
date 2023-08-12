// 颜色对象
interface IColor {
  normalColor: string;
  hoverColor: string;
}

// 按钮项
interface IBtnItem {
  icon: string;
  text: string;
  bgColor: string;
}

// 按钮数组
type IBtnGroup = Array<IBtnItem>;

// 导出对象解构
export interface IAttr {
  imgUrl: string;
  descList: string[];
  buttonText: IBtnGroup;
  iconColor: IColor;
  borderWidth: number;
}
