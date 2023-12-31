import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	fetchAllProducts,
	fetchProductByFilters,
	fetchBrands,
	fetchCategories,
	fetchProductById,
} from "./ProductAPI";

const initialState = {
	products: [],
	brands: [],
	categories: [],
	status: "idle",
	totalItems: 0,
	selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
	"product/fetchAllProducts",
	async () => {
		const response = await fetchAllProducts();
		return response.data;
	}
);

export const fetchProductByIdAsync = createAsyncThunk(
	"product/fetchProductById",
	async (id) => {
		const response = await fetchProductById(id);
		return response.data;
	}
);

export const fetchProductByFiltersAsync = createAsyncThunk(
	"product/fetchProductByFilters",
	async ({ filter, sort, pagination }) => {
		const response = await fetchProductByFilters(filter, sort, pagination);
		return response.data;
	}
);

export const fetchCategoriesAsync = createAsyncThunk(
	"product/fetchCategories",
	async () => {
		const response = await fetchCategories();
		return response.data;
	}
);

export const fetchBrandsAsync = createAsyncThunk(
	"product/fetchBrands",
	async () => {
		const response = await fetchBrands();
		return response.data;
	}
);

export const ProductSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProductsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.products = action.payload;
			})
			.addCase(fetchProductByFiltersAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductByFiltersAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.products = action.payload.products;
				state.totalItems = action.payload.totalItems;
			})
			.addCase(fetchBrandsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.brands = action.payload;
			})
			.addCase(fetchCategoriesAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.categories = action.payload;
			})
			.addCase(fetchProductByIdAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.selectedProduct = action.payload;
			});
	},
});

export const { increment } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;

export default ProductSlice.reducer;
