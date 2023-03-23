import { useRouter } from 'next/router'
import RdxAddToCartButton from "../../../redux/cart/AddCartButton";

const ProductCards = ({item, key}) => {

  const router = useRouter()

  const navigateTo = (id) => {
    console.log(id)
    router.push(`/products/${id}`)
  }

  return (
    <section 
      key={key}
      className='w-full h-72 flex flex-col gap-2 text-indigo-900'
    >
      <div 
        style={{backgroundImage: `url("${item.imagePath}")`}} 
        className="bg-center bg-cover rounded-md w-full h-5/6 hover:bg-black/30 bg-blend-multiply hover:cursor-pointer"
        onClick={() => navigateTo(item.id)}
      />
      <div className="h-1/6">
        <h3 className="text-sm font-bold">{item.name}</h3>
        <p className='text-xs'>$ {item.price}</p>
      </div>
    </section>
  );
}

export default ProductCards;