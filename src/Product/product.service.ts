import {FilterQuery, UpdateQuery, QueryOptions} from "mongoose";
import ProductModel, { ProductInput } from "./product.model";

export async function createProduct(input: ProductInput) {
  return ProductModel.create(input);
}

export async function findProduct(
  query: FilterQuery<ProductInput>,
  options: QueryOptions = {lean:true}
  ) {
  return ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductInput>,
  update: UpdateQuery<ProductInput>,
  options: QueryOptions
  ) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductInput>) {
  return ProductModel.deleteOne(query);
}