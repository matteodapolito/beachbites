import { api } from "@/app/fetcher";
import {
  Category,
  MenuSection,
  Prodotto,
  UserSettings,
} from "@/app/constants/constants";

const getProducts = () => {
  return api().get("/prodotti/");
};

const getProductsByCategoryID = (id: number) => {
  return api().get("/prodotti/categoria/" + id);
};

const getCategories = () => {
  return api().get("/categorie/");
};

const getAllergeni = () => {
  return api().get("/allergeni/");
};

const getMenu = async () => {
  const categoriesData = await getCategories().json<Category[]>();

  const menu: MenuSection[] = [];

  for (const category of categoriesData) {
    const productsResponse = await getProductsByCategoryID(category.id);
    const productsData = await productsResponse.json<Prodotto[]>();

    if (productsData.length > 0) {
      menu.push({
        category: category,
        products: productsData,
      });
    }
  }

  return menu;
};

const getOrders = () => {
  return api().get("/ordini/").json();
};

const addOrder = ({ order }: { order: any }) => {
  return api()
    .url("/ordini/")
    .post({
      nome: order.nome,
      cognome: order.cognome,
      elementi: order.elementi,
      slot_delivery: order.slot_delivery,
      n_ombrellone: order.n_ombrellone,
      ...(order.note ? { note: order.note } : {}),
    })
    .json();
};

const getOrder = (id: number) => {
  return api()
    .url("/ordini/" + id)
    .get()
    .json();
};

const addProduct = ({ product }: { product: any }) => {
  return api()
    .url("/prodotti/")
    .post({
      nome: product.nome,
      descrizione: product.descrizione,
      prezzo: product.prezzo,
      categoria: Number(product.categoria),
      allergeni: product.allergeni.map(Number),
      immagine:
        "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    })
    .json();
};

const addCategory = ({ name }: { name: string }) => {
  return api()
    .url("/categorie/")
    .post({
      nome: name,
    })
    .json();
};

const addAllergene = ({ name }: { name: string }) => {
  return api()
    .url("/allergeni/")
    .post({
      nome: name,
    })
    .json();
};

const deleteProduct = (id: number) => {
  return api().url(`/prodotti/${id}`).delete().json();
};

const getUserSettings = () => {
  return api().get("/auth/user-settings/");
};

const putUserSettings = (settings: any) => {
  return api()
    .headers({
      Accept: "application/json",
      "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryABC123",
    })
    .url("/auth/user-settings/")
    .put(settings)
    .json();
};

/**
 * Exports orders-related actions.
 * @returns {Object} An object containing all the orders actions.
 */

export const OrdersActions = () => {
  return {
    getProducts,
    getMenu,
    getOrders,
    getCategories,
    getAllergeni,
    addProduct,
    deleteProduct,
    addCategory,
    addAllergene,
    getUserSettings,
    putUserSettings,
    addOrder,
    getOrder,
  };
};
