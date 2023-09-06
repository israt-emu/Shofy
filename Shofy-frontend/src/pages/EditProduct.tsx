import EditProductForm from "@/components/products/EditProductForm";
import {useGetSingleProductQuery} from "@/redux/features/products/productApi";
import {useParams} from "react-router-dom";

const EditProduct = () => {
  const {editId} = useParams();
  const {data} = useGetSingleProductQuery({id: editId});
  return (
    <div className="width-[800px] mx-auto p-2">
      <EditProductForm product={data?.data} />
    </div>
  );
};

export default EditProduct;
