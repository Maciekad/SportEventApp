import Link from "next/link";
import { BiTennisBall, BiCycling } from "react-icons/bi";
import { FaVolleyballBall, FaFutbol, FaBasketballBall } from "react-icons/fa";

interface CategorySelectorProps {
}

const CategorySelector = (props: CategorySelectorProps) => {

    const categories = [{
        name: "Football",
        icon: <FaFutbol size={25} />
    },
    {
        name: "Volleyball",
        icon: <FaVolleyballBall size={25} />
    },
    {
        name: "Basketball",
        icon: <FaBasketballBall size={25} />
    },
    {
        name: "Tennis",
        icon: <BiTennisBall size={25} />
    },
    {
        name: "Cycling",
        icon: <BiCycling size={25} />
    },
    ]

    return (
            <div className="flex justify-around items-center mr-4">
                {categories
                    .map((c) =>
                        <Link href={{ query: { search: c.name} }} className="p-2 flex text-gray-600 hover:text-gray-900 border-b-2 hover:border-gray-900 border-transparent text-sm items-center">
                            <div>{c.icon}</div>
                                <span className="pl-2">{c.name}</span>
                        </Link>
                    )}
            </div>
    );
}

export default CategorySelector;