/* eslint-disable @typescript-eslint/no-unused-vars */
import {useAppDispatch} from "@/redux/hooks";
import {debounce} from "@/utils/debounce";
import {searched, setCategory, setSubCategory} from "@/redux/features/filter/filterSlice";
import {useGetProductsQuery} from "@/redux/features/products/productApi";
import {IProduct, IProductsProps} from "@/interfaces/product";
import {FaSearch} from "react-icons/fa";

const SearchFilter = ({data}: IProductsProps) => {
  const dispatch = useAppDispatch();
  const handleSearch = debounce((value: string) => {
    // Perform search logic with the searchTerm
    dispatch(searched(value));
  }, 1000);
  //for category option
  const {data: productData} = useGetProductsQuery("");
  const category: string[] = [];
  productData?.data.forEach((product: IProduct) => {
    if (!category?.includes(product?.category)) {
      category.push(product?.category);
    }
  });
  //add filtered data to redux
  const selectCategory = (value: string) => {
    dispatch(setCategory(value));
    dispatch(setSubCategory(""));
  };
  const selectSubCategory = (value: string) => {
    dispatch(setSubCategory(value));
  };
  return (
    <div className="mb-3 col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
      <div>
        <div className="flex items-center space-x-2 mt-3">
          <form>
            <label className="relative block">
              <input className="w-full bg-white placeholder:font-italitc border border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none" placeholder="Search Product" type="text" onChange={(e) => handleSearch(e.target.value)} />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaSearch />
              </span>
            </label>
          </form>
        </div>
      </div>
      <div className="space-y-3 ">
        <h1 className="text-2xl uppercase">Filter</h1>
        <div className="flex items-center justify-between mb-2">
          <select name="" id="" className="w-4/5 py-2 px-2 outline-none capitalize border border-primary" onChange={(e) => selectCategory(e.target.value)}>
            <option value="">Select Category</option>
            {category?.map((s: string, i: number) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <select name="" id="" className="w-4/5 py-2 px-2 outline-none border border-primary" onChange={(e) => selectSubCategory(e.target.value)}>
            <option value="">Select SubCategory</option>
            {data?.map((s: IProduct, i: number) => (
              <option key={i} value={s?.subCategory}>
                {s?.subCategory}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
