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
    // per raggruppare i cibi con = prezzo
    let nextPrice = null

    return (
        <main className="relative page-pizze">
            <FiltroCibo titoliCat={titoliCategorie} />

            <div className="teasers-cibi px-10">
                {/* looppo le categorie */}
                {titoliCategorie.map(cat => {
                    return (
                        <ul id={cat.name.toLowerCase()} key={cat.name}>
                            <h2 className="text-[30px] font-bold uppercase mt-10">
                                {cat.name}
                            </h2>

                            {/* in ogni loop di cat, filtro i cibi correlati a tale cat e li looppo a loro volta */}
                            {foods
                                .filter((el) => el.field_categoria.includes(cat.name))
                                .map((el) => {
                                    return (
                                        <li key={el.nid}>
                                            {/* se il prezzo del el successivo è = a quello del current el, NON stampo il prezzo
                                            (a meno che l'el successivo non sia in una != cat)
                                            cosi da raggruppare gli el sotto il loro prezzo in comune */}
                                            {nextPrice !== el.field_prezzo ? <h3 className="text-base text-white font-bold uppercase bg-black py-2 pl-10 -ml-10">{el.field_prezzo}</h3> : ''}
                                            {nextPrice === el.field_prezzo && cat.name !== el.field_categoria ? <h3 className="text-base text-white font-bold uppercase bg-black py-2 pl-10 -ml-10">{el.field_prezzo}</h3> : ''}

                                            <div className="bg-primary-bg pl-10 -ml-10">
                                                <h4 className="text-red-700 font-bold uppercase">{el.field_titolo_main}</h4>
                                                <p className="lowercase">{el.field_ingredienti}</p>
                                            </div>

                                            {/* aggiorno il valore del "prezzo successivo"; siccome mi stamperebbe un valore a schermo, uso la gabola del d-none */}
                                            <div className="hidden">{nextPrice = el.field_prezzo}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                })}
            </div>

            {blocchiIds ? <AllBlocchi blocchiIds={blocchiIds} lang={locale} /> : ''}
        </main>
    );
}