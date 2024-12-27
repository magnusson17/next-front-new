import { fetchRequest, arrayIdBlocchi, getSingleContent } from "@/utils/requestFunctions";
import AllBlocchi from "@/components/blocchi/AllBlocchi";
import FiltroCibo from "@/components/general/FiltroCibo";

export default async function Cibi({ params }) {

    const {locale} = await params
    const singlePage = await getSingleContent(process.env.GET_ALL_PAGES, locale, "nid", 15)
    const blocchiIds = await arrayIdBlocchi(singlePage)
    const foods = await fetchRequest(process.env.GET_ALL_FOOD, locale)
    // per looppare i cibi di cat in cat e per il filtro cat
    const titoliCategorie = await fetchRequest(process.env.GET_ALL_CATEGORIE_CIBO, locale)

    return (
        <main className="relative page-pizze">
            <FiltroCibo titoliCat={titoliCategorie} />

            <div className="teasers-cibi px-10">
                {titoliCategorie.map(cat => {
                    return (
                        <div id={cat.name.toLowerCase()} key={cat.name}>
                            <h2 className="text-[30px] font-bold uppercase mt-10">
                                {cat.name}
                            </h2>

                            {foods
                                .filter((el) => el.field_categoria.includes(cat.name))
                                .map((el) => {
                                    return (
                                        <div key={el.nid}>
                                            <h3 className="
                                            text-base
                                            text-white
                                            font-bold
                                            uppercase
                                            bg-black
                                            py-2
                                            pl-10
                                            -ml-10
                                            ">{el.field_prezzo}</h3>
                                            <ul className="
                                            bg-primary-bg
                                            pl-10
                                            -ml-10
                                            ">
                                                <li>
                                                    <h4 className="
                                                    text-red-700
                                                    font-bold
                                                    uppercase
                                                    ">{el.field_titolo_main}</h4>
                                                    <p className="
                                                    lowercase
                                                    ">{el.field_ingredienti}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>

            {blocchiIds ? <AllBlocchi blocchiIds={blocchiIds} lang={locale} /> : ''}
        </main>
    );
}