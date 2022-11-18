export interface IOrderItem{
  product_id: number,
  qty: number,
}

export interface IOrderProductItem{
  id: number,
  product_id: number,
  qty: number,
  order_id: number,
  created_at: string,
}

export interface IOrderSerialized {
  id: number,
  products?: IOrderProductItem[],
  user_id: number,
  status: boolean,
  created_at: string,

}

export interface ICreateOrderSerilaized
{
  id: number,
  product: IOrderItem,
  user_id: number,
  status: boolean,
}

export interface ICreateOrder
{
  product_id: number,
  qty:number
  user_id: number,
}
export interface IAddToOrder
{
  id: number,
  products: IOrderItem[],
  user_id: number,
  status: boolean,
}

export interface IAddOrderProduct
{
  id: number,
  product_id:number,
  user_id: number,
  qty: number,
}
export interface IOrder
{
  id?: number,
  user_id: number,
  status: boolean,
}
export interface ISerializedOrder
{
  id: number,
  user_id: number,
  status: boolean,
  created_at: string,
}