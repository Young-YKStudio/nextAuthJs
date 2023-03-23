import { dummyProducts } from "../../../data/dummyProducts";
import ProductCards from "@/components/store/productCards";

const DummyProducts = ({data}) => {
  console.log(data)
  return (
    <div className="pt-24 px-8 flex flex-col">
      <p className="font-bold text-2xl">Products</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-4">
        {data && data.map((item) => {
          return <ProductCards item={item} key={item.key} />
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // call API to get products
  const data = dummyProducts
  
  return {props: {data}}
}

export default DummyProducts;