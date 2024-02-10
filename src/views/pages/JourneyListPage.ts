import m, {ClassComponent, Children, Vnode} from "mithril";
import {JourneyListModel} from "../../models/JourneyListModel";
import {JourneyTile} from "../components/JourneyTile";
import {Header} from "../components/Header";
import {parseDatetime} from "../../utils/parseDatetime";

interface JourneyListPageAttrs {
    departureId: string,
    departureName: string,
    arrivalId: string,
    arrivalName: string,
}

export class JourneyListPage implements ClassComponent<JourneyListPageAttrs> {
    private model: JourneyListModel | undefined;

    oninit({attrs}: Vnode<JourneyListPageAttrs>) {
        this.model = new JourneyListModel(attrs.departureId, attrs.arrivalId);
    }

    view({attrs}: Vnode<JourneyListPageAttrs>): void | Children {
        return m("div.w-full",
            [
                m(Header, {title: "Journey List", showButton: false}),
                // test fetch
                m("button.bg-gray-800.p-4.border.hover:opacity-60",
                    {
                        onclick: () => {
                            this.model?.fetchJourneys();
                        },
                    },
                    "fetch data"),
                m("h2.text-lg.font-bold.", `${attrs.departureName} -> ${attrs.arrivalName}`),
                m("p", `Search after ${parseDatetime(Date.now())}`),
                m("div", this.model?.journeys.map(journey => m(JourneyTile, {
                    arrivalStationName: attrs.arrivalName,
                    departureStationName: attrs.departureName,
                    journey: journey
                }))),
            ]
        );
    }
}


