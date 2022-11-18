export interface IProduct{
  name: string,
  price: number,
}

export interface IProductSerialized {
  id: number,
  name: string,
  price: number,
  created_at: string,
}