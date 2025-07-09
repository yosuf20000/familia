import { GrTransaction, GrGroup } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { BsPersonWalking } from "react-icons/bs";

 export const navigations = [
    { name: 'الرئيسة', href: '/', icon: IoHome, current: true },
    { name: 'انا', href: '/me', icon: BsPersonWalking, current: true },
    // { name: 'القروض', href: '/loans', icon: GiReceiveMoney, current: false },
    { name: 'المجموعات', href: '/groups', icon: GrGroup, current: false },
    // { name: 'حولاتي', href: '/transactions', icon: GrTransaction, current: true },


]