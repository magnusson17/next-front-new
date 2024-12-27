import { arrayIdBlocchi, fetchRequest, getSingleContent } from "@/utils/requestFunctions";
import AllBlocchi from "@/components/blocchi/AllBlocchi";

export default async function Bevande({ params }) {
    const {locale} = await params
    const singlePage = await getSingleContent(process.env.GET_ALL_PAGES, locale, "nid", 16)
    const blocchiIds = await arrayIdBlocchi(singlePage)
    const drinks = await fetchRequest(process.env.GET_ALL_DRINKS, locale)
    // per raggruppare i drinks con = prezzo
    let nextPrice = null

    return (
        <main className="relative page-bevande">
            <ul className="teasers-cibi px-10">
                {drinks.map(el => (
                    <li key={el.nid}>
                        {nextPrice !== el.field_prezzo ? <h3 className="text-base text-white font-bold uppercase bg-black py-2 pl-10 -ml-10">{el.field_prezzo}</h3> : ''}
                        <div>
                            <h4 className="text-red-700 font-bold uppercase">
                                {el.field_titolo_main}
                            </h4>
                            <p className="lowercase">{el.field_ingredienti}</p>
                        </div>
                        <div className="hidden">{nextPrice = el.field_prezzo}</div>
                    </li>
                ))}
            </ul>
            {blocchiIds ? <AllBlocchi blocchiIds={blocchiIds} lang={locale} /> : ''}
        </main>
    );
}