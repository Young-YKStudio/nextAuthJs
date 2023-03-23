import { MdAddShoppingCart } from 'react-icons/md'

const RdxAddToCartButton = ({item, qty}) => {

  const ATCbutton = (item, qty) => {
    console.log(item, qty)
  }

  return (
    <button
      onClick={() => ATCbutton(item, qty)}
      className="w-full bg-indigo-900 py-3 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
    >
      <MdAddShoppingCart className='w-5 h-5 mr-2'/> Add to cart
    </button>
  );
}
export default RdxAddToCartButton;