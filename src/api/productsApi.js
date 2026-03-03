export async function fetchProducts() {
  const res = await fetch("/api/v1/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
