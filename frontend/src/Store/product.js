//product.js
import { create } from "zustand";

// this is global state and we can use it anywhere in our
//application to access the products array and setProducts function
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price)
      return { success: false, message: "Please fill in all fields." };

    let res;
    try {
      res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    } catch (err) {
      return { success: false, message: err?.message || "Network error" };
    }

    let data;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      return { success: false, message: text || "Invalid JSON from server" };
    }
    try {
      data = await res.json();
    } catch {
      return { success: false, message: "Invalid JSON from server" };
    }

    if (!res.ok || data?.success === false) {
      return { success: false, message: data?.message || `Request failed (${res.status})` };
    }

    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product created successfully." };
  },
fetchProducts: async () => {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (data.success) {
      set({products: data.data});
    } else {
      console.error("API returned error:", data.message);
      set({products: []});
    }
  } catch (error) {
    console.error("Error fetching products:", error.message);
    set({products: []});
  }
},

deleteProduct: async (productId) => {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    
    if (!res.ok) {
      return { success: false, message: "Failed to delete product" };
    }
    
    // Remove product from local state
    set((state) => ({
      products: state.products.filter(product => product._id !== productId)
    }));
    
    return { success: true, message: "Product deleted successfully" };
  } catch (err) {
    return { success: false, message: err?.message || "Network error" };
  }
},

updateProduct: async (productId, updatedProduct) => {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    
    const data = await res.json();
    
    if (!res.ok || data?.success === false) {
      return { success: false, message: data?.message || "Failed to update product" };
    }
    
    // Update the ui immediately,without needing refresh
    set((state) => ({
      products: state.products.map(product => 
        product._id === productId ? { ...product, ...updatedProduct } : product
      )
    }));
    
    return { success: true, message: "Product updated successfully" };
  } catch (err) {
    return { success: false, message: err?.message || "Network error" };
  }
}

}));
