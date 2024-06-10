import Image from "next/image";
import CategoryList from "../components/ProductList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="text-lg font-extrabold text-center text-4xl	pt-10">VIP-объявления</div>
      <CategoryList />
    </div>
  );
}