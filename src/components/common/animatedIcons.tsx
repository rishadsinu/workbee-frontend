import type { FC } from "react";
import {
  Plus,
  TrendingUp,
  Link,
  Share2,
  Users,
  ShoppingCart,
  Truck,
  Trees as Tree,
  Heart,
  Handshake,
  Building,
} from "lucide-react";

interface FloatingIconsProps {
  className?: string;
}

const FloatingIcons: FC<FloatingIconsProps> = ({ className }) => {
  return (
    <div className={`relative h-96 ${className}`}>
      <div className="absolute top-10 left-70 -translate-x-1/2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
        <Plus className="h-6 w-6 text-gray-600" />
      </div>

      <div className="absolute top-20 right-75 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <TrendingUp className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute right-100 top-30 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Link className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute right-95 bottom-20 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Share2 className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
        <Users className="h-6 w-6 text-gray-600" />
      </div>

      <div className="absolute bottom-10 left-55 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <ShoppingCart className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute bottom-35 right-75 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
        <Truck className="h-6 w-6 text-gray-600" />
      </div>

      <div className="absolute top-12 left-40 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Tree className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute bottom-30 left-40 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Heart className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute right-140 top-42 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Handshake className="h-5 w-5 text-gray-600" />
      </div>

      <div className="absolute left-45 top-30 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Building className="h-5 w-5 text-gray-600" />
      </div>
    </div>
  );
};

export default FloatingIcons;
