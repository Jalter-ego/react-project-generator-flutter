import type { ComponentInstance } from "@/types/CanvasItem";
import { urlimage, urlImageUser } from '../assets/urlImage';
import { data, header } from '../components/library/Table';
import { dataCombobox } from '../constants/dataCombobox';
import { dataSidebar } from '../constants/dataSidebar';





export const defaultProperties: Record<string, ComponentInstance['properties']> = {
  button: { label: 'Botón', bg: '#45def2', width: 128, height: 32, borderRadius: 12, fontSize: 16 },
  textfield: { placeholder: 'Campo de texto', width: 232, height: 32, borderRadius: 12 },
  checkbox: { checked: false },
  appbar1: { width: 300, height: 32, bg: '#ffffff' },
  table: { table: { header, data } },
  card: { card: { title: 'Card Title', image: urlimage, description: 'Card Description', price: 0 } },
  container: { bg: '#e37', width: 300, height: 200, borderRadius: 12 },
  label: { label: "Etiqueta", fontSize: 16, colorFont: "#000000" },
  image: { image: urlimage, width: 120, height: 120, borderRadius: 12, },
  combobox: { combobox: dataCombobox },
  switch: { checked: false },
  radio: { checked: false },
  chip: { label: 'Input Chips', bg: '#6366F1', icon: 'I', },
  circleavatar: { image: urlImageUser, size: 80, borderColor: "#ffffff" },
  slider: { value: 40, min: 0, max: 100, step: 10 },
  listtilelist: {
    list: [{ icon: "IconUser", title: "Usuario 1", subtitle: "Subdetalle", showCheckbox: true, checked: false, },],
  },
  togglebuttons: { buttons: [{ icon: "IconHeart" }, { icon: "IconUser" },], initialActive: 0 },
  badge: { label: "3", bg: "#ff3b30", position: "top-right", icon: "IconUser", text: "👽" },
  sidebar: { sidebar: dataSidebar }
};
