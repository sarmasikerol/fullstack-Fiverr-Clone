import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenFancy,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

export const categories = [
  { name: "Programlama ve Teknoloji", icon: <FaCode /> },
  { name: "Grafik ve Tasarım", icon: <FaPaintBrush /> },
  { name: "Dijital Pazarlama", icon: <FaBullhorn /> },
  { name: "Yazma ve Çeviri", icon: <FaPenFancy /> },
  { name: "Video ve Animasyon", icon: <FaVideo /> },
  { name: "Yapay Zeka Hizmetleri", icon: <FaRobot /> },
  { name: "Müzik ve Ses", icon: <FaMusic /> },
  { name: "İş", icon: <FaBriefcase /> },
  { name: "Danışmanlık", icon: <FaUserTie /> },
];

export const items = [
  {
    title: "Dedicated hiring experts",
    text: "Count on an account manager to find you the right talent and see to your project’s every need.",
  },
  {
    title: "Satisfaction guarantee",
    text: "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
  },
  {
    title: "Advanced management tools",
    text: "Seamlessly integrate freelancers into your team and projects.",
  },
  {
    title: "Flexible payment models",
    text: "Pay per project or opt for hourly rates to facilitate longer-term collaboration.",
  },
];

export const inputs = [
  { label: "Başlık", name: "title", isReq: true },

  { label: "Kapak Fotoğrafı", name: "cover", isReq: true, type: "file" },

  {
    label: "Fotoğraflar",
    name: "images",
    type: "file",
    isReq: true,
    isMulti: true,
  },
  {
    label: "Revizyon Hakkı",
    name: "revisionNumber",
    type: "number",
    isReq: true,
    min: 1,
  },

  {
    label: "Özellikler (',' ile ayırınız)",
    name: "features",
    type: "textarea",
  },
  { label: "Açıklama", name: "desc", isReq: true, type: "textarea" },
  { label: "Yan Açıklama", name: "shortDesc", isReq: true },
  { label: "Yan Başlık", name: "shortTitle", isReq: true },

  {
    label: "Teslimat Süresi (gün)",
    name: "deliveryTime",
    type: "number",
    isReq: true,
    min: 1,
    max: 90,
  },
  {
    label: "Fiyat ($)",
    name: "price",
    type: "number",
    isReq: true,
    min: 1,
  },
];
